
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ShipmentStatus } from "@/lib/types"

interface ShipmentStatusBadgeProps {
  status: ShipmentStatus;
  className?: string;
}

export function ShipmentStatusBadge({ status, className }: ShipmentStatusBadgeProps) {
  const statusStyles: Record<ShipmentStatus, string> = {
    "Unpaid": "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/50 dark:text-gray-300 dark:border-gray-800",
    "Awaiting Confirmation": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800",
    "Received at Hub": "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/50 dark:text-cyan-300 dark:border-cyan-800",
    "Processing": "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800",
    "In Transit": "bg-primary/20 text-orange-800 border-primary/30 dark:text-orange-200",
    "Awaiting Collection": "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-800",
    "Delivered": "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800",
    "Delayed": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800",
    "Cancelled": "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800",
    "On Hold": "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-800",
  }

  return (
    <Badge
      variant="outline"
      className={cn("font-medium", statusStyles[status], className)}
    >
      {status}
    </Badge>
  )
}
