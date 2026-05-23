
'use client'

import { useEffect, useState } from "react";
import { UserProfile } from "@/lib/types";
import { getAllUsers } from "@/lib/user-actions";
import { Users, PlusCircle } from "lucide-react";
import UsersTable from "./users-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ManageUsersPage() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "User Management | County Cargo";
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const usersData = await getAllUsers();
                // Custom sort: users without created_time go to the bottom
                const sortedUsers = usersData.sort((a, b) => {
                    const aTime = a.created_time?.getTime();
                    const bTime = b.created_time?.getTime();

                    if (!aTime && !bTime) return 0; // Both are null, keep order
                    if (!aTime) return 1; // a is null, goes to the bottom
                    if (!bTime) return -1; // b is null, goes to the bottom
                    
                    return bTime - aTime; // Sort by date descending for valid dates
                });
                setUsers(sortedUsers);
            } catch (error) {
                console.error("Failed to fetch users:", error);
                // Handle error state in UI
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="font-bold text-2xl md:text-3xl text-blue-950 tracking-tight">User Management</h1>
          <p className="text-sm text-blue-700/70 font-medium">View, manage, and edit user profiles and roles.</p>
        </div>
        <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200">
          <Link href="/dashboard/admin/users/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create User
          </Link>
        </Button>
      </div>
      
      <div className="bg-white rounded-2xl border border-blue-200 shadow-sm overflow-hidden">
        <div className="p-5 md:p-6 bg-gradient-to-r from-blue-50/80 to-white border-b border-blue-100">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg md:text-xl font-bold text-blue-950">All Registered Users</h3>
          </div>
        </div>
        <div className="p-4 md:p-6">
          <UsersTable data={users} loading={loading} />
        </div>
      </div>
    </div>
    );
}
