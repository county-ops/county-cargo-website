
'use client'

import { Bell, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet"
import { useProfile } from "@/components/profile-provider"
import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, query, where, onSnapshot, orderBy, Timestamp, writeBatch, getDocs, doc, updateDoc } from "firebase/firestore"
import { type Notification } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ScrollArea } from "./ui/scroll-area"

export function NotificationsPanel() {
    const { user } = useProfile();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!user) return;

        setLoading(true);
        const q = query(
            collection(db, 'notifications'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const notifs = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: (data.createdAt as Timestamp).toDate(),
                } as Notification;
            });
            setNotifications(notifs);
            setUnreadCount(notifs.filter(n => !n.read).length);
            setLoading(false);
        }, (error) => {
            // This will catch the permission error if the index is missing
            console.error("Error fetching notifications:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const handleMarkAllAsRead = async () => {
        if (!user || unreadCount === 0) return;

        const q = query(
            collection(db, 'notifications'),
            where('userId', '==', user.uid),
            where('read', '==', false)
        );
        const snapshot = await getDocs(q);
        const batch = writeBatch(db);
        snapshot.docs.forEach(doc => {
            batch.update(doc.ref, { read: true });
        });
        await batch.commit();
    };

    const handleNotificationClick = async (notificationId: string) => {
        // Mark as read in Firestore
        const notifRef = doc(db, 'notifications', notificationId);
        await updateDoc(notifRef, { read: true });

        // Close the panel
        setIsOpen(false);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9 hover:bg-transparent">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white border-2 border-background">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col p-0">
                <SheetHeader className="p-6 border-b">
                    <SheetTitle>Notifications</SheetTitle>
                    <SheetDescription>
                        Recent updates about your shipments and account.
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="flex-1">
                    {loading ? (
                        <div className="flex h-full items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : notifications.length > 0 ? (
                        <div className="divide-y">
                            {notifications.map(notif => (
                                <div key={notif.id} className={cn(!notif.read && "bg-muted")}>
                                    <Link 
                                        href={notif.href || '#'} 
                                        className="block p-4"
                                        onClick={() => handleNotificationClick(notif.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold">{notif.title}</p>
                                            {!notif.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{notif.description}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {formatDistanceToNow(notif.createdAt, { addSuffix: true })}
                                        </p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                            <Bell className="h-12 w-12 text-muted-foreground" />
                            <p className="mt-4 font-semibold">No Notifications</p>
                            <p className="text-sm text-muted-foreground">You're all caught up!</p>
                        </div>
                    )}
                </ScrollArea>
                <SheetFooter className="p-4 border-t">
                    <Button 
                        variant="link" 
                        onClick={handleMarkAllAsRead} 
                        disabled={unreadCount === 0}
                        className="w-full"
                    >
                        Mark all as read
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
