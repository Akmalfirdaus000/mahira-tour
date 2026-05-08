import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    CheckCircle2, 
    Clock, 
    CreditCard, 
    FileText, 
    Plane, 
    ArrowRight,
    MapPin,
    Calendar,
    ChevronRight,
    Loader2,
    History
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface PageProps {
    active_pendaftaran: any;
    all_pendaftaran: any[];
    stats: {
        documents_uploaded: number;
        documents_total: number;
        payment_amount: number;
        payment_target: number;
        payment_percentage: number;
    } | null;
}

export default function StatusPage({ active_pendaftaran, all_pendaftaran, stats }: PageProps) {
    const handleSwitchPendaftaran = (id: string) => {
        router.get(route('jamaah.status', { id }));
    };

    if (!active_pendaftaran) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center gap-6">
                <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                    <Plane className="h-12 w-12 text-muted-foreground opacity-20" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-black">Belum Ada Pendaftaran Aktif</h2>
                    <p className="text-muted-foreground italic">Anda belum memiliki rencana perjalanan umroh. Silakan pilih paket untuk memulai.</p>
                </div>
                <Button asChild className="bg-amber-600 hover:bg-amber-700 rounded-xl px-8">
                    <Link href={route('jamaah.paket-umroh')}>Lihat Paket Umroh</Link>
                </Button>
            </div>
        );
    }

    const steps = [
        { 
            id: 1, 
            title: 'Pendaftaran', 
            desc: 'Pendaftaran berhasil dibuat', 
            status: 'completed', 
            icon: CheckCircle2,
            link: route('jamaah.pendaftaran')
        },
        { 
            id: 2, 
            title: 'Dokumen Persyaratan', 
            desc: `${stats?.documents_uploaded}/${stats?.documents_total} Dokumen Terunggah`, 
            status: stats?.documents_uploaded === stats?.documents_total ? 'completed' : 'current', 
            icon: FileText,
            link: route('jamaah.dokumen')
        },
        { 
            id: 3, 
            title: 'Pembayaran', 
            desc: stats?.payment_percentage === 100 ? 'Sudah Lunas' : `Terbayar ${stats?.payment_percentage}%`, 
            status: stats?.payment_percentage === 100 ? 'completed' : (stats?.payment_percentage && stats.payment_percentage > 0 ? 'current' : 'upcoming'), 
            icon: CreditCard,
            link: route('jamaah.pembayaran')
        },
        { 
            id: 4, 
            title: 'Keberangkatan', 
            desc: `Dijadwalkan ${new Intl.DateTimeFormat('id-ID').format(new Date(active_pendaftaran.keberangkatan.tanggal_berangkat))}`, 
            status: 'upcoming', 
            icon: Plane 
        },
    ];

    return (
        <>
            <Head title="Status Perjalanan" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-black text-foreground">Status Perjalanan Anda</h1>
                        <p className="text-muted-foreground italic">Pantau progres persiapan ibadah umroh Anda dalam satu halaman.</p>
                    </div>

                    {all_pendaftaran.length > 1 && (
                        <div className="flex flex-col gap-1.5 min-w-[280px]">
                            <Label className="text-[10px] font-bold uppercase text-muted-foreground ml-1">Pilih Pendaftaran</Label>
                            <Select value={active_pendaftaran.id.toString()} onValueChange={handleSwitchPendaftaran}>
                                <SelectTrigger className="h-12 rounded-xl bg-white shadow-sm border-2 border-neutral-100">
                                    <div className="flex items-center gap-2">
                                        <History className="h-4 w-4 text-amber-600" />
                                        <SelectValue placeholder="Pilih Pendaftaran" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-2">
                                    {all_pendaftaran.map((p) => (
                                        <SelectItem key={p.id} value={p.id.toString()} className="py-3 rounded-xl">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="font-bold text-xs">{p.keberangkatan.paket_umroh.nama_paket}</span>
                                                <span className="text-[10px] text-muted-foreground italic">
                                                    Daftar: {new Intl.DateTimeFormat('id-ID').format(new Date(p.tanggal_daftar))}
                                                </span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Progress Timeline */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                            <CardHeader className="bg-blue-600 text-white p-8">
                                <CardTitle className="text-xl flex items-center gap-3">
                                    <Loader2 className="h-6 w-6 animate-spin-slow" />
                                    Progres Persiapan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="space-y-8">
                                    {steps.map((step, idx) => (
                                        <div key={step.id} className="relative flex gap-6">
                                            {/* Connector Line */}
                                            {idx !== steps.length - 1 && (
                                                <div className={cn(
                                                    "absolute left-[23px] top-[48px] w-0.5 h-[calc(100%-16px)]",
                                                    step.status === 'completed' ? "bg-green-500" : "bg-muted-foreground/20"
                                                )} />
                                            )}
                                            
                                            {/* Step Icon */}
                                            <div className={cn(
                                                "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 z-10 shadow-lg transition-all",
                                                step.status === 'completed' && "bg-green-100 text-green-600 shadow-green-200",
                                                step.status === 'current' && "bg-blue-600 text-white shadow-blue-300 ring-4 ring-blue-50",
                                                step.status === 'upcoming' && "bg-muted text-muted-foreground"
                                            )}>
                                                <step.icon className="h-6 w-6" />
                                            </div>

                                            {/* Step Info */}
                                            <div className="flex-1 pb-4">
                                                <div className="flex items-center justify-between">
                                                    <h4 className={cn(
                                                        "font-black text-lg",
                                                        step.status === 'upcoming' ? "text-muted-foreground" : "text-foreground"
                                                    )}>
                                                        {step.title}
                                                    </h4>
                                                    {step.link && (
                                                        <Link href={step.link} className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                                                            Detail <ChevronRight className="h-3 w-3" />
                                                        </Link>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground italic">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Summary Cards */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-amber-500 text-white relative">
                            <CardContent className="p-8 space-y-6">
                                {(() => {
                                    const departureDate = new Date(active_pendaftaran.keberangkatan.tanggal_berangkat);
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    const diffTime = departureDate.getTime() - today.getTime();
                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                    
                                    return (
                                        <div className="absolute top-6 right-6 flex flex-col items-end">
                                            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 text-center">
                                                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-none mb-1">Countdown</p>
                                                <p className="text-2xl font-black leading-none">
                                                    {diffDays > 0 ? `H-${diffDays}` : (diffDays === 0 ? 'Hari Ini' : 'Berangkat')}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })()}

                                <div className="space-y-1 pr-24">
                                    <p className="text-xs font-bold uppercase opacity-80">Paket Saat Ini</p>
                                    <h3 className="text-2xl font-black leading-tight">{active_pendaftaran.keberangkatan.paket_umroh.nama_paket}</h3>
                                </div>
                                <div className="space-y-4 pt-4 border-t border-white/20">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 opacity-80" />
                                        <span className="text-sm font-bold">Berangkat: {new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(active_pendaftaran.keberangkatan.tanggal_berangkat))}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 opacity-80" />
                                        <span className="text-sm font-bold">{active_pendaftaran.keberangkatan.paket_umroh.hotel}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Persentase Pelunasan</CardTitle>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 space-y-4 text-center">
                                <div className="relative h-32 w-32 mx-auto">
                                    <svg className="h-full w-full" viewBox="0 0 36 36">
                                        <path
                                            className="text-muted stroke-current"
                                            strokeWidth="3"
                                            fill="none"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path
                                            className="text-amber-500 stroke-current transition-all duration-1000 ease-out"
                                            strokeDasharray={`${stats?.payment_percentage}, 100`}
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            fill="none"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                        <span className="text-2xl font-black">{stats?.payment_percentage}%</span>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground italic leading-relaxed">
                                    {stats?.payment_percentage === 100 
                                        ? 'Pembayaran telah lunas. Terima kasih!' 
                                        : `Kurang ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format((stats?.payment_target ?? 0) - (stats?.payment_amount ?? 0))} untuk pelunasan.`}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

function Button({ children, className, asChild }: any) {
    return (
        <div className={cn("inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", className)}>
            {children}
        </div>
    );
}

StatusPage.layout = {
    breadcrumbs: [
        { title: 'Beranda', href: '/jamaah/beranda' },
        { title: 'Status', href: '/jamaah/status' },
    ],
};
