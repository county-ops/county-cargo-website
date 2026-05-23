

export type UserProfile = {
    uid: string;
    email: string;
    firstname: string;
    lastname: string;
    phone_number: string;
    referrer: string;
    company?: string;
    phone2?: string;
    country?: string;
    created_time: Date | null;
    role: 'Admin' | 'Customer' | 'Staff' | 'Agent' | 'Business'; // Using a union type for role
    apiKey?: string;
    testApiKey?: string;
    webhookUrl?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
}

export type ShipperReceiver = {
    name: string;
    email: string;
    phone: string;
}

export type ShipmentStatus = 'Unpaid' | 'Awaiting Confirmation' | 'Received at Hub' | 'Processing' | 'In Transit' | 'Awaiting Collection' | 'Delivered' | 'Delayed' | 'Cancelled' | 'On Hold';
export type ServiceType = 'expressExport' | 'valueExport' | 'expressImport' | 'valueImport';

export type Package = {
  weight: number;
  length: number;
  width: number;
  height: number;
  description: string;
  value?: number;
  cost?: number; // Cost per package, especially for tiered pricing
  trackingNumber?: string;
}

export type AppliedCharge = {
  name: string;
  amount: number;
};

export type ShipmentCustomer = {
    uid: string;
    firstname: string;
    lastname: string;
    email: string;
    phone_number: string;
};

export type ShipmentCreator = {
    uid: string;
    name: string;
    role: 'Admin' | 'Customer' | 'Staff' | 'Agent' | 'Business';
};

export type Shipment = {
  docId: string; // Firestore document ID
  id: string; // Human-readable shipment ID / trackingid
  userId: string; // Firebase Auth UID
  email: string;
  customer: ShipmentCustomer;
  shipper: ShipperReceiver;
  receiver: ShipperReceiver;
  originAddress: string;
  destinationAddress: string;
  destinationCountryCode?: string;
  shipmentType: 'import' | 'export';
  serviceType: ServiceType;
  units: 'metric' | 'imperial';
  packages: Package[];
  requestPickup?: boolean;
  pickupDate?: Date | null;
  status: ShipmentStatus;
  estimatedDelivery: Date | null; // Corresponds to eta
  bookingDate: Date; // Corresponds to datecreated
  paymentStatus: 'Paid' | 'Unpaid';
  originalCost: string;
  totalCost?: string;
  paymentDate?: Date | null;
  // New fields for detailed pricing
  rate?: number | null;
  billableWeight?: number | null;
  exchangeRate?: number | null;
  handlingFee?: number | null;
  minimumWeightApplied?: boolean;
  minimumWeight?: number | null;
  perPackageCosts?: PackageCost[];
  additionalChargesApplied?: AppliedCharge[];
  isTest?: boolean;
  createdBy?: ShipmentCreator;
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  description: string;
  href?: string;
  createdAt: Date;
  read: boolean;
};

export type PackageCost = {
  cost: number;
  billableWeight: number;
  weightUsed?: 'actual' | 'volumetric';
  description?: string;
};

export type Address = {
    id: string;
    userId: string;
    addressName: string;
    address: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
}

export type Transaction = {
    id: string;
    docId: string;
    date: Date;
    type: 'income' | 'expense' | 'adjustment';
    description: string;
    amount: number;
    shipmentId?: string;
}


export type PackageStatus =
  | 'added'
  | 'verified'
  | 'shipment_created'
  | 'inbound'
  | 'received'
  | 'at_hub'
  | 'invoiced'
  | 'notification_sent'
  | 'paid'
  | 'manifested'
  | 'shipped'
  | 'at_collection'
  | 'ready_for_pickup'
  | 'delivered'
  | 'on_hold';

export type StatusHistoryEntry = {
  status: PackageStatus;
  timestamp: Date;
  updatedBy: { uid: string; name: string };
  note?: string;
};

export type TrackingReceipt = {
  docId: string;
  receiptId: string;          // e.g. RCP-20250428-XXXX
  packageDocId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  trackingNumber: string;
  scannedAt: Date;
  scannedBy: { uid: string; name: string };
  warehouseLocation: string;
  courier?: string;
  statusAtScan: PackageStatus;
  weight?: number;
};

export type PackageReceipt = {
  docId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  trackingNumber?: string;
  location: 'US Warehouse' | 'UK Warehouse' | 'Lagos Warehouse' | 'Out of State';
  region: 'UK' | 'US' | 'NG';
  status: PackageStatus;
  notifiedAt: Date;
  notifiedBy: {
    uid: string;
    name: string;
  };
  qty?: number;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  sender?: string;
  courier?: string;
  courierCode?: string;
  comment?: string;
  photos?: string[]; // Array of photo URLs
  // Fees
  handlingCharge?: number;
  consolidationFee?: number;
  palletFee?: number;
  otherCharges?: AppliedCharge[];
  // Verification
  verificationStatus?: 'pending' | 'verified';
  verifiedAt?: Date | null;
  verifiedBy?: { uid: string; name: string } | null;
  // Shipment assignment
  weeklyShipmentId?: string | null;
  // Invoice
  invoiceStatus?: 'unpaid' | 'paid' | 'on_hold';
  invoiceId?: string | null;
  paymentConfirmedAt?: Date | null;
  // Inbound-specific
  assignedShipment?: string;
  dateReady?: Date | null;
  // Receipt & tracking
  receiptId?: string | null;
  collectionPoint?: string | null;
  statusHistory?: StatusHistoryEntry[];
  // ── Visibility & notification gate ────────────────────────────────────────
  /** True only after staff has verified the package details. Required before email. */
  verified?: boolean;
  /** Controls dashboard visibility — must be true before customer can see the package. */
  visibleToCustomer?: boolean;
  /** True after the customer notification email has been successfully sent. */
  notificationSent?: boolean;
  notifiedCustomer?: boolean;
  notificationStatus?: string;
  /** Timestamp of when the notification email was sent. */
  notificationSentAt?: Date | null;
  /** Staff member who created this package record. */
  createdByStaff?: { uid: string; name: string };
  /** Last updated timestamp. */
  updatedAt?: Date | null;
};

export type WeeklyShipmentVerificationStatus = 'pending' | 'verified';
export type WeeklyShipmentNotificationStatus = 'pending' | 'sent';

export type WeeklyShipment = {
  docId: string;
  shipmentId: string;           // e.g. "WK-2025-W18"
  weekStart: Date;              // Friday 00:00 UK
  cutoffDate: Date;             // Thursday 23:59 UK
  location: string;             // e.g. "UK Warehouse"
  packageCount: number;
  totalWeight: number;
  packageDocIds: string[];
  createdAutomatically: boolean;
  verificationStatus: WeeklyShipmentVerificationStatus;
  notificationStatus: WeeklyShipmentNotificationStatus;
  createdAt: Date;
  verifiedAt?: Date | null;
  verifiedBy?: { uid: string; name: string } | null;
};


export type InvoiceStatus =
  | 'draft'
  | 'generated'
  | 'pending_verification'
  | 'ready_to_send'
  | 'sent'
  | 'paid'
  | 'overdue'
  | 'cancelled';

export type PaymentStatus = 'unpaid' | 'part_paid' | 'paid';

export type Invoice = {
  docId: string;
  invoiceId: string;
  invoiceDate: Date;
  dueDate?: Date | null;
  // Customer
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  // Package
  packageDocId: string;
  trackingNumber?: string;
  courier?: string;
  location?: string;
  description?: string;
  // Shipment
  weeklyShipmentId: string;
  shipmentId: string;
  shipmentWeek?: string;
  // Pricing
  weight?: number;
  rate?: number;
  handlingFee?: number;
  deliveryFee?: number;
  deliveryLocation?: string;
  storageFee?: number;
  pendingCardFee?: number;
  pickupRequired?: boolean;
  pickupFee?: number;
  pickupLocation?: string;
  additionalLineItems?: { label: string; amount: number }[];
  discount?: number;
  subtotal?: number;
  amount: number; // Grand total
  currency: string;
  exchangeRate?: number; // Added for conversion (e.g. GBP to USD)
  convertedAmount?: number; // Calculated total in target currency
  // Status
  status: InvoiceStatus;
  paymentStatus: PaymentStatus;
  // Meta
  notes?: string;
  termsAndConditions?: string;
  createdAt: Date;
  sentAt?: Date | null;
  paidAt?: Date | null;
};
