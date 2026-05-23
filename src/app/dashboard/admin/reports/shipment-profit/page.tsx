
'use client';

import { useEffect, useState, useMemo } from "react";
import { Shipment, Transaction } from "@/lib/types";
import { collection, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2, ArrowLeft, Banknote, Package, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProfitTable, { ShipmentWithProfit } from "./profit-table";


export default function ShipmentProfitReportPage() {
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        document.title = "Shipment Profit Report | County Cargo";
        setLoading(true);

        const fetchShipments = onSnapshot(query(collection(db, 'shipments'), orderBy('bookingDate', 'desc')), (querySnapshot) => {
          const shipmentsData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              ...data,
              docId: doc.id,
              bookingDate: data.bookingDate instanceof Timestamp ? data.bookingDate.toDate() : new Date(data.bookingDate),
            } as Shipment;
          });
          setShipments(shipmentsData);
        }, (error) => {
          console.error("Error fetching shipments: ", error);
        });
        
        const fetchTransactions = onSnapshot(query(collection(db, 'transactions'), orderBy('date', 'desc')), (querySnapshot) => {
            const transactionsData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    ...data,
                    docId: doc.id,
                    date: data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date),
                } as Transaction;
            });
            setTransactions(transactionsData);
        }, (error) => {
            console.error("Error fetching transactions: ", error);
        });
        
        // Combine loading state logic
        const timer = setTimeout(() => setLoading(false), 5000);

        return () => {
            fetchShipments();
            fetchTransactions();
            clearTimeout(timer);
        };
    }, []);

    const { paidShipmentsWithProfit, reportSummary } = useMemo(() => {
        const expensesByShipmentId: { [key: string]: number } = {};

        transactions.forEach(txn => {
            if (txn.type === 'expense' && txn.shipmentId) {
                expensesByShipmentId[txn.shipmentId] = (expensesByShipmentId[txn.shipmentId] || 0) + txn.amount;
            }
        });

        const shipmentsWithProfitData: ShipmentWithProfit[] = shipments.map(s => {
            const revenue = s.paymentStatus === 'Paid' ? parseFloat(s.totalCost || '0') : 0;
            const expense = expensesByShipmentId[s.id] || 0;
            const profit = revenue - expense;
            return { ...s, profit, expense };
        });

        const paidShipments = shipmentsWithProfitData.filter(s => s.paymentStatus === 'Paid');
        const totalRevenue = paidShipments.reduce((sum, s) => sum + (parseFloat(s.totalCost || '0')), 0);
        const totalProfit = paidShipments.reduce((sum, s) => sum + s.profit, 0);

        const summary = {
            totalRevenue,
            totalShipments: shipments.length,
            totalProfit,
        };

        return { paidShipmentsWithProfit: paidShipments, reportSummary: summary };
    }, [shipments, transactions]);
    
    // Update loading state when both fetches are complete
    useEffect(() => {
      if (shipments.length > 0 || transactions.length > 0) {
          setLoading(false);
      }
    }, [shipments, transactions]);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/admin/reports">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="font-semibold text-lg md:text-2xl">Shipment Revenue Report</h1>
                    <p className="text-muted-foreground text-sm">An overview of revenue generated from shipments.</p>
                </div>
            </div>
            
            {loading ? (
                <div className="grid gap-4 md:grid-cols-3">
                    <Card><CardHeader><CardTitle>Loading...</CardTitle></CardHeader><CardContent><Loader2 className="h-6 w-6 animate-spin" /></CardContent></Card>
                    <Card><CardHeader><CardTitle>Loading...</CardTitle></CardHeader><CardContent><Loader2 className="h-6 w-6 animate-spin" /></CardContent></Card>
                    <Card><CardHeader><CardTitle>Loading...</CardTitle></CardHeader><CardContent><Loader2 className="h-6 w-6 animate-spin" /></CardContent></Card>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue (Paid)</CardTitle>
                            <Banknote className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(reportSummary.totalRevenue)}
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Profit (Paid)</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(reportSummary.totalProfit)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{reportSummary.totalShipments}</div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <Card>
                 <CardHeader>
                    <CardTitle>Shipment Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProfitTable data={paidShipmentsWithProfit} loading={loading} />
                </CardContent>
            </Card>
        </div>
    );
}
