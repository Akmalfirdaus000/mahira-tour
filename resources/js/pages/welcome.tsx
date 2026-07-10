import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import AppLogoIcon from '@/components/app-logo-icon';
import { 
import { cn } from "../lib/utils";
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
            
            <div className={cn('bg-slate-50', 'selection:bg-emerald-600', 'dark:bg-[#07090e]', 'min-h-screen', 'text-[#1b1b18]', 'selection:text-white', 'dark:text-neutral-200', 'transition-colors', 'duration-300')}>
                
                {/* Navbar */}
                <header className={cn('top-0', 'z-50', 'sticky', 'bg-white/80', 'dark:bg-[#07090e]/80', 'backdrop-blur-md', 'border-neutral-200/50', 'dark:border-emerald-950/20', 'border-b', 'w-full')}>
                    <div className={cn('flex', 'justify-between', 'items-center', 'mx-auto', 'px-6', 'lg:px-8', 'max-w-7xl', 'h-20')}>
                        {/* Logo */}
                        <Link href="/" className={cn('flex', 'items-center', 'gap-3')}>
                            <div className={cn('flex', 'justify-center', 'items-center', 'bg-emerald-700', 'dark:bg-emerald-600', 'shadow-emerald-700/10', 'shadow-md', 'rounded-xl', 'w-11', 'h-11', 'text-white')}>
                                <AppLogoIcon className={cn('fill-current', 'w-6', 'h-6')} />
                            </div>
                            <div className={cn('flex', 'flex-col')}>
                                <span className={cn('font-extrabold', 'text-emerald-900', 'dark:text-amber-100', 'text-lg', 'uppercase', 'tracking-wider')}>
                                    {name}
                                </span>
                                <span className={cn('-mt-1', 'font-bold', 'text-[10px]', 'text-amber-600', 'dark:text-amber-400', 'uppercase', 'tracking-widest')}>
                                    Tour & Travel aaaaaaaaaaaaaaaaaaaaaa
                                </span>
                            </div>
                        </Link>

                        {/* Navigation Links */}
                        <nav className={cn('hidden', 'md:flex', 'items-center', 'gap-8', 'font-medium', 'text-neutral-600', 'dark:text-neutral-400', 'text-sm')}>
                            <a href="#tentang" className={cn('hover:text-emerald-700', 'dark:hover:text-amber-400', 'transition-colors')}>Tentang Kami</a>
                            <a href="#paket" className={cn('hover:text-emerald-700', 'dark:hover:text-amber-400', 'transition-colors')}>Paket Umroh</a>
                            <a href="#fitur" className={cn('hover:text-emerald-700', 'dark:hover:text-amber-400', 'transition-colors')}>Fasilitas</a>
                            <a href="#kontak" className={cn('hover:text-emerald-700', 'dark:hover:text-amber-400', 'transition-colors')}>Kontak</a>
                        </nav>

                        {/* Auth Navigation */}
                        <div className={cn('flex', 'items-center', 'gap-3')}>
                            {auth?.user ? (
                                <Link
                                    href={dashboard()}
                                    className={cn('inline-flex', 'items-center', 'gap-2', 'bg-emerald-700', 'hover:bg-emerald-800', 'dark:bg-emerald-600', 'dark:hover:bg-emerald-500', 'shadow-md', 'px-5', 'py-2.5', 'rounded-xl', 'font-semibold', 'text-white', 'text-sm', 'hover:scale-102', 'transition-all')}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className={cn('px-3', 'py-2', 'font-semibold', 'text-neutral-600', 'hover:text-emerald-700', 'dark:hover:text-amber-400', 'dark:text-neutral-300', 'text-sm', 'transition-colors')}
                                    >
                                        Masuk
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className={cn('inline-flex', 'items-center', 'gap-1', 'bg-amber-500', 'hover:bg-amber-600', 'dark:bg-amber-500', 'dark:hover:bg-amber-400', 'shadow-amber-500/10', 'shadow-md', 'px-5', 'py-2.5', 'rounded-xl', 'font-bold', 'text-slate-950', 'text-sm', 'hover:scale-102', 'transition-all')}
                                        >
                                            Daftar
                                            <ArrowRight className={cn('w-4', 'h-4')} />
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className={cn('relative', 'bg-gradient-to-br', 'from-[#022c22]', 'via-[#011c15]', 'to-[#0d1527]', 'py-24', 'lg:py-32', 'overflow-hidden', 'text-white')}>
                    {/* Background decorations */}
                    <div className={cn('top-0', 'right-0', 'absolute', 'bg-emerald-500/10', 'blur-[120px]', 'rounded-full', 'w-[500px]', 'h-[500px]', 'pointer-events-none')} />
                    <div className={cn('bottom-0', 'left-0', 'absolute', 'bg-amber-500/10', 'blur-[100px]', 'rounded-full', 'w-[400px]', 'h-[400px]', 'pointer-events-none')} />
                    <div 
                        className={cn('absolute', 'inset-0', 'opacity-5', 'pointer-events-none', 'mix-blend-overlay')}
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0l5.88 17.12L53 17.12l-13.88 10.64L45 45 30 34.24 15 45l5.88-17.24L7 17.12h17.12L30 0z' fill='%23fbbf24' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                            backgroundSize: '30px 30px'
                        }}
                    />

                    <div className={cn('mx-auto', 'px-6', 'lg:px-8', 'max-w-7xl')}>
                        <div className={cn('lg:items-center', 'gap-12', 'grid', 'grid-cols-1', 'lg:grid-cols-12')}>
                            {/* Text content */}
                            <div className={cn('space-y-8', 'lg:col-span-7', 'lg:text-left', 'text-center')}>
                                <div className={cn('inline-flex', 'items-center', 'gap-2', 'bg-amber-500/10', 'px-4', 'py-1.5', 'border', 'border-amber-500/20', 'rounded-full', 'font-semibold', 'text-amber-300', 'text-xs')}>
                                    <Sparkles className={cn('w-4', 'h-4')} />
                                    <span>Penyelenggara Umroh & Haji Terpercaya</span>
                                </div>
                                <h1 className={cn('font-extrabold', 'text-white', 'text-4xl', 'sm:text-6xl', 'leading-tight', 'tracking-tight')}>
                                    Wujudkan Perjalanan <span className={cn('bg-clip-text', 'bg-gradient-to-r', 'from-amber-400', 'to-amber-200', 'text-transparent')}>Umroh yang Sunnah</span> & Premium
                                </h1>
                                <p className={cn('mx-auto', 'lg:mx-0', 'max-w-2xl', 'text-emerald-100/80', 'text-lg', 'leading-8')}>
                                    Bersama {name}, jalani ibadah suci ke Baitullah dengan tenang, aman, dan nyaman didampingi pembimbing yang berkompeten sesuai tuntunan Rasulullah SAW.
                                </p>
                                
                                <div className={cn('flex', 'flex-wrap', 'justify-center', 'lg:justify-start', 'items-center', 'gap-4')}>
                                    <a
                                        href="#paket"
                                        className={cn('inline-flex', 'items-center', 'gap-2', 'bg-amber-500', 'hover:bg-amber-400', 'shadow-amber-500/20', 'shadow-lg', 'px-6', 'py-3.5', 'rounded-xl', 'font-bold', 'text-slate-950', 'text-base', 'hover:scale-102', 'transition-all')}
                                    >
                                        Lihat Paket Umroh
                                        <ArrowRight className={cn('w-5', 'h-5')} />
                                    </a>
                                    <a
                                        href="https://wa.me/628111111111"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn('inline-flex', 'items-center', 'gap-2', 'bg-white/5', 'hover:bg-white/10', 'px-6', 'py-3.5', 'border', 'border-white/20', 'rounded-xl', 'font-semibold', 'text-white', 'text-base', 'transition-all')}
                                    >
                                        <Phone className={cn('w-5', 'h-5', 'text-amber-400')} />
                                        Konsultasi Gratis
                                    </a>
                                </div>

                                {/* Quick Stats */}
                                <div className={cn('gap-6', 'grid', 'grid-cols-3', 'pt-8', 'border-emerald-900/50', 'border-t', 'lg:text-left', 'text-center')}>
                                    <div>
                                        <div className={cn('font-extrabold', 'text-amber-400', 'text-3xl')}>1,500+</div>
                                        <div className={cn('mt-1', 'font-semibold', 'text-emerald-200/60', 'text-xs', 'uppercase', 'tracking-wider')}>Jamaah Berangkat</div>
                                    </div>
                                    <div>
                                        <div className={cn('font-extrabold', 'text-amber-400', 'text-3xl')}>99.8%</div>
                                        <div className={cn('mt-1', 'font-semibold', 'text-emerald-200/60', 'text-xs', 'uppercase', 'tracking-wider')}>Tingkat Kepuasan</div>
                                    </div>
                                    <div>
                                        <div className={cn('font-extrabold', 'text-amber-400', 'text-3xl')}>100%</div>
                                        <div className={cn('mt-1', 'font-semibold', 'text-emerald-200/60', 'text-xs', 'uppercase', 'tracking-wider')}>Pasti Berangkat</div>
                                    </div>
                                </div>
                            </div>

                            {/* Visual Artwork/Card Side */}
                            <div className={cn('relative', 'flex', 'justify-center', 'lg:col-span-5')}>
                                <div className={cn('relative', 'bg-gradient-to-tr', 'from-emerald-800', 'to-amber-500', 'shadow-2xl', 'p-[1px]', 'rounded-3xl', 'w-full', 'max-w-[400px]', 'aspect-[4/5]')}>
                                    <div className={cn('relative', 'flex', 'flex-col', 'justify-between', 'bg-neutral-950/80', 'p-8', 'rounded-3xl', 'w-full', 'h-full', 'overflow-hidden')}>
                                        {/* BG decorative rings */}
                                        <div className={cn('-top-10', '-right-10', 'absolute', 'border', 'border-amber-500/10', 'rounded-full', 'w-40', 'h-40')} />
                                        <div className={cn('-bottom-10', '-left-10', 'absolute', 'border', 'border-emerald-500/10', 'rounded-full', 'w-48', 'h-48')} />
                                        
                                        <div className={cn('z-10', 'flex', 'justify-between', 'items-start')}>
                                            <div className={cn('flex', 'justify-center', 'items-center', 'bg-amber-500/10', 'rounded-2xl', 'w-12', 'h-12', 'text-amber-400')}>
                                                <Compass className={cn('w-7', 'h-7', 'animate-spin-slow')} />
                                            </div>
                                            <span className={cn('bg-amber-500/5', 'px-3', 'py-1', 'border', 'border-amber-500/20', 'rounded-full', 'font-bold', 'text-amber-400', 'text-xs', 'uppercase', 'tracking-widest')}>
                                                Premium
                                            </span>
                                        </div>

                                        <div className={cn('z-10', 'space-y-4')}>
                                            <span className={cn('font-semibold', 'text-emerald-400', 'text-xs', 'uppercase', 'tracking-widest')}>Jaminan Mahira</span>
                                            <h3 className={cn('font-bold', 'text-white', 'text-2xl', 'tracking-tight')}>
                                                Layanan Umroh Terbaik Setulus Hati
                                            </h3>
                                            <p className={cn('text-neutral-400', 'text-sm', 'leading-relaxed')}>
                                                Kami memastikan akomodasi bintang 4 & 5 terdekat dari Masjidil Haram, penerbangan direct tanpa transit, serta sajian menu nusantara untuk kenyamanan ibadah Anda.
                                            </p>
                                        </div>

                                        <div className={cn('z-10', 'flex', 'justify-between', 'items-center', 'pt-4', 'border-neutral-800', 'border-t')}>
                                            <div className={cn('flex', 'items-center', 'gap-2')}>
                                                <ShieldCheck className={cn('w-5', 'h-5', 'text-emerald-400')} />
                                                <span className={cn('font-semibold', 'text-neutral-300', 'text-xs')}>Izin Kemenag Resmi</span>
                                            </div>
                                            <span className={cn('text-neutral-400', 'text-xs')}>PPIU No. 91203001</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features (Mengapa Memilih Kami) */}
                <section id="tentang" className={cn('bg-white', 'dark:bg-[#0a0c14]', 'py-24')}>
                    <div className={cn('mx-auto', 'px-6', 'lg:px-8', 'max-w-7xl')}>
                        <div className={cn('space-y-4', 'mx-auto', 'max-w-3xl', 'text-center')}>
                            <h2 className={cn('font-bold', 'text-emerald-700', 'dark:text-amber-400', 'text-xs', 'uppercase', 'tracking-widest')}>Mengapa Memilih Kami</h2>
                            <p className={cn('font-extrabold', 'text-neutral-900', 'dark:text-white', 'text-3xl', 'sm:text-4xl', 'tracking-tight')}>
                                Keutamaan Layanan {name}
                            </p>
                            <p className={cn('text-neutral-500', 'dark:text-neutral-400', 'text-lg')}>
                                Komitmen kami adalah memberikan rasa aman dan kekhusyukan maksimal sepanjang perjalanan ibadah Anda.
                             </p>
                        </div>

                        <div className={cn('gap-8', 'grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4', 'mx-auto', 'mt-16', 'sm:mt-20', 'lg:mt-24', 'max-w-5xl')}>
                            {/* Card 1 */}
                            <div className={cn('relative', 'flex', 'flex-col', 'justify-between', 'bg-neutral-50/50', 'dark:bg-neutral-900/30', 'p-8', 'border', 'border-neutral-100', 'hover:border-emerald-700/30', 'dark:border-neutral-800', 'rounded-2xl', 'transition-all', 'hover:-translate-y-1', 'duration-300')}>
                                <div className="space-y-4">
                                    <div className={cn('flex', 'justify-center', 'items-center', 'bg-emerald-100', 'dark:bg-emerald-950/40', 'rounded-xl', 'w-12', 'h-12', 'text-emerald-700', 'dark:text-emerald-400')}>
                                        <Award className={cn('w-6', 'h-6')} />
                                    </div>
                                    <h3 className={cn('font-bold', 'text-neutral-900', 'dark:text-white', 'text-lg')}>Pembimbing Sunnah</h3>
                                    <p className={cn('text-neutral-500', 'dark:text-neutral-400', 'text-sm', 'leading-relaxed')}>
                                        Ibadah didampingi oleh Ustadz berpengalaman yang membimbing sesuai tuntunan Al-Quran dan Sunnah.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className={cn('relative', 'flex', 'flex-col', 'justify-between', 'bg-neutral-50/50', 'dark:bg-neutral-900/30', 'p-8', 'border', 'border-neutral-100', 'hover:border-emerald-700/30', 'dark:border-neutral-800', 'rounded-2xl', 'transition-all', 'hover:-translate-y-1', 'duration-300')}>
                                <div className="space-y-4">
                                    <div className={cn('flex', 'justify-center', 'items-center', 'bg-amber-100', 'dark:bg-amber-950/40', 'rounded-xl', 'w-12', 'h-12', 'text-amber-700', 'dark:text-amber-400')}>
                                        <Hotel className={cn('w-6', 'h-6')} />
                                    </div>
                                    <h3 className={cn('font-bold', 'text-neutral-900', 'dark:text-white', 'text-lg')}>Hotel Dekat Pelataran</h3>
                                    <p className={cn('text-neutral-500', 'dark:text-neutral-400', 'text-sm', 'leading-relaxed')}>
                                        Akomodasi hotel bintang 4 & 5 dengan jarak dekat ke Masjidil Haram dan Masjid Nabawi.
                                    </p>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className={cn('relative', 'flex', 'flex-col', 'justify-between', 'bg-neutral-50/50', 'dark:bg-neutral-900/30', 'p-8', 'border', 'border-neutral-100', 'hover:border-emerald-700/30', 'dark:border-neutral-800', 'rounded-2xl', 'transition-all', 'hover:-translate-y-1', 'duration-300')}>
                                <div className="space-y-4">
                                    <div className={cn('flex', 'justify-center', 'items-center', 'bg-blue-100', 'dark:bg-blue-950/40', 'rounded-xl', 'w-12', 'h-12', 'text-blue-700', 'dark:text-blue-400')}>
                                        <Plane className={cn('w-6', 'h-6')} />
                                    </div>
                                    <h3 className={cn('font-bold', 'text-neutral-900', 'dark:text-white', 'text-lg')}>Penerbangan Terbaik</h3>
                                    <p className={cn('text-neutral-500', 'dark:text-neutral-400', 'text-sm', 'leading-relaxed')}>
                                        Menggunakan maskapai ternama seperti Garuda Indonesia & Saudia Airlines direct tanpa transit.
                                    </p>
                                </div>
                            </div>

                            {/* Card 4 */}
                            <div className={cn('relative', 'flex', 'flex-col', 'justify-between', 'bg-neutral-50/50', 'dark:bg-neutral-900/30', 'p-8', 'border', 'border-neutral-100', 'hover:border-emerald-700/30', 'dark:border-neutral-800', 'rounded-2xl', 'transition-all', 'hover:-translate-y-1', 'duration-300')}>
                                <div className="space-y-4">
                                    <div className={cn('flex', 'justify-center', 'items-center', 'bg-purple-100', 'dark:bg-purple-950/40', 'rounded-xl', 'w-12', 'h-12', 'text-purple-700', 'dark:text-purple-400')}>
                                        <HeartHandshake className={cn('w-6', 'h-6')} />
                                    </div>
                                    <h3 className={cn('font-bold', 'text-neutral-900', 'dark:text-white', 'text-lg')}>Layanan Sepenuh Hati</h3>
                                    <p className={cn('text-neutral-500', 'dark:text-neutral-400', 'text-sm', 'leading-relaxed')}>
                                        Tim handling muthawif lokal di Makkah & Madinah siap melayani kebutuhan jamaah 24 jam.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Packages Section */}
                <section id="paket" className={cn('bg-neutral-50', 'dark:bg-[#07090e]', 'py-24')}>
                    <div className={cn('mx-auto', 'px-6', 'lg:px-8', 'max-w-7xl')}>
                        <div className={cn('space-y-4', 'mx-auto', 'max-w-3xl', 'text-center')}>
                            <h2 className={cn('font-bold', 'text-emerald-700', 'dark:text-amber-400', 'text-xs', 'uppercase', 'tracking-widest')}>Pilihan Paket Ibadah</h2>
                            <p className={cn('font-extrabold', 'text-neutral-900', 'dark:text-white', 'text-3xl', 'sm:text-4xl', 'tracking-tight')}>
                                Paket Umroh Unggulan Kami
                            </p>
                            <p className={cn('text-neutral-500', 'dark:text-neutral-400', 'text-lg')}>
                                Pilihan paket umroh dengan jadwal keberangkatan terencana, akomodasi premium, dan harga transparan.
                            </p>
                        </div>

                        {/* Packages Grid */}
                        <div className={cn('gap-10', 'grid', 'grid-cols-1', 'lg:grid-cols-3', 'mx-auto', 'mt-16', 'lg:max-w-none', 'max-w-md')}>
                            {paketUmroh.length > 0 ? (
                                paketUmroh.map((paket) => {
                                    const nearestKeberangkatan = paket.keberangkatan && paket.keberangkatan.length > 0
                                        ? paket.keberangkatan[0]
                                        : null;

                                    return (
                                        <div 
                                            key={paket.id} 
                                            className={cn('flex', 'flex-col', 'justify-between', 'bg-white', 'dark:bg-[#11131c]', 'shadow-lg', 'hover:shadow-xl', 'border', 'border-neutral-200/60', 'dark:border-neutral-900', 'rounded-3xl', 'overflow-hidden', 'transition-all', 'hover:-translate-y-1.5', 'duration-300')}
                                        >
                                            <div className="p-8">
                                                {/* Header */}
                                                <div className={cn('flex', 'justify-between', 'items-center', 'gap-4')}>
                                                    <span className={cn('inline-flex', 'items-center', 'gap-1.5', 'bg-emerald-50', 'dark:bg-emerald-950/50', 'px-3.5', 'py-1', 'rounded-full', 'font-bold', 'text-emerald-700', 'dark:text-emerald-400', 'text-xs')}>
                                                        <Clock className={cn('w-3.5', 'h-3.5')} />
                                                        {paket.durasi_hari} Hari
                                                    </span>
                                                    {paket.kuota > 30 ? (
                                                        <span className={cn('font-bold', 'text-neutral-500', 'dark:text-neutral-400', 'text-xs')}>Grup Besar</span>
                                                    ) : (
                                                        <span className={cn('font-bold', 'text-amber-600', 'dark:text-amber-400', 'text-xs')}>Grup Eksklusif</span>
                                                    )}
                                                </div>

                                                <h3 className={cn('mt-4', 'font-bold', 'text-neutral-900', 'dark:text-white', 'text-2xl', 'tracking-tight')}>
                                                    {paket.nama_paket}
                                                </h3>
                                                <p className={cn('mt-2', 'text-neutral-500', 'dark:text-neutral-400', 'text-sm', 'line-clamp-2')}>
                                                    {paket.deskripsi}
                                                </p>

                                                {/* Price */}
                                                <div className={cn('mt-6', 'pb-6', 'border-neutral-100', 'dark:border-neutral-800', 'border-b')}>
                                                    <span className={cn('font-semibold', 'text-neutral-400', 'text-sm')}>Harga Paket</span>
                                                    <div className={cn('flex', 'items-baseline', 'mt-1')}>
                                                        <span className={cn('font-extrabold', 'text-emerald-800', 'dark:text-amber-400', 'text-3xl', 'tracking-tight')}>
                                                            {formatRupiah(paket.harga)}
                                                        </span>
                                                        <span className={cn('ml-1', 'text-neutral-400', 'text-sm')}>/ Pax</span>
                                                    </div>
                                                </div>

                                                {/* Details list */}
                                                <ul className={cn('space-y-4', 'mt-6', 'text-neutral-600', 'dark:text-neutral-300', 'text-sm')}>
                                                    <li className={cn('flex', 'items-center', 'gap-3')}>
                                                        <Plane className={cn('w-5', 'h-5', 'text-emerald-600', 'dark:text-emerald-400', 'shrink-0')} />
                                                        <span>{paket.maskapai} (Direct)</span>
                                                    </li>
                                                    <li className={cn('flex', 'items-center', 'gap-3')}>
                                                        <Hotel className={cn('w-5', 'h-5', 'text-emerald-600', 'dark:text-emerald-400', 'shrink-0')} />
                                                        <span>{paket.hotel}</span>
                                                    </li>
                                                    {nearestKeberangkatan ? (
                                                        <li className={cn('flex', 'items-center', 'gap-3')}>
                                                            <Calendar className={cn('w-5', 'h-5', 'text-emerald-600', 'dark:text-emerald-400', 'shrink-0')} />
                                                            <div className={cn('flex', 'flex-col')}>
                                                                <span className="font-medium">Jadwal Keberangkatan:</span>
                                                                <span className={cn('text-neutral-500', 'dark:text-neutral-400', 'text-xs')}>
                                                                    {formatDate(nearestKeberangkatan.tanggal_berangkat)}
                                                                </span>
                                                            </div>
                                                        </li>
                                                    ) : (
                                                        <li className={cn('flex', 'items-center', 'gap-3', 'font-medium', 'text-amber-600', 'dark:text-amber-400')}>
                                                            <Calendar className={cn('w-5', 'h-5', 'shrink-0')} />
                                                            <span>Hubungi Admin untuk Jadwal</span>
                                                        </li>
                                                    )}
                                                    {nearestKeberangkatan && (
                                                        <li className={cn('flex', 'items-center', 'gap-3')}>
                                                            <Users className={cn('w-5', 'h-5', 'text-emerald-600', 'dark:text-emerald-400', 'shrink-0')} />
                                                            <span>Kuota Tersisa: <strong className={cn('text-amber-600', 'dark:text-amber-400')}>{nearestKeberangkatan.sisa_kuota}</strong> / {nearestKeberangkatan.kuota} Kursi</span>
                                                        </li>
                                                    )}
                                                </ul>

                                                {/* Facilities checklist */}
                                                {paket.fasilitas && paket.fasilitas.length > 0 && (
                                                    <div className={cn('mt-6', 'pt-6', 'border-neutral-100', 'dark:border-neutral-800', 'border-t')}>
                                                        <span className={cn('font-bold', 'text-neutral-400', 'text-xs', 'uppercase', 'tracking-wider')}>Fasilitas Termasuk:</span>
                                                        <div className={cn('gap-2', 'grid', 'grid-cols-2', 'mt-3', 'text-xs')}>
                                                            {paket.fasilitas.slice(0, 4).map((f) => (
                                                                <div key={f.id} className={cn('flex', 'items-center', 'gap-1.5', 'text-neutral-600', 'dark:text-neutral-300')}>
                                                                    <Check className={cn('w-4.5', 'h-4.5', 'text-emerald-600', 'shrink-0')} />
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
                                            <div className={cn('bg-neutral-50/50', 'dark:bg-neutral-900/10', 'p-6', 'border-neutral-100', 'dark:border-neutral-850', 'border-t')}>
                                                {auth?.user ? (
                                                    <Link
                                                        href={dashboard()}
                                                        className={cn('block', 'bg-emerald-700', 'hover:bg-emerald-800', 'dark:bg-emerald-600', 'dark:hover:bg-emerald-500', 'shadow-md', 'py-3', 'rounded-xl', 'w-full', 'font-bold', 'text-white', 'text-sm', 'text-center', 'transition-colors')}
                                                    >
                                                        Daftar & Pesan Sekarang
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        href={login()}
                                                        className={cn('block', 'bg-white', 'hover:bg-emerald-50', 'dark:bg-transparent', 'dark:hover:bg-emerald-950/20', 'py-3', 'border', 'border-emerald-700/25', 'dark:border-emerald-600/35', 'rounded-xl', 'w-full', 'font-bold', 'text-emerald-800', 'dark:text-emerald-400', 'text-sm', 'text-center', 'transition-colors')}
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
                                    <div key={item} className={cn('flex', 'flex-col', 'justify-between', 'bg-white', 'dark:bg-[#11131c]', 'p-8', 'border', 'border-neutral-200', 'dark:border-neutral-900', 'rounded-3xl', 'overflow-hidden')}>
                                        <div className="space-y-6">
                                            <div className={cn('bg-neutral-200', 'dark:bg-neutral-800', 'rounded', 'w-24', 'h-6', 'animate-pulse')} />
                                            <div className={cn('bg-neutral-200', 'dark:bg-neutral-800', 'rounded', 'w-48', 'h-8', 'animate-pulse')} />
                                            <div className={cn('bg-neutral-200', 'dark:bg-neutral-800', 'rounded', 'w-full', 'h-20', 'animate-pulse')} />
                                        </div>
                                        <div className={cn('bg-neutral-200', 'dark:bg-neutral-800', 'mt-8', 'rounded', 'w-full', 'h-12', 'animate-pulse')} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>

                {/* FAQ / Trust Indicators */}
                <section className={cn('bg-white', 'dark:bg-[#0a0c14]', 'py-24')}>
                    <div className={cn('mx-auto', 'px-6', 'lg:px-8', 'max-w-7xl')}>
                        <div className={cn('space-y-4', 'mx-auto', 'mb-16', 'max-w-3xl', 'text-center')}>
                            <h2 className={cn('font-bold', 'text-emerald-700', 'dark:text-amber-400', 'text-xs', 'uppercase', 'tracking-widest')}>Komitmen Layanan</h2>
                            <p className={cn('font-extrabold', 'text-neutral-900', 'dark:text-white', 'text-3xl', 'sm:text-4xl', 'tracking-tight')}>
                                5 Pasti Umroh Bersama Mahira
                            </p>
                        </div>

                        <div className={cn('gap-8', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'mx-auto', 'max-w-4xl')}>
                            <div className={cn('flex', 'items-start', 'gap-4', 'bg-slate-50', 'dark:bg-neutral-900/20', 'p-6', 'rounded-2xl')}>
                                <div className={cn('flex', 'justify-center', 'items-center', 'bg-amber-100', 'dark:bg-amber-950/30', 'rounded-xl', 'w-10', 'h-10', 'font-bold', 'text-amber-700', 'dark:text-amber-400', 'text-lg', 'shrink-0')}>1</div>
                                <div>
                                    <h3 className={cn('font-bold', 'text-neutral-900', 'dark:text-white')}>Pasti Travelnya Berizin</h3>
                                    <p className={cn('mt-1', 'text-neutral-500', 'dark:text-neutral-400', 'text-sm')}>Kami terdaftar resmi sebagai Penyelenggara Perjalanan Ibadah Umroh (PPIU) di Kementerian Agama RI.</p>
                                </div>
                            </div>
                            <div className={cn('flex', 'items-start', 'gap-4', 'bg-slate-50', 'dark:bg-neutral-900/20', 'p-6', 'rounded-2xl')}>
                                <div className={cn('flex', 'justify-center', 'items-center', 'bg-amber-100', 'dark:bg-amber-950/30', 'rounded-xl', 'w-10', 'h-10', 'font-bold', 'text-amber-700', 'dark:text-amber-400', 'text-lg', 'shrink-0')}>2</div>
                                <div>
                                    <h3 className={cn('font-bold', 'text-neutral-900', 'dark:text-white')}>Pasti Jadwal & Tiketnya</h3>
                                    <p className={cn('mt-1', 'text-neutral-500', 'dark:text-neutral-400', 'text-sm')}>Jadwal keberangkatan pasti dan tiket penerbangan PP sudah dibooking (issued) jauh hari.</p>
                                </div>
                            </div>
                            <div className={cn('flex', 'items-start', 'gap-4', 'bg-slate-50', 'dark:bg-neutral-900/20', 'p-6', 'rounded-2xl')}>
                                <div className={cn('flex', 'justify-center', 'items-center', 'bg-amber-100', 'dark:bg-amber-950/30', 'rounded-xl', 'w-10', 'h-10', 'font-bold', 'text-amber-700', 'dark:text-amber-400', 'text-lg', 'shrink-0')}>3</div>
                                <div>
                                    <h3 className={cn('font-bold', 'text-neutral-900', 'dark:text-white')}>Pasti Tarif Layanan & Paketnya</h3>
                                    <p className={cn('mt-1', 'text-neutral-500', 'dark:text-neutral-400', 'text-sm')}>Harga transparan sesuai brosur tanpa biaya tambahan tersembunyi selama di tanah suci.</p>
                                </div>
                            </div>
                            <div className={cn('flex', 'items-start', 'gap-4', 'bg-slate-50', 'dark:bg-neutral-900/20', 'p-6', 'rounded-2xl')}>
                                <div className={cn('flex', 'justify-center', 'items-center', 'bg-amber-100', 'dark:bg-amber-950/30', 'rounded-xl', 'w-10', 'h-10', 'font-bold', 'text-amber-700', 'dark:text-amber-400', 'text-lg', 'shrink-0')}>4</div>
                                <div>
                                    <h3 className={cn('font-bold', 'text-neutral-900', 'dark:text-white')}>Pasti Hotel & Akomodasinya</h3>
                                    <p className={cn('mt-1', 'text-neutral-500', 'dark:text-neutral-400', 'text-sm')}>Hotel tempat menginap terjamin kenyamanan dan lokasinya, sesuai yang dijanjikan dalam paket.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer id="kontak" className={cn('bg-[#021f18]', 'dark:bg-[#03060c]', 'pt-20', 'pb-10', 'border-emerald-950/40', 'border-t', 'text-neutral-300')}>
                    <div className={cn('gap-12', 'grid', 'grid-cols-1', 'md:grid-cols-12', 'mx-auto', 'px-6', 'lg:px-8', 'pb-16', 'border-emerald-950/80', 'border-b', 'max-w-7xl')}>
                        {/* Column 1 - Brand Info */}
                        <div className={cn('space-y-6', 'md:col-span-5')}>
                            <div className={cn('flex', 'items-center', 'gap-3')}>
                                <div className={cn('flex', 'justify-center', 'items-center', 'bg-emerald-600', 'rounded-xl', 'w-11', 'h-11', 'text-white')}>
                                    <AppLogoIcon className={cn('fill-current', 'w-6', 'h-6')} />
                                </div>
                                <span className={cn('font-bold', 'text-amber-100', 'text-xl', 'uppercase', 'tracking-wider')}>{name}</span>
                            </div>
                            <p className={cn('text-neutral-400', 'text-sm', 'leading-relaxed')}>
                                {name} adalah agen perjalanan umroh dan haji yang mengutamakan legalitas resmi, pelayanan prima, akomodasi berkelas, dan bimbingan ibadah terpercaya sesuai Al-Quran dan Sunnah.
                            </p>
                            <div className={cn('flex', 'items-center', 'gap-2', 'font-semibold', 'text-amber-400', 'text-xs')}>
                                <span className={cn('bg-amber-400/10', 'px-3.5', 'py-1', 'border', 'border-amber-400/20', 'rounded-full')}>PPIU Resmi Kemenag</span>
                            </div>
                        </div>

                        {/* Column 2 - Quick Links */}
                        <div className={cn('space-y-6', 'md:col-span-3')}>
                            <h3 className={cn('font-bold', 'text-amber-100', 'text-sm', 'uppercase', 'tracking-wider')}>Navigasi Cepat</h3>
                            <ul className={cn('space-y-3.5', 'text-sm')}>
                                <li><a href="#tentang" className={cn('hover:text-amber-300', 'transition-colors')}>Tentang Kami</a></li>
                                <li><a href="#paket" className={cn('hover:text-amber-300', 'transition-colors')}>Paket Umroh</a></li>
                                <li><a href="#fitur" className={cn('hover:text-amber-300', 'transition-colors')}>Fasilitas & Perlengkapan</a></li>
                                <li>
                                    <Link href={login()} className={cn('hover:text-amber-300', 'transition-colors')}>
                                        Pendaftaran Online
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3 - Contacts & Office */}
                        <div className={cn('space-y-6', 'md:col-span-4')}>
                            <h3 className={cn('font-bold', 'text-amber-100', 'text-sm', 'uppercase', 'tracking-wider')}>Kontak & Kantor</h3>
                            <ul className={cn('space-y-4', 'text-neutral-400', 'text-sm')}>
                                <li className={cn('flex', 'items-start', 'gap-3')}>
                                    <MapPin className={cn('mt-0.5', 'w-5', 'h-5', 'text-amber-400', 'shrink-0')} />
                                    <span>Jl. Sudirman No. 123, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190</span>
                                </li>
                                <li className={cn('flex', 'items-center', 'gap-3')}>
                                    <Phone className={cn('w-5', 'h-5', 'text-amber-400', 'shrink-0')} />
                                    <a href="tel:081111111111" className={cn('hover:text-white', 'transition-colors')}>0811-1111-1111</a>
                                </li>
                                <li className={cn('flex', 'items-center', 'gap-3')}>
                                    <Mail className={cn('w-5', 'h-5', 'text-amber-400', 'shrink-0')} />
                                    <a href="mailto:info@mahiratour.com" className={cn('hover:text-white', 'transition-colors')}>info@mahiratour.com</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Line */}
                    <div className={cn('flex', 'sm:flex-row', 'flex-col', 'justify-between', 'items-center', 'gap-4', 'mx-auto', 'mt-8', 'px-6', 'lg:px-8', 'max-w-7xl', 'text-neutral-500', 'text-xs')}>
                        <p>&copy; {new Date().getFullYear()} {name}. Seluruh hak cipta dilindungi.</p>
                        <div className={cn('flex', 'gap-6')}>
                            <a href="#" className={cn('hover:text-neutral-400', 'transition-colors')}>Syarat & Ketentuan</a>
                            <a href="#" className={cn('hover:text-neutral-400', 'transition-colors')}>Kebijakan Privasi</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
