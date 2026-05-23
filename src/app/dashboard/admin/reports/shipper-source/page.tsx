
'use client';

import { useEffect, useState, useMemo } from "react";
import { UserProfile, Shipment, ShipmentStatus } from "@/lib/types";
import { getAllUsers } from "@/lib/user-actions";
import { collection, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2, ArrowLeft, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { startOfMonth, endOfMonth } from 'date-fns';
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/date-range-picker";
import dynamic from 'next/dynamic';
const UserSourceChart = dynamic(() => import('../user-signups/user-source-chart').then(mod => mod.UserSourceChart), {
    ssr: false,
    loading: () => <div className="h-[350px] w-full flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
});
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type SourceSignupData = {
    source: string;
    total: number;
    fill: string;
};

export default function ShipperSourceReportPage() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: startOfMonth(new Date()),
        to: endOfMonth(new Date()),
    });
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const endOfDay = (date: Date) => {
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);
        return end;
    };

    useEffect(() => {
        document.title = "Shipper Source Report | County Cargo";
        const fetchData = async () => {
            setLoading(true);
            try {
                const usersData = await getAllUsers();
                setUsers(usersData);

                const q = query(collection(db, 'shipments'), orderBy('bookingDate', 'desc'));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const shipmentsData = querySnapshot.docs.map(doc => {
                        const data = doc.data();
                        return {
                            ...data,
                            docId: doc.id,
                            bookingDate: data.bookingDate instanceof Timestamp ? data.bookingDate.toDate() : new Date(data.bookingDate),
                        } as Shipment;
                    });
                    setShipments(shipmentsData);
                    setLoading(false);
                }, (error) => {
                    console.error("Error fetching shipments: ", error);
                    setLoading(false);
                });
                
                return () => unsubscribe();

            } catch (error) {
                console.error("Failed to fetch users:", error);
                 setLoading(false);
            }
        };

        fetchData();
    }, []);

    const sourceData = useMemo(() => {
        if (!dateRange?.from) return [];

        const toDate = dateRange.to ? endOfDay(dateRange.to) : endOfDay(dateRange.from);

        const filteredShipments = shipments.filter(shipment => {
            const bookingDate = new Date(shipment.bookingDate);
            const inDateRange = bookingDate >= dateRange.from! && bookingDate <= toDate;
            const statusMatch = statusFilter === 'all' || shipment.status === statusFilter || (statusFilter === 'Paid' && shipment.paymentStatus === 'Paid');
            
            return inDateRange && statusMatch;
        });

        const shipperIds = new Set(filteredShipments.map(s => s.userId));
        
        const sourceCounts: { [key: string]: number } = {};
        
        shipperIds.forEach(userId => {
            const user = users.find(u => u.uid === userId);
            if (user) {
                const source = user.referrer || 'Unknown';
                sourceCounts[source] = (sourceCounts[source] || 0) + 1;
            }
        });

        const colors = [
            'hsl(var(--chart-1))',
            'hsl(var(--chart-2))',
            'hsl(var(--chart-3))',
            'hsl(var(--chart-4))',
            'hsl(var(--chart-5))',
        ];

        return Object.entries(sourceCounts)
            .map(([source, total], index) => ({
                source,
                total,
                fill: colors[index % colors.length]
            }))
            .sort((a, b) => b.total - a.total);

    }, [users, shipments, dateRange, statusFilter]);


    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/admin/reports">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="font-semibold text-lg md:text-2xl">Shipper Source Report</h1>
                    <p className="text-muted-foreground text-sm">Analysis of where customers who book shipments come from.</p>
                </div>
            </div>

            <Card className="max-w-3xl">
                <CardHeader>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle>Shipper Acquisition Source</CardTitle>
                            <CardDescription>Where new paying customers are coming from.</CardDescription>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <Select onValueChange={(value) => setStatusFilter(value as any)} defaultValue="all">
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="Paid">Paid (All)</SelectItem>
                                    <SelectItem value="Delivered">Delivered</SelectItem>
                                    <SelectItem value="In Transit">In Transit</SelectItem>
                                    <SelectItem value="Received at Hub">Received at Hub</SelectItem>
                                    <SelectItem value="Awaiting Collection">Awaiting Collection</SelectItem>
                                    <SelectItem value="Unpaid">Unpaid</SelectItem>
                                </SelectContent>
                            </Select>
                            <DateRangePicker onDateChange={setDateRange} initialDate={dateRange} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center h-[350px]">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <UserSourceChart data={sourceData} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
