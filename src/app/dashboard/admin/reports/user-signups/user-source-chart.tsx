
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"
import { SourceSignupData } from "./page"
import { useMemo } from "react";

interface UserSourceChartProps {
    data: SourceSignupData[];
}

export function UserSourceChart({ data }: UserSourceChartProps) {
    const chartConfig = useMemo(() => {
        const config: ChartConfig = {};
        data.forEach(item => {
            config[item.source] = {
                label: item.source.charAt(0).toUpperCase() + item.source.slice(1),
                color: item.fill,
            };
        });
        return config;
    }, [data]);

    if (data.length === 0) {
        return (
            <div className="flex justify-center items-center h-[350px] text-muted-foreground">
                No signup data for this period.
            </div>
        );
    }

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart accessibilityLayer data={data} layout="vertical" margin={{ left: 10 }}>
                    <CartesianGrid horizontal={false} />
                    <YAxis
                        dataKey="source"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
                        width={80}
                    />
                    <XAxis dataKey="total" type="number" hide />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar dataKey="total" layout="vertical" radius={4} />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}
