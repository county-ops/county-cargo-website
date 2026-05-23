
'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { format } from 'date-fns'
import * as XLSX from 'xlsx';

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Shipment } from '@/lib/types'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowUpDown, FileDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { DateRangePicker } from '@/components/date-range-picker';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


export interface ShipmentWithProfit extends Shipment {
    profit: number;
}

const DateCell = ({ date }: { date: Date | string | null }) => {
  const [formattedDate, setFormattedDate] = React.useState('');

  React.useEffect(() => {
    if (date) {
      try {
        const d = new Date(date);
        if(!isNaN(d.getTime())) {
          setFormattedDate(format(d, 'MMM dd, yyyy'));
        } else {
          setFormattedDate('Invalid Date');
        }
      } catch (e) {
        setFormattedDate('Invalid Date');
      }
    } else {
      setFormattedDate('N/A');
    }
  }, [date]);


  return <span>{formattedDate}</span>;
};

const formatServiceType = (serviceType: string) => {
    if (!serviceType) return 'N/A';
    return serviceType
        .replace(/([A-Z])/g, ' $1') 
        .replace(/^./, (str) => str.toUpperCase());
};

export const columns: ColumnDef<ShipmentWithProfit>[] = [
  {
    accessorKey: 'id',
    header: 'Shipment ID',
    cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'bookingDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <DateCell date={row.getValue('bookingDate')} />,
  },
  {
    accessorKey: 'serviceType',
    header: 'Service',
    cell: ({ row }) => formatServiceType(row.getValue('serviceType')),
  },
  {
    accessorKey: 'totalCost',
    header: ({ column }) => {
      return (
        <div className="text-right">
             <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Revenue
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const shipment = row.original;
      const amount = shipment.paymentStatus === 'Paid' ? parseFloat(shipment.totalCost || '0') : 0;
      const formatted = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
   {
    accessorKey: 'profit',
    header: ({ column }) => {
      return (
        <div className="text-right">
             <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Profit
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const shipment = row.original;
      const profit = shipment.paymentStatus === 'Paid' ? shipment.profit || 0 : 0;

      const formatted = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
      }).format(profit);

      return <div className={cn("text-right font-medium", profit >= 0 ? "text-green-600" : "text-destructive")}>{formatted}</div>
    },
  },
]

interface ProfitTableProps {
  data: ShipmentWithProfit[];
  loading: boolean;
}

export default function ProfitTable({ data, loading }: ProfitTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([ { id: 'bookingDate', desc: true } ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const router = useRouter();

  const filteredData = React.useMemo(() => {
    if (!dateRange || (!dateRange.from && !dateRange.to)) {
      return data;
    }
    return data.filter(item => {
        const itemDate = new Date(item.bookingDate);
        if (dateRange.from && itemDate < dateRange.from) return false;
        // Set the end of the day for the 'to' date for inclusive filtering
        if (dateRange.to) {
            const toDate = new Date(dateRange.to);
            toDate.setHours(23, 59, 59, 999);
            if(itemDate > toDate) return false;
        }
        return true;
    });
  }, [data, dateRange]);


  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
        pagination: {
            pageSize: 100,
        },
    },
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleExport = () => {
    const exportData = filteredData.map(shipment => {
      const revenue = shipment.paymentStatus === 'Paid' ? parseFloat(shipment.totalCost || '0') : 0;
      const profit = shipment.paymentStatus === 'Paid' ? shipment.profit || 0 : 0;
      return {
        'Shipment ID': shipment.id,
        'Booking Date': format(new Date(shipment.bookingDate), 'yyyy-MM-dd'),
        'Service': formatServiceType(shipment.serviceType),
        'Revenue (NGN)': revenue,
        'Profit (NGN)': profit,
      }
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ShipmentRevenue");
    XLSX.writeFile(workbook, "ShipmentRevenueExport.xlsx");
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center gap-4 py-4">
        <DateRangePicker onDateChange={setDateRange} initialDate={dateRange} />
        <Button onClick={handleExport} variant="outline" className="w-full sm:w-auto sm:ml-auto">
          <FileDown className="mr-2 h-4 w-4" />
          Export to Excel
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={columns.length}>
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => router.push(`/dashboard/admin/reports/shipment-profit/${row.original.docId}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No shipments found for the selected criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
       <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
           {/* Space for future actions */}
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                        table.setPageSize(Number(value))
                    }}
                >
                    <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue placeholder={table.getState().pagination.pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {[10, 20, 50, 100, 200, 500, 1000].map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex min-w-[100px] items-center justify-center text-sm font-medium">
              {`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}
