
'use client';

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Activity, FlaskConical, Globe, AlertTriangle } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type ApiUsageEntry = {
    id: string;
    email: string | null;
    count: number;
    windowStart: Date;
    lastRequest: Date;
    isTest: boolean;
};

export default function ApiUsagePage() {
    const [usage, setUsage] = useState<ApiUsageEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "API Usage | County Cargo";
        
        const q = query(
            collection(db, 'api_rate_limits'),
            orderBy('lastRequest', 'desc'),
            limit(100)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => {
                const entry = doc.data();
                return {
                    id: doc.id,
                    email: entry.email,
                    count: entry.count || 0,
                    windowStart: (entry.windowStart as Timestamp).toDate(),
                    lastRequest: (entry.lastRequest as Timestamp).toDate(),
                    isTest: entry.isTest || false,
                } as ApiUsageEntry;
            });
            setUsage(data);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching API usage:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const getStatus = (count: number) => {
        if (count >= 60) return { label: "Throttled", variant: "destructive" as const };
        if (count >= 45) return { label: "High", variant: "default" as const };
        return { label: "Normal", variant: "outline" as const };
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <h1 className="font-semibold text-lg md:text-2xl">API Usage Monitoring</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Windows</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{usage.filter(u => (Date.now() - u.windowStart.getTime()) < 60000).length}</div>
                        <p className="text-xs text-muted-foreground">Request windows active in the last 60 seconds.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Throttled Keys</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{usage.filter(u => u.count >= 60 && (Date.now() - u.windowStart.getTime()) < 60000).length}</div>
                        <p className="text-xs text-muted-foreground">Keys currently hitting the 60 req/min limit.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Staging Usage</CardTitle>
                        <FlaskConical className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{usage.filter(u => u.isTest && (Date.now() - u.windowStart.getTime()) < 60000).length}</div>
                        <p className="text-xs text-muted-foreground">Active keys in the staging environment.</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Live Activity</CardTitle>
                    <CardDescription>Most recent API request windows across all environments.</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : usage.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User / Email</TableHead>
                                    <TableHead>Environment</TableHead>
                                    <TableHead>Usage (Window)</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Last Request</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {usage.map((entry) => {
                                    const status = getStatus(entry.count);
                                    const progress = (entry.count / 60) * 100;
                                    const isRecent = (Date.now() - entry.windowStart.getTime()) < 60000;

                                    return (
                                        <TableRow key={entry.id} className={cn(!isRecent && "opacity-50")}>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{entry.email || 'Anonymous / Unvalidated'}</span>
                                                    <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[150px]">{entry.id}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {entry.isTest ? (
                                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                        <FlaskConical className="mr-1 h-3 w-3" /> Staging
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                        <Globe className="mr-1 h-3 w-3" /> Production
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="min-w-[200px]">
                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-xs">
                                                        <span>{entry.count} / 60 requests</span>
                                                        {isRecent && <span className="text-muted-foreground">Resets in {Math.max(0, 60 - Math.floor((Date.now() - entry.windowStart.getTime()) / 1000))}s</span>}
                                                    </div>
                                                    <Progress value={progress} className={cn(
                                                        "h-1.5",
                                                        entry.count >= 60 ? "[&>div]:bg-destructive" : entry.count >= 45 ? "[&>div]:bg-orange-500" : ""
                                                    )} />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={status.variant}>{status.label}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right whitespace-nowrap">
                                                <div className="flex flex-col text-xs">
                                                    <span>{formatDistanceToNow(entry.lastRequest, { addSuffix: true })}</span>
                                                    <span className="text-muted-foreground text-[10px]">{format(entry.lastRequest, 'HH:mm:ss')}</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="py-12 text-center text-muted-foreground">
                            No recent API activity found.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
