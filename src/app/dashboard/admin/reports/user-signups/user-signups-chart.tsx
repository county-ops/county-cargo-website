
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { MonthlySignupData } from "./page"

const chartConfig = {
  total: {
    label: "Signups",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

interface UserSignupsChartProps {
    data: MonthlySignupData[];
}

export function UserSignupsChart({ data }: UserSignupsChartProps) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full h-[350px]">
      <BarChart accessibilityLayer data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
         <YAxis allowDecimals={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="total" fill="var(--color-total)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
