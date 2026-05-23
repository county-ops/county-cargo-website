
'use client';

import { useEffect, useState, useMemo } from 'react';
import { doc, onSnapshot, Timestamp, collection, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter, useParams } from 'next/navigation';
import { Shipment, Transaction, UserProfile } from '@/lib/types';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, TrendingDown, TrendingUp, Banknote } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { getUserProfile } from '@/lib/user-actions';

const DetailItem = ({ label, value }: { label: string, value: string | React.ReactNode }) => (
    <div className="flex flex-col">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="text-base font-semibold">{value}</span>
    </div>
);


export default function ShipmentCostBreakdownPage() {
    const [shipment, setShipment] = useState<Shipment | null>(null);
    const [customer, setCustomer] = useState<UserProfile | null>(null);
    const [expenses, setExpenses] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        if (typeof id !== 'string') return;
        document.title = `Cost Breakdown | County Cargo`;

        const unsubShipment = onSnapshot(doc(db, 'shipments', id), async (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                const shipmentData = {
                    ...data,
                    docId: docSnap.id,
                    bookingDate: (data.bookingDate as Timestamp).toDate(),
                } as Shipment;
                setShipment(shipmentData);
                document.title = `Cost for ${shipmentData.id} | County Cargo`;

                if (!customer || customer.uid !== shipmentData.userId) {
                    const customerProfile = await getUserProfile(shipmentData.userId);
                    setCustomer(customerProfile);
                }

                setLoading(false);
            } else {
                toast({ variant: 'destructive', title: 'Error', description: 'Shipment not found.' });
                router.push('/dashboard/admin/reports/shipment-profit');
                setLoading(false);
            }
        });

        // Fetch related expenses
        const expensesQuery = query(collection(db, 'transactions'), where('shipmentId', '==', id), where('type', '==', 'expense'));
        const unsubExpenses = onSnapshot(expensesQuery, (snapshot) => {
            const expensesData = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    docId: doc.id,
                    ...data,
                    date: (data.date as Timestamp).toDate(),
                } as Transaction;
            });
            setExpenses(expensesData);
        });

        return () => {
            unsubShipment();
            unsubExpenses();
        }
    }, [id, router, customer]);
    
    const { totalExpenses, profit } = useMemo(() => {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const revenue = shipment ? parseFloat(shipment.totalCost || '0') : 0;
        const netProfit = revenue - total;
        return { totalExpenses: total, profit: netProfit };
    }, [expenses, shipment]);

    if (loading || !shipment || !customer) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }
    
    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="font-semibold text-lg md:text-2xl">Shipment Cost Breakdown</h1>
                    <p className="text-muted-foreground text-sm">Shipment ID: {shipment.id}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Shipment Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <DetailItem label="Customer" value={`${customer.firstname} ${customer.lastname}`} />
                        <DetailItem label="Email" value={customer.email} />
                        <DetailItem label="Booking Date" value={shipment.bookingDate ? format(new Date(shipment.bookingDate), 'PPP') : 'N/A'} />
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Financial Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center text-lg">
                            <span className="flex items-center gap-2 font-medium"><Banknote className="h-5 w-5 text-muted-foreground" /> Total Revenue</span>
                            <span className="font-bold">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(parseFloat(shipment.totalCost || '0'))}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg">
                            <span className="flex items-center gap-2 font-medium"><TrendingDown className="h-5 w-5 text-muted-foreground" /> Total Expenses</span>
                            <span className="font-bold text-destructive">({new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(totalExpenses)})</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center text-xl font-bold">
                            <span className="flex items-center gap-2"><TrendingUp className="h-5 w-5" /> Net Profit</span>
                            <span className={profit >= 0 ? 'text-green-600' : 'text-destructive'}>
                                {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(profit)}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Associated Expenses</CardTitle>
                    <CardDescription>A detailed list of all costs logged against this shipment.</CardDescription>
                </CardHeader>
                <CardContent>
                    {expenses.length > 0 ? (
                        <div className="space-y-4">
                            {expenses.map(expense => (
                                <div key={expense.docId} className="flex justify-between items-start border-b pb-4">
                                    <div>
                                        <p className="font-medium">{expense.description}</p>
                                        <p className="text-sm text-muted-foreground">{format(expense.date, 'MMM dd, yyyy')}</p>
                                    </div>
                                    <span className="font-semibold text-destructive whitespace-nowrap">({new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(expense.amount)})</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-8">No expenses have been logged for this shipment.</p>
                    )}
                </CardContent>
            </Card>

        </div>
    )
}
