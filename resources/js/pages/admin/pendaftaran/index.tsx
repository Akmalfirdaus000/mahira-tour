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
            <div className="flex flex-col gap-8 mx-auto p-6 md:p-10 w-full max-w-7xl">
                {/* Header Section */}
                <div className="flex md:flex-row flex-col justify-between md:items-center gap-6">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center bg-emerald-600 shadow-emerald-600/20 shadow-xl rounded-2xl w-12 h-12 text-white">
                                <ClipboardCheck className="w-6 h-6" />
                            </div>
                            <h1 className="font-black text-foreground text-3xl tracking-tight">Data Pendaftaran</h1>
                        </div>
                        <p className="max-w-2xl text-muted-foreground text-lg italic">
                            Kelola seluruh status pendaftaran jamaah, verifikasi pembayaran, dan pantau histori pendaftaran.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* <Button variant="outline" className="gap-2 bg-white hover:bg-neutral-50 shadow-sm px-6 border-neutral-200 rounded-2xl h-12 font-bold">
                            <Download className="w-4 h-4" />
                            Export PDF
                        </Button> */}
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
