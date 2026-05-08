import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    User, 
    Package, 
    Plane, 
    CreditCard, 
    FileText, 
    ArrowLeft,
    CheckCircle2,
    Clock,
    AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    pendaftaran: any;
    stats: {
        total_paid: number;
        total_bill: number;
        remaining_bill: number;
    };
}

export default function PendaftaranShow({ pendaftaran, stats }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '-';
        try {
            return new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).format(new Date(dateString));
        } catch (e) {
            return '-';
        }
    };

    const isDocsValid = React.useMemo(() => {
        const required = ['passport', 'ktp_akta', 'kk'];
        return required.every(type => 
            pendaftaran.jamaah.dokumen.some((d: any) => d.jenis === type && d.status_verifikasi === 'valid')
        );
    }, [pendaftaran.jamaah.dokumen]);

    const trackingSteps = React.useMemo(() => [
        { label: 'Pending', status: 'pending', active: true },
        { label: 'DP Masuk', status: 'dp', active: stats.total_paid > 0 },
        { label: 'Dokumen Valid', status: 'verified', active: isDocsValid },
        { label: 'Lunas', status: 'lunas', active: pendaftaran.status === 'lunas' },
        { label: 'Siap Berangkat', status: 'ready', active: pendaftaran.status === 'lunas' && isDocsValid },
    ], [pendaftaran.status, isDocsValid, stats.total_paid]);

    return (
        <>
            <Head title={`Detail Pendaftaran #${pendaftaran.id}`} />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-4">
                    <Button asChild variant="ghost" className="rounded-xl hover:bg-neutral-100">
                        <Link href={route('staff-keuangan.pendaftaran')}>
                            <ArrowLeft className="h-4 w-4 mr-2" /> Kembali
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-black tracking-tight">Detail Pendaftaran <span className="text-blue-600">#{pendaftaran.id}</span></h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Jamaah & Package */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Data Jamaah */}
                        <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                            <CardHeader className="bg-neutral-900 text-white p-6">
                                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                    <User className="h-4 w-4" /> Data Jamaah
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-neutral-400">Nama Lengkap</p>
                                    <p className="font-bold text-neutral-900">{pendaftaran.jamaah.nama_lengkap}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-neutral-400">NIK</p>
                                    <p className="font-bold text-neutral-900">{pendaftaran.jamaah.nik}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-neutral-400">No HP</p>
                                    <p className="font-bold text-neutral-900">{pendaftaran.jamaah.no_hp}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-neutral-400">Email</p>
                                    <p className="font-bold text-neutral-900">{pendaftaran.jamaah.user.email}</p>
                                </div>
                                <div className="md:col-span-2 space-y-1">
                                    <p className="text-[10px] font-black uppercase text-neutral-400">Alamat</p>
                                    <p className="font-bold text-neutral-900 leading-relaxed">{pendaftaran.jamaah.alamat}, {pendaftaran.jamaah.kota}, {pendaftaran.jamaah.provinsi}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Data Paket & Keberangkatan */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                                <CardHeader className="bg-blue-600 text-white p-6">
                                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                        <Package className="h-4 w-4" /> Data Paket
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 space-y-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-neutral-400">Nama Paket</p>
                                        <p className="font-bold text-neutral-900">{pendaftaran.keberangkatan.paket_umroh.nama_paket}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase text-neutral-400">Maskapai</p>
                                            <p className="font-bold text-neutral-900">{pendaftaran.keberangkatan.paket_umroh.maskapai}</p>
                                        </div>
                                        <div className="space-y-1 text-right">
                                            <p className="text-[10px] font-black uppercase text-neutral-400">Durasi</p>
                                            <p className="font-bold text-neutral-900">{pendaftaran.keberangkatan.paket_umroh.durasi} Hari</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                                <CardHeader className="bg-violet-600 text-white p-6">
                                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                        <Plane className="h-4 w-4" /> Keberangkatan
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 space-y-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-neutral-400">Tanggal Berangkat</p>
                                        <p className="font-bold text-neutral-900">{formatDate(pendaftaran.keberangkatan.tanggal_berangkat)}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase text-neutral-400">Kuota</p>
                                            <p className="font-bold text-neutral-900">{pendaftaran.keberangkatan.kuota} Orang</p>
                                        </div>
                                        <div className="space-y-1 text-right">
                                            <p className="text-[10px] font-black uppercase text-neutral-400">Terisi</p>
                                            <p className="font-bold text-blue-600">{pendaftaran.keberangkatan.pendaftaran_count || 0}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Status Dokumen */}
                        <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                            <CardHeader className="bg-neutral-100 p-6">
                                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-neutral-900">
                                    <FileText className="h-4 w-4" /> Status Dokumen
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {['passport', 'ktp_akta', 'kk'].map(type => {
                                        const doc = pendaftaran.jamaah.dokumen.find((d: any) => d.jenis === type);
                                        const label = type === 'ktp_akta' ? 'KTP' : type.charAt(0).toUpperCase() + type.slice(1);
                                        return (
                                            <div key={type} className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                                                <span className="text-xs font-bold text-neutral-600 uppercase">{label}</span>
                                                <Badge className={cn(
                                                    "rounded-lg px-2 py-0.5 font-black text-[8px] uppercase tracking-widest border-none",
                                                    doc?.status_verifikasi === 'valid' ? "bg-green-600" :
                                                    doc ? "bg-amber-500" : "bg-neutral-300"
                                                )}>
                                                    {doc ? doc.status_verifikasi : 'Belum Ada'}
                                                </Badge>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Payment & Tracking */}
                    <div className="space-y-8">
                        {/* Status Pembayaran */}
                        <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-emerald-600 text-white">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 opacity-80">
                                    <CreditCard className="h-4 w-4" /> Status Pembayaran
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase opacity-60">Total Tagihan</p>
                                    <p className="text-3xl font-black">{formatCurrency(stats.total_bill)}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase opacity-60">Dibayar</p>
                                        <p className="text-lg font-black">{formatCurrency(stats.total_paid)}</p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <p className="text-[10px] font-black uppercase opacity-60">Sisa</p>
                                        <p className="text-lg font-black text-amber-200">{formatCurrency(stats.remaining_bill)}</p>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <Badge className="bg-white text-emerald-700 rounded-xl px-4 py-1 font-black text-[10px] uppercase tracking-widest">
                                        {pendaftaran.status}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tracking Status */}
                        <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                            <CardHeader className="p-6">
                                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                    Tracking Progress
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="space-y-6 relative">
                                    <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-neutral-100" />
                                    {trackingSteps.map((step, i) => (
                                        <div key={i} className="flex items-center gap-4 relative">
                                            <div className={cn(
                                                "h-5 w-5 rounded-full flex items-center justify-center relative z-10",
                                                step.active ? "bg-blue-600 shadow-lg shadow-blue-200" : "bg-neutral-200"
                                            )}>
                                                {step.active ? <CheckCircle2 className="h-3 w-3 text-white" /> : <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                                            </div>
                                            <span className={cn(
                                                "text-xs font-black uppercase tracking-widest",
                                                step.active ? "text-neutral-900" : "text-neutral-400"
                                            )}>{step.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Action */}
                        <Button asChild className="w-full rounded-[24px] h-14 font-black text-sm uppercase tracking-widest shadow-xl bg-neutral-900 hover:bg-black group">
                            <Link href={route('staff-keuangan.pembayaran')}>
                                Validasi Transaksi <ArrowLeft className="h-4 w-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

PendaftaranShow.layout = {
    breadcrumbs: [
        { title: 'Pendaftaran', href: route('staff-keuangan.pendaftaran') },
        { title: 'Detail', href: '#' },
    ],
};
