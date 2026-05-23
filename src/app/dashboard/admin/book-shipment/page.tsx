'use client';

import { useEffect } from 'react';
import AdminBookingForm from './admin-booking-form';

export default function AdminBookShipmentPage() {
  useEffect(() => { document.title = 'Book for Customer | County Cargo'; }, []);

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="font-semibold text-lg md:text-2xl">Book for Customer</h1>
        <p className="text-sm text-muted-foreground">Create a shipment on behalf of a customer.</p>
      </div>
      <AdminBookingForm />
    </div>
  );
}
