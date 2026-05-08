import { Head } from '@inertiajs/react';
import { PaketList } from './sections/paket-list';
import type { PaketUmrohProps } from './components/paket-card';

interface PageProps {
    paketUmroh: PaketUmrohProps[];
}

export default function PaketUmrohPage({ paketUmroh }: PageProps) {
    return (
        <>
            <Head title="Paket Umroh" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Daftar Paket Umroh</h1>
                    <p className="text-muted-foreground">
                        Pilih paket perjalanan umroh impian Anda dengan fasilitas terbaik dan harga yang kompetitif.
                    </p>
                </div>
                
                <PaketList paketUmroh={paketUmroh} />
            </div>
        </>
    );
}

PaketUmrohPage.layout = {
    breadcrumbs: [
        {
            title: 'Beranda',
            href: '/jamaah/beranda',
        },
        {
            title: 'Paket Umroh',
            href: '/jamaah/paket-umroh',
        },
    ],
};
