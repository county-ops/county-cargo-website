
'use server';
/**
 * @fileOverview A service to create a new shipment.
 *
 * - createShipment - A function that handles creating a new shipment.
 * - CreateShipmentInput - The input type for the function.
 * - CreateShipmentOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getShippingEstimate } from './get-shipping-estimate-flow';
import { Shipment, ServiceType, UserProfile, Package, PackageReceipt } from '@/lib/types';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getSettings } from '@/lib/settings';

const packageSchema = z.object({
  weight: z.coerce.number(),
  length: z.coerce.number(),
  width: z.coerce.number(),
  height: z.coerce.number(),
  description: z.string(),
  value: z.coerce.number(),
  trackingNumber: z.string().optional(),
});

const shipperReceiverSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
});

const CreateShipmentInputSchema = z.object({
  originAddress: z.string(),
  destinationAddress: z.string(),
  packages: z.array(packageSchema),
  serviceType: z.custom<ServiceType>(),
  shipper: shipperReceiverSchema,
  receiver: shipperReceiverSchema,
  customer: z.custom<UserProfile>(),
});

export type CreateShipmentInput = z.infer<typeof CreateShipmentInputSchema>;

const CreateShipmentOutputSchema = z.object({
  shipmentId: z.string(),
  totalCost: z.number(),
  status: z.string(),
  paymentStatus: z.string(),
});

export type CreateShipmentOutput = z.infer<typeof CreateShipmentOutputSchema>;

export async function createShipment(input: CreateShipmentInput): Promise<CreateShipmentOutput> {
    return createShipmentFlow(input);
}

const createShipmentFlow = ai.defineFlow(
  {
    name: 'createShipmentFlow',
    inputSchema: CreateShipmentInputSchema,
    outputSchema: CreateShipmentOutputSchema,
  },
  async (input) => {
    const { originAddress, destinationAddress, packages, serviceType, shipper, receiver, customer } = input;

    let shipmentType: 'import' | 'export' = serviceType.toLowerCase().includes('import') ? 'import' : 'export';
    let flowAddress: string;
    let flowDestinationAddress: string | undefined;

    if (shipmentType === 'import') {
        if (/united states|usa/i.test(originAddress)) {
            flowAddress = "United States";
        } else if (/united kingdom|uk/i.test(originAddress)) {
            flowAddress = "United Kingdom";
        } else {
            flowAddress = originAddress;
        }
        flowDestinationAddress = destinationAddress;
    } else {
        flowAddress = destinationAddress;
        flowDestinationAddress = undefined;
    }

    const units = (shipmentType === 'import' && /united states|usa/i.test(originAddress))
        ? 'imperial'
        : 'metric';

    const settings = await getSettings();

    const estimateResult = await getShippingEstimate({
        address: flowAddress,
        destinationAddress: flowDestinationAddress,
        packages: packages,
        units: units,
        shipmentType: shipmentType,
        customer: customer,
        settings: settings,
    });

    const selectedEstimate = estimateResult.estimates?.find(e => e.serviceType === serviceType);

    if (!selectedEstimate || selectedEstimate.estimate === undefined) {
        throw new Error(`Could not get a valid estimate for the selected service: ${serviceType}. ${estimateResult.error || ''}`);
    }

    const finalOriginalCost = Math.round(selectedEstimate.estimate);

    let prefix = "NG";
    if (shipmentType === 'import') {
        if (originAddress.includes("United States")) prefix = "US";
        else if (originAddress.includes("United Kingdom")) prefix = "GB";
    }
    const uniqueId = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;


    const shipmentData: Partial<Shipment> = {
      id: uniqueId,
      userId: customer.uid,
      email: customer.email,
      customer: {
        uid: customer.uid,
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        phone_number: customer.phone_number || '',
      },
      shipper: shipper,
      receiver: receiver,
      originAddress: originAddress,
      destinationAddress: destinationAddress,
      shipmentType,
      serviceType,
      units: units,
      packages,
      bookingDate: serverTimestamp() as any,
      originalCost: finalOriginalCost.toString(),
      rate: selectedEstimate.rate ?? null,
      billableWeight: selectedEstimate.billableWeight ?? null,
      exchangeRate: selectedEstimate.exchangeRate ?? null,
      handlingFee: selectedEstimate.handlingFee ?? null,
      minimumWeightApplied: selectedEstimate.minimumWeightApplied ?? false,
      minimumWeight: selectedEstimate.minimumWeight ?? null,
      additionalChargesApplied: selectedEstimate.additionalCharges ?? [],
      createdBy: {
        uid: customer.uid,
        name: `${customer.firstname} ${customer.lastname}`,
        role: customer.role,
      },
    };

    shipmentData.paymentStatus = 'Unpaid';
    shipmentData.status = 'Unpaid';
    shipmentData.totalCost = finalOriginalCost.toString();
    shipmentData.paymentDate = null;

    await addDoc(collection(db, "shipments"), shipmentData);
    
    let pkgRegion: 'US' | 'UK' | 'NG' = 'NG';
    let pkgLocation: 'US Warehouse' | 'UK Warehouse' | 'Lagos Warehouse' | 'Out of State' = 'Lagos Warehouse';

    if (shipmentType === 'import') {
        if (/united states|usa/i.test(originAddress)) {
            pkgRegion = 'US';
            pkgLocation = 'US Warehouse';
        } else {
            pkgRegion = 'UK';
            pkgLocation = 'UK Warehouse';
        }
    }

    const packageReceiptPromises = packages.map((pkg, index) => {
        const pkgData: Record<string, any> = {
            // ── Customer ──────────────────────────────────────────────────
            customerId:    customer.uid,
            customerName:  `${customer.firstname} ${customer.lastname}`,
            customerEmail: customer.email,
            customerPhone: customer.phone_number || '',

            // ── Package ───────────────────────────────────────────────────
            trackingNumber: pkg.trackingNumber || `${uniqueId}-PKG${index + 1}`,
            weight:  pkg.weight,
            length:  pkg.length,
            width:   pkg.width,
            height:  pkg.height,
            comment: pkg.description,
            qty:     1,
            courier: '',
            sender:  shipper.name,

            // ── Location ──────────────────────────────────────────────────
            location: pkgLocation,
            region:   pkgRegion,

            // ── Status — inbound, awaiting staff verification ─────────────
            status:             'inbound',
            verificationStatus: 'pending',
            verified:           false,
            visibleToCustomer:  true,

            // ── Shipment link ─────────────────────────────────────────────
            assignedShipment:  uniqueId,
            weeklyShipmentId:  null,

            // ── Invoice — not yet generated ───────────────────────────────
            invoiceId:     null,
            invoiceStatus: 'unpaid',

            // ── Notification ──────────────────────────────────────────────
            notifiedAt:       serverTimestamp(),
            notifiedCustomer: false,
            notificationSent: false,
            notificationSentAt: null,
            notifiedBy: {
                uid:  customer.uid,
                name: `${customer.firstname} ${customer.lastname}`,
            },

            // ── Source tracking ───────────────────────────────────────────
            source:      'ship.countycargo.com',
            receiptId:   `RCP-${Math.floor(10000 + Math.random() * 90000)}`,

            // ── Meta ──────────────────────────────────────────────────────
            createdAt:  serverTimestamp(),
            updatedAt:  serverTimestamp(),
            statusHistory: [{
                status:    'inbound',
                timestamp: Timestamp.now(),
                updatedBy: { uid: customer.uid, name: `${customer.firstname} ${customer.lastname}` },
                note:      `Package booked via ship.countycargo.com — shipment ${uniqueId}.`,
            }],
        };
        return addDoc(collection(db, 'package_receipts'), pkgData);
    });

    await Promise.all(packageReceiptPromises);
    

    return {
        shipmentId: uniqueId,
        totalCost: parseFloat(shipmentData.totalCost),
        status: shipmentData.status,
        paymentStatus: shipmentData.paymentStatus,
    };
  }
);
