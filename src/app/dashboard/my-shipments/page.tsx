
'use client';
import { useEffect, useState } from 'react';
import ShipmentsTable from "./shipments-table";
import { collection, onSnapshot, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Shipment } from '@/lib/types';
import { useProfile } from '@/components/profile-provider';

export default function MyShipmentsPage() {
  const { user, profileLoading } = useProfile();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Shipments | County Cargo";
    if (profileLoading || !user) {
      setLoading(profileLoading);
      return;
    }

    setLoading(true);
    const q = query(
      collection(db, 'shipments'), 
      where('userId', '==', user.uid),
      orderBy('bookingDate', 'desc')
    );

    let unsubscribe = () => {};
    const handleSnapshot = (querySnapshot: any) => {
      const shipmentsData = querySnapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          ...data,
          docId: doc.id,
          // Convert Firestore Timestamps to JS Dates
          bookingDate: data.bookingDate instanceof Timestamp ? data.bookingDate.toDate() : new Date(data.bookingDate),
          estimatedDelivery: data.estimatedDelivery instanceof Timestamp ? data.estimatedDelivery.toDate() : (data.estimatedDelivery ? new Date(data.estimatedDelivery) : null),
        } as Shipment;
      });
      // Fallback sort if we end up using a query without orderBy
      shipmentsData.sort((a: any, b: any) => {
          const dateA = a.bookingDate instanceof Date && !isNaN(a.bookingDate.valueOf()) ? a.bookingDate.getTime() : 0;
          const dateB = b.bookingDate instanceof Date && !isNaN(b.bookingDate.valueOf()) ? b.bookingDate.getTime() : 0;
          return dateB - dateA;
      });
      setShipments(shipmentsData);
      setLoading(false);
    };

    unsubscribe = onSnapshot(q, handleSnapshot, (error) => {
      console.warn("Error fetching shipments (needs index), falling back: ", error.message);
      const qFallback = query(collection(db, 'shipments'), where('userId', '==', user.uid));
      unsubscribe = onSnapshot(qFallback, handleSnapshot, (fbError) => {
          console.error("Fallback shipments query failed: ", fbError);
          setLoading(false);
      });
    });

    return () => unsubscribe();
  }, [user, profileLoading]);

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-10 bg-blue-50/10 p-4 md:p-8 lg:p-12 rounded-[2.5rem] border border-blue-200/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
                <h1 className="font-black text-3xl md:text-4xl text-blue-950 tracking-tightest">Shipment History</h1>
                <p className="text-blue-700/70 font-semibold text-sm">Comprehensive record of all your logistic activities.</p>
            </div>
        </div>
        
        <div className="bg-white rounded-[2rem] border-2 border-blue-100 shadow-2xl shadow-blue-50/50 overflow-hidden">
            <div className="p-8 bg-gradient-to-br from-blue-50/50 via-white to-white border-b border-blue-100">
                <h3 className="text-2xl font-black text-blue-950 tracking-tight">All Shipments</h3>
                <p className="text-sm text-blue-700/70 font-semibold uppercase tracking-wider">
                    Browse and filter through your County Cargo shipment database
                </p>
            </div>
            <div className="p-0">
                <ShipmentsTable shipments={shipments} loading={loading} />
            </div>
        </div>
    </div>
  )
}
