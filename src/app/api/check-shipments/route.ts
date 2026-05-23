import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

export async function GET() {
  try {
    const q = query(collection(db, 'shipments'), orderBy('bookingDate', 'desc'), limit(1));
    const snap = await getDocs(q);
    const data = snap.docs.map(doc => doc.data());
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}
