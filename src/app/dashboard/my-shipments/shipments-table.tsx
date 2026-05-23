

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
  ExpandedState,
  getExpandedRowModel,
  FilterFn,
} from '@tanstack/react-table'
import { MoreHorizontal, Workflow, Loader2, FileText, CheckCircle, PauseCircle, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Banknote, ChevronDown, ChevronRight as ChevronRightIcon, Trash, XCircle, History } from 'lucide-react'
import { format } from 'date-fns'
import NProgress from 'nprogress';

import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
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
import { Shipment, ShipmentStatus } from '@/lib/types'
import { ShipmentStatusBadge } from '@/components/shipment-status-badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'
import { useProfile } from '@/components/profile-provider'
import { formatAddress, cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { updateShipmentStatuses, updateShipmentsAsPaid, deleteShipment, bulkDeleteShipments } from '@/lib/user-actions'
import { toast } from '@/hooks/use-toast'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Label } from '@/components/ui/label'
import { ShipmentDetails } from '@/components/shipment-details'

const DateCell = ({ date }: { date: Date | string | null }) => {
  const [formattedDate, setFormattedDate] = React.useState('');
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    if (date) {
      setFormattedDate(format(new Date(date), 'MMM dd, yyyy'));
    } else {
      setFormattedDate('Pending');
    }
  }, [date]);

  if (!isClient) {
    return null; 
  }

  return <div>{formattedDate}</div>;
};

const getColumns = (
    isAdmin: boolean,
    isStaff: boolean,
    navigate: (path: string) => void, 
    handleSingleUpdate: (docId: string, status: ShipmentStatus) => void, 
    handleMarkAsPaid: (docId: string) => void,
    handleOpenDeleteDialog: (shipment: Shipment) => void,
): ColumnDef<Shipment>[] => [
    {
        id: "select",
        header: ({ table }) => (
            (isAdmin || isStaff) ? (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ) : null
        ),
        cell: ({ row }) => (
           (isAdmin || isStaff) ? (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    onClick={(e) => e.stopPropagation()}
                />
           ) : null
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
      id: 'expander',
      header: () => null,
      cell: ({ row }) => {
        return (
          <ChevronRightIcon
            className={cn('h-4 w-4 transition-transform duration-200', row.getIsExpanded() && 'rotate-90')}
          />
        )
      },
    },
  {
    accessorKey: 'id',
    header: 'Shipment ID',
    cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'shipper',
    header: 'Shipper',
    cell: ({ row }) => {
        const shipment = row.original;
        return <div>{shipment.shipper?.name || 'N/A'}</div>;
    },
  },
  {
    accessorKey: 'destinationAddress',
    header: 'Destination',
    cell: ({ row }) => {
      const shipment = row.original;
      return <div>{formatAddress(shipment.destinationAddress, shipment.destinationCountryCode)}</div>;
    },
  },
  {
    accessorKey: 'bookingDate',
    header: 'Booking Date',
    cell: ({ row }) => <DateCell date={row.getValue('bookingDate')} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <ShipmentStatusBadge status={row.getValue('status')} />,
  },
  {
    accessorKey: 'estimatedDelivery',
    header: 'ETA',
    cell: ({ row }) => <DateCell date={row.getValue('estimatedDelivery')} />,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const shipment = row.original;
      const statuses: ShipmentStatus[] = ["Unpaid", "Awaiting Confirmation", "Received at Hub", "Processing", "In Transit", "Awaiting Collection", "On Hold", "Delivered", "Delayed", "Cancelled"];
      
      const isExport = shipment.shipmentType === 'export';
      const isUKImport = shipment.shipmentType === 'import' && shipment.originAddress.includes('United Kingdom');
      const isEligibleForHold = isExport || isUKImport;
      
      const canBePlacedOnHold = isEligibleForHold && ['Unpaid', 'Awaiting Confirmation', 'Received at Hub', 'Processing'].includes(shipment.status);
      const canBeMarkedAsPaid = (isAdmin || isStaff) && shipment.paymentStatus === 'Unpaid';
      const canBeCancelled = (isAdmin || isStaff) && shipment.status !== 'Cancelled';

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" data-radix-dropdown-menu-trigger>
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {(isAdmin || isStaff) ? (
              <>
                <DropdownMenuItem onClick={() => navigate(`/dashboard/admin/bookings/${shipment.docId}`)}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>View/Edit Details</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/dashboard/my-shipments/${shipment.docId}`)}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>View Invoice</span>
                </DropdownMenuItem>
                {canBeMarkedAsPaid && (
                  <DropdownMenuItem onClick={() => handleMarkAsPaid(shipment.docId)}>
                    <Banknote className="mr-2 h-4 w-4" />
                    <span>Mark as Paid</span>
                  </DropdownMenuItem>
                )}
              </>
            ) : (
                 <DropdownMenuItem onClick={() => navigate(`/dashboard/my-shipments/${shipment.docId}`)}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>View Invoice</span>
                 </DropdownMenuItem>
            )}

             {(isAdmin || isStaff) ? (
                <>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Workflow className="mr-2 h-4 w-4" />
                        <span>Update Status</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                             {statuses.map(status => (
                                <DropdownMenuItem key={status} onClick={() => handleSingleUpdate(shipment.docId, status)} disabled={status === 'Cancelled' && !isAdmin}>
                                    {shipment.status === status ? (
                                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                                    ) : (
                                        <div className="mr-2 h-4 w-4" /> // Placeholder for alignment
                                    )}
                                    <span>{status}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                </>
             ) : (
                 <>
                    {canBePlacedOnHold && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleSingleUpdate(shipment.docId, 'On Hold')}>
                                <PauseCircle className="mr-2 h-4 w-4" />
                                <span>Place on Hold</span>
                            </DropdownMenuItem>
                        </>
                    )}
                 </>
             )}
            {isAdmin && (
                <>
                    <DropdownMenuSeparator />
                     <DropdownMenuItem onSelect={() => handleOpenDeleteDialog(shipment)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete Record</span>
                    </DropdownMenuItem>
                </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];

interface ShipmentsTableProps {
  shipments: Shipment[];
  loading: boolean;
}

export default function ShipmentsTable({ shipments, loading }: ShipmentsTableProps) {
  const [data, setData] = React.useState<Shipment[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [isBulkUpdating, setIsBulkUpdating] = React.useState(false);
  const [isSingleUpdating, setIsSingleUpdating] = React.useState(false);
  const [newBulkStatus, setNewBulkStatus] = React.useState<ShipmentStatus | ''>('');
  const [expanded, setExpanded] = React.useState<ExpandedState>({})
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [shipmentToDelete, setShipmentToDelete] = React.useState<Shipment | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = React.useState(false);
  
  const router = useRouter();
  const { profile } = useProfile();
  
  const isAdmin = profile?.role === 'Admin';
  const isStaff = profile?.role === 'Staff';
  const isAdminOrStaff = isAdmin || isStaff;
  const showShipperColumn = isAdminOrStaff;
  
  const navigate = React.useCallback((path: string) => {
    NProgress.start();
    router.push(path);
  }, [router]);

  const handleOpenDeleteDialog = React.useCallback((shipment: Shipment) => {
    setShipmentToDelete(shipment);
  }, []);
  
  const handleDeleteShipment = async () => {
    if (!shipmentToDelete) return;
    setIsDeleting(true);
    try {
        await deleteShipment(shipmentToDelete.docId);
        toast({
            title: "Shipment Deleted",
            description: `Shipment ${shipmentToDelete.id} has been permanently deleted.`,
        });
        setShipmentToDelete(null);
    } catch (error) {
        console.error("Failed to delete shipment:", error);
        toast({
            variant: "destructive",
            title: "Delete Failed",
            description: "Could not delete shipment record. Please try again.",
        });
    } finally {
        setIsDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    setIsBulkDeleting(true);
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const shipmentIds = selectedRows.map(row => row.original.docId);

    try {
      await bulkDeleteShipments(shipmentIds);
      toast({
        title: 'Shipments Deleted',
        description: `${shipmentIds.length} shipments have been permanently deleted.`,
      });
      table.resetRowSelection();
    } catch (error) {
      console.error('Bulk delete error:', error);
      toast({ variant: 'destructive', title: 'Delete Failed', description: 'Could not delete selected shipments.' });
    } finally {
      setIsBulkDeleting(false);
    }
  };
  
  const handleSingleUpdate = React.useCallback(async (docId: string, status: ShipmentStatus) => {
    setIsSingleUpdating(true);
    try {
      await updateShipmentStatuses([docId], status);
      toast({
        title: 'Shipment Updated',
        description: `The shipment has been updated to "${status}".`,
      });
      // Data will refresh via onSnapshot
    } catch (error) {
      console.error('Single update error:', error);
      toast({ variant: 'destructive', title: 'Update Failed', description: 'Could not update shipment.' });
    } finally {
      setIsSingleUpdating(false);
    }
  }, []);

  const handleMarkAsPaid = React.useCallback(async (docId: string) => {
    setIsSingleUpdating(true);
    try {
      await updateShipmentsAsPaid([docId]);
      toast({
        title: 'Payment Confirmed',
        description: `Payment has been confirmed for the shipment.`,
      });
    } catch (error) {
        console.error('Single payment update error:', error);
        toast({ variant: 'destructive', title: 'Update Failed', description: 'Could not update payments.' });
    } finally {
      setIsSingleUpdating(false);
    }
  }, []);

  const columns = React.useMemo(() => {
    return getColumns(isAdmin, isStaff, navigate, handleSingleUpdate, handleMarkAsPaid, handleOpenDeleteDialog);
  }, [isAdmin, isStaff, navigate, handleSingleUpdate, handleMarkAsPaid, handleOpenDeleteDialog]);
  
  React.useEffect(() => {
    setData(shipments);
  }, [shipments]);

  const globalFilterFn: FilterFn<Shipment> = (row, columnId, filterValue) => {
    const search = filterValue.toLowerCase();
    const shipment = row.original;
    
    const shipper = shipment.shipper?.name?.toLowerCase() ?? '';
    const receiver = shipment.receiver?.name?.toLowerCase() ?? '';
    const destination = shipment.destinationAddress?.toLowerCase() ?? '';
    const shipmentId = shipment.id.toLowerCase();
    
    const hasMatchingPackageTracking = shipment.packages?.some(pkg => 
        pkg.trackingNumber?.toLowerCase().includes(search)
    ) ?? false;

    return shipper.includes(search) || 
           receiver.includes(search) || 
           destination.includes(search) ||
           shipmentId.includes(search) ||
           hasMatchingPackageTracking;
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
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getRowCanExpand: () => true,
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: globalFilterFn,
    initialState: {
        columnVisibility: {
            select: isAdminOrStaff,
            shipper: showShipperColumn
        },
        pagination: {
            pageSize: 100,
        }
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
      globalFilter,
    },
  });
  
  React.useEffect(() => {
    table.setColumnVisibility({ select: isAdminOrStaff, shipper: showShipperColumn });
  }, [isAdminOrStaff, showShipperColumn, table]);


  const handleBulkStatusUpdate = async () => {
    if (!newBulkStatus) {
      toast({ variant: 'destructive', title: 'No Status Selected', description: 'Please select a status to apply.' });
      return;
    }
    setIsBulkUpdating(true);
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const shipmentIds = selectedRows.map(row => row.original.docId);

    try {
      await updateShipmentStatuses(shipmentIds, newBulkStatus);
      toast({
        title: 'Shipments Updated',
        description: `${shipmentIds.length} shipments have been updated to "${newBulkStatus}".`,
      });
      table.resetRowSelection(); // Clear selection after update
      // The `onSnapshot` listener in the parent page will automatically refresh the data
    } catch (error) {
      console.error('Bulk update error:', error);
      toast({ variant: 'destructive', title: 'Update Failed', description: 'Could not update shipments.' });
    } finally {
      setIsBulkUpdating(false);
      setNewBulkStatus('');
    }
  };
  
  const handleBulkPaymentUpdate = async () => {
    setIsBulkUpdating(true);
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const shipmentIds = selectedRows.map(row => row.original.docId);

    try {
        await updateShipmentsAsPaid(shipmentIds);
        toast({
            title: 'Payments Confirmed',
            description: `Payment has been confirmed for ${shipmentIds.length} shipments.`,
        });
        table.resetRowSelection();
    } catch (error) {
        console.error('Bulk payment update error:', error);
        toast({ variant: 'destructive', title: 'Update Failed', description: 'Could not update payments.' });
    } finally {
        setIsBulkUpdating(false);
    }
  };


  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center gap-4 py-4">
        <Input
          placeholder="Filter by ID, destination, name, or tracking no..."
          value={globalFilter ?? ''}
          onChange={(event) =>
            setGlobalFilter(event.target.value)
          }
          className="w-full sm:max-w-sm"
        />
        <Select
          value={(table.getColumn('status')?.getFilterValue() as string) ?? 'all'}
          onValueChange={(value) => {
            const filterValue = value === 'all' ? '' : value;
            table.getColumn('status')?.setFilterValue(filterValue);
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Unpaid">Unpaid</SelectItem>
            <SelectItem value="Awaiting Confirmation">Awaiting Confirmation</SelectItem>
            <SelectItem value="Received at Hub">Received at Hub</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="In Transit">In Transit</SelectItem>
            <SelectItem value="Awaiting Collection">Awaiting Collection</SelectItem>
            <SelectItem value="On Hold">On Hold</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Delayed">Delayed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
         {isAdminOrStaff && table.getFilteredSelectedRowModel().rows.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                    <Workflow className="mr-2 h-4 w-4" />
                    Bulk Actions ({table.getFilteredSelectedRowModel().rows.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Banknote className="mr-2 h-4 w-4" />
                      Mark as Paid
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Payment Update</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will mark {table.getFilteredSelectedRowModel().rows.length} shipments as "Paid" and notify the customers. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleBulkPaymentUpdate} disabled={isBulkUpdating}>
                        {isBulkUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Workflow className="mr-2 h-4 w-4" />
                      Update Status
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Update Shipment Status</AlertDialogTitle>
                        <AlertDialogDescription>
                            Select a new status to apply to the {table.getFilteredSelectedRowModel().rows.length} selected shipments. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                New Status
                            </Label>
                            <Select onValueChange={(value) => setNewBulkStatus(value as ShipmentStatus)}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Received at Hub">Received at Hub</SelectItem>
                                    <SelectItem value="Processing">Processing</SelectItem>
                                    <SelectItem value="In Transit">In Transit</SelectItem>
                                    <SelectItem value="Awaiting Collection">Awaiting Collection</SelectItem>
                                    <SelectItem value="On Hold">On Hold</SelectItem>
                                    <SelectItem value="Delivered">Delivered</SelectItem>
                                    <SelectItem value="Delayed">Delayed</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleBulkStatusUpdate} disabled={isBulkUpdating || !newBulkStatus}>
                            {isBulkUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Apply Status
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
               {isAdmin && (
                    <>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete Selected
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete {table.getFilteredSelectedRowModel().rows.length} shipment records. This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        className={buttonVariants({ variant: "destructive" })}
                                        onClick={handleBulkDelete}
                                        disabled={isBulkDeleting}
                                    >
                                        {isBulkDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Delete Shipments
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
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
                  <TableCell colSpan={columns.length}>
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
                            if (target.closest('[role="checkbox"]') || target.closest('[data-radix-dropdown-menu-trigger]')) {
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
                                <ShipmentDetails shipment={row.original} isAdminOrStaff={isAdminOrStaff} />
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
                    <History className="h-12 w-12 text-blue-600" />
                    <p className="font-black text-blue-950 text-xl tracking-tight">No records found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
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
              {`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()} (${table.getFilteredRowModel().rows.length} shipments)`}
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
      <AlertDialog open={!!shipmentToDelete} onOpenChange={(open) => !open && setShipmentToDelete(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the shipment record for ID <span className="font-bold">{shipmentToDelete?.id}</span> from the database.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    className={buttonVariants({ variant: "destructive" })}
                    onClick={handleDeleteShipment}
                    disabled={isDeleting}
                >
                    {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </div>
  )
}
