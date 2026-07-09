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
            <div className="flex flex-col gap-8 mx-auto p-6 md:p-10 w-full max-w-7xl">
                {/* Header Section */}
                <div className="flex md:flex-row flex-col justify-between md:items-center gap-6">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center bg-purple-600 shadow-purple-600/20 shadow-xl rounded-2xl w-12 h-12 text-white">
                                <Box className="w-6 h-6" />
                            </div>
                            <h1 className="font-black text-foreground text-3xl tracking-tight">Master Fasilitas</h1>
                        </div>
                        <p className="max-w-2xl text-muted-foreground text-lg italic">
                            Kelola daftar master fasilitas dan perlengkapan yang dapat ditawarkan ke setiap paket umroh.
                        </p>
                    </div>

                    {!window.location.pathname.startsWith('/super-admin') && (
                        <div className="flex items-center gap-3">
                            {/* <Button variant="outline" className="gap-2 bg-white hover:bg-neutral-50 shadow-sm px-6 border-neutral-200 rounded-2xl h-12 font-bold">
                                <Download className="w-4 h-4" />
                                Export
                            </Button> */}
                            <Button asChild className="gap-2 bg-neutral-900 hover:bg-neutral-800 shadow-xl px-6 rounded-2xl h-12 font-bold text-white">
                                <Link href={route('admin.fasilitas.create')}>
                                    <Plus className="w-4 h-4" />
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
