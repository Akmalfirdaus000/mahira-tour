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
    HeartHandshake,
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
            maximumFractionDigits: 0,
        }).format(Number(value));
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <>
            <Head title="Mahira Tour & Travel - Akomodasi Umroh Premium & Sesuai Sunnah" className={cn('bg-slate-50', 'selection:bg-emerald-600', 'dark:bg-[#07090e]', 'min-h-screen', 'text-[#1b1b18]', 'selection:text-white', 'dark:text-neutral-200', 'transition-colors', 'duration-300')}ark:text-neutral-200">
                {/* Navbar */}
                <heaclassName={cn('top-0', 'z-50', 'sticky', 'bg-white/80', 'dark:bg-[#07090e]/80', 'backdrop-blur-md', 'border-neutral-200/50', 'dark:border-emerald-950/20', 'border-b', 'w-full')}/80">
                    <className={cn('flex', 'justify-between', 'items-center', 'mx-auto', 'px-6', 'lg:px-8', 'max-w-7xl', 'h-20')}x-8">
                        {/* Logo */}
                        <Link href=className={cn('flex', 'items-center', 'gap-3')}p-3">
                            <className={cn('flex', 'justify-center', 'items-center', 'bg-emerald-700', 'dark:bg-emerald-600', 'shadow-emerald-700/10', 'shadow-md', 'rounded-xl', 'w-11', 'h-11', 'text-white')}600">
                                <AppLogoIclassName={cn('fill-current', 'w-6', 'h-6')}ent" />
                            </div>
                            <className={cn('flex', 'flex-col')}col">
                                <sclassName={cn('font-extrabold', 'text-emerald-900', 'dark:text-amber-100', 'text-lg', 'uppercase', 'tracking-wider')}100">
                                    {name}
                                </span>
                                <sclassName={cn('-mt-1', 'font-bold', 'text-[10px]', 'text-amber-600', 'dark:text-amber-400', 'uppercase', 'tracking-widest')}400">
                                    Tour & Travel aaaaaaaaaaaaaaaaaaaaaa
                                </span>
                            </div>
                        </Link>

                        {/* Navigation Links */}
                        <className={cn('hidden', 'md:flex', 'items-center', 'gap-8', 'font-medium', 'text-neutral-600', 'dark:text-neutral-400', 'text-sm')}400">
                            <a
            className={cn('hover:text-emerald-700', 'dark:hover:text-amber-400', 'transition-colors')}"transition-colors hover:text-emerald-700 dark:hover:text-amberclassName={cn('hover:text-emerald-700', 'dark:hover:text-amber-400', 'transition-colors')}mi
                            </a>
                          className={cn('hover:text-emerald-700', 'dark:hover:text-amber-400', 'transition-colors')}     className="transition-colors hover:text-emerald-700 darkclassName={cn('hover:text-emerald-700', 'dark:hover:text-amber-400', 'transition-colors')}       Paket Umroh
                            </a>
                            <a
                                href="className={cn('flex', 'items-center', 'gap-3')}     className="transition-colors hover:text-emerald-700 dark:hover:text-amber-400"
                            >
                                Fasilitas
                   className={cn('inline-flex', 'items-center', 'gap-2', 'bg-emerald-700', 'hover:bg-emerald-800', 'dark:bg-emerald-600', 'dark:hover:bg-emerald-500', 'shadow-md', 'px-5', 'py-2.5', 'rounded-xl', 'font-semibold', 'text-white', 'text-sm', 'hover:scale-102', 'transition-all')}          >
                                Kontak
                            </a>
                        </nav>

                        {/* Auth Navigation */}
                        <div className="flex items-center gap-3">
                            {auth?.user ? (
                                <Link
               className={cn('px-3', 'py-2', 'font-semibold', 'text-neutral-600', 'hover:text-emerald-700', 'dark:hover:text-amber-400', 'dark:text-neutral-300', 'text-sm', 'transition-colors')}py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:scale-102 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                className={cn('inline-flex', 'items-center', 'gap-1', 'bg-amber-500', 'hover:bg-amber-600', 'dark:bg-amber-500', 'dark:hover:bg-amber-400', 'shadow-amber-500/10', 'shadow-md', 'px-5', 'py-2.5', 'rounded-xl', 'font-bold', 'text-slate-950', 'text-sm', 'hover:scale-102', 'transition-all')}ald-700 dark:text-neutral-300 dark:hover:text-amber-400"
                                    >
                                        Masuk
         className={cn('w-4', 'h-4')}        </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="inline-flex items-center gap-1 rounded-xl bg-amber-500 px-5 py-2.5 text-className={cn('relative', 'bg-gradient-to-br', 'from-[#022c22]', 'via-[#011c15]', 'to-[#0d1527]', 'py-24', 'lg:py-32', 'overflow-hidden', 'text-white')}500 dark:hover:bg-amber-400"
                                        >
       className={cn('top-0', 'right-0', 'absolute', 'bg-emerald-500/10', 'blur-[120px]', 'rounded-full', 'w-[500px]', 'h-[500px]', 'pointer-events-none')}" />
                        className={cn('bottom-0', 'left-0', 'absolute', 'bg-amber-500/10', 'blur-[100px]', 'rounded-full', 'w-[400px]', 'h-[400px]', 'pointer-events-none')}         )}
                        </div>
           className={cn('absolute', 'inset-0', 'opacity-5', 'pointer-events-none', 'mix-blend-overlay')}*/}
                <section className="relative overflow-hidden bg-gradient-to-br from-[#022c22] via-[#011c15] to-[#0d1527] py-24 text-white lg:py-32">
                    {/* Background decorations */}
                    <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
                    <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[100px]" />
  className={cn('mx-auto', 'px-6', 'lg:px-8', 'max-w-7xl')}     className="pointer-events-className={cn('lg:items-center', 'gap-12', 'grid', 'grid-cols-1', 'lg:grid-cols-12')}        style={{
                            backgroundImage: `url("data:image/svg+xclassName={cn('space-y-8', 'lg:col-span-7', 'lg:text-left', 'text-center')}ht='60' viewBox='0 0 60 60'%3E%3Cpath dclassName={cn('inline-flex', 'items-center', 'gap-2', 'bg-amber-500/10', 'px-4', 'py-1.5', 'border', 'border-amber-500/20', 'rounded-full', 'font-semibold', 'text-amber-300', 'text-xs')}d'/%3E%3C/svg%3E")`,
                           className={cn('w-4', 'h-4')}0px 30px',
                        }}
                    />

                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div classNclassName={cn('font-extrabold', 'text-white', 'text-4xl', 'sm:text-6xl', 'leading-tight', 'tracking-tight')}    {/* Text content */}
                            <div classNclassName={cn('bg-clip-text', 'bg-gradient-to-r', 'from-amber-400', 'to-amber-200', 'text-transparent')}  <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4className={cn('mx-auto', 'lg:mx-0', 'max-w-2xl', 'text-emerald-100/80', 'text-lg', 'leading-8')}        <Sparkles className="h-4 w-4" />
                                    <span>
                                        Penyelenggara Umroh & Haji Terpercaya
                                    </span>
                                </div>
                                <h1 className="textclassName={cn('flex', 'flex-wrap', 'justify-center', 'lg:justify-start', 'items-center', 'gap-4')}                                 Wujudkan Perjalanan{' '}
                                    <span className="bg-gradient-to-r from-amclassName={cn('inline-flex', 'items-center', 'gap-2', 'bg-amber-500', 'hover:bg-amber-400', 'shadow-amber-500/20', 'shadow-lg', 'px-6', 'py-3.5', 'rounded-xl', 'font-bold', 'text-slate-950', 'text-base', 'hover:scale-102', 'transition-all')}   & Premium
                                </h1>
                                <p className="mx-auto max-w-2xl text-lg leading-8 text-emerald-100className={cn('w-5', 'h-5')}                               Bersama {name}, jalani ibadah suci ke
                                    Baitullah dengan tenang, aman, dan nyaman
                                    didampingi pembimbing yang berkompeten
                                    sesuai tuntunan Rasulullah SAW.
                              className={cn('inline-flex', 'items-center', 'gap-2', 'bg-white/5', 'hover:bg-white/10', 'px-6', 'py-3.5', 'border', 'border-white/20', 'rounded-xl', 'font-semibold', 'text-white', 'text-base', 'transition-all')}                                    href="#paket"
                                    className={cn('w-5', 'h-5', 'text-amber-400')}enter gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-base font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-102 hover:bg-amber-400"
                                    >
                              className={cn('gap-6', 'grid', 'grid-cols-3', 'pt-8', 'border-emerald-900/50', 'border-t', 'lg:text-left', 'text-center')}w-5" />
                                    </a>
                                    <a
 className={cn('font-extrabold', 'text-amber-400', 'text-3xl')}://wa.me/628111111111"
                                    className={cn('mt-1', 'font-semibold', 'text-emerald-200/60', 'text-xs', 'uppercase', 'tracking-wider')}r"
                                        className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-base foclassName={cn('font-extrabold', 'text-amber-400', 'text-3xl')}te/10"
                                    >
             className={cn('mt-1', 'font-semibold', 'text-emerald-200/60', 'text-xs', 'uppercase', 'tracking-wider')}                             Konsultasi Gratis
                                    </a>
                                </div>

                          className={cn('font-extrabold', 'text-amber-400', 'text-3xl')}        <div className="grid grid-cols-3 gap-6 border-t bclassName={cn('mt-1', 'font-semibold', 'text-emerald-200/60', 'text-xs', 'uppercase', 'tracking-wider')}      <div>
                                        <div className="text-3xl font-extrabold text-amber-400">
                                            1,500+
                                        </div>
                            className={cn('relative', 'flex', 'justify-center', 'lg:col-span-5')} tracking-wider text-emerald-200/60 uppclassName={cn('relative', 'bg-gradient-to-tr', 'from-emerald-800', 'to-amber-500', 'shadow-2xl', 'p-[1px]', 'rounded-3xl', 'w-full', 'max-w-[400px]', 'aspect-[4/5]')}                    </div>
                className={cn('relative', 'flex', 'flex-col', 'justify-between', 'bg-neutral-950/80', 'p-8', 'rounded-3xl', 'w-full', 'h-full', 'overflow-hidden')}er-400">
                                            99.8%
                                        </div>
         className={cn('-top-10', '-right-10', 'absolute', 'border', 'border-amber-500/10', 'rounded-full', 'w-40', 'h-40')} text-emerald-200/60 uppercase">
                className={cn('-bottom-10', '-left-10', 'absolute', 'border', 'border-emerald-500/10', 'rounded-full', 'w-48', 'h-48')}                                    </div>
                                    <div>
     className={cn('z-10', 'flex', 'justify-between', 'items-start')}="text-3xl font-extrabold text-amber-400">
        className={cn('flex', 'justify-center', 'items-center', 'bg-amber-500/10', 'rounded-2xl', 'w-12', 'h-12', 'text-amber-400')}                               <div className="mt-1 text-xsclassName={cn('w-7', 'h-7', 'animate-spin-slow')}erald-200/60 uppercase">
                                            Pasti Berangkat
                    className={cn('bg-amber-500/5', 'px-3', 'py-1', 'border', 'border-amber-500/20', 'rounded-full', 'font-bold', 'text-amber-400', 'text-xs', 'uppercase', 'tracking-widest')}  </div>

                            {/* Visual Artwork/Card Side */}
                            <div className="relative flex justify-center lg:col-span-5">
                                <div classNclassName={cn('z-10', 'space-y-4')} w-full max-w-[400px] rounded-3xl bg-gradient-to-tr className={cn('font-semibold', 'text-emerald-400', 'text-xs', 'uppercase', 'tracking-widest')}           <div className="relative flex h-full w-full flex-col justifyclassName={cn('font-bold', 'text-white', 'text-2xl', 'tracking-tight')}-8">
                                        {/* BG decorative rings */}
                                        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full borclassName={cn('text-neutral-400', 'text-sm', 'leading-relaxed')}                <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full border border-emerald-500/10" />

                                        <div className="z-10 flex items-start justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-ambeclassName={cn('z-10', 'flex', 'justify-between', 'items-center', 'pt-4', 'border-neutral-800', 'border-t')}-spin-slow h-7 w-7" />
                            className={cn('flex', 'items-center', 'gap-2')}                                <span className="rounded-full bclassName={cn('w-5', 'h-5', 'text-emerald-400')}00/5 px-3 py-1 text-xs font-bold tracking-widest text-ambeclassName={cn('font-semibold', 'text-neutral-300', 'text-xs')}                Premium
                                            </span>
                                        </div>

    className={cn('text-neutral-400', 'text-xs')}<div className="z-10 space-y-4">
                                            <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
                                                Jaminan Mahira
                                            </span>
                                            <h3 className="text-2xl font-bold tracking-tight tclassName={cn('bg-white', 'dark:bg-[#0a0c14]', 'py-24')}                Layanan UmrclassName={cn('mx-auto', 'px-6', 'lg:px-8', 'max-w-7xl')}                         Hati
 className={cn('space-y-4', 'mx-auto', 'max-w-3xl', 'text-center')}                                  className={cn('font-bold', 'text-emerald-700', 'dark:text-amber-400', 'text-xs', 'uppercase', 'tracking-widest')}                     Kami memastikan akomodasi
           className={cn('font-extrabold', 'text-neutral-900', 'dark:text-white', 'text-3xl', 'sm:text-4xl', 'tracking-tight')}                  Masjidil Haram, penerbangan
                                                direct tanpa transit, serta
 className={cn('text-neutral-500', 'dark:text-neutral-400', 'text-lg')} nusantara untuk
                                                kenyamanan ibadah Anda.
                                            </p>
                                        </div>

                                        <divclassName={cn('gap-8', 'grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4', 'mx-auto', 'mt-16', 'sm:mt-20', 'lg:mt-24', 'max-w-5xl')}                        <div className="flex items-center gap-2">
            className={cn('relative', 'flex', 'flex-col', 'justify-between', 'bg-neutral-50/50', 'dark:bg-neutral-900/30', 'p-8', 'border', 'border-neutral-100', 'hover:border-emerald-700/30', 'dark:border-neutral-800', 'rounded-2xl', 'transition-all', 'hover:-translate-y-1', 'duration-300')}              Izin Kemenag Resmi
                                                </span>
              className={cn('flex', 'justify-center', 'items-center', 'bg-emerald-100', 'dark:bg-emerald-950/40', 'rounded-xl', 'w-12', 'h-12', 'text-emerald-700', 'dark:text-emerald-400')}                               PPIU No. 91203001
className={cn('w-6', 'h-6')}                         </span>
                                        </div>
       className={cn('font-bold', 'text-neutral-900', 'dark:text-white', 'text-lg')}      </div>
                            </div>
               className={cn('text-neutral-500', 'dark:text-neutral-400', 'text-sm', 'leading-relaxed')}             {/* Features (Mengapa Memilih Kami) */}
                <section
                    id="tentang"
                    className="bg-white py-24 dark:bg-[#0a0c14]"
                >
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl space-y-4 className={cn('relative', 'flex', 'flex-col', 'justify-between', 'bg-neutral-50/50', 'dark:bg-neutral-900/30', 'p-8', 'border', 'border-neutral-100', 'hover:border-emerald-700/30', 'dark:border-neutral-800', 'rounded-2xl', 'transition-all', 'hover:-translate-y-1', 'duration-300')}                      <p className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xlclassName={cn('flex', 'justify-center', 'items-center', 'bg-amber-100', 'dark:bg-amber-950/40', 'rounded-xl', 'w-12', 'h-12', 'text-amber-700', 'dark:text-amber-400')}   <p className="text-lg text-neutral-500 dark:teclassName={cn('w-6', 'h-6')}                              Komitmen kami adalah memberikan rasa aman dan
           className={cn('font-bold', 'text-neutral-900', 'dark:text-white', 'text-lg')} ibadah
                                Anda.
                     className={cn('text-neutral-500', 'dark:text-neutral-400', 'text-sm', 'leading-relaxed')}lassName="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
                            {/* Card 1 */}
                            <div className="relative flex flex-col justify-between rounded-2xl border border-neutral-100 bg-neutral-50/50 p-8 transition-all duration-300 className={cn('relative', 'flex', 'flex-col', 'justify-between', 'bg-neutral-50/50', 'dark:bg-neutral-900/30', 'p-8', 'border', 'border-neutral-100', 'hover:border-emerald-700/30', 'dark:border-neutral-800', 'rounded-2xl', 'transition-all', 'hover:-translate-y-1', 'duration-300')}nter justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emeraldclassName={cn('flex', 'justify-center', 'items-center', 'bg-blue-100', 'dark:bg-blue-950/40', 'rounded-xl', 'w-12', 'h-12', 'text-blue-700', 'dark:text-blue-400')}                          <h3 className="text-lg className={cn('w-6', 'h-6')}ral-900 dark:text-white">
                                        Pembimbing Sunnah
   className={cn('font-bold', 'text-neutral-900', 'dark:text-white', 'text-lg')}             <p className="text-sm leading-relaxed text-neutral-5className={cn('text-neutral-500', 'dark:text-neutral-400', 'text-sm', 'leading-relaxed')}didampingi oleh Ustadz
                                        berpengalaman yang membimbing sesuai
                                        tuntunan Al-Quran dan Sunnah.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2 */}className={cn('relative', 'flex', 'flex-col', 'justify-between', 'bg-neutral-50/50', 'dark:bg-neutral-900/30', 'p-8', 'border', 'border-neutral-100', 'hover:border-emerald-700/30', 'dark:border-neutral-800', 'rounded-2xl', 'transition-all', 'hover:-translate-y-1', 'duration-300')}eutral-800 dark:bg-neutral-900/30">
                                <div className="space-y-4">
       className={cn('flex', 'justify-center', 'items-center', 'bg-purple-100', 'dark:bg-purple-950/40', 'rounded-xl', 'w-12', 'h-12', 'text-purple-700', 'dark:text-purple-400')}er-950/40 dark:text-amber-400">
                          className={cn('w-6', 'h-6')}l className="h-6 w-6" />
                                    </div>
                   className={cn('font-bold', 'text-neutral-900', 'dark:text-white', 'text-lg')}-900 dark:text-white">
                                        HotclassName={cn('text-neutral-500', 'dark:text-neutral-400', 'text-sm', 'leading-relaxed')}                       <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                                        Akomodasi hotel bintang 4 & 5 dengan
                                        jarak dekat ke Masjidil Haram dan Masjid
                                        Nabawi.
                                    </p>
                                </div>
                   className={cn('bg-neutral-50', 'dark:bg-[#07090e]', 'py-24')}Card 3 */}
                className={cn('mx-auto', 'px-6', 'lg:px-8', 'max-w-7xl')}flex-col justify-between roundeclassName={cn('space-y-4', 'mx-auto', 'max-w-3xl', 'text-center')}8 transition-all duration-300 hoveclassName={cn('font-bold', 'text-emerald-700', 'dark:text-amber-400', 'text-xs', 'uppercase', 'tracking-widest')}>
                                <div className="space-y-className={cn('font-extrabold', 'text-neutral-900', 'dark:text-white', 'text-3xl', 'sm:text-4xl', 'tracking-tight')}ter rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                                        <PclassName={cn('text-neutral-500', 'dark:text-neutral-400', 'text-lg')}      </div>
                                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                                        Penerbangan Terbaik
                                    </h3>
                                    <p className="text-className={cn('gap-10', 'grid', 'grid-cols-1', 'lg:grid-cols-3', 'mx-auto', 'mt-16', 'lg:max-w-none', 'max-w-md')}             Menggunakan maskapai ternama seperti
                                        Garuda Indonesia & Saudia Airlines
                                        direct tanpa transit.
                                    </p>
                                </div>
                            </div>

                            {/* Card 4 */}
                            <div className="relative flex flex-col justify-between rounded-2xl border border-neutral-100 bg-neutral-50/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:boclassName={cn('flex', 'flex-col', 'justify-between', 'bg-white', 'dark:bg-[#11131c]', 'shadow-lg', 'hover:shadow-xl', 'border', 'border-neutral-200/60', 'dark:border-neutral-900', 'rounded-3xl', 'overflow-hidden', 'transition-all', 'hover:-translate-y-1.5', 'duration-300')}unded-xl bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400">
                                        <HeartHandshake className="h-6 w-6" />
                                    </div>
                   className={cn('flex', 'justify-between', 'items-center', 'gap-4')}ext-neutral-900 dark:text-white">
                          className={cn('inline-flex', 'items-center', 'gap-1.5', 'bg-emerald-50', 'dark:bg-emerald-950/50', 'px-3.5', 'py-1', 'rounded-full', 'font-bold', 'text-emerald-700', 'dark:text-emerald-400', 'text-xs')}-500 dark:text-neutral-400">
                                    className={cn('w-3.5', 'h-3.5')}if lokal di Makkah &
                                        Madinah siap melayani kebutuhan jamaah
                                        24 jam.
                                    </p>
                                </div>
                            </div>
                  className={cn('font-bold', 'text-neutral-500', 'dark:text-neutral-400', 'text-xs')}                {/* Packages Section */}
                <section
                    id="paket"
                    className="bg-neutral-className={cn('font-bold', 'text-amber-600', 'dark:text-amber-400', 'text-xs')}  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl space-y-4 text-center">
                            <h2 className="text-xs foclassName={cn('mt-4', 'font-bold', 'text-neutral-900', 'dark:text-white', 'text-2xl', 'tracking-tight')}                      Pilihan Paket Ibadah
                            </h2>
                            <p className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:className={cn('mt-2', 'text-neutral-500', 'dark:text-neutral-400', 'text-sm', 'line-clamp-2')}lan Kami
                            </p>
                            <p className="text-lg text-neutral-500 dark:text-neutral-400">
                                Pilihan paket umroh dengan jadwal keberangkatan
                            className={cn('mt-6', 'pb-6', 'border-neutral-100', 'dark:border-neutral-800', 'border-b')}   transparan.
                            </p>
            className={cn('font-semibold', 'text-neutral-400', 'text-sm')}ckages Grid */}
                        <div className="mx-auto mt-16 grid maclassName={cn('flex', 'items-baseline', 'mt-1')}one lg:grid-cols-3">
                            {paketUmroh.lenclassName={cn('font-extrabold', 'text-emerald-800', 'dark:text-amber-400', 'text-3xl', 'tracking-tight')}                     const nearestKeberangkatan =
                                          paket.keberangkatan &&
                                          paket.keberangkatan.length > 0
                            className={cn('ml-1', 'text-neutral-400', 'text-sm')}]
                                              : null;

                                      return (
                                          <div
                                              key={paket.id}
                                      className={cn('space-y-4', 'mt-6', 'text-neutral-600', 'dark:text-neutral-300', 'text-sm')}3xl border border-neutral-200/60 bg-white shadow-lg transiclassName={cn('flex', 'items-center', 'gap-3')}ate-y-1.5 hover:shadow-xl dark:border-neutral-900 dark:bg-[#11131className={cn('w-5', 'h-5', 'text-emerald-600', 'dark:text-emerald-400', 'shrink-0')}                           <div className="p-8">
                                                  {/* Header */}
                                                  <div className="flex items-center justify-betweenclassName={cn('flex', 'items-center', 'gap-3')}                            <span className="inline-flex items-ceclassName={cn('w-5', 'h-5', 'text-emerald-600', 'dark:text-emerald-400', 'shrink-0')}ld text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                                                          <Clock className="h-3.5 w-3.5" />
                                                          {paket.durasi_hari}{' '}
                                         className={cn('flex', 'items-center', 'gap-3')}                                         </span>
                       className={cn('w-5', 'h-5', 'text-emerald-600', 'dark:text-emerald-400', 'shrink-0')}                                            <span className="text-xs className={cn('flex', 'flex-col')}0 dark:text-neutral-400">
                                                              Grup Besar
                                                          </span>
                              className={cn('text-neutral-500', 'dark:text-neutral-400', 'text-xs')}                              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                                                              Grup Eksklusif
                                                          </span>
                                                      )}
                                                  </div>

                                                  <h3 className="mt-4 text-2xl fonclassName={cn('flex', 'items-center', 'gap-3', 'font-medium', 'text-amber-600', 'dark:text-amber-400')}                             {paket.nama_paket}
                        className={cn('w-5', 'h-5', 'shrink-0')}h3>
                                                  <p className="mt-2 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
                                                      {paket.deskripsi}
                                                  </p>

                                                  {/* Price */}
                                 className={cn('flex', 'items-center', 'gap-3')}-6 border-b border-neutral-100 pb-6 dark:border-neutral-800">
       className={cn('w-5', 'h-5', 'text-emerald-600', 'dark:text-emerald-400', 'shrink-0')}t-sm font-semibold text-neutral-400">
                                                       className={cn('text-amber-600', 'dark:text-amber-400')}                       </span>
                                                      <div className="mt-1 flex items-baseline">
                                                          <span className="text-3xl font-extrabold tracking-tight text-emerald-800 dark:text-amber-400">
                                                              {formatRupiah(
                                                                  paket.harga,
                                                         className={cn('mt-6', 'pt-6', 'border-neutral-100', 'dark:border-neutral-800', 'border-t')}
                                                          <spanclassName={cn('font-bold', 'text-neutral-400', 'text-xs', 'uppercase', 'tracking-wider')}                                   / Pax
                                                className={cn('gap-2', 'grid', 'grid-cols-2', 'mt-3', 'text-xs')}                         </div>
                                                  </div>

                                                  {/* Details list */}
                       className={cn('flex', 'items-center', 'gap-1.5', 'text-neutral-600', 'dark:text-neutral-300')}l-600 dark:text-neutral-300">
                                               className={cn('w-4.5', 'h-4.5', 'text-emerald-600', 'shrink-0')}                                                         <Plane className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                                          <span>
                                                              {paket.maskapai}{' '}
                                                              (Direct)
                                                          </span>
                                                      </li>
                                                      <li className="flex items-center gap-3">
                                                          <Hotel className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                                          <spclassName={cn('bg-neutral-50/50', 'dark:bg-neutral-900/10', 'p-6', 'border-neutral-100', 'dark:border-neutral-850', 'border-t')}                               </span>
                                                      </li>
                                                      {nearestKeberangkatan ? (
                                                          <li className="fleclassName={cn('block', 'bg-emerald-700', 'hover:bg-emerald-800', 'dark:bg-emerald-600', 'dark:hover:bg-emerald-500', 'shadow-md', 'py-3', 'rounded-xl', 'w-full', 'font-bold', 'text-white', 'text-sm', 'text-center', 'transition-colors')}                                     <div className="flex flex-col">
                                                                  <span className="font-medium">
                                                                      Jadwal
                                                                      Keberangkatan:
                                                                  </span>
                                className={cn('block', 'bg-white', 'hover:bg-emerald-50', 'dark:bg-transparent', 'dark:hover:bg-emerald-950/20', 'py-3', 'border', 'border-emerald-700/25', 'dark:border-emerald-600/35', 'rounded-xl', 'w-full', 'font-bold', 'text-emerald-800', 'dark:text-emerald-400', 'text-sm', 'text-center', 'transition-colors')}estKeberangkatan.tanggal_berangkat,
                                                                      )}
                                                                  </span>
                                                              </div>
                                                          </li>
                                                      ) : (
                                                          <li className="flex items-center gap-3 font-medium text-amber-600 dark:text-amber-400">
                                                              <Calendar className="h-5 w-5 shrink-0" />
                     className={cn('flex', 'flex-col', 'justify-between', 'bg-white', 'dark:bg-[#11131c]', 'p-8', 'border', 'border-neutral-200', 'dark:border-neutral-900', 'rounded-3xl', 'overflow-hidden')}                                            untuk Jadwal
                                                              className={cn('bg-neutral-200', 'dark:bg-neutral-800', 'rounded', 'w-24', 'h-6', 'animate-pulse')}                                                 )}
 className={cn('bg-neutral-200', 'dark:bg-neutral-800', 'rounded', 'w-48', 'h-8', 'animate-pulse')} (
                                                  className={cn('bg-neutral-200', 'dark:bg-neutral-800', 'rounded', 'w-full', 'h-20', 'animate-pulse')}                               <Users className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emeclassName={cn('bg-neutral-200', 'dark:bg-neutral-800', 'mt-8', 'rounded', 'w-full', 'h-12', 'animate-pulse')}                                                               Kuota Tersisa:{' '}
                                                                  <strong className="text-amber-600 dark:text-amber-400">
                                                                  className={cn('bg-white', 'dark:bg-[#0a0c14]', 'py-24')}                           className={cn('mx-auto', 'px-6', 'lg:px-8', 'max-w-7xl')}                               className={cn('space-y-4', 'mx-auto', 'mb-16', 'max-w-3xl', 'text-center')}                                  className={cn('font-bold', 'text-emerald-700', 'dark:text-amber-400', 'text-xs', 'uppercase', 'tracking-widest')}    /{' '}
                                           className={cn('font-extrabold', 'text-neutral-900', 'dark:text-white', 'text-3xl', 'sm:text-4xl', 'tracking-tight')}nearestKeberangkatan.kuota
                                                                  }{' '}
                                                         className={cn('gap-8', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'mx-auto', 'max-w-4xl')}          </span>
                 className={cn('flex', 'items-start', 'gap-4', 'bg-slate-50', 'dark:bg-neutral-900/20', 'p-6', 'rounded-2xl')}                )}
                    className={cn('flex', 'justify-center', 'items-center', 'bg-amber-100', 'dark:bg-amber-950/30', 'rounded-xl', 'w-10', 'h-10', 'font-bold', 'text-amber-700', 'dark:text-amber-400', 'text-lg', 'shrink-0')}     {paket.fasilitas &&
                                                      paket.faclassName={cn('font-bold', 'text-neutral-900', 'dark:text-white')}                     0 && (
                                         className={cn('mt-1', 'text-neutral-500', 'dark:text-neutral-400', 'text-sm')}00 pt-6 dark:border-neutral-800">
                                                              <span className="text-xs font-bold tracking-wider text-neutral-400 uppercase">
                                    className={cn('flex', 'items-start', 'gap-4', 'bg-slate-50', 'dark:bg-neutral-900/20', 'p-6', 'rounded-2xl')}                     Termasuk:
        className={cn('flex', 'justify-center', 'items-center', 'bg-amber-100', 'dark:bg-amber-950/30', 'rounded-xl', 'w-10', 'h-10', 'font-bold', 'text-amber-700', 'dark:text-amber-400', 'text-lg', 'shrink-0')} gap-2 text-xs">
                                                                  {pakclassName={cn('font-bold', 'text-neutral-900', 'dark:text-white')}                             .slice(
                                className={cn('mt-1', 'text-neutral-500', 'dark:text-neutral-400', 'text-sm')}                                                        4,
                                                                      )
                                                                     className={cn('flex', 'items-start', 'gap-4', 'bg-slate-50', 'dark:bg-neutral-900/20', 'p-6', 'rounded-2xl')}                                       className={cn('flex', 'justify-center', 'items-center', 'bg-amber-100', 'dark:bg-amber-950/30', 'rounded-xl', 'w-10', 'h-10', 'font-bold', 'text-amber-700', 'dark:text-amber-400', 'text-lg', 'shrink-0')}                                      <div
                                            className={cn('font-bold', 'text-neutral-900', 'dark:text-white')}                                                                            className={cn('mt-1', 'text-neutral-500', 'dark:text-neutral-400', 'text-sm')}                        }
                                                                                  className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300"
             className={cn('flex', 'items-start', 'gap-4', 'bg-slate-50', 'dark:bg-neutral-900/20', 'p-6', 'rounded-2xl')}                                       className={cn('flex', 'justify-center', 'items-center', 'bg-amber-100', 'dark:bg-amber-950/30', 'rounded-xl', 'w-10', 'h-10', 'font-bold', 'text-amber-700', 'dark:text-amber-400', 'text-lg', 'shrink-0')}      <span
                                                                           className={cn('font-bold', 'text-neutral-900', 'dark:text-white')}                                                                title={`className={cn('mt-1', 'text-neutral-500', 'dark:text-neutral-400', 'text-sm')}                                                       >
                                                                                      {
                                                                                          f.nama
                                                                                   className={cn('bg-[#021f18]', 'dark:bg-[#03060c]', 'pt-20', 'pb-10', 'border-emerald-950/40', 'border-t', 'text-neutral-300')}                           className={cn('gap-12', 'grid', 'grid-cols-1', 'md:grid-cols-12', 'mx-auto', 'px-6', 'lg:px-8', 'pb-16', 'border-emerald-950/80', 'border-b', 'max-w-7xl')}      ),
                                                                      )}
   className={cn('space-y-6', 'md:col-span-5')}                        </div>
    className={cn('flex', 'items-center', 'gap-3')}                   </div>
             className={cn('flex', 'justify-center', 'items-center', 'bg-emerald-600', 'rounded-xl', 'w-11', 'h-11', 'text-white')}/div>

                                            className={cn('fill-current', 'w-6', 'h-6')}                                   <div className="dark:border-neutral-850 borderclassName={cn('font-bold', 'text-amber-100', 'text-xl', 'uppercase', 'tracking-wider')}                                                 {auth?.user ? (
                className={cn('text-neutral-400', 'text-sm', 'leading-relaxed')}                                                  href={dashboard()}
                                                          className="block w-full rounded-xl bg-emerald-700 py-3 text-center text-sm font-bold text-white shadow-md transition-colors hover:bg-emerald-800 dark:className={cn('flex', 'items-center', 'gap-2', 'font-semibold', 'text-amber-400', 'text-xs')}                        >
              className={cn('bg-amber-400/10', 'px-3.5', 'py-1', 'border', 'border-amber-400/20', 'rounded-full')}                                      Sekarang
                                                      </Link>
                                                  ) : (
             className={cn('space-y-6', 'md:col-span-3')}      <Link
                      className={cn('font-bold', 'text-amber-100', 'text-sm', 'uppercase', 'tracking-wider')}                                        className="blclassName={cn('space-y-3.5', 'text-sm')}rder-emerald-700/25 bg-white py-3 text-center text-sm fonclassName={cn('hover:text-amber-300', 'transition-colors')}-emerald-50 dark:border-emerald-600/35 dark:bg-transparent dark:text-emeraldclassName={cn('hover:text-amber-300', 'transition-colors')}                                       >
                                  className={cn('hover:text-amber-300', 'transition-colors')}                                                </Link>
                                                  )}
                    className={cn('hover:text-amber-300', 'transition-colors')}                         </div>
                                      );
                                  })
                                : // Placeholder states if database has no seeded data yet
                                  [1, 2, 3].map((item) => (
                                      className={cn('space-y-6', 'md:col-span-4')}            key={item}
           className={cn('font-bold', 'text-amber-100', 'text-sm', 'uppercase', 'tracking-wider')}en overflow-hidden rounded-3xl border border-neutral-2className={cn('space-y-4', 'text-neutral-400', 'text-sm')}g-[#11131c]"
                         className={cn('flex', 'items-start', 'gap-3')}                       <div className="space-yclassName={cn('mt-0.5', 'w-5', 'h-5', 'text-amber-400', 'shrink-0')} <div className="h-6 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
                                              <div className="h-8 w-48 animate-pulse rounded bg-neutral-200 dark:className={cn('flex', 'items-center', 'gap-3')}                              <div className=className={cn('w-5', 'h-5', 'text-amber-400', 'shrink-0')}al-200 dark:bg-neutral-800" />
                                    className={cn('hover:text-white', 'transition-colors')}         <div className="mt-8 h-12 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutralclassName={cn('flex', 'items-center', 'gap-3')}            </div>
                         className={cn('w-5', 'h-5', 'text-amber-400', 'shrink-0')}
                    </div>
                </section>

                {/* FclassName={cn('hover:text-white', 'transition-colors')}tion className="bg-white py-24 dark:bg-[#0a0c14]">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
             className={cn('flex', 'sm:flex-row', 'flex-col', 'justify-between', 'items-center', 'gap-4', 'mx-auto', 'mt-8', 'px-6', 'lg:px-8', 'max-w-7xl', 'text-neutral-500', 'text-xs')}            Komitmen Layanan
                            </h2>
                            <p className="text-3xl font-extrabold trackclassName={cn('flex', 'gap-6')}-900 sm:text-4xl dark:text-white">
       className={cn('hover:text-neutral-400', 'transition-colors')}a
                            </p>
                        </divclassName={cn('hover:text-neutral-400', 'transition-colors')}rid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-6 dark:bg-neutral-900/20">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg font-bold text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-bold text-neutral-900 dark:text-white">
                                        Pasti Travelnya Berizin
                                    </h3>
                                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                        Kami terdaftar resmi sebagai
                                        Penyelenggara Perjalanan Ibadah Umroh
                                        (PPIU) di Kementerian Agama RI.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-6 dark:bg-neutral-900/20">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg font-bold text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-bold text-neutral-900 dark:text-white">
                                        Pasti Jadwal & Tiketnya
                                    </h3>
                                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                        Jadwal keberangkatan pasti dan tiket
                                        penerbangan PP sudah dibooking (issued)
                                        jauh hari.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-6 dark:bg-neutral-900/20">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg font-bold text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-bold text-neutral-900 dark:text-white">
                                        Pasti Tarif Layanan & Paketnya
                                    </h3>
                                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                        Harga transparan sesuai brosur tanpa
                                        biaya tambahan tersembunyi selama di
                                        tanah suci.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-6 dark:bg-neutral-900/20">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg font-bold text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                                    4
                                </div>
                                <div>
                                    <h3 className="font-bold text-neutral-900 dark:text-white">
                                        Pasti Hotel & Akomodasinya
                                    </h3>
                                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                        Hotel tempat menginap terjamin
                                        kenyamanan dan lokasinya, sesuai yang
                                        dijanjikan dalam paket.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer
                    id="kontak"
                    className="border-t border-emerald-950/40 bg-[#021f18] pt-20 pb-10 text-neutral-300 dark:bg-[#03060c]"
                >
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 border-b border-emerald-950/80 px-6 pb-16 md:grid-cols-12 lg:px-8">
                        {/* Column 1 - Brand Info */}
                        <div className="space-y-6 md:col-span-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
                                    <AppLogoIcon className="h-6 w-6 fill-current" />
                                </div>
                                <span className="text-xl font-bold tracking-wider text-amber-100 uppercase">
                                    {name}
                                </span>
                            </div>
                            <p className="text-sm leading-relaxed text-neutral-400">
                                {name} adalah agen perjalanan umroh dan haji
                                yang mengutamakan legalitas resmi, pelayanan
                                prima, akomodasi berkelas, dan bimbingan ibadah
                                terpercaya sesuai Al-Quran dan Sunnah.
                            </p>
                            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                                <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3.5 py-1">
                                    PPIU Resmi Kemenag
                                </span>
                            </div>
                        </div>

                        {/* Column 2 - Quick Links */}
                        <div className="space-y-6 md:col-span-3">
                            <h3 className="text-sm font-bold tracking-wider text-amber-100 uppercase">
                                Navigasi Cepat
                            </h3>
                            <ul className="space-y-3.5 text-sm">
                                <li>
                                    <a
                                        href="#tentang"
                                        className="transition-colors hover:text-amber-300"
                                    >
                                        Tentang Kami
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#paket"
                                        className="transition-colors hover:text-amber-300"
                                    >
                                        Paket Umroh
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#fitur"
                                        className="transition-colors hover:text-amber-300"
                                    >
                                        Fasilitas & Perlengkapan
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        href={login()}
                                        className="transition-colors hover:text-amber-300"
                                    >
                                        Pendaftaran Online
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3 - Contacts & Office */}
                        <div className="space-y-6 md:col-span-4">
                            <h3 className="text-sm font-bold tracking-wider text-amber-100 uppercase">
                                Kontak & Kantor
                            </h3>
                            <ul className="space-y-4 text-sm text-neutral-400">
                                <li className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                                    <span>
                                        Jl. Sudirman No. 123, Kebayoran Baru,
                                        Jakarta Selatan, DKI Jakarta 12190
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 shrink-0 text-amber-400" />
                                    <a
                                        href="tel:081111111111"
                                        className="transition-colors hover:text-white"
                                    >
                                        0811-1111-1111
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 shrink-0 text-amber-400" />
                                    <a
                                        href="mailto:info@mahiratour.com"
                                        className="transition-colors hover:text-white"
                                    >
                                        info@mahiratour.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Line */}
                    <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs text-neutral-500 sm:flex-row lg:px-8">
                        <p>
                            &copy; {new Date().getFullYear()} {name}. Seluruh
                            hak cipta dilindungi.
                        </p>
                        <div className="flex gap-6">
                            <a
                                href="#"
                                className="transition-colors hover:text-neutral-400"
                            >
                                Syarat & Ketentuan
                            </a>
                            <a
                                href="#"
                                className="transition-colors hover:text-neutral-400"
                            >
                                Kebijakan Privasi
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
