
'use client';

import { useEffect, useState, useMemo } from "react";
import { UserProfile } from "@/lib/types";
import { getAllUsers } from "@/lib/user-actions";
import { Loader2, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const UserSignupsChart = dynamic(() => import('./user-signups-chart').then(mod => mod.UserSignupsChart), {
    ssr: false,
    loading: () => <div className="h-[350px] w-full flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
});
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { subMonths, startOfMonth, endOfMonth, format } from 'date-fns';
import dynamic from 'next/dynamic';
const UserSourceChart = dynamic(() => import('./user-source-chart').then(mod => mod.UserSourceChart), {
    ssr: false,
    loading: () => <div className="h-[350px] w-full flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
});
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/date-range-picker";


export type MonthlySignupData = {
    month: string;
    total: number;
};

export type SourceSignupData = {
    source: string;
    total: number;
    fill: string;
};


export default function UserSignupsReportPage() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: subMonths(new Date(), 1),
        to: new Date(),
    });

    // Helper to get end of day
    const endOfDay = (date: Date) => {
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);
        return end;
    };

    useEffect(() => {
        document.title = "User Signups Report | County Cargo";
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const usersData = await getAllUsers();
                const sortedUsers = usersData.sort((a, b) => {
                    const aTime = a.created_time?.getTime();
                    const bTime = b.created_time?.getTime();
                    if (!aTime && !bTime) return 0;
                    if (!aTime) return 1;
                    if (!bTime) return -1;
                    return bTime - aTime;
                });
                setUsers(sortedUsers);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const monthlyData = useMemo(() => {
        const data: { [key: string]: number } = {};
        const now = new Date();
        
        // Initialize the last 12 months with 0 signups
        for (let i = 11; i >= 0; i--) {
            const date = subMonths(now, i);
            const monthKey = format(date, 'MMM yyyy');
            data[monthKey] = 0;
        }

        users.forEach(user => {
            if (user.created_time) {
                const monthKey = format(user.created_time, 'MMM yyyy');
                if (monthKey in data) {
                    data[monthKey]++;
                }
            }
        });

        return Object.entries(data).map(([month, total]) => ({
            month,
            total
        }));
    }, [users]);
    
    
    const sourceData = useMemo(() => {
        const filteredUsers = users.filter(user => {
            if (!user.created_time || !dateRange?.from) return false;
            const createdDate = new Date(user.created_time);
            const toDate = dateRange.to ? endOfDay(dateRange.to) : endOfDay(dateRange.from);
            return createdDate >= dateRange.from && createdDate <= toDate;
        });

        const sourceCounts: { [key: string]: number } = {};
        filteredUsers.forEach(user => {
            const source = user.referrer || 'Unknown';
            sourceCounts[source] = (sourceCounts[source] || 0) + 1;
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

    }, [users, dateRange]);


    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/admin/reports">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="font-semibold text-lg md:text-2xl">User Signups Report</h1>
                    <p className="text-muted-foreground text-sm">A report of new customer registrations over time.</p>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Signups Over Last 12 Months</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center items-center h-[350px]">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : (
                            <UserSignupsChart data={monthlyData} />
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <CardTitle>Registration Source</CardTitle>
                                <CardDescription>Where new users are coming from.</CardDescription>
                            </div>
                            <div className="mt-4 sm:mt-0">
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
        </div>
    );
}
