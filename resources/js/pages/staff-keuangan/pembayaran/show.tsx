import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
    User, 
    CreditCard, 
    Calendar,
    ArrowLeft,
    CheckCircle2,
    XCircle,
    FileText,
    History,
    ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Props {
    pembayaran: any;
}

export default function PembayaranShow({ pembayaran }: Props) {
    const { data, setData, post, processing } = useForm({
        status: '',
        catatan: pembayaran.catatan || ''
    });

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
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '-';
            return new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
        } catch (e) {
            return '-';
        }
    };

    const handleVerify = (status: 'sukses' | 'gagal') => {
        router.post(route('staff-keuangan.pembayaran.verify', pembayaran.id), {
            ...data,
            status: status
        }, {
            onSuccess: () => toast.success(`Pembayaran berhasil di-${status}!`),
        });
    };

    return (
        <>
            <Head title={`Detail Transaksi TRX-${pembayaran.id}`} />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-4">
                    <Button asChild variant="ghost" className="rounded-xl hover:bg-neutral-100">
                        <Link href={route('staff-keuangan.pembayaran')}>
                            <ArrowLeft className="h-4 w-4 mr-2" /> Kembali
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-black tracking-tight">Detail Transaksi <span className="text-emerald-600">TRX-{pembayaran.id}</span></h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Jamaah & Payment Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Data Jamaah & Paket */}
                        <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                            <CardHeader className="bg-neutral-900 text-white p-6">
                                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                    <User className="h-4 w-4" /> Data Jamaah & Paket
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-neutral-400">Nama Jamaah</p>
                                    <p className="font-bold text-neutral-900">{pembayaran.pendaftaran.jamaah.nama_lengkap}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-neutral-400">ID Pendaftaran</p>
                                    <p className="font-bold text-blue-600">#{pembayaran.pendaftaran.id}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-neutral-400">Paket Umroh</p>
                                    <p className="font-bold text-neutral-900">{pembayaran.pendaftaran.keberangkatan.paket_umroh.nama_paket}</p>
                                </div>
                                <div className="space-y-1 text-right">
                                    <p className="text-[10px] font-black uppercase text-neutral-400">Keberangkatan</p>
                                    <p className="font-bold text-neutral-900">{formatDate(pembayaran.pendaftaran.keberangkatan.tanggal_berangkat)}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Data Pembayaran */}
                        <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                            <CardHeader className="bg-emerald-600 text-white p-6">
                                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" /> Detail Pembayaran
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-neutral-400">Jumlah Bayar</p>
                                        <p className="text-2xl font-black text-emerald-600">{formatCurrency(pembayaran.jumlah)}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-neutral-400">Metode</p>
                                        <p className="font-bold text-neutral-900 uppercase tracking-widest">{pembayaran.metode}</p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <p className="text-[10px] font-black uppercase text-neutral-400">Waktu Transaksi</p>
                                        <p className="font-bold text-neutral-900">{formatDate(pembayaran.created_at)}</p>
                                    </div>
                                </div>

                                {/* Bukti Bayar Preview */}
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase text-neutral-400 flex items-center gap-2">
                                        <FileText className="h-3 w-3" /> Bukti Pembayaran
                                    </p>
                                    <div className="relative aspect-video max-w-md rounded-[24px] overflow-hidden border-4 border-neutral-50 shadow-inner bg-neutral-100 flex items-center justify-center group">
                                        {pembayaran.bukti_bayar ? (
                                            <img 
                                                src={`/storage/${pembayaran.bukti_bayar}`} 
                                                alt="Bukti Bayar" 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-center space-y-2">
                                                <AlertCircle className="h-8 w-8 text-neutral-300 mx-auto" />
                                                <p className="text-xs font-bold text-neutral-400 italic">Bukti bayar tidak tersedia</p>
                                            </div>
                                        )}
                                        {pembayaran.bukti_bayar && (
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button asChild variant="outline" className="bg-white border-none rounded-xl font-bold">
                                                    <a href={`/storage/${pembayaran.bukti_bayar}`} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="h-4 w-4 mr-2" /> Buka Fullsize
                                                    </a>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Riwayat Pembayaran Jamaah */}
                        <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                            <CardHeader className="bg-neutral-100 p-6">
                                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-neutral-900">
                                    <History className="h-4 w-4" /> Riwayat Cicilan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="space-y-4">
                                    {pembayaran.pendaftaran.pembayaran.map((pay: any, i: number) => (
                                        <div key={pay.id} className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                                            <div className="flex items-center gap-4">
                                                <div className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-[10px] font-black text-neutral-400 uppercase">
                                                    {i + 1}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-neutral-900">{formatCurrency(pay.jumlah)}</span>
                                                    <span className="text-[10px] font-bold text-neutral-400 italic">{formatDate(pay.created_at)}</span>
                                                </div>
                                            </div>
                                            <Badge className={cn(
                                                "rounded-lg px-2 py-0.5 font-black text-[8px] uppercase tracking-widest border-none",
                                                pay.status === 'sukses' ? "bg-green-600" :
                                                pay.status === 'gagal' ? "bg-red-600" : "bg-amber-500"
                                            )}>
                                                {pay.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Validation Actions */}
                    <div className="space-y-8">
                        <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden sticky top-8">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                    Validasi Transaksi
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-neutral-400 ml-1">Catatan Internal</label>
                                    <Textarea 
                                        placeholder="Berikan catatan jika ditolak atau info tambahan..." 
                                        className="rounded-[24px] border-neutral-100 bg-neutral-50 min-h-[120px] focus:ring-emerald-500"
                                        value={data.catatan}
                                        onChange={(e) => setData('catatan', e.target.value)}
                                        disabled={pembayaran.status !== 'pending'}
                                    />
                                </div>

                                {pembayaran.status === 'pending' ? (
                                    <div className="grid grid-cols-1 gap-3 pt-4">
                                        <Button 
                                            className="w-full rounded-[20px] h-12 bg-emerald-600 hover:bg-emerald-700 font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-100"
                                            onClick={() => handleVerify('sukses')}
                                            disabled={processing}
                                        >
                                            <CheckCircle2 className="h-4 w-4 mr-2" /> Validasi Sukses
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            className="w-full rounded-[20px] h-12 border-red-200 text-red-600 hover:bg-red-50 font-black text-xs uppercase tracking-widest"
                                            onClick={() => handleVerify('gagal')}
                                            disabled={processing}
                                        >
                                            <XCircle className="h-4 w-4 mr-2" /> Tolak Transaksi
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="pt-4">
                                        <div className={cn(
                                            "p-6 rounded-[32px] text-center space-y-2",
                                            pembayaran.status === 'sukses' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                                        )}>
                                            <p className="text-xs font-black uppercase tracking-widest">Transaksi Telah Diproses</p>
                                            <p className="text-2xl font-black">{pembayaran.status.toUpperCase()}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

PembayaranShow.layout = {
    breadcrumbs: [
        { title: 'Pembayaran', href: route('staff-keuangan.pembayaran') },
        { title: 'Detail Transaksi', href: '#' },
    ],
};
