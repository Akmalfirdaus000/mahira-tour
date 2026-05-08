import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { FasilitasTable, type FasilitasData } from './sections/fasilitas-table';
import { Box, Plus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageProps {
    fasilitas: FasilitasData[];
}

export default function FasilitasIndex({ fasilitas }: PageProps) {
    return (
        <>
            <Head title="Master Fasilitas" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-xl shadow-purple-600/20">
                                <Box className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight text-foreground">Master Fasilitas</h1>
                        </div>
                        <p className="text-muted-foreground text-lg italic max-w-2xl">
                            Kelola daftar master fasilitas dan perlengkapan yang dapat ditawarkan ke setiap paket umroh.
                        </p>
                    </div>

                    {!window.location.pathname.startsWith('/super-admin') && (
                        <div className="flex items-center gap-3">
                            <Button variant="outline" className="h-12 rounded-2xl border-neutral-200 bg-white font-bold px-6 shadow-sm hover:bg-neutral-50 gap-2">
                                <Download className="h-4 w-4" />
                                Export
                            </Button>
                            <Button asChild className="h-12 rounded-2xl bg-neutral-900 text-white font-bold px-6 shadow-xl hover:bg-neutral-800 gap-2">
                                <Link href={route('admin.fasilitas.create')}>
                                    <Plus className="h-4 w-4" />
                                    Tambah Fasilitas
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Table Section */}
                <FasilitasTable data={fasilitas} />
            </div>
        </>
    );
}

FasilitasIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Fasilitas', href: '/admin/fasilitas' },
    ],
};
