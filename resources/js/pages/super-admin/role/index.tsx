import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ShieldCheck, ShieldAlert, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
    roles: any[];
}

export default function RoleManagement({ roles }: Props) {
    const getRoleIcon = (name: string) => {
        if (name.includes('super')) return <ShieldCheck className="h-6 w-6 text-blue-600" />;
        if (name.includes('admin')) return <Shield className="h-6 w-6 text-emerald-600" />;
        if (name.includes('keuangan')) return <ShieldAlert className="h-6 w-6 text-amber-600" />;
        return <Users className="h-6 w-6 text-neutral-600" />;
    };

    return (
        <>
            <Head title="Role & Hak Akses" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-black text-foreground">Role & <span className="text-blue-600">Hak Akses</span></h1>
                    <p className="text-muted-foreground italic text-sm">Level otorisasi sistem dan jumlah pengguna terdaftar.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {roles.map((role) => (
                        <Card key={role.id} className="border-none shadow-xl rounded-[32px] overflow-hidden group hover:shadow-2xl transition-all duration-500">
                            <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                                <div className="h-12 w-12 rounded-2xl bg-neutral-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {getRoleIcon(role.name)}
                                </div>
                                <Badge className="bg-neutral-100 text-neutral-600 hover:bg-neutral-100 rounded-lg border-none text-[10px] font-black uppercase">
                                    {role.users_count} User
                                </Badge>
                            </CardHeader>
                            <CardContent className="p-8 pt-4">
                                <h3 className="text-xl font-black uppercase tracking-tight mb-2">{role.name.replace('_', ' ')}</h3>
                                <div className="space-y-4">
                                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                                        Hak akses default untuk level {role.name}. Meliputi modul utama dan fitur standar.
                                    </p>
                                    <div className="pt-4 border-t flex flex-wrap gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                                        <div className="h-1.5 w-1.5 rounded-full bg-neutral-200" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

RoleManagement.layout = {
    breadcrumbs: [
        { title: 'Super Admin', href: route('super-admin.dashboard') },
        { title: 'Role & Hak Akses', href: '#' },
    ],
};

