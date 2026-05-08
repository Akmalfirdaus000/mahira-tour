import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
    Calendar, 
    Package, 
    ArrowLeft, 
    CheckCircle2, 
    Clock, 
    CreditCard, 
    FileText, 
    AlertCircle,
    Info,
    ChevronRight,
    Plane,
    Building2,
    ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageProps {
    pendaftaran: any;
    summary: {
        total_harga: number;
        sudah_dibayar: number;
        total_pending: number;
        sisa_pembayaran: number;
    };
    documents: Record<string, any[]>;
    categories: any[];
}

export default function PendaftaranShow({ pendaftaran, summary, documents, categories }: PageProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    const getDeadline = (dateString: string) => {
        const date = new Date(dateString);
        date.setDate(date.getDate() - 45); // H-45
        return formatDate(date.toISOString());
    };

    const uploadedCount = categories.filter(cat => documents[cat.id] && documents[cat.id].length > 0).length;

    return (
        <>
            <Head title="Detail Pendaftaran" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <Link 
                    href={route('jamaah.pendaftaran')}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-amber-600 transition-colors w-fit"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Riwayat Pendaftaran
                </Link>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-black text-foreground">Detail Pendaftaran</h1>
                            <span className={cn(
                                "text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest",
                                pendaftaran.status === 'lunas' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                            )}>
                                {pendaftaran.status}
                            </span>
                        </div>
                        <p className="text-muted-foreground italic text-sm">ID Pendaftaran: #REG-{pendaftaran.id.toString().padStart(5, '0')}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <div className="text-right mr-4 hidden md:block">
                            <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Batas Pelunasan (H-45)</p>
                            <p className="text-sm font-bold text-neutral-900">{getDeadline(pendaftaran.keberangkatan.tanggal_berangkat)}</p>
                        </div>
                        <Button variant="outline" className="rounded-xl border-amber-200 text-amber-700 hover:bg-amber-50">
                            Download Invoice
                        </Button>
                        <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700">
                            <Link href={route('jamaah.status')}>Lihat Progres</Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Info & Documents */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Info Paket Card */}
                        <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                            <CardHeader className="bg-amber-500 text-white p-8">
                                <CardTitle className="text-2xl flex items-center gap-3">
                                    <Package className="h-7 w-7" />
                                    {pendaftaran.keberangkatan.paket_umroh.nama_paket}
                                </CardTitle>
                                <p className="text-amber-100 italic">Jadwal Keberangkatan: {formatDate(pendaftaran.keberangkatan.tanggal_berangkat)}</p>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                                                <Building2 className="h-5 w-5 text-amber-600" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Akomodasi Hotel</p>
                                                <p className="font-bold">{pendaftaran.keberangkatan.paket_umroh.hotel}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                                                <Plane className="h-5 w-5 text-amber-600" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Maskapai Penerbangan</p>
                                                <p className="font-bold">{pendaftaran.keberangkatan.paket_umroh.maskapai}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                                <FileText className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status Dokumen</p>
                                                <p className="font-bold">{uploadedCount} / {categories.length} Berkas Lengkap</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                                <ShieldCheck className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status Verifikasi</p>
                                                <p className="font-bold capitalize">{pendaftaran.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment List */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-black px-2">Riwayat Pembayaran</h3>
                            <div className="space-y-4">
                                {pendaftaran.pembayaran.length > 0 ? (
                                    pendaftaran.pembayaran.map((pay: any) => (
                                        <Card key={pay.id} className="border-none shadow-md rounded-2xl overflow-hidden">
                                            <CardContent className="p-6 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={cn(
                                                        "h-12 w-12 rounded-xl flex items-center justify-center",
                                                        pay.status === 'sukses' ? "bg-green-50 text-green-600" : 
                                                        pay.status === 'pending' ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"
                                                    )}>
                                                        <CreditCard className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-lg">{formatCurrency(pay.jumlah)}</p>
                                                        <p className="text-xs text-muted-foreground italic">{formatDate(pay.tanggal_bayar)} • {pay.metode.toUpperCase()}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <Badge className={cn(
                                                        "rounded-md px-2 py-0.5 font-black text-[8px] uppercase tracking-widest border-none",
                                                        pay.status === 'sukses' ? "bg-green-600" :
                                                        pay.status === 'pending' ? "bg-blue-600" : "bg-red-600"
                                                    )}>
                                                        {pay.status === 'pending' ? 'Menunggu Verifikasi' : pay.status}
                                                    </Badge>
                                                    {pay.status === 'pending' && <p className="text-[8px] font-bold text-blue-600 mt-1 italic">Harap tunggu admin</p>}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <div className="p-12 text-center border-2 border-dashed rounded-[32px] text-muted-foreground italic">
                                        Belum ada riwayat pembayaran.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Payment Center */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="border-none shadow-2xl rounded-[32px] overflow-hidden sticky top-8">
                            <CardHeader className="bg-blue-600 text-white p-8">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Pusat Pembayaran
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Total Harga Paket</span>
                                        <span className="font-bold">{formatCurrency(summary.total_harga)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-green-600 font-bold">
                                        <span>Total Sudah Verifikasi</span>
                                        <span>- {formatCurrency(summary.sudah_dibayar)}</span>
                                    </div>
                                    {summary.total_pending > 0 && (
                                        <div className="flex justify-between items-center text-sm text-blue-600 font-bold">
                                            <span>Menunggu Verifikasi</span>
                                            <span>{formatCurrency(summary.total_pending)}</span>
                                        </div>
                                    )}
                                    <div className="pt-4 border-t space-y-1">
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sisa Tagihan (Fix)</p>
                                        <p className="text-3xl font-black text-amber-600">{formatCurrency(summary.sisa_pembayaran)}</p>
                                        
                                        {summary.sisa_pembayaran > 0 ? (
                                            <p className="text-[10px] text-amber-700 font-bold italic mt-2">
                                                * Harap segera lakukan pelunasan atau bayar DP minimal 500rb.
                                            </p>
                                        ) : (
                                            <p className="text-[10px] text-green-700 font-bold italic mt-2">
                                                * Tagihan Anda sudah lunas. Terima kasih.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {summary.sisa_pembayaran > 0 ? (
                                        <>
                                            <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 flex items-start gap-3">
                                                <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                                                <p className="text-[10px] text-amber-800 italic leading-relaxed">
                                                    Batas akhir pelunasan paket adalah 45 hari sebelum keberangkatan (H-45).
                                                </p>
                                            </div>
                                            <Button asChild className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-lg font-black rounded-2xl shadow-lg shadow-blue-600/30 group">
                                                <Link href={route('jamaah.pembayaran.create', pendaftaran.id)}>
                                                    Bayar Sekarang
                                                    <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </Button>
                                        </>
                                    ) : (
                                        <Button disabled className="w-full h-16 bg-neutral-200 text-neutral-400 text-lg font-black rounded-2xl cursor-not-allowed">
                                            Sudah Lunas
                                            <CheckCircle2 className="h-5 w-5 ml-2" />
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

PendaftaranShow.layout = {
    breadcrumbs: [
        { title: 'Beranda', href: '/jamaah/beranda' },
        { title: 'Riwayat Pendaftaran', href: '/jamaah/pendaftaran' },
        { title: 'Detail', href: '#' },
    ],
};
