
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
import { MoreHorizontal, Edit, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowDown, ArrowUp, ArrowUpDown, FileDown, User, Settings } from 'lucide-react'
import { format } from 'date-fns'
import * as XLSX from 'xlsx';

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Transaction } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'


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

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'date',
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
    cell: ({ row }) => <DateCell date={row.getValue('date')} />,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <div className="font-medium">{row.getValue('description')}</div>,
  },
   {
    accessorKey: 'shipmentId',
    header: 'Shipment ID',
    cell: ({ row }) => row.getValue('shipmentId') || 'N/A',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      const isIncome = type === 'income';
      const isExpense = type === 'expense';
      const isAdjustment = type === 'adjustment';
      
      let badgeColor, icon;
      if (isIncome) {
        badgeColor = "text-green-700 border-green-300 bg-green-50";
        icon = <ArrowUp className="h-3 w-3" />;
      } else if (isExpense) {
        badgeColor = "text-red-700 border-red-300 bg-red-50";
        icon = <ArrowDown className="h-3 w-3" />;
      } else { // Adjustment
        badgeColor = "text-blue-700 border-blue-300 bg-blue-50";
        icon = <Settings className="h-3 w-3" />;
      }
      
      return (
        <Badge
          variant="outline"
          className={badgeColor}
        >
          <div className="flex items-center gap-1">
            {icon}
            <span className="capitalize">{type}</span>
          </div>
        </Badge>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <div className="text-right">
             <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Amount
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]

interface TransactionsTableProps {
  data: Transaction[];
  loading: boolean;
}

export default function TransactionsTable({ data, loading }: TransactionsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'date', desc: true } 
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
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
    const exportData = data.map(txn => ({
      'Date': format(new Date(txn.date), 'yyyy-MM-dd'),
      'Description': txn.description,
      'Type': txn.type,
      'Amount (NGN)': txn.amount,
      'Shipment ID': txn.shipmentId || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "TransactionsExport.xlsx");
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center gap-4 py-4">
        <Input
          placeholder="Filter by description..."
          value={(table.getColumn('description')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('description')?.setFilterValue(event.target.value)
          }
          className="w-full sm:max-w-sm"
        />
        <Select
          value={(table.getColumn('type')?.getFilterValue() as string) ?? 'all'}
          onValueChange={(value) => {
            const filterValue = value === 'all' ? '' : value;
            table.getColumn('type')?.setFilterValue(filterValue);
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="adjustment">Adjustment</SelectItem>
          </SelectContent>
        </Select>
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
                  No transactions found.
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
