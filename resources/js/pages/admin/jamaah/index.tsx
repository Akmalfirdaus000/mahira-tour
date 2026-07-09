import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { JamaahTable, type JamaahData } from './sections/jamaah-table';
import { Users, UserPlus, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageProps {
    jamaah: JamaahData[];
}

export default function JamaahIndex({ jamaah }: PageProps) {
    return (
        <>
            <Head title="Data Jamaah" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-xl shadow-amber-600/20">
                                <Users className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight text-foreground">Data Jamaah</h1>
                        </div>
                        <p className="text-muted-foreground text-lg italic max-w-2xl">
                            Kelola seluruh data master jamaah Mahira Tour, pantau pendaftaran, dan verifikasi profil mereka.
                        </p>
                    </div>

                    {!window.location.pathname.startsWith('/super-admin') && (
                        <div className="flex items-center gap-3">
                            <Button asChild className="h-12 rounded-2xl bg-neutral-900 text-white font-bold px-6 shadow-xl hover:bg-neutral-800 gap-2">
                                <Link href={route('admin.jamaah.create')}>
                                    <UserPlus className="h-4 w-4" />
                                    Tambah Jamaah
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Quick Summary Cards (Optional, but adds premium feel) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Jamaah</span>
                        <span className="text-2xl font-black">{jamaah.length} <span className="text-xs font-medium text-muted-foreground ml-1">Orang</span></span>
                    </div>
                    {/* You can add more summary cards here if needed */}
                </div>

                {/* Table Section */}
                <JamaahTable data={jamaah} />
            </div>
        </>
    );
}

JamaahIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Data Jamaah', href: '/admin/jamaah' },
    ],
};
