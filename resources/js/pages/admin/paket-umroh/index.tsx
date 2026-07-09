import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PaketTable, type PaketData } from './sections/paket-table';
import { Package, Plus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageProps {
    paket: PaketData[];
}

export default function PaketUmrohIndex({ paket }: PageProps) {
    return (
        <>
            <Head title="Manajemen Paket Umroh" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                                <Package className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight text-foreground">Paket Umroh</h1>
                        </div>
                        <p className="text-muted-foreground text-lg italic max-w-2xl">
                            Kelola berbagai pilihan paket umroh, tentukan harga, fasilitas, dan pantau kuota yang tersedia.
                        </p>
                    </div>

                    {!window.location.pathname.startsWith('/super-admin') && (
                        <div className="flex items-center gap-3">
                            <Button asChild className="h-12 rounded-2xl bg-neutral-900 text-white font-bold px-6 shadow-xl hover:bg-neutral-800 gap-2">
                                <Link href={route('admin.paket-umroh.create')}>
                                    <Plus className="h-4 w-4" />
                                    Tambah Paket
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Table Section */}
                <PaketTable data={paket} />
            </div>
        </>
    );
}

PaketUmrohIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Paket Umroh', href: '/admin/paket-umroh' },
    ],
};
