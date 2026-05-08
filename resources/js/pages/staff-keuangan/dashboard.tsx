import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    CreditCard, 
    ClipboardCheck, 
    TrendingUp, 
    ArrowRight,
    Wallet,
    History,
    CheckCircle2,
    XCircle,
    Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
    stats: {
        pembayaran_pending: number;
        total_pendapatan: number;
        pendaftaran_baru: number;
        total_transaksi: number;
    };
    recentPayments: any[];
}

export default function StaffKeuanganDashboard({ stats, recentPayments }: Props) {
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
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
        } catch (e) {
            return '-';
        }
    };

    const statCards = [
        {
            title: 'Pembayaran Pending',
            value: stats.pembayaran_pending,
            icon: Clock,
            color: 'bg-amber-600',
            bg: 'bg-amber-50',
            textColor: 'text-amber-700',
            description: 'Perlu verifikasi'
        },
        {
            title: 'Total Pendapatan',
            value: formatCurrency(stats.total_pendapatan),
            icon: Wallet,
            color: 'bg-emerald-600',
            bg: 'bg-emerald-50',
            textColor: 'text-emerald-700',
            description: 'Transaksi sukses'
        },
        {
            title: 'Pendaftaran Baru',
            value: stats.pendaftaran_baru,
            icon: ClipboardCheck,
            color: 'bg-blue-600',
            bg: 'bg-blue-50',
            textColor: 'text-blue-700',
            description: 'Bulan ini'
        },
        {
            title: 'Total Transaksi',
            value: stats.total_transaksi,
            icon: History,
            color: 'bg-violet-600',
            bg: 'bg-violet-50',
            textColor: 'text-violet-700',
            description: 'Seluruh riwayat'
        }
    ];

    return (
        <>
            <Head title="Finance Dashboard" />
            <div className="flex flex-col gap-10 p-6 md:p-10 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tight text-foreground">Finance Dashboard</h1>
                        <p className="text-muted-foreground font-medium italic">Monitor arus kas dan validasi pembayaran.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button asChild className="rounded-2xl font-black bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200">
                            <Link href={route('staff-keuangan.laporan')}>
                                <TrendingUp className="mr-2 h-4 w-4" /> Laporan Keuangan
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, i) => (
                        <Card key={i} className="border-none shadow-xl rounded-[32px] overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                            <CardContent className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={cn("p-4 rounded-2xl shadow-inner", stat.bg)}>
                                        <stat.icon className={cn("h-6 w-6", stat.textColor)} />
                                    </div>
                                    <TrendingUp className="h-4 w-4 text-neutral-300" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">{stat.title}</h3>
                                    <p className="text-2xl font-black text-neutral-900">{stat.value}</p>
                                    <p className="text-[10px] font-bold text-neutral-400 italic">{stat.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Recent Payments */}
                    <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden">
                        <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-emerald-600" />
                                    Transaksi Terakhir
                                </CardTitle>
                                <p className="text-xs text-neutral-400 font-medium italic">Status pembayaran terbaru dari jamaah.</p>
                            </div>
                            <Button asChild variant="ghost" size="sm" className="rounded-xl font-bold text-xs hover:bg-emerald-50 text-emerald-600">
                                <Link href={route('staff-keuangan.pembayaran')}>Lihat Semua</Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="p-8 pt-4">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-neutral-100">
                                            <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Jamaah</th>
                                            <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Jumlah</th>
                                            <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Metode</th>
                                            <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</th>
                                            <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Tanggal</th>
                                            <th className="text-right py-4 px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-50">
                                        {recentPayments.map((pay) => (
                                            <tr key={pay.id} className="group hover:bg-neutral-50/50 transition-colors">
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-xl bg-white shadow-sm border border-neutral-100 flex items-center justify-center text-emerald-600 font-black">
                                                            {pay.pendaftaran.jamaah.nama_lengkap.charAt(0)}
                                                        </div>
                                                        <span className="font-bold text-sm text-neutral-900">{pay.pendaftaran.jamaah.nama_lengkap}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 font-black text-sm text-emerald-600">
                                                    {formatCurrency(pay.jumlah)}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{pay.metode}</span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <Badge className={cn(
                                                        "rounded-lg px-2 py-0.5 font-black text-[8px] uppercase tracking-widest border-none",
                                                        pay.status === 'sukses' ? "bg-green-600" :
                                                        pay.status === 'gagal' ? "bg-red-600" : "bg-amber-500"
                                                    )}>
                                                        {pay.status}
                                                    </Badge>
                                                </td>
                                                <td className="py-4 px-4 text-[10px] font-bold text-neutral-400 italic">
                                                    {formatDate(pay.created_at)}
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    {pay.status === 'pending' ? (
                                                        <Button asChild size="sm" variant="outline" className="rounded-xl font-bold text-[10px] h-8 border-neutral-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600">
                                                            <Link href={route('staff-keuangan.pembayaran')}>Validasi</Link>
                                                        </Button>
                                                    ) : (
                                                        <CheckCircle2 className="h-5 w-5 text-neutral-200 ml-auto" />
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {recentPayments.length === 0 && (
                                    <div className="h-32 flex items-center justify-center text-neutral-400 font-bold italic text-sm">
                                        Belum ada transaksi.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

StaffKeuanganDashboard.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '#' },
    ],
};
