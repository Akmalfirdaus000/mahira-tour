import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PendaftaranTable, type PendaftaranData } from './sections/pendaftaran-table';
import { ClipboardCheck, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageProps {
    pendaftaran: PendaftaranData[];
}

export default function PendaftaranIndex({ pendaftaran }: PageProps) {
    return (
        <>
            <Head title="Manajemen Pendaftaran" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-600/20">
                                <ClipboardCheck className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight text-foreground">Data Pendaftaran</h1>
                        </div>
                        <p className="text-muted-foreground text-lg italic max-w-2xl">
                            Kelola seluruh status pendaftaran jamaah, verifikasi pembayaran, dan pantau histori pendaftaran.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-12 rounded-2xl border-neutral-200 bg-white font-bold px-6 shadow-sm hover:bg-neutral-50 gap-2">
                            <Download className="h-4 w-4" />
                            Export PDF
                        </Button>
                    </div>
                </div>

                {/* Table Section */}
                <PendaftaranTable data={pendaftaran} />
            </div>
        </>
    );
}

PendaftaranIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Pendaftaran', href: '/admin/pendaftaran' },
    ],
};
