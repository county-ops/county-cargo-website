
'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
  ExpandedState,
  getExpandedRowModel,
} from '@tanstack/react-table'
import { MoreHorizontal, Edit, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileDown, Eye, Users } from 'lucide-react'
import { format } from 'date-fns'
import NProgress from 'nprogress';
import * as XLSX from 'xlsx';

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { UserProfile } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'
import { useProfile } from '@/components/profile-provider'
import { cn } from '@/lib/utils'
import { UserDetails } from '@/components/user-details'

const DateCell = ({ date }: { date: Date | string | null }) => {
  const [formattedDate, setFormattedDate] = React.useState('');
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
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

  if (!isClient) {
    return null; 
  }

  return <span>{formattedDate}</span>;
};

const getColumns = (isStaff: boolean, navigate: (path: string) => void): ColumnDef<UserProfile>[] => [
  {
    id: 'expander',
    header: () => null,
    cell: ({ row }) => {
      return (
        <ChevronRight
          className={cn('h-4 w-4 transition-transform duration-200', row.getIsExpanded() && 'rotate-90')}
        />
      )
    },
  },
  {
    accessorKey: 'firstname',
    header: 'Full Name',
    cell: ({ row }) => {
        const user = row.original;
        return (
            <div className="font-medium capitalize">
                {user.firstname} {user.lastname}
            </div>
        );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'country',
    header: 'Country',
    cell: ({ row }) => <div className="capitalize">{row.getValue('country')}</div>,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
        const role = row.getValue('role') as string;
        let variant: "destructive" | "secondary" | "outline" | "default" = 'outline';
        if (role === 'Admin') variant = 'destructive';
        else if (role === 'Staff') variant = 'secondary';
        else if (role === 'Agent' || role === 'Business') variant = 'default';

        return (
            <Badge variant={variant} className="capitalize">
                {role}
            </Badge>
        );
    },
  },
  {
    accessorKey: 'created_time',
    header: 'Date Joined',
    cell: ({ row }) => <DateCell date={row.getValue('created_time')} />,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      const actionText = isStaff ? "View User" : "View / Edit User";

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigate(`/dashboard/admin/users/${user.uid}`)}>
                <Eye className="mr-2 h-4 w-4" />
                <span>{actionText}</span>
             </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];

interface UsersTableProps {
  data: UserProfile[];
  loading: boolean;
}

export default function UsersTable({ data, loading }: UsersTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [expanded, setExpanded] = React.useState<ExpandedState>({})
  const router = useRouter();
  const { profile } = useProfile();

  const isStaff = profile?.role === 'Staff';
  
  const navigate = React.useCallback((path: string) => {
    NProgress.start();
    router.push(path);
  }, [router]);
  
  const columns = React.useMemo(() => getColumns(isStaff, navigate), [isStaff, navigate]);

  const globalFilterFn: FilterFn<UserProfile> = (row, columnId, filterValue) => {
    const search = filterValue.toLowerCase();
    const user = row.original;
    
    const fullname = `${user.firstname || ''} ${user.lastname || ''}`.toLowerCase();
    const email = user.email?.toLowerCase() ?? '';
    
    return fullname.includes(search) || email.includes(search);
  };


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: globalFilterFn,
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
    initialState: {
        pagination: {
            pageSize: 100,
        },
    },
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
      expanded,
    },
  });

  const handleExport = () => {
    const exportData = data.map(user => ({
      'Full Name': `${user.firstname} ${user.lastname}`,
      'Email': user.email,
      'Phone Number': user.phone_number,
      '2nd Phone Number': user.phone2 || '',
      'Date Joined': user.created_time ? format(new Date(user.created_time), 'yyyy-MM-dd') : 'N/A'
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "UsersExport.xlsx");
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center gap-4 py-4">
        <Input
          placeholder="Filter by name or email..."
          value={globalFilter ?? ''}
          onChange={(event) =>
            setGlobalFilter(event.target.value)
          }
          className="w-full sm:max-w-sm"
        />
        <Select
          value={(table.getColumn('role')?.getFilterValue() as string) ?? 'all'}
          onValueChange={(value) => {
            const filterValue = value === 'all' ? '' : value;
            table.getColumn('role')?.setFilterValue(filterValue);
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Customer">Customer</SelectItem>
            <SelectItem value="Agent">Agent</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
            <SelectItem value="Staff">Staff</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleExport} variant="outline" className="w-full sm:w-auto sm:ml-auto">
          <FileDown className="mr-2 h-4 w-4" />
          Export to Excel
        </Button>
      </div>
      <div className="rounded-2xl border-2 border-blue-100 shadow-sm overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-blue-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-blue-200 border-b-2">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-black text-blue-950 py-5 uppercase tracking-tighter text-xs">
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
              Array.from({ length: table.getState().pagination.pageSize }).map((_, i) => (
                <TableRow key={i} className="border-blue-50">
                  <TableCell colSpan={columns.length} className="py-4">
                    <Skeleton className="h-12 w-full rounded-xl bg-blue-50/50" />
                  </TableCell>
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                    <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                        className="cursor-pointer hover:bg-blue-50/30 border-blue-100 border-b transition-colors group"
                        onClick={(e) => {
                            const target = e.target as HTMLElement;
                            if (target.closest('[data-radix-dropdown-menu-trigger]')) {
                                return;
                            }
                            row.toggleExpanded();
                        }}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="py-4 font-medium text-slate-700">
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                    {row.getIsExpanded() && (
                        <TableRow className="bg-blue-50/50 hover:bg-blue-50/60 border-blue-200/50 border-b-2">
                            <TableCell colSpan={row.getVisibleCells().length} className="p-0 border-t-0">
                                <div className="p-8 border-l-8 border-blue-600 bg-white shadow-inner">
                                    <UserDetails user={row.original} />
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-48 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-4 opacity-20">
                    <Users className="h-12 w-12 text-blue-600" />
                    <p className="font-black text-blue-950 text-xl tracking-tight">No users found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
           {/* Space for future actions like "X selected" */}
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
              {`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()} (${table.getFilteredRowModel().rows.length} users)`}
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
