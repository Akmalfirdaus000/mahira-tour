import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    ArrowLeft, 
    Package, 
    Plane, 
    Hotel, 
    Clock, 
    Users, 
    Calendar,
    ChevronRight,
    Edit2,
    Box,
    BadgeCheck
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
    paket: any;
}

export default function ShowPaketUmroh({ paket }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '-';
            return new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }).format(date);
        } catch (e) {
            return '-';
        }
    };

    return (
        <>
            <Head title={`Detail Paket ${paket.nama_paket}`} />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button asChild variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-neutral-100">
                            <Link href={window.location.pathname.startsWith('/super-admin') ? route('super-admin.paket-umroh.index') : route('admin.paket-umroh.index')}>
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-black tracking-tight text-foreground">Detail Paket Umroh</h1>
                    </div>
                    {!window.location.pathname.startsWith('/super-admin') && (
                        <Button asChild className="rounded-2xl h-11 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 gap-2">
                            <Link href={route('admin.paket-umroh.edit', paket.id)}>
                                <Edit2 className="h-4 w-4" />
                                Edit Paket
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Col: Package Overview */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-xl rounded-[40px] overflow-hidden">
                            <div className="h-40 bg-blue-600 flex items-center justify-center">
                                <Package className="h-20 w-20 text-white/20" />
                            </div>
                            <CardContent className="p-8 space-y-6">
                                <div>
                                    <h2 className="text-2xl font-black leading-tight text-blue-900">{paket.nama_paket}</h2>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 px-3 py-1 rounded-full font-black text-xs">
                                            {paket.durasi_hari} HARI
                                        </Badge>
                                        <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50 px-3 py-1 rounded-full font-black text-xs">
                                            KUOTA: {paket.kuota}
                                        </Badge>
                                    </div>
                                </div>
                                
                                <div className="pt-6 border-t border-neutral-100 space-y-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Harga Paket</span>
                                        <span className="text-3xl font-black text-blue-700">{formatCurrency(paket.harga)}</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm font-medium">
                                            <Plane className="h-5 w-5 text-blue-500" />
                                            <span>{paket.maskapai || '-'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-medium">
                                            <Hotel className="h-5 w-5 text-amber-500" />
                                            <span>{paket.hotel || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl rounded-[40px] overflow-hidden">
                            <CardHeader className="p-6 bg-neutral-50 border-b">
                                <CardTitle className="text-sm font-black uppercase tracking-widest text-neutral-500">Deskripsi Paket</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <p className="text-sm leading-relaxed text-muted-foreground italic">
                                    {paket.deskripsi || 'Tidak ada deskripsi untuk paket ini.'}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Facilities Section */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-neutral-500 px-2 flex items-center gap-2">
                                <Box className="h-4 w-4" />
                                Fasilitas Paket
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {paket.fasilitas && paket.fasilitas.length > 0 ? (
                                    paket.fasilitas.map((f: any) => (
                                        <Card key={f.id} className="border-none shadow-md rounded-[24px] overflow-hidden bg-white/50 backdrop-blur-sm">
                                            <CardContent className="p-4 flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                                    <BadgeCheck className="h-5 w-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-black uppercase leading-tight">{f.nama}</p>
                                                    <p className="text-[10px] text-muted-foreground italic mt-0.5">{f.pivot.keterangan || '-'}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <p className="text-xs text-muted-foreground italic px-2">Belum ada fasilitas yang ditambahkan.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Departure Schedules */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-blue-600" />
                                Jadwal Keberangkatan
                            </h3>
                            <Button asChild variant="link" className="text-blue-600 font-bold">
                                <Link href={route('admin.keberangkatan.index', { paket_id: paket.id })}>Kelola Jadwal &rarr;</Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {paket.keberangkatan && paket.keberangkatan.length > 0 ? (
                                paket.keberangkatan.map((k: any) => {
                                    const now = new Date();
                                    const depart = new Date(k.tanggal_berangkat);
                                    const back = new Date(k.tanggal_pulang);
                                    
                                    let status = "Mendatang";
                                    let statusColor = "bg-blue-600";
                                    
                                    if (now > back) {
                                        status = "Selesai";
                                        statusColor = "bg-neutral-500";
                                    } else if (now >= depart) {
                                        status = "Berlangsung";
                                        statusColor = "bg-green-600";
                                    }

                                    return (
                                        <Card key={k.id} className="border-none shadow-lg rounded-[32px] overflow-hidden group hover:shadow-xl transition-all">
                                            <CardContent className="p-6 flex items-center gap-6">
                                                <div className="h-16 w-16 rounded-2xl bg-amber-50 text-amber-600 flex flex-col items-center justify-center">
                                                    <Calendar className="h-6 w-6" />
                                                    <span className="text-[10px] font-black uppercase mt-1 leading-none">JADWAL</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-black text-lg leading-tight">
                                                        {formatDate(k.tanggal_berangkat)}
                                                    </h4>
                                                    <p className="text-xs text-muted-foreground italic mt-1">
                                                        Status: <Badge className={cn("text-[8px] h-4 rounded-md uppercase font-black tracking-widest", statusColor)}>{status}</Badge>
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <div className="text-right">
                                                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none">Terdaftar</p>
                                                        <p className="text-xl font-black">{k.pendaftaran?.length || 0} <span className="text-xs font-medium">Jamaah</span></p>
                                                    </div>
                                                    <ChevronRight className="h-5 w-5 text-neutral-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })
                            ) : (
                                <div className="p-16 border-2 border-dashed rounded-[40px] text-center opacity-30 flex flex-col items-center gap-3">
                                    <Calendar className="h-12 w-12" />
                                    <p className="font-bold italic">Belum ada jadwal keberangkatan untuk paket ini</p>
                                    <Button asChild variant="outline" className="rounded-xl border-neutral-300 mt-2">
                                        <Link href={route('admin.keberangkatan.index')}>Buat Jadwal Baru</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ShowPaketUmroh.layout = {
    breadcrumbs: [
        { title: window.location.pathname.startsWith('/super-admin') ? 'Super Admin' : 'Dashboard', href: window.location.pathname.startsWith('/super-admin') ? '/super-admin/dashboard' : '/admin/dashboard' },
        { title: 'Paket Umroh', href: window.location.pathname.startsWith('/super-admin') ? '/super-admin/paket-umroh' : '/admin/paket-umroh' },
        { title: 'Detail', href: '#' },
    ],
};
