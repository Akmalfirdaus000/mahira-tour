import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    Users, 
    ClipboardCheck, 
    CreditCard, 
    Package, 
    Plane,
    TrendingUp,
    ArrowUpRight,
    Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    stats: {
        total_jamaah: number;
        total_pendaftaran: number;
        total_pembayaran: number;
        paket_aktif: number;
    };
    keberangkatan_terdekat: any[];
    monthly_revenue: any[];
}

export default function SuperAdminDashboard({ stats, keberangkatan_terdekat, monthly_revenue }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <>
            <Head title="Super Admin Dashboard" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-black text-foreground">Overview <span className="text-blue-600">Super Admin</span></h1>
                    <p className="text-muted-foreground italic">Selamat datang kembali. Berikut adalah ringkasan performa bisnis Anda.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-none shadow-xl rounded-[32px] bg-blue-600 text-white overflow-hidden relative">
                        <CardContent className="p-8">
                            <Users className="absolute -right-4 -bottom-4 h-24 w-24 opacity-10 rotate-12" />
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Total Jamaah</p>
                            <h3 className="text-3xl font-black">{stats.total_jamaah}</h3>
                            <div className="mt-4 flex items-center gap-1 text-[10px] font-bold bg-white/20 w-fit px-2 py-0.5 rounded-full">
                                <TrendingUp className="h-3 w-3" /> +12% bln ini
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl rounded-[32px] bg-emerald-600 text-white overflow-hidden relative">
                        <CardContent className="p-8">
                            <ClipboardCheck className="absolute -right-4 -bottom-4 h-24 w-24 opacity-10 rotate-12" />
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Pendaftaran</p>
                            <h3 className="text-3xl font-black">{stats.total_pendaftaran}</h3>
                            <div className="mt-4 flex items-center gap-1 text-[10px] font-bold bg-white/20 w-fit px-2 py-0.5 rounded-full">
                                <ArrowUpRight className="h-3 w-3" /> Menunggu Review
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl rounded-[32px] bg-amber-500 text-white overflow-hidden relative">
                        <CardContent className="p-8">
                            <CreditCard className="absolute -right-4 -bottom-4 h-24 w-24 opacity-10 rotate-12" />
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Total Pemasukan</p>
                            <h3 className="text-2xl font-black">{formatCurrency(stats.total_pembayaran)}</h3>
                            <div className="mt-4 flex items-center gap-1 text-[10px] font-bold bg-white/20 w-fit px-2 py-0.5 rounded-full">
                                <TrendingUp className="h-3 w-3" /> Stabil
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl rounded-[32px] bg-neutral-900 text-white overflow-hidden relative">
                        <CardContent className="p-8">
                            <Package className="absolute -right-4 -bottom-4 h-24 w-24 opacity-10 rotate-12" />
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Paket Aktif</p>
                            <h3 className="text-3xl font-black">{stats.paket_aktif}</h3>
                            <div className="mt-4 flex items-center gap-1 text-[10px] font-bold bg-white/20 w-fit px-2 py-0.5 rounded-full">
                                <Calendar className="h-3 w-3" /> Musim Umroh
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Revenue Chart Placeholder / Simple List */}
                    <Card className="lg:col-span-2 border-none shadow-xl rounded-[40px] p-8">
                        <CardHeader className="px-0 pt-0">
                            <CardTitle className="text-xl font-black flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-blue-600" /> Grafik Pemasukan (6 Bln Terakhir)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-0 pb-0">
                            <div className="flex flex-col gap-4">
                                {monthly_revenue.map((row, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-20 text-xs font-bold text-neutral-400 uppercase">{row.month}</div>
                                        <div className="flex-1 h-8 bg-neutral-50 rounded-full overflow-hidden relative">
                                            <div 
                                                className="absolute inset-y-0 left-0 bg-blue-500 rounded-full transition-all duration-1000"
                                                style={{ width: `${(row.total / (Math.max(...monthly_revenue.map(r => r.total)) || 1)) * 100}%` }}
                                            />
                                            <div className="absolute inset-0 flex items-center px-4 text-[10px] font-black text-blue-900/50">
                                                {formatCurrency(row.total)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Departures */}
                    <Card className="border-none shadow-xl rounded-[40px] p-8 bg-neutral-50">
                        <CardHeader className="px-0 pt-0">
                            <CardTitle className="text-xl font-black flex items-center gap-2">
                                <Plane className="h-5 w-5 text-blue-600" /> Keberangkatan Terdekat
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-0 pb-0 space-y-4">
                            {keberangkatan_terdekat.length > 0 ? keberangkatan_terdekat.map((k, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white border border-neutral-100 shadow-sm flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-xs">{k.paket_umroh.nama_paket}</p>
                                        <p className="text-[10px] text-muted-foreground italic">{new Intl.DateTimeFormat('id-ID').format(new Date(k.tanggal_berangkat))}</p>
                                    </div>
                                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 rounded-lg border-none text-[8px] font-black uppercase">
                                        {k.kuota - (k.pendaftaran_count || 0)} Sisa
                                    </Badge>
                                </div>
                            )) : (
                                <div className="p-8 text-center text-neutral-400 italic text-sm">Belum ada jadwal terdekat</div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

SuperAdminDashboard.layout = (page: any) => ({
    breadcrumbs: [
        { title: 'Super Admin', href: route('super-admin.dashboard') },
        { title: 'Dashboard', href: '#' },
    ],
    children: page
});

function Badge({ children, className }: any) {
    return (
        <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}>
            {children}
        </div>
    );
}
