import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
    Calendar, 
    Plane, 
    MapPin, 
    CheckCircle2, 
    ArrowLeft, 
    Info, 
    Clock, 
    ShieldCheck,
    CreditCard,
    Check,
    Package
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PaketUmrohProps } from './components/paket-card';

interface ShowProps {
    paket: PaketUmrohProps;
}

export default function PaketDetail({ paket }: ShowProps) {
    const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
        paket.keberangkatan && paket.keberangkatan.length > 0 ? paket.keberangkatan[0].id : null
    );

    const formattedHarga = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(Number(paket.harga));

    const formatterDate = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <>
            <Head title={`Detail ${paket.nama_paket}`} />
            
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                {/* Back Link */}
                <Link 
                    href="/jamaah/paket-umroh" 
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-amber-600 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Daftar Paket
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Image & Basic Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden rounded-3xl shadow-xl">
                            <img 
                                src="https://images.unsplash.com/photo-1565552643983-61f22e831102?auto=format&fit=crop&q=80&w=1200" 
                                alt="Kaaba" 
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <div className="flex gap-2 mb-3">
                                    <Badge className="bg-amber-500 hover:bg-amber-600 border-none">Terpopuler</Badge>
                                    <Badge variant="outline" className="text-white border-white/40 backdrop-blur-md">{paket.durasi_hari} Hari</Badge>
                                </div>
                                <h1 className="text-3xl md:text-5xl font-black">{paket.nama_paket}</h1>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                                    <Info className="h-6 w-6 text-amber-500" />
                                    Deskripsi Paket
                                </h2>
                                <p className="text-muted-foreground leading-relaxed text-lg italic">
                                    {paket.deskripsi || "Tidak ada deskripsi tambahan untuk paket ini."}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="border-none bg-muted/30 shadow-none rounded-2xl overflow-hidden">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                                            <Plane className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">Maskapai</h4>
                                            <p className="text-muted-foreground">{paket.maskapai || '-'}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-none bg-muted/30 shadow-none rounded-2xl overflow-hidden">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                                            <MapPin className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">Akomodasi Hotel</h4>
                                            <p className="text-muted-foreground">{paket.hotel || '-'}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                                        <Plane className="h-6 w-6 text-amber-500" />
                                        ✈️ Fasilitas & Layanan
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {paket.fasilitas && paket.fasilitas.filter(f => f.tipe === 'fasilitas').length > 0 ? (
                                            paket.fasilitas.filter(f => f.tipe === 'fasilitas').map((f) => (
                                                <div key={f.id} className="flex items-start gap-3 bg-white dark:bg-neutral-900 p-4 rounded-xl border shadow-sm">
                                                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="font-semibold">{f.nama}</p>
                                                        <p className="text-sm text-muted-foreground italic">{f.pivot.keterangan}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-muted-foreground italic">Belum ada data fasilitas.</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                                        <Package className="h-6 w-6 text-blue-500" />
                                        🎒 Perlengkapan Umroh
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {paket.fasilitas && paket.fasilitas.filter(f => f.tipe === 'perlengkapan').length > 0 ? (
                                            paket.fasilitas.filter(f => f.tipe === 'perlengkapan').map((f) => (
                                                <div key={f.id} className="flex items-start gap-3 bg-white dark:bg-neutral-900 p-4 rounded-xl border shadow-sm">
                                                    <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="font-semibold">{f.nama}</p>
                                                        <p className="text-sm text-muted-foreground italic">{f.pivot.keterangan}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-muted-foreground italic">Belum ada data perlengkapan.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Pricing & Registration CTA */}
                    <div className="space-y-6">
                        <Card className="sticky top-10 overflow-hidden border-2 border-amber-500/20 rounded-3xl shadow-2xl">
                            <CardContent className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <p className="text-muted-foreground font-medium">Harga per Orang</p>
                                    <p className="text-4xl font-black text-amber-600 dark:text-amber-500">{formattedHarga}</p>
                                    <p className="text-sm text-muted-foreground">*Harga sudah termasuk biaya visa & manasik</p>
                                </div>

                                <div className="space-y-4 py-6 border-y border-sidebar-border">
                                    <h4 className="font-bold flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-amber-500" />
                                        Pilih Tanggal Keberangkatan
                                    </h4>
                                    <div className="space-y-3">
                                        {paket.keberangkatan && paket.keberangkatan.length > 0 ? (
                                            paket.keberangkatan.map((k) => (
                                                <div 
                                                    key={k.id} 
                                                    onClick={() => setSelectedScheduleId(k.id)}
                                                    className={cn(
                                                        "flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer",
                                                        selectedScheduleId === k.id 
                                                            ? "border-amber-500 bg-amber-50/50 dark:bg-amber-900/10" 
                                                            : "border-transparent bg-muted/50 hover:border-amber-500/30"
                                                    )}
                                                >
                                                    <div>
                                                        <p className="font-bold">{formatterDate.format(new Date(k.tanggal_berangkat))}</p>
                                                        <p className="text-xs text-muted-foreground">Sisa: {k.sisa_kuota} kursi</p>
                                                    </div>
                                                    <div className={cn(
                                                        "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                                                        selectedScheduleId === k.id 
                                                            ? "border-amber-500 bg-amber-500 text-white" 
                                                            : "border-amber-500/30"
                                                    )}>
                                                        {selectedScheduleId === k.id && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-red-500 text-sm font-medium">Maaf, kuota sudah habis atau jadwal belum tersedia.</p>
                                        )}
                                    </div>
                                </div>

                                <Button 
                                    className="w-full h-14 text-lg font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-2xl shadow-lg shadow-amber-600/30 disabled:opacity-50"
                                    disabled={!selectedScheduleId}
                                    asChild
                                >
                                    <Link href={selectedScheduleId ? route('jamaah.pendaftaran.konfirmasi', { keberangkatan_id: selectedScheduleId }) : '#'}>
                                        Daftar Sekarang
                                    </Link>
                                </Button>
                                
                                <div className="flex flex-col gap-4 text-center">
                                    <p className="text-sm text-muted-foreground">Butuh bantuan?</p>
                                    <Button variant="outline" className="rounded-xl border-amber-500/20 text-amber-600 hover:bg-amber-50">
                                        Hubungi CS via WhatsApp
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl space-y-4">
                             <div className="flex items-center gap-3">
                                <CreditCard className="h-6 w-6 text-amber-600" />
                                <h4 className="font-bold">Informasi Pembayaran</h4>
                             </div>
                             <p className="text-sm text-muted-foreground leading-relaxed">
                                Anda dapat melakukan DP minimal sebesar <strong>Rp 5.000.000</strong> untuk mengamankan kursi. Pelunasan maksimal 30 hari sebelum keberangkatan.
                             </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

PaketDetail.layout = {
    breadcrumbs: [
        {
            title: 'Beranda',
            href: '/jamaah/beranda',
        },
        {
            title: 'Paket Umroh',
            href: '/jamaah/paket-umroh',
        },
        {
            title: 'Detail Paket',
            href: '#',
        },
    ],
};

