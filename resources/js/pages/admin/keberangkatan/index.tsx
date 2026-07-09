import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { KeberangkatanTable, type KeberangkatanData } from './sections/keberangkatan-table';
import { Calendar, Plus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageProps {
    keberangkatan: KeberangkatanData[];
}

export default function KeberangkatanIndex({ keberangkatan }: PageProps) {
    return (
        <>
            <Head title="Jadwal Keberangkatan" />
            <div className="flex flex-col gap-8 mx-auto p-6 md:p-10 w-full max-w-7xl">
                {/* Header Section */}
                <div className="flex md:flex-row flex-col justify-between md:items-center gap-6">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center bg-blue-600 shadow-blue-600/20 shadow-xl rounded-2xl w-12 h-12 text-white">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <h1 className="font-black text-foreground text-3xl tracking-tight">Jadwal Keberangkatan</h1>
                        </div>
                        <p className="max-w-2xl text-muted-foreground text-lg italic">
                            Kelola batch keberangkatan untuk setiap paket umroh, pantau ketersediaan kuota, dan atur tanggal perjalanan.
                        </p>
                    </div>

                    {!window.location.pathname.startsWith('/super-admin') && (
                        <div className="flex items-center gap-3">
                            {/* <Button variant="outline" className="gap-2 bg-white hover:bg-neutral-50 shadow-sm px-6 border-neutral-200 rounded-2xl h-12 font-bold">
                                <Download className="w-4 h-4" />
                                Export
                            </Button> */}
                            <Button asChild className="gap-2 bg-neutral-900 hover:bg-neutral-800 shadow-xl px-6 rounded-2xl h-12 font-bold text-white">
                                <Link href={route('admin.keberangkatan.create')}>
                                    <Plus className="w-4 h-4" />
                                    Tambah Jadwal
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Table Section */}
                <KeberangkatanTable data={keberangkatan} />
            </div>
        </>
    );
}

KeberangkatanIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Keberangkatan', href: '/admin/keberangkatan' },
    ],
};
