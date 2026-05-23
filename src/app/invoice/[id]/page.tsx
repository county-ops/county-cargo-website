
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Shipment, UserProfile, Package as PackageType, PackageCost } from '@/lib/types';
import { format } from 'date-fns';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Download, User, Mail, Calendar, MapPin, PlaneTakeoff, PlaneLanding, Scale, Box, FileText, Banknote, Printer, Truck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ShipmentStatusBadge } from '@/components/shipment-status-badge';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getUserProfile } from '@/lib/user-actions';
import { getSettings, AppSettings } from '@/lib/settings';
import { notFound } from 'next/navigation';

const DetailItem = ({ label, value }: { label: string, value: string | React.ReactNode }) => (
    <div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="font-semibold">{value}</div>
    </div>
);

async function getShipmentData(id: string) {
    const docRef = doc(db, 'shipments', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return null;
    }

    const data = docSnap.data();
    const shipmentData = {
        ...data,
        docId: docSnap.id,
        bookingDate: data.bookingDate instanceof Timestamp ? data.bookingDate.toDate() : new Date(data.bookingDate),
        estimatedDelivery: data.estimatedDelivery instanceof Timestamp ? data.estimatedDelivery.toDate() : (data.estimatedDelivery ? new Date(data.estimatedDelivery) : null),
        paymentDate: data.paymentDate instanceof Timestamp ? data.paymentDate.toDate() : (data.paymentDate ? new Date(data.paymentDate) : null),
        pickupDate: data.pickupDate instanceof Timestamp ? data.pickupDate.toDate() : (data.pickupDate ? new Date(data.pickupDate) : null),
    } as Shipment;

    const [customer, settings] = await Promise.all([
        getUserProfile(shipmentData.userId),
        getSettings()
    ]);

    return { shipment: shipmentData, customer, settings };
}


export default async function PublicInvoicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await getShipmentData(id);

    if (!data) {
        notFound();
    }

    const { shipment, customer, settings } = data;
    
    if (!shipment || !customer || !settings) {
        notFound();
    }

    const formatServiceType = (serviceType: string) => {
        if (!serviceType) return 'N/A';
        return serviceType
            .replace(/([A-Z])/g, ' $1') // insert space before capital letters
            .replace(/^./, (str) => str.toUpperCase()); // capitalize the first letter
    };
    
    const isUKImport = shipment.shipmentType === 'import' && shipment.originAddress.includes('United Kingdom');
    const isUSImport = shipment.shipmentType === 'import' && shipment.originAddress.includes('United States');
    const currencySymbol = isUKImport ? '£' : '$';
    const currencyCode = isUKImport ? 'GBP' : 'USD';
    const isExport = shipment.shipmentType === 'export';
    const isValueExport = isExport && shipment.serviceType === 'valueExport';
    const weightUnit = shipment.units === 'imperial' ? 'lb' : 'kg';
    const dimUnit = shipment.units === 'imperial' ? 'in' : 'cm';
    const divisor = shipment.units === 'imperial' ? 139 : 5000;
    
    const calculateVolumetricWeight = (pkg: PackageType) => {
      return (Number(pkg.length) * Number(pkg.width) * Number(pkg.height)) / divisor;
    };
    
    let rate = shipment.rate || 0;
    let hasSpecialItem = false;

    if (isValueExport) {
        const isToUSA = shipment.destinationAddress.toLowerCase().includes('united states');
        const isToUK = shipment.destinationAddress.toLowerCase().includes('united kingdom');
        let specialRate = 0;
        let specialItemsKeywords: string[] = [];

        if (isToUSA && settings.valueExportToUSASpecialItems) {
            specialItemsKeywords = settings.valueExportToUSASpecialItems.toLowerCase().split(',').map(k => k.trim()).filter(k => k);
            specialRate = settings.valueExportToUSASpecialRate;
        } else if (isToUK && settings.valueExportToUKSpecialItems) {
            specialItemsKeywords = settings.valueExportToUKSpecialItems.toLowerCase().split(',').map(k => k.trim()).filter(k => k);
            specialRate = settings.valueExportToUKSpecialRate;
        }

        if (specialRate > 0 && specialItemsKeywords.length > 0) {
            hasSpecialItem = shipment.packages.some(pkg =>
                specialItemsKeywords.some(keyword => pkg.description.toLowerCase().includes(keyword))
            );
        }

        if (hasSpecialItem) {
            rate += specialRate;
        }
    }


    const finalBillableWeight = shipment.billableWeight || 0;
    const billableWeightLabel = shipment.minimumWeightApplied ? "Minimum Weight" : "Total Billable Weight";
    
    const usePerPackageCosts = shipment.serviceType === 'valueImport' && Array.isArray(shipment.perPackageCosts) && shipment.perPackageCosts.length > 0;

    const totalCostNumber = Number(shipment.totalCost) || 0;
    const originalCostNumber = parseFloat(shipment.originalCost) || totalCostNumber;
    const isAdjusted = shipment.paymentStatus === 'Paid' && originalCostNumber !== totalCostNumber;
    
    const balanceDue = originalCostNumber - totalCostNumber;
    
    const handlingFeeNGN = (shipment.handlingFee || 0) * (shipment.exchangeRate || 1);
    const baseCost = originalCostNumber - (shipment.additionalChargesApplied || []).reduce((acc, charge) => acc + charge.amount, 0) - handlingFeeNGN;


    return (
       <div className="printable mx-auto bg-background max-w-3xl p-4 sm:p-8 my-8" id="invoice-content">
            <Card className="shadow-lg rounded-lg">
                <CardHeader className="bg-muted/30 p-6">
                    <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row">
                        <div>
                            <h1 className="text-2xl font-bold text-primary">INVOICE</h1>
                            <p className="break-all text-muted-foreground">{shipment.id}</p>
                        </div>
                        <div className="flex flex-col items-start sm:items-end text-left sm:text-right">
                           <Image src="/logo.png" alt="County Cargo logo" width={120} height={32} style={{ height: 'auto' }} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mb-8">
                        <div>
                            <h3 className="font-semibold mb-2">BILL TO</h3>
                            <p className="capitalize">{customer.company ? customer.company : `${customer.firstname} ${customer.lastname}`}</p>
                            <p className="break-all">{customer.email}</p>
                            <p>{customer.phone_number}</p>
                        </div>
                        <div className="space-y-2 text-left sm:text-right">
                            <DetailItem label="Invoice Date" value={format(shipment.bookingDate, 'PPP')} />
                            <div>
                               <DetailItem label="Payment Status" value={
                                    <Badge 
                                        variant="outline"
                                        className={cn("text-base px-3 py-1", 
                                            shipment.paymentStatus === 'Paid' 
                                            ? "bg-green-100 text-green-800 border-green-200" 
                                            : "bg-gray-100 text-gray-800 border-gray-200"
                                        )}
                                    >
                                        {shipment.paymentStatus}
                                    </Badge>
                               } />
                            </div>
                        </div>
                    </div>
                    
                    <Separator className="my-6" />

                    <div className="mb-8">
                        <h3 className="font-semibold mb-4 text-lg">Shipment Details</h3>
                         <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
                             <div>
                               <DetailItem label="Service" value={formatServiceType(shipment.serviceType)} />
                            </div>
                            {rate > 0 && (!usePerPackageCosts || (usePerPackageCosts && finalBillableWeight > 0)) && (
                                <div>
                                    <DetailItem 
                                        label="Rate" 
                                        value={
                                            isExport 
                                            ? `${new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(rate)} / ${weightUnit}`
                                            : `${new Intl.NumberFormat(isUKImport ? 'en-GB' : 'en-US', { style: 'currency', currency: currencyCode }).format(rate)} / ${weightUnit}`
                                        } 
                                    />
                                </div>
                            )}
                             <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 sm:col-span-2">
                                <div className="space-y-4">
                                   <DetailItem label="Shipper" value={shipment.shipper?.name || 'N/A'} />
                                   <DetailItem label="Origin" value={shipment.originAddress} />
                                </div>
                                <div className="space-y-4">
                                   <DetailItem label="Receiver" value={shipment.receiver?.name || 'N/A'} />
                                   <DetailItem label="Destination" value={shipment.destinationAddress} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <h3 className="font-semibold mb-2 text-lg">Package Information</h3>
                    <div className="overflow-hidden rounded-lg border">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b bg-muted/50">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Declared Value</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actual Weight</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Volume Weight</th>
                                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {usePerPackageCosts ? (
                                        shipment.perPackageCosts!.map((item, index) => (
                                            <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <td className="p-4 align-middle">{item.description}</td>
                                                <td className="p-4 align-middle whitespace-nowrap">N/A</td>
                                                {item.billableWeight > 0 ? (
                                                    <>
                                                      <td className="p-4 align-middle whitespace-nowrap">N/A</td>
                                                      <td className="p-4 align-middle whitespace-nowrap">N/A</td>
                                                    </>
                                                ) : (
                                                    <>
                                                      <td className="p-4 align-middle whitespace-nowrap">N/A</td>
                                                      <td className="p-4 align-middle whitespace-nowrap">N/A</td>
                                                    </>
                                                )}
                                                <td className="p-4 align-middle font-medium text-right whitespace-nowrap">
                                                    {new Intl.NumberFormat(isUKImport ? 'en-GB' : 'en-US', { style: 'currency', currency: currencyCode }).format(item.cost)}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                      shipment.packages.map((pkg, index) => {
                                        const actualWeight = Number(pkg.weight);
                                        const volumetricWeight = calculateVolumetricWeight(pkg);
                                        const isFixedItem = pkg.cost !== undefined && (pkg.weight === 0 || pkg.length === 0);
                                        let formattedAmount: string;

                                        if (shipment.serviceType === 'expressExport') {
                                            formattedAmount = pkg.cost !== undefined
                                                ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(pkg.cost)
                                                : '—';
                                        } else if (isValueExport) {
                                            const billableWeight = Math.ceil(Math.max(actualWeight, volumetricWeight));
                                            
                                            let effectiveRate = shipment.rate || 0;
                                            const isToUSA = shipment.destinationAddress.toLowerCase().includes('united states');
                                            const isToUK = shipment.destinationAddress.toLowerCase().includes('united kingdom');
                                            let specialRate = 0;
                                            let specialItemsKeywords: string[] = [];

                                            if (isToUSA && settings.valueExportToUSASpecialItems) {
                                                specialItemsKeywords = settings.valueExportToUSASpecialItems.toLowerCase().split(',').map(k => k.trim()).filter(k => k);
                                                specialRate = settings.valueExportToUSASpecialRate;
                                            } else if (isToUK && settings.valueExportToUKSpecialItems) {
                                                specialItemsKeywords = settings.valueExportToUKSpecialItems.toLowerCase().split(',').map(k => k.trim()).filter(k => k);
                                                specialRate = settings.valueExportToUKSpecialRate;
                                            }

                                            if (specialRate > 0 && specialItemsKeywords.length > 0) {
                                                const hasKeyword = specialItemsKeywords.some(keyword => pkg.description.toLowerCase().includes(keyword));
                                                if (hasKeyword) {
                                                    effectiveRate += specialRate;
                                                }
                                            }
                                            
                                            const packageCostNGN = billableWeight * effectiveRate;
                                            formattedAmount = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(packageCostNGN);
                                        } else { // Value Imports
                                            if (isFixedItem) {
                                                formattedAmount = new Intl.NumberFormat(isUKImport ? 'en-GB' : 'en-US', { style: 'currency', currency: currencyCode }).format(pkg.cost || 0);
                                            } else {
                                                const billableWeight = Math.ceil(Math.max(actualWeight, volumetricWeight));
                                                const packageCostForeign = billableWeight * (shipment.rate || 0);
                                                formattedAmount = new Intl.NumberFormat(isUKImport ? 'en-GB' : 'en-US', { style: 'currency', currency: currencyCode }).format(packageCostForeign);
                                            }
                                        }
                                        
                                        const showDimensions = volumetricWeight > actualWeight;
                                        
                                        return (
                                          <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                              <td className="p-4 align-middle">{pkg.description}</td>
                                              <td className="p-4 align-middle whitespace-nowrap">{pkg.value ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(pkg.value) : 'N/A'}</td>
                                              {isFixedItem ? (
                                                  <>
                                                      <td className="p-4 align-middle whitespace-nowrap">N/A</td>
                                                      <td className="p-4 align-middle whitespace-nowrap">N/A</td>
                                                  </>
                                              ) : (
                                                  <>
                                                      <td className="p-4 align-middle whitespace-nowrap">{`${actualWeight.toFixed(2)} ${weightUnit}`}</td>
                                                      <td className="p-4 align-middle whitespace-nowrap">
                                                          {`${volumetricWeight.toFixed(2)} ${weightUnit}`}
                                                          {showDimensions && (
                                                              <span className="text-muted-foreground text-xs block">
                                                                  ({pkg.length}x{pkg.width}x{pkg.height} {dimUnit})
                                                              </span>
                                                          )}
                                                      </td>
                                                  </>
                                              )}
                                              <td className="p-4 align-middle font-medium text-right whitespace-nowrap">{formattedAmount}</td>
                                          </tr>
                                        )
                                      })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col-reverse items-start justify-between gap-8 sm:flex-row">
                        <div>
                            {shipment.paymentStatus === 'Unpaid' && (
                                <div className="text-sm space-y-4">
                                    <h3 className="font-semibold mb-2">Payment Details</h3>
                                    <div className="p-4 border rounded-md bg-muted/50 space-y-1">
                                        <p><span className="text-muted-foreground">Bank:</span> Stanbic IBTC</p>
                                        <p><span className="text-muted-foreground">Account Name:</span> County Service Solution</p>
                                        <p><span className="text-muted-foreground">Account:</span> 0001808080</p>
                                    </div>
                                    <p className="mt-2 text-xs text-muted-foreground">NOTE: Payment guarantees shipment.</p>
                                </div>
                            )}
                        </div>

                         <div className="w-full space-y-2 sm:w-auto sm:max-w-xs">
                             {isAdjusted ? (
                                <>
                                  <div className="flex justify-between items-center py-2 border-b gap-4 text-sm">
                                      <span className="text-muted-foreground">New Shipment Cost</span>
                                      <span className="font-semibold whitespace-nowrap">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(originalCostNumber)}</span>
                                  </div>
                                   <div className="flex justify-between items-center py-2 border-b gap-4 text-sm">
                                      <span className="text-muted-foreground">Amount Paid</span>
                                      <span className="font-semibold whitespace-nowrap">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(totalCostNumber)}</span>
                                  </div>
                                </>
                             ) : (
                                <>
                                  {originalCostNumber > 0 && (
                                     <div className="flex justify-between items-center py-2 border-b gap-4 text-sm">
                                          <span className="text-muted-foreground">Shipment Cost</span>
                                          <span className="font-semibold whitespace-nowrap">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(baseCost)}</span>
                                      </div>
                                  )}
                                  
                                  {shipment.handlingFee && shipment.handlingFee > 0 && (
                                     <div className="flex justify-between items-center py-2 border-b gap-4 text-sm">
                                        <span className="text-muted-foreground">Handling Fee</span>
                                        <span className="font-semibold whitespace-nowrap">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(handlingFeeNGN)}</span>
                                     </div>
                                  )}

                                  {shipment.additionalChargesApplied && shipment.additionalChargesApplied.map((charge, index) => (
                                    <div key={index} className="flex justify-between items-center py-2 border-b gap-4 text-sm">
                                        <span className="text-muted-foreground">{charge.name}</span>
                                        <span className="font-semibold whitespace-nowrap">
                                            {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(charge.amount)}
                                        </span>
                                    </div>
                                  ))}

                                </>
                             )}
                            
                             {shipment.minimumWeightApplied && shipment.billableWeight && (
                                <div className="flex justify-between items-center py-2 border-b gap-4 text-sm">
                                    <span className="text-muted-foreground">Billable Weight:</span>
                                    <span className="font-semibold whitespace-nowrap">
                                        {`${shipment.billableWeight} ${weightUnit}`}
                                        <span className="text-xs text-muted-foreground ml-1">(Min.)</span>
                                    </span>
                                </div>
                            )}

                            {shipment.exchangeRate && shipment.shipmentType === 'import' && (
                                <div className="flex justify-between items-center py-2 border-b gap-4 text-sm">
                                    <span className="text-muted-foreground">Exchange Rate:</span>
                                    <span className="font-semibold whitespace-nowrap">
                                        {`₦${shipment.exchangeRate} / ${currencySymbol}1`}
                                    </span>
                                </div>
                            )}

                            <div className="mt-2 flex justify-between items-center rounded-md bg-muted/50 px-2 py-2 text-lg gap-4">
                                <div className="font-bold">
                                    {isAdjusted ? (balanceDue > 0 ? 'Balance Due' : 'Credit') : 'Total'}
                                </div>
                                <div className={cn("font-bold whitespace-nowrap", isAdjusted && balanceDue < 0 ? "text-green-600" : "text-primary")}>
                                    {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(isAdjusted ? Math.abs(balanceDue) : totalCostNumber)}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
