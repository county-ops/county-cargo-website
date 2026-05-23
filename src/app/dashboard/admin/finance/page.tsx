
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Banknote, Loader2, PlusCircle, ArrowUp, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Transaction } from "@/lib/types";
import { collection, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import TransactionsTable from "./transactions-table";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function FinancePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ cashIn: 0, cashOut: 0, balance: 0 });

  useEffect(() => {
    document.title = "Finance | County Cargo";
    
    setLoading(true);
    const q = query(collection(db, 'transactions'), orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let totalCashIn = 0;
      let totalCashOut = 0;
      
      const transactionsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const amount = data.amount || 0;

        if (data.type === 'income') {
          totalCashIn += amount;
        } else if (data.type === 'expense') {
          totalCashOut += amount;
        }

        return {
          ...data,
          docId: doc.id,
          date: data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date),
        } as Transaction;
      });

      setTransactions(transactionsData);
      setSummary({
        cashIn: totalCashIn,
        cashOut: totalCashOut,
        balance: totalCashIn - totalCashOut,
      });
      setLoading(false);
    }, (error) => {
      console.error("Error fetching transactions: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
            <h1 className="font-semibold text-lg md:text-2xl">Cash Flow</h1>
            <Button asChild>
              <Link href="/dashboard/admin/finance/add">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Transaction
              </Link>
            </Button>
        </div>
        
        {loading ? (
            <div className="grid gap-4 md:grid-cols-3">
                <Card><CardHeader><CardTitle>Loading...</CardTitle></CardHeader><CardContent><Loader2 className="h-6 w-6 animate-spin" /></CardContent></Card>
                <Card><CardHeader><CardTitle>Loading...</CardTitle></CardHeader><CardContent><Loader2 className="h-6 w-6 animate-spin" /></CardContent></Card>
                <Card><CardHeader><CardTitle>Loading...</CardTitle></CardHeader><CardContent><Loader2 className="h-6 w-6 animate-spin" /></CardContent></Card>
            </div>
        ) : (
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Cash In</CardTitle>
                        <ArrowUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(summary.cashIn)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                        <ArrowDown className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-destructive">
                           ({new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(summary.cashOut)})
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cash at Hand</CardTitle>
                        <Banknote className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className={cn("text-2xl font-bold", summary.balance < 0 ? "text-destructive" : "text-foreground")}>
                           {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(summary.balance)}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )}
        
        <TransactionsTable data={transactions} loading={loading} />
    </div>
  )
}
