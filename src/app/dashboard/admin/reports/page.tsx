
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const reports = [
    {
        title: "User Signups Report",
        description: "View user registration trends and data.",
        href: "/dashboard/admin/reports/user-signups",
        icon: Users
    },
    {
        title: "Shipment Revenue Report",
        description: "Analyze revenue generated from shipments.",
        href: "/dashboard/admin/reports/shipment-profit",
        icon: TrendingUp
    },
    {
        title: "Shipper Source Report",
        description: "See where your paying customers are coming from.",
        href: "/dashboard/admin/reports/shipper-source",
        icon: Users
    },
];

export default function ReportsPage() {
    useEffect(() => {
        document.title = "Reports | County Cargo";
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <h1 className="font-semibold text-lg md:text-2xl">Reports</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reports.map((report) => (
                    <Card key={report.href} className="hover:shadow-md transition-shadow">
                        <Link href={report.href}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-base font-medium">
                                    {report.title}
                                </CardTitle>
                                <report.icon className="h-5 w-5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{report.description}</CardDescription>
                                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                                    <span>View Report</span>
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    );
}
