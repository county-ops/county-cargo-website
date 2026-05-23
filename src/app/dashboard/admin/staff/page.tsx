'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { collection, onSnapshot, query, where, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { isValid } from 'date-fns';
import { db } from '@/lib/firebase';
import { UserProfile } from '@/lib/types';
import { useProfile } from '@/components/profile-provider';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ShieldCheck, Users, Package, ClipboardList, Settings, Mail, BarChart2,
  CheckCircle2, XCircle, PlusCircle, Search, Edit2, Check, X, ShieldAlert,
  Truck, FileText, Receipt, Activity, Wrench, Bell, Banknote, UserCog,
  KeyRound, Eye,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// ─── Role definitions ──────────────────────────────────────────────────────────

type RoleKey = 'Admin' | 'Staff' | 'Agent' | 'Business' | 'Customer';

const ROLES: { key: RoleKey; label: string; colour: string; bg: string; border: string; description: string }[] = [
  {
    key: 'Admin',
    label: 'Admin',
    colour: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    description: 'Full system access. Can manage users, pricing, finance, emails, and all operations.',
  },
  {
    key: 'Staff',
    label: 'Staff',
    colour: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    description: 'Operational access. Can log packages, manage users (view only), and process shipments.',
  },
  {
    key: 'Agent',
    label: 'Agent',
    colour: 'text-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    description: 'Limited partner access. Can view and track shipments for their assigned accounts.',
  },
  {
    key: 'Business',
    label: 'Business',
    colour: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    description: 'API & business account. Can use API keys, webhooks, and manage their shipments.',
  },
  {
    key: 'Customer',
    label: 'Customer',
    colour: 'text-slate-700',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    description: 'Standard customer. Can view own packages, shipments, invoices, and tracking.',
  },
];

// ─── Privileges matrix ─────────────────────────────────────────────────────────

const PRIVILEGES = [
  { label: 'View own packages & shipments', icon: Package,        Admin: true,  Staff: true,  Agent: true,  Business: true,  Customer: true  },
  { label: 'Log / scan in packages',        icon: Truck,          Admin: true,  Staff: true,  Agent: false, Business: false, Customer: false },
  { label: 'Manage all shipments',          icon: ClipboardList,  Admin: true,  Staff: true,  Agent: false, Business: false, Customer: false },
  { label: 'Send package notifications',    icon: Bell,           Admin: true,  Staff: true,  Agent: false, Business: false, Customer: false },
  { label: 'View & manage users',           icon: Users,          Admin: true,  Staff: true,  Agent: false, Business: false, Customer: false },
  { label: 'Create / edit user profiles',   icon: UserCog,        Admin: true,  Staff: false, Agent: false, Business: false, Customer: false },
  { label: 'Change user roles',             icon: ShieldCheck,    Admin: true,  Staff: false, Agent: false, Business: false, Customer: false },
  { label: 'Manage pricing',                icon: Wrench,         Admin: true,  Staff: false, Agent: false, Business: false, Customer: false },
  { label: 'Finance & reports',             icon: BarChart2,      Admin: true,  Staff: false, Agent: false, Business: false, Customer: false },
  { label: 'Manage invoices',               icon: Receipt,        Admin: true,  Staff: false, Agent: false, Business: false, Customer: false },
  { label: 'Email & notification settings', icon: Mail,           Admin: true,  Staff: false, Agent: false, Business: false, Customer: false },
  { label: 'API usage & test bed',          icon: Activity,       Admin: true,  Staff: false, Agent: false, Business: false, Customer: false },
  { label: 'Finance management',            icon: Banknote,       Admin: true,  Staff: false, Agent: false, Business: false, Customer: false },
  { label: 'API key access',                icon: KeyRound,       Admin: true,  Staff: false, Agent: false, Business: true,  Customer: false },
  { label: 'System settings',              icon: Settings,       Admin: true,  Staff: false, Agent: false, Business: false, Customer: false },
];

const ROLE_COLS: RoleKey[] = ['Admin', 'Staff', 'Agent', 'Business', 'Customer'];

// ─── Role badge colours ────────────────────────────────────────────────────────

const roleBadge: Record<RoleKey, string> = {
  Admin:    'bg-red-100 text-red-700 border-red-200',
  Staff:    'bg-blue-100 text-blue-700 border-blue-200',
  Agent:    'bg-purple-100 text-purple-700 border-purple-200',
  Business: 'bg-amber-100 text-amber-700 border-amber-200',
  Customer: 'bg-slate-100 text-slate-700 border-slate-200',
};

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function StaffRolesPage() {
  const { profile: currentUser } = useProfile();
  const [staffUsers, setStaffUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingUid, setEditingUid] = useState<string | null>(null);
  const [pendingRole, setPendingRole] = useState<RoleKey | ''>('');
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'staff' | 'privileges'>('staff');

  const isAdmin = currentUser?.role === 'Admin';

  useEffect(() => {
    document.title = 'Staff & Roles | County Cargo';

    // Listen to all non-Customer users
    const q = query(
      collection(db, 'users'),
      where('role', 'in', ['Admin', 'Staff', 'Agent', 'Business'])
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => ({ ...d.data(), uid: d.id } as UserProfile));
      data.sort((a, b) => {
        const order: Record<string, number> = { Admin: 0, Staff: 1, Agent: 2, Business: 3, Customer: 4 };
        return (order[a.role] ?? 9) - (order[b.role] ?? 9);
      });
      setStaffUsers(data);
      setLoading(false);
    }, err => {
      console.error('Staff query error:', err);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleSaveRole = useCallback(async (uid: string) => {
    if (!pendingRole || !isAdmin) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', uid), {
        role: pendingRole,
        updatedAt: Timestamp.now(),
      });
      toast({ title: 'Role updated', description: `User role changed to ${pendingRole}.` });
      setEditingUid(null);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to update role.' });
    } finally {
      setSaving(false);
    }
  }, [pendingRole, isAdmin]);

  const filtered = staffUsers.filter(u => {
    const q = search.toLowerCase();
    return (
      `${u.firstname} ${u.lastname}`.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-8">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-black text-3xl text-blue-950 tracking-tight flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
            Staff & Roles
          </h1>
          <p className="text-blue-700/60 font-medium text-sm">
            Manage your team, assign roles, and review access privileges.
          </p>
        </div>
        {isAdmin && (
          <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 gap-2">
            <Link href="/dashboard/admin/users/create">
              <PlusCircle className="h-4 w-4" />
              Add Staff Member
            </Link>
          </Button>
        )}
      </div>

      {/* ── Role cards overview ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {ROLES.map(role => {
          const count = staffUsers.filter(u => u.role === role.key).length;
          return (
            <Card key={role.key} className={cn('p-5 border-2 rounded-2xl flex flex-col gap-2', role.border, role.bg)}>
              <div className="flex items-center justify-between">
                <span className={cn('text-xs font-black uppercase tracking-widest', role.colour)}>{role.label}</span>
                <span className={cn('text-2xl font-black', role.colour)}>{loading ? '—' : count}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{role.description}</p>
            </Card>
          );
        })}
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-2 border-b border-slate-200 pb-0">
        <button
          onClick={() => setActiveTab('staff')}
          className={cn(
            'px-5 py-3 text-sm font-bold rounded-t-xl transition-all -mb-px border-b-2',
            activeTab === 'staff'
              ? 'border-blue-600 text-blue-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-blue-600'
          )}
        >
          <Users className="inline h-4 w-4 mr-1.5 -mt-0.5" />
          Team Members
        </button>
        <button
          onClick={() => setActiveTab('privileges')}
          className={cn(
            'px-5 py-3 text-sm font-bold rounded-t-xl transition-all -mb-px border-b-2',
            activeTab === 'privileges'
              ? 'border-blue-600 text-blue-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-blue-600'
          )}
        >
          <ShieldAlert className="inline h-4 w-4 mr-1.5 -mt-0.5" />
          Privileges Matrix
        </button>
      </div>

      {/* ── Team Members tab ── */}
      {activeTab === 'staff' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name, email or role..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 rounded-xl border-slate-200"
              />
            </div>
          </div>

          <Card className="rounded-2xl border-2 border-blue-100 shadow-sm overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-blue-100 bg-blue-50/50">
                    <th className="text-left px-6 py-4 font-black text-blue-950 uppercase tracking-tighter text-xs">Name</th>
                    <th className="text-left px-6 py-4 font-black text-blue-950 uppercase tracking-tighter text-xs">Email</th>
                    <th className="text-left px-6 py-4 font-black text-blue-950 uppercase tracking-tighter text-xs">Role</th>
                    <th className="text-left px-6 py-4 font-black text-blue-950 uppercase tracking-tighter text-xs">Joined</th>
                    <th className="text-right px-6 py-4 font-black text-blue-950 uppercase tracking-tighter text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="border-b border-blue-50">
                        <td colSpan={5} className="px-6 py-4">
                          <Skeleton className="h-10 w-full rounded-xl bg-blue-50" />
                        </td>
                      </tr>
                    ))
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center gap-3 opacity-30">
                          <Users className="h-10 w-10 text-blue-400" />
                          <p className="font-black text-blue-950">No staff members found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map(user => {
                      const isEditing = editingUid === user.uid;
                      const isSelf = currentUser?.uid === user.uid;
                      return (
                        <tr key={user.uid} className="border-b border-blue-50 hover:bg-blue-50/30 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                                {user.firstname?.[0]?.toUpperCase()}{user.lastname?.[0]?.toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900">{user.firstname} {user.lastname}</p>
                                {isSelf && <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">You</p>}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-600 font-medium">{user.email}</td>
                          <td className="px-6 py-4">
                            {isEditing ? (
                              <Select
                                value={pendingRole || user.role}
                                onValueChange={v => setPendingRole(v as RoleKey)}
                              >
                                <SelectTrigger className="w-36 h-8 rounded-xl text-xs font-bold">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Customer">Customer</SelectItem>
                                  <SelectItem value="Agent">Agent</SelectItem>
                                  <SelectItem value="Business">Business</SelectItem>
                                  <SelectItem value="Staff">Staff</SelectItem>
                                  <SelectItem value="Admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <Badge className={cn('text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border', roleBadge[user.role as RoleKey] || roleBadge.Customer)}>
                                {user.role}
                              </Badge>
                            )}
                          </td>
                          <td className="px-6 py-4 text-slate-500 font-medium text-xs">
                            {(() => {
                              const raw = user.created_time as any;
                              if (!raw) return 'N/A';
                              // Firestore Timestamp has a .toDate() method
                              const d: Date = typeof raw.toDate === 'function' ? raw.toDate() : new Date(raw);
                              return isValid(d) ? format(d, 'MMM dd, yyyy') : 'N/A';
                            })()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              {isEditing ? (
                                <>
                                  <Button
                                    size="sm"
                                    className="h-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
                                    onClick={() => handleSaveRole(user.uid)}
                                    disabled={saving}
                                  >
                                    <Check className="h-3.5 w-3.5" /> Save
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 rounded-xl text-slate-500 gap-1.5"
                                    onClick={() => { setEditingUid(null); setPendingRole(''); }}
                                  >
                                    <X className="h-3.5 w-3.5" /> Cancel
                                  </Button>
                                </>
                              ) : (
                                <>
                                  {isAdmin && !isSelf && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-8 rounded-xl border-blue-200 text-blue-700 hover:bg-blue-50 gap-1.5"
                                      onClick={() => { setEditingUid(user.uid); setPendingRole(user.role as RoleKey); }}
                                    >
                                      <Edit2 className="h-3.5 w-3.5" /> Change Role
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 rounded-xl text-slate-500 hover:text-blue-700 hover:bg-blue-50 gap-1.5"
                                    asChild
                                  >
                                    <Link href={`/dashboard/admin/users/${user.uid}`}>
                                      <Eye className="h-3.5 w-3.5" /> View
                                    </Link>
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ── Privileges Matrix tab ── */}
      {activeTab === 'privileges' && (
        <Card className="rounded-2xl border-2 border-blue-100 shadow-sm overflow-hidden bg-white">
          <div className="p-6 border-b border-blue-100 bg-blue-50/30">
            <h2 className="font-black text-lg text-blue-950">Role Privileges Matrix</h2>
            <p className="text-sm text-slate-500 mt-1">
              What each role can access across the platform.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-blue-100 bg-blue-50/20">
                  <th className="text-left px-6 py-4 font-black text-blue-950 uppercase tracking-tighter text-xs w-72">Privilege</th>
                  {ROLE_COLS.map(role => (
                    <th key={role} className="text-center px-4 py-4 font-black text-blue-950 uppercase tracking-tighter text-xs">
                      <Badge className={cn('text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border', roleBadge[role])}>
                        {role}
                      </Badge>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRIVILEGES.map((priv, i) => (
                  <tr key={i} className={cn('border-b border-slate-100 transition-colors hover:bg-blue-50/20', i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30')}>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2.5 text-slate-700 font-medium">
                        <priv.icon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                        {priv.label}
                      </div>
                    </td>
                    {ROLE_COLS.map(role => (
                      <td key={role} className="text-center px-4 py-3.5">
                        {priv[role] ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto" />
                        ) : (
                          <XCircle className="h-5 w-5 text-slate-200 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-5 border-t border-blue-100 bg-blue-50/20">
            <p className="text-xs text-slate-400 font-medium">
              ✦ Admins can change any user's role from the Team Members tab or from the full User Management page.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
