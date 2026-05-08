import { Head, Link, usePage } from '@inertiajs/react';
import { 
    Package, 
    FileText, 
    CreditCard, 
    Activity, 
    ChevronRight, 
    Calendar,
    MapPin,
    ArrowRight,
    Star,
    Sparkles,
    ShieldCheck,
    MessageCircle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PageProps {
    active_pendaftaran: any;
    stats: {
        total_pendaftaran: number;
        uploaded_docs: number;
        total_payment: number;
    } | null;
}

export default function Beranda({ active_pendaftaran, stats }: PageProps) {
    const { auth } = usePage().props;
    
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const quickLinks = [
        { title: 'Paket Umroh', desc: 'Lihat pilihan paket terbaik', icon: Package, href: route('jamaah.paket-umroh'), color: 'bg-amber-500' },
        { title: 'Dokumen', desc: 'Upload berkas persyaratan', icon: FileText, href: route('jamaah.dokumen'), color: 'bg-blue-500' },
        { title: 'Pembayaran', desc: 'Konfirmasi bukti transfer', icon: CreditCard, href: route('jamaah.pembayaran'), color: 'bg-green-500' },
        { title: 'Status', desc: 'Cek progres persiapan', icon: Activity, href: route('jamaah.status'), color: 'bg-purple-500' },
    ];

    return (
        <>
            <Head title="Beranda" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                
                {/* Greeting Section */}
                <div className="relative overflow-hidden rounded-[40px] bg-neutral-900 p-8 md:p-12 text-white shadow-2xl">
                    <div className="relative z-10 space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-amber-400">
                            <Sparkles className="h-4 w-4" />
                            Selamat Datang Kembali
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                            Assalamu'alaikum,<br />
                            <span className="text-amber-500">{auth.user.name}</span>
                        </h1>
                        <p className="text-neutral-400 text-lg italic max-w-lg">
                            "Labbaikallahumma labbaik. Kami siap melayani perjalanan ibadah Anda menuju Baitullah dengan sepenuh hati."
                        </p>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-amber-600/20 blur-[100px]" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-blue-600/10 blur-[80px]" />
                    <Star className="absolute top-12 right-12 h-24 w-24 text-amber-500/10 rotate-12" />
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white dark:bg-neutral-900 group">
                        <CardContent className="p-8 flex items-center gap-6">
                            <div className="h-16 w-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 transition-transform group-hover:scale-110">
                                <Package className="h-8 w-8" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Pendaftaran</p>
                                <p className="text-3xl font-black">{stats?.total_pendaftaran || 0} <span className="text-sm font-medium text-muted-foreground">Kali</span></p>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white dark:bg-neutral-900 group">
                        <CardContent className="p-8 flex items-center gap-6">
                            <div className="h-16 w-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-110">
                                <FileText className="h-8 w-8" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Dokumen</p>
                                <p className="text-3xl font-black">{stats?.uploaded_docs || 0} <span className="text-sm font-medium text-muted-foreground">Berkas</span></p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white dark:bg-neutral-900 group">
                        <CardContent className="p-8 flex items-center gap-6">
                            <div className="h-16 w-16 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 transition-transform group-hover:scale-110">
                                <CreditCard className="h-8 w-8" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Total Bayar</p>
                                <p className="text-2xl font-black leading-none mt-1">{formatCurrency(stats?.total_payment || 0)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Active Plan / Featured */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-amber-600" />
                                Rencana Perjalanan
                            </h2>
                            {active_pendaftaran && (
                                <Link href={route('jamaah.status')} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                                    Lihat Detail Status <ArrowRight className="h-3 w-3" />
                                </Link>
                            )}
                        </div>

                        {active_pendaftaran ? (
                            <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white relative">
                                <CardContent className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
                                    <div className="flex-1 space-y-6">
                                        <div className="space-y-2">
                                            <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Paket Terpilih</p>
                                            <h3 className="text-3xl font-black leading-tight">{active_pendaftaran.keberangkatan.paket_umroh.nama_paket}</h3>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                                                    <Calendar className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase opacity-70">Berangkat</span>
                                                    <span className="text-sm font-bold">{new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(active_pendaftaran.keberangkatan.tanggal_berangkat))}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                                                    <MapPin className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase opacity-70">Hotel</span>
                                                    <span className="text-sm font-bold line-clamp-1">{active_pendaftaran.keberangkatan.paket_umroh.hotel}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl h-12 px-8">
                                            <Link href={route('jamaah.status')}>Cek Persiapan Saya</Link>
                                        </Button>
                                    </div>
                                    
                                    <div className="shrink-0 relative">
                                        <div className="h-40 w-40 rounded-full border-8 border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                                            {(() => {
                                                const departureDate = new Date(active_pendaftaran.keberangkatan.tanggal_berangkat);
                                                const today = new Date();
                                                today.setHours(0, 0, 0, 0);
                                                const diffDays = Math.ceil((departureDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                                                
                                                return (
                                                    <div className="text-center">
                                                        <p className="text-[10px] font-black uppercase tracking-tighter opacity-70">Sisa Hari</p>
                                                        <p className="text-4xl font-black leading-none">{diffDays > 0 ? diffDays : 0}</p>
                                                        <p className="text-xs font-bold mt-1">Hari Lagi</p>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                </CardContent>
                                <Sparkles className="absolute bottom-6 right-6 h-12 w-12 text-white/5" />
                            </Card>
                        ) : (
                            <Card className="border-2 border-dashed rounded-[40px] p-12 text-center flex flex-col items-center gap-6 bg-neutral-50 dark:bg-neutral-900/50">
                                <div className="h-20 w-20 rounded-full bg-white dark:bg-neutral-800 shadow-lg flex items-center justify-center">
                                    <Package className="h-10 w-10 text-neutral-300" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">Belum Ada Rencana Aktif</h3>
                                    <p className="text-muted-foreground italic text-sm">Anda belum mendaftar paket umroh manapun. Mulai perjalanan Anda sekarang.</p>
                                </div>
                                <Button asChild className="bg-amber-600 hover:bg-amber-700 rounded-2xl h-12 px-10">
                                    <Link href={route('jamaah.paket-umroh')}>Cari Paket Umroh</Link>
                                </Button>
                            </Card>
                        )}
                    </div>

                    {/* Quick Access */}
                    <div className="lg:col-span-4 space-y-6">
                        <h2 className="text-xl font-black uppercase tracking-tight px-2">Akses Cepat</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {quickLinks.map((link) => (
                                <Link key={link.title} href={link.href} className="group">
                                    <Card className="border-none shadow-lg rounded-[28px] overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                                        <CardContent className="p-4 flex items-center gap-4">
                                            <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-lg", link.color)}>
                                                <link.icon className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-sm leading-none">{link.title}</p>
                                                <p className="text-[10px] text-muted-foreground italic mt-1">{link.desc}</p>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                            
                            <Button variant="outline" className="w-full h-14 rounded-[28px] border-2 border-dashed border-neutral-200 text-muted-foreground flex items-center gap-3 hover:border-amber-500 hover:text-amber-600 transition-colors">
                                <MessageCircle className="h-5 w-5" />
                                <span className="font-bold text-xs uppercase tracking-widest">Bantuan CS</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Beranda.layout = {
    breadcrumbs: [
        { title: 'Beranda', href: '/jamaah/beranda' },
    ],
};
