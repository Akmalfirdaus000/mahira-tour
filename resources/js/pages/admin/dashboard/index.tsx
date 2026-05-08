import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    Users, 
    ClipboardCheck, 
    CreditCard, 
    FileWarning, 
    TrendingUp, 
    ArrowRight,
    Calendar,
    Package,
    ShieldCheck,
    Clock,
    UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
    stats: {
        total_jamaah: number;
        total_pendaftaran: number;
        pendaftaran_bulan_ini: number;
        total_pendapatan: number;
        dokumen_pending: number;
    };
    recentRegistrations: any[];
    recentPayments: any[];
}

export default function AdminDashboard({ stats, recentRegistrations, recentPayments }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    };

    const statCards = [
        {
            title: 'Total Jamaah',
            value: stats.total_jamaah,
            icon: Users,
            color: 'bg-blue-600',
            bg: 'bg-blue-50',
            textColor: 'text-blue-700',
            description: 'Terdaftar di sistem'
        },
        {
            title: 'Pendaftaran',
            value: stats.total_pendaftaran,
            icon: ClipboardCheck,
            color: 'bg-emerald-600',
            bg: 'bg-emerald-50',
            textColor: 'text-emerald-700',
            description: `${stats.pendaftaran_bulan_ini} bulan ini`
        },
        {
            title: 'Total Pendapatan',
            value: formatCurrency(stats.total_pendapatan),
            icon: CreditCard,
            color: 'bg-violet-600',
            bg: 'bg-violet-50',
            textColor: 'text-violet-700',
            description: 'Pembayaran sukses'
        },
        {
            title: 'Dokumen Pending',
            value: stats.dokumen_pending,
            icon: FileWarning,
            color: 'bg-amber-600',
            bg: 'bg-amber-50',
            textColor: 'text-amber-700',
            description: 'Perlu verifikasi'
        }
    ];

    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="flex flex-col gap-10 p-6 md:p-10 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tight text-foreground">Dashboard</h1>
                        <p className="text-muted-foreground font-medium italic">Selamat datang kembali, Admin Mahira Tour.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button asChild className="rounded-2xl font-black bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                            <Link href={route('admin.keberangkatan.index')}>
                                <Calendar className="mr-2 h-4 w-4" /> Kelola Jadwal
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Registrations */}
                    <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden">
                        <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                                    <UserPlus className="h-5 w-5 text-blue-600" />
                                    Pendaftaran Terbaru
                                </CardTitle>
                                <p className="text-xs text-neutral-400 font-medium italic">Jamaah baru yang mendaftar paket.</p>
                            </div>
                            <Button asChild variant="ghost" size="sm" className="rounded-xl font-bold text-xs hover:bg-blue-50 text-blue-600">
                                <Link href={route('admin.pendaftaran.index')}>Lihat Semua</Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="p-8 pt-4">
                            <div className="space-y-4">
                                {recentRegistrations.map((reg) => (
                                    <div key={reg.id} className="flex items-center justify-between p-5 rounded-[24px] bg-neutral-50/50 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-neutral-100 group">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 font-black border border-neutral-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                {reg.jamaah.nama_lengkap.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-sm text-neutral-900 leading-none mb-1">{reg.jamaah.nama_lengkap}</span>
                                                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{reg.keberangkatan.paket_umroh.nama_paket}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Badge className={cn(
                                                "rounded-lg px-2 py-0.5 font-black text-[8px] uppercase tracking-widest border-none",
                                                reg.status === 'lunas' ? "bg-green-600" :
                                                reg.status === 'dp' ? "bg-blue-600" : "bg-amber-500"
                                            )}>
                                                {reg.status}
                                            </Badge>
                                            <span className="text-[9px] font-bold text-neutral-400 italic">{formatDate(reg.created_at)}</span>
                                        </div>
                                    </div>
                                ))}
                                {recentRegistrations.length === 0 && (
                                    <div className="h-32 flex items-center justify-center text-neutral-400 font-bold italic text-sm">
                                        Belum ada pendaftaran.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Payments */}
                    <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden">
                        <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-emerald-600" />
                                    Transaksi Terakhir
                                </CardTitle>
                                <p className="text-xs text-neutral-400 font-medium italic">Pembayaran terbaru dari jamaah.</p>
                            </div>
                            <Button asChild variant="ghost" size="sm" className="rounded-xl font-bold text-xs hover:bg-emerald-50 text-emerald-600">
                                <Link href={route('admin.pendaftaran.index')}>Detail</Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="p-8 pt-4">
                            <div className="space-y-4">
                                {recentPayments.map((pay) => (
                                    <div key={pay.id} className="flex items-center justify-between p-5 rounded-[24px] bg-neutral-50/50 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-neutral-100">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                                                <CreditCard className="h-5 w-5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-sm text-neutral-900 leading-none mb-1">{pay.pendaftaran.jamaah.nama_lengkap}</span>
                                                <span className="text-[10px] font-black text-emerald-600 tracking-widest">{formatCurrency(pay.jumlah)}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Badge className={cn(
                                                "rounded-lg px-2 py-0.5 font-black text-[8px] uppercase tracking-widest border-none",
                                                pay.status === 'sukses' ? "bg-green-600" :
                                                pay.status === 'gagal' ? "bg-red-600" : "bg-amber-500"
                                            )}>
                                                {pay.status}
                                            </Badge>
                                            <span className="text-[9px] font-bold text-neutral-400 italic uppercase">{pay.metode}</span>
                                        </div>
                                    </div>
                                ))}
                                {recentPayments.length === 0 && (
                                    <div className="h-32 flex items-center justify-center text-neutral-400 font-bold italic text-sm">
                                        Belum ada transaksi.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions / Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-none shadow-xl rounded-[32px] bg-neutral-900 text-white overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-500">
                            <Package className="h-24 w-24" />
                        </div>
                        <CardContent className="p-8">
                            <h4 className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2">Master Data</h4>
                            <p className="text-lg font-black leading-tight mb-6">Kelola Paket Umroh & Fasilitas</p>
                            <Button asChild variant="outline" size="sm" className="bg-transparent border-white/20 hover:bg-white hover:text-black rounded-xl font-bold text-xs gap-2">
                                <Link href={route('admin.paket-umroh.index')}>
                                    Eksplorasi <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl rounded-[32px] bg-blue-700 text-white overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-500">
                            <ShieldCheck className="h-24 w-24" />
                        </div>
                        <CardContent className="p-8">
                            <h4 className="text-blue-200 text-[10px] font-black uppercase tracking-widest mb-2">Operasional</h4>
                            <p className="text-lg font-black leading-tight mb-6">Verifikasi Dokumen Jamaah</p>
                            <Button asChild variant="outline" size="sm" className="bg-transparent border-white/20 hover:bg-white hover:text-black rounded-xl font-bold text-xs gap-2">
                                <Link href={route('admin.dokumen.index')}>
                                    Mulai Verifikasi <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl rounded-[32px] bg-neutral-100 text-neutral-900 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-500">
                            <Clock className="h-24 w-24 text-neutral-400" />
                        </div>
                        <CardContent className="p-8">
                            <h4 className="text-neutral-400 text-[10px] font-black uppercase tracking-widest mb-2">Penjadwalan</h4>
                            <p className="text-lg font-black leading-tight mb-6">Kelola Batch Keberangkatan</p>
                            <Button asChild variant="outline" size="sm" className="bg-white border-neutral-200 hover:bg-black hover:text-white rounded-xl font-bold text-xs gap-2">
                                <Link href={route('admin.keberangkatan.index')}>
                                    Lihat Jadwal <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '#' },
    ],
};
