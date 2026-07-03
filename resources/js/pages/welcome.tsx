import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import AppLogoIcon from '@/components/app-logo-icon';
import { 
    Plane, 
    Hotel, 
    Calendar, 
    ArrowRight, 
    ShieldCheck, 
    Clock, 
    Users, 
    Check, 
    Compass, 
    Sparkles, 
    MapPin, 
    Phone, 
    Mail, 
    Award,
    HeartHandshake
} from 'lucide-react';

interface Fasilitas {
    id: number;
    nama: string;
    tipe: string;
    pivot: {
        keterangan: string;
    };
}

interface Keberangkatan {
    id: number;
    tanggal_berangkat: string;
    tanggal_pulang: string;
    kuota: number;
    sisa_kuota: number;
    keterangan: string;
}

interface Paket {
    id: number;
    nama_paket: string;
    harga: string | number;
    durasi_hari: number;
    maskapai: string;
    hotel: string;
    deskripsi: string;
    kuota: number;
    fasilitas?: Fasilitas[];
    keberangkatan?: Keberangkatan[];
}

interface PageProps {
    canRegister?: boolean;
    paketUmroh?: Paket[];
}

export default function Welcome({
    canRegister = true,
    paketUmroh = [],
}: PageProps) {
    const { auth, name = 'Mahira Tour' } = usePage().props as any;

    const formatRupiah = (value: number | string) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(Number(value));
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <>
            <Head title="Mahira Tour & Travel - Akomodasi Umroh Premium & Sesuai Sunnah" />
            
            <div className="min-h-screen bg-slate-50 text-[#1b1b18] dark:bg-[#07090e] dark:text-neutral-200 selection:bg-emerald-600 selection:text-white transition-colors duration-300">
                
                {/* Navbar */}
                <header className="sticky top-0 z-50 w-full border-b border-neutral-200/50 bg-white/80 backdrop-blur-md dark:border-emerald-950/20 dark:bg-[#07090e]/80">
                    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-md shadow-emerald-700/10 dark:bg-emerald-600">
                                <AppLogoIcon className="h-6 w-6 fill-current" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-extrabold tracking-wider text-emerald-900 dark:text-amber-100 uppercase">
                                    {name}
                                </span>
                                <span className="text-[10px] tracking-widest text-amber-600 dark:text-amber-400 font-bold uppercase -mt-1">
                                    Tour & Travel
                                </span>
                            </div>
                        </Link>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                            <a href="#tentang" className="hover:text-emerald-700 dark:hover:text-amber-400 transition-colors">Tentang Kami</a>
                            <a href="#paket" className="hover:text-emerald-700 dark:hover:text-amber-400 transition-colors">Paket Umroh</a>
                            <a href="#fitur" className="hover:text-emerald-700 dark:hover:text-amber-400 transition-colors">Fasilitas</a>
                            <a href="#kontak" className="hover:text-emerald-700 dark:hover:text-amber-400 transition-colors">Kontak</a>
                        </nav>

                        {/* Auth Navigation */}
                        <div className="flex items-center gap-3">
                            {auth?.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all hover:scale-102"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-sm font-semibold text-neutral-600 hover:text-emerald-700 dark:text-neutral-300 dark:hover:text-amber-400 transition-colors px-3 py-2"
                                    >
                                        Masuk
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="inline-flex items-center gap-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm px-5 py-2.5 shadow-md shadow-amber-500/10 transition-all hover:scale-102 dark:bg-amber-500 dark:hover:bg-amber-400"
                                        >
                                            Daftar
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-[#022c22] via-[#011c15] to-[#0d1527] py-24 text-white lg:py-32">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />
                    <div 
                        className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0l5.88 17.12L53 17.12l-13.88 10.64L45 45 30 34.24 15 45l5.88-17.24L7 17.12h17.12L30 0z' fill='%23fbbf24' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                            backgroundSize: '30px 30px'
                        }}
                    />

                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
                            {/* Text content */}
                            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300">
                                    <Sparkles className="h-4 w-4" />
                                    <span>Penyelenggara Umroh & Haji Terpercaya</span>
                                </div>
                                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl leading-tight">
                                    Wujudkan Perjalanan <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Umroh yang Sunnah</span> & Premium
                                </h1>
                                <p className="text-lg leading-8 text-emerald-100/80 max-w-2xl mx-auto lg:mx-0">
                                    Bersama {name}, jalani ibadah suci ke Baitullah dengan tenang, aman, dan nyaman didampingi pembimbing yang berkompeten sesuai tuntunan Rasulullah SAW.
                                </p>
                                
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                    <a
                                        href="#paket"
                                        className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-base font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all hover:scale-102"
                                    >
                                        Lihat Paket Umroh
                                        <ArrowRight className="h-5 w-5" />
                                    </a>
                                    <a
                                        href="https://wa.me/628111111111"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-all"
                                    >
                                        <Phone className="h-5 w-5 text-amber-400" />
                                        Konsultasi Gratis
                                    </a>
                                </div>

                                {/* Quick Stats */}
                                <div className="pt-8 border-t border-emerald-900/50 grid grid-cols-3 gap-6 text-center lg:text-left">
                                    <div>
                                        <div className="text-3xl font-extrabold text-amber-400">1,500+</div>
                                        <div className="text-xs text-emerald-200/60 mt-1 uppercase font-semibold tracking-wider">Jamaah Berangkat</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-extrabold text-amber-400">99.8%</div>
                                        <div className="text-xs text-emerald-200/60 mt-1 uppercase font-semibold tracking-wider">Tingkat Kepuasan</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-extrabold text-amber-400">100%</div>
                                        <div className="text-xs text-emerald-200/60 mt-1 uppercase font-semibold tracking-wider">Pasti Berangkat</div>
                                    </div>
                                </div>
                            </div>

                            {/* Visual Artwork/Card Side */}
                            <div className="lg:col-span-5 relative flex justify-center">
                                <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-3xl bg-gradient-to-tr from-emerald-800 to-amber-500 p-[1px] shadow-2xl">
                                    <div className="h-full w-full rounded-3xl bg-neutral-950/80 p-8 flex flex-col justify-between overflow-hidden relative">
                                        {/* BG decorative rings */}
                                        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full border border-amber-500/10" />
                                        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full border border-emerald-500/10" />
                                        
                                        <div className="flex justify-between items-start z-10">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
                                                <Compass className="h-7 w-7 animate-spin-slow" />
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 border border-amber-500/20 rounded-full px-3 py-1 bg-amber-500/5">
                                                Premium
                                            </span>
                                        </div>

                                        <div className="z-10 space-y-4">
                                            <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">Jaminan Mahira</span>
                                            <h3 className="text-2xl font-bold text-white tracking-tight">
                                                Layanan Umroh Terbaik Setulus Hati
                                            </h3>
                                            <p className="text-sm text-neutral-400 leading-relaxed">
                                                Kami memastikan akomodasi bintang 4 & 5 terdekat dari Masjidil Haram, penerbangan direct tanpa transit, serta sajian menu nusantara untuk kenyamanan ibadah Anda.
                                            </p>
                                        </div>

                                        <div className="border-t border-neutral-800 pt-4 flex items-center justify-between z-10">
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                                                <span className="text-xs font-semibold text-neutral-300">Izin Kemenag Resmi</span>
                                            </div>
                                            <span className="text-xs text-neutral-400">PPIU No. 91203001</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features (Mengapa Memilih Kami) */}
                <section id="tentang" className="py-24 bg-white dark:bg-[#0a0c14]">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center space-y-4">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-amber-400">Mengapa Memilih Kami</h2>
                            <p className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                                Keutamaan Layanan {name}
                            </p>
                            <p className="text-lg text-neutral-500 dark:text-neutral-400">
                                Komitmen kami adalah memberikan rasa aman dan kekhusyukan maksimal sepanjang perjalanan ibadah Anda.
                             </p>
                        </div>

                        <div className="mx-auto mt-16 max-w-5xl sm:mt-20 lg:mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {/* Card 1 */}
                            <div className="relative flex flex-col justify-between rounded-2xl border border-neutral-100 bg-neutral-50/50 p-8 dark:border-neutral-800 dark:bg-neutral-900/30 hover:border-emerald-700/30 transition-all hover:-translate-y-1 duration-300">
                                <div className="space-y-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                                        <Award className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Pembimbing Sunnah</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                        Ibadah didampingi oleh Ustadz berpengalaman yang membimbing sesuai tuntunan Al-Quran dan Sunnah.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="relative flex flex-col justify-between rounded-2xl border border-neutral-100 bg-neutral-50/50 p-8 dark:border-neutral-800 dark:bg-neutral-900/30 hover:border-emerald-700/30 transition-all hover:-translate-y-1 duration-300">
                                <div className="space-y-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                                        <Hotel className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Hotel Dekat Pelataran</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                        Akomodasi hotel bintang 4 & 5 dengan jarak dekat ke Masjidil Haram dan Masjid Nabawi.
                                    </p>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="relative flex flex-col justify-between rounded-2xl border border-neutral-100 bg-neutral-50/50 p-8 dark:border-neutral-800 dark:bg-neutral-900/30 hover:border-emerald-700/30 transition-all hover:-translate-y-1 duration-300">
                                <div className="space-y-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                                        <Plane className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Penerbangan Terbaik</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                        Menggunakan maskapai ternama seperti Garuda Indonesia & Saudia Airlines direct tanpa transit.
                                    </p>
                                </div>
                            </div>

                            {/* Card 4 */}
                            <div className="relative flex flex-col justify-between rounded-2xl border border-neutral-100 bg-neutral-50/50 p-8 dark:border-neutral-800 dark:bg-neutral-900/30 hover:border-emerald-700/30 transition-all hover:-translate-y-1 duration-300">
                                <div className="space-y-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400">
                                        <HeartHandshake className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Layanan Sepenuh Hati</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                        Tim handling muthawif lokal di Makkah & Madinah siap melayani kebutuhan jamaah 24 jam.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Packages Section */}
                <section id="paket" className="py-24 bg-neutral-50 dark:bg-[#07090e]">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center space-y-4">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-amber-400">Pilihan Paket Ibadah</h2>
                            <p className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                                Paket Umroh Unggulan Kami
                            </p>
                            <p className="text-lg text-neutral-500 dark:text-neutral-400">
                                Pilihan paket umroh dengan jadwal keberangkatan terencana, akomodasi premium, dan harga transparan.
                            </p>
                        </div>

                        {/* Packages Grid */}
                        <div className="mx-auto mt-16 grid max-w-md grid-cols-1 gap-10 lg:max-w-none lg:grid-cols-3">
                            {paketUmroh.length > 0 ? (
                                paketUmroh.map((paket) => {
                                    const nearestKeberangkatan = paket.keberangkatan && paket.keberangkatan.length > 0
                                        ? paket.keberangkatan[0]
                                        : null;

                                    return (
                                        <div 
                                            key={paket.id} 
                                            className="flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200/60 bg-white shadow-lg hover:shadow-xl dark:border-neutral-900 dark:bg-[#11131c] transition-all hover:-translate-y-1.5 duration-300"
                                        >
                                            <div className="p-8">
                                                {/* Header */}
                                                <div className="flex items-center justify-between gap-4">
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        {paket.durasi_hari} Hari
                                                    </span>
                                                    {paket.kuota > 30 ? (
                                                        <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">Grup Besar</span>
                                                    ) : (
                                                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Grup Eksklusif</span>
                                                    )}
                                                </div>

                                                <h3 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                                                    {paket.nama_paket}
                                                </h3>
                                                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                                                    {paket.deskripsi}
                                                </p>

                                                {/* Price */}
                                                <div className="mt-6 border-b border-neutral-100 pb-6 dark:border-neutral-800">
                                                    <span className="text-sm font-semibold text-neutral-400">Harga Paket</span>
                                                    <div className="mt-1 flex items-baseline">
                                                        <span className="text-3xl font-extrabold text-emerald-800 dark:text-amber-400 tracking-tight">
                                                            {formatRupiah(paket.harga)}
                                                        </span>
                                                        <span className="text-sm text-neutral-400 ml-1">/ Pax</span>
                                                    </div>
                                                </div>

                                                {/* Details list */}
                                                <ul className="mt-6 space-y-4 text-sm text-neutral-600 dark:text-neutral-300">
                                                    <li className="flex items-center gap-3">
                                                        <Plane className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                                        <span>{paket.maskapai} (Direct)</span>
                                                    </li>
                                                    <li className="flex items-center gap-3">
                                                        <Hotel className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                                        <span>{paket.hotel}</span>
                                                    </li>
                                                    {nearestKeberangkatan ? (
                                                        <li className="flex items-center gap-3">
                                                            <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                                            <div className="flex flex-col">
                                                                <span className="font-medium">Jadwal Keberangkatan:</span>
                                                                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                                                    {formatDate(nearestKeberangkatan.tanggal_berangkat)}
                                                                </span>
                                                            </div>
                                                        </li>
                                                    ) : (
                                                        <li className="flex items-center gap-3 text-amber-600 dark:text-amber-400 font-medium">
                                                            <Calendar className="h-5 w-5 shrink-0" />
                                                            <span>Hubungi Admin untuk Jadwal</span>
                                                        </li>
                                                    )}
                                                    {nearestKeberangkatan && (
                                                        <li className="flex items-center gap-3">
                                                            <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                                            <span>Kuota Tersisa: <strong className="text-amber-600 dark:text-amber-400">{nearestKeberangkatan.sisa_kuota}</strong> / {nearestKeberangkatan.kuota} Kursi</span>
                                                        </li>
                                                    )}
                                                </ul>

                                                {/* Facilities checklist */}
                                                {paket.fasilitas && paket.fasilitas.length > 0 && (
                                                    <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                                                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Fasilitas Termasuk:</span>
                                                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                                                            {paket.fasilitas.slice(0, 4).map((f) => (
                                                                <div key={f.id} className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
                                                                    <Check className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                                                                    <span className="truncate" title={`${f.nama} (${f.pivot.keterangan})`}>
                                                                        {f.nama}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* CTA Button */}
                                            <div className="bg-neutral-50/50 p-6 dark:bg-neutral-900/10 border-t border-neutral-100 dark:border-neutral-850">
                                                {auth?.user ? (
                                                    <Link
                                                        href={dashboard()}
                                                        className="block w-full text-center rounded-xl bg-emerald-700 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors"
                                                    >
                                                        Daftar & Pesan Sekarang
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        href={login()}
                                                        className="block w-full text-center rounded-xl border border-emerald-700/25 bg-white py-3 text-sm font-bold text-emerald-800 hover:bg-emerald-50 dark:border-emerald-600/35 dark:bg-transparent dark:text-emerald-400 dark:hover:bg-emerald-950/20 transition-colors"
                                                    >
                                                        Masuk untuk Memesan
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                // Placeholder states if database has no seeded data yet
                                [1, 2, 3].map((item) => (
                                    <div key={item} className="flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 dark:border-neutral-900 dark:bg-[#11131c]">
                                        <div className="space-y-6">
                                            <div className="h-6 w-24 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                                            <div className="h-8 w-48 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                                            <div className="h-20 w-full rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                                        </div>
                                        <div className="mt-8 h-12 w-full rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>

                {/* FAQ / Trust Indicators */}
                <section className="py-24 bg-white dark:bg-[#0a0c14]">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-amber-400">Komitmen Layanan</h2>
                            <p className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                                5 Pasti Umroh Bersama Mahira
                            </p>
                        </div>

                        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-neutral-900/20">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 font-bold text-lg">1</div>
                                <div>
                                    <h3 className="font-bold text-neutral-900 dark:text-white">Pasti Travelnya Berizin</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Kami terdaftar resmi sebagai Penyelenggara Perjalanan Ibadah Umroh (PPIU) di Kementerian Agama RI.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-neutral-900/20">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 font-bold text-lg">2</div>
                                <div>
                                    <h3 className="font-bold text-neutral-900 dark:text-white">Pasti Jadwal & Tiketnya</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Jadwal keberangkatan pasti dan tiket penerbangan PP sudah dibooking (issued) jauh hari.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-neutral-900/20">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 font-bold text-lg">3</div>
                                <div>
                                    <h3 className="font-bold text-neutral-900 dark:text-white">Pasti Tarif Layanan & Paketnya</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Harga transparan sesuai brosur tanpa biaya tambahan tersembunyi selama di tanah suci.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-neutral-900/20">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 font-bold text-lg">4</div>
                                <div>
                                    <h3 className="font-bold text-neutral-900 dark:text-white">Pasti Hotel & Akomodasinya</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Hotel tempat menginap terjamin kenyamanan dan lokasinya, sesuai yang dijanjikan dalam paket.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer id="kontak" className="bg-[#021f18] text-neutral-300 dark:bg-[#03060c] pt-20 pb-10 border-t border-emerald-950/40">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-emerald-950/80">
                        {/* Column 1 - Brand Info */}
                        <div className="md:col-span-5 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
                                    <AppLogoIcon className="h-6 w-6 fill-current" />
                                </div>
                                <span className="text-xl font-bold tracking-wider text-amber-100 uppercase">{name}</span>
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                {name} adalah agen perjalanan umroh dan haji yang mengutamakan legalitas resmi, pelayanan prima, akomodasi berkelas, dan bimbingan ibadah terpercaya sesuai Al-Quran dan Sunnah.
                            </p>
                            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                                <span className="rounded-full bg-amber-400/10 px-3.5 py-1 border border-amber-400/20">PPIU Resmi Kemenag</span>
                            </div>
                        </div>

                        {/* Column 2 - Quick Links */}
                        <div className="md:col-span-3 space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-100">Navigasi Cepat</h3>
                            <ul className="space-y-3.5 text-sm">
                                <li><a href="#tentang" className="hover:text-amber-300 transition-colors">Tentang Kami</a></li>
                                <li><a href="#paket" className="hover:text-amber-300 transition-colors">Paket Umroh</a></li>
                                <li><a href="#fitur" className="hover:text-amber-300 transition-colors">Fasilitas & Perlengkapan</a></li>
                                <li>
                                    <Link href={login()} className="hover:text-amber-300 transition-colors">
                                        Pendaftaran Online
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3 - Contacts & Office */}
                        <div className="md:col-span-4 space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-100">Kontak & Kantor</h3>
                            <ul className="space-y-4 text-sm text-neutral-400">
                                <li className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                                    <span>Jl. Sudirman No. 123, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-amber-400 shrink-0" />
                                    <a href="tel:081111111111" className="hover:text-white transition-colors">0811-1111-1111</a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-amber-400 shrink-0" />
                                    <a href="mailto:info@mahiratour.com" className="hover:text-white transition-colors">info@mahiratour.com</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Line */}
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
                        <p>&copy; {new Date().getFullYear()} {name}. Seluruh hak cipta dilindungi.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-neutral-400 transition-colors">Syarat & Ketentuan</a>
                            <a href="#" className="hover:text-neutral-400 transition-colors">Kebijakan Privasi</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
