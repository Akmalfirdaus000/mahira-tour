import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    FileText, 
    Download, 
    TrendingUp, 
    Users, 
    CreditCard, 
    Package, 
    Plane 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface Props {
    popular_packages: any[];
    upcoming_departures: any[];
}

export default function LaporanIndex({ popular_packages, upcoming_departures }: Props) {
    return (
        <>
            <Head title="Laporan Pusat" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-black text-foreground">Laporan <span className="text-blue-600">Pusat</span></h1>
                        <p className="text-muted-foreground italic text-sm">Analisis data jamaah, keuangan, dan performa paket.</p>
                    </div>

                    <a href={route('super-admin.laporan.export')}>
                        <Button className="rounded-2xl h-12 bg-neutral-900 hover:bg-black text-white font-bold px-6 gap-2">
                            <Download className="h-4 w-4" />
                            Export Semua Laporan
                        </Button>
                    </a>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Paket Populer */}
                    <Card className="border-none shadow-xl rounded-[40px] overflow-hidden">
                        <CardHeader className="bg-blue-600 text-white p-8">
                            <CardTitle className="text-xl font-black flex items-center gap-2">
                                <TrendingUp className="h-6 w-6" /> Paket Terpopuler
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-neutral-50">
                                    <TableRow>
                                        <TableHead className="pl-8">Nama Paket</TableHead>
                                        <TableHead className="text-center">Jamaah</TableHead>
                                        <TableHead className="text-right pr-8">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {popular_packages.map((pkg) => (
                                        <TableRow key={pkg.id}>
                                            <TableCell className="pl-8 font-bold">{pkg.nama_paket}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-none font-black">
                                                    {pkg.pendaftaran_count} Orang
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-8">
                                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none text-[8px] font-black uppercase">Active</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Monitoring Keberangkatan */}
                    <Card className="border-none shadow-xl rounded-[40px] overflow-hidden">
                        <CardHeader className="bg-neutral-900 text-white p-8">
                            <CardTitle className="text-xl font-black flex items-center gap-2">
                                <Plane className="h-6 w-6" /> Monitoring Keberangkatan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-neutral-50">
                                    <TableRow>
                                        <TableHead className="pl-8">Jadwal</TableHead>
                                        <TableHead className="text-center">Kapasitas</TableHead>
                                        <TableHead className="text-right pr-8">Sisa Kuota</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {upcoming_departures.map((k) => (
                                        <TableRow key={k.id}>
                                            <TableCell className="pl-8">
                                                <div className="flex flex-col">
                                                    <span className="font-bold">{k.paket_umroh.nama_paket}</span>
                                                    <span className="text-[10px] text-muted-foreground italic">
                                                        {new Intl.DateTimeFormat('id-ID').format(new Date(k.tanggal_berangkat))}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center font-black">{k.kuota}</TableCell>
                                            <TableCell className="text-right pr-8">
                                                <Badge className={cn(
                                                    "rounded-lg px-2 py-0.5 font-black text-[9px] uppercase border-none",
                                                    k.kuota - k.pendaftaran_count < 5 ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                                                )}>
                                                    {k.kuota - k.pendaftaran_count} Kursi
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Export Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <a href={route('super-admin.laporan.jamaah')}>
                        <Button variant="outline" className="h-24 rounded-[32px] border-2 border-neutral-100 flex flex-col gap-2 hover:bg-blue-50 hover:border-blue-200 group transition-all w-full">
                            <Users className="h-6 w-6 text-neutral-400 group-hover:text-blue-600" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Laporan Jamaah</span>
                        </Button>
                    </a>
                    <a href={route('super-admin.laporan.keuangan')}>
                        <Button variant="outline" className="h-24 rounded-[32px] border-2 border-neutral-100 flex flex-col gap-2 hover:bg-emerald-50 hover:border-emerald-200 group transition-all w-full">
                            <CreditCard className="h-6 w-6 text-neutral-400 group-hover:text-emerald-600" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Laporan Keuangan</span>
                        </Button>
                    </a>
                    <a href={route('super-admin.laporan.paket')}>
                        <Button variant="outline" className="h-24 rounded-[32px] border-2 border-neutral-100 flex flex-col gap-2 hover:bg-amber-50 hover:border-amber-200 group transition-all w-full">
                            <Package className="h-6 w-6 text-neutral-400 group-hover:text-amber-600" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Laporan Paket</span>
                        </Button>
                    </a>
                    <a href={route('super-admin.laporan.summary')}>
                        <Button variant="outline" className="h-24 rounded-[32px] border-2 border-neutral-100 flex flex-col gap-2 hover:bg-violet-50 hover:border-violet-200 group transition-all w-full">
                            <FileText className="h-6 w-6 text-neutral-400 group-hover:text-violet-600" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Summary Tahunan</span>
                        </Button>
                    </a>
                </div>
            </div>
        </>
    );
}

LaporanIndex.layout = {
    breadcrumbs: [
        { title: 'Super Admin', href: route('super-admin.dashboard') },
        { title: 'Laporan Pusat', href: '#' },
    ],
};

