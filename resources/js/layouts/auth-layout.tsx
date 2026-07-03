import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Compass, Sparkles } from 'lucide-react';

export default function AuthLayout({
    title = '',
    description = '',
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
}) {
    const { name } = usePage().props;

    return (
        <div className="relative grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-12">
            {/* Left Side (Desktop: 5 cols, visible only on lg+) */}
            <div className="relative hidden flex-col justify-between bg-gradient-to-br from-[#022c22] via-[#011c15] to-[#0f172a] p-12 text-white lg:flex lg:col-span-5 xl:col-span-4 dark:border-r dark:border-emerald-950/30">
                {/* Decorative golden ambient glows */}
                <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-amber-500/10 blur-[100px]" />
                <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
                
                {/* Geometric Star Pattern Overlay */}
                <div 
                    className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0l5.88 17.12L53 17.12l-13.88 10.64L45 45 30 34.24 15 45l5.88-17.24L7 17.12h17.12L30 0z' fill='%23fbbf24' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Header Logo */}
                <Link
                    href={home()}
                    className="relative z-20 flex items-center gap-3 text-xl font-bold tracking-wider text-amber-100 hover:opacity-90 transition-opacity"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 shadow-inner">
                        <AppLogoIcon className="h-6 w-6 fill-current" />
                    </div>
                    <span>{name}</span>
                </Link>

                {/* Quote Card */}
                <div className="relative z-20 my-auto space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Safar Suci Penuh Berkah</span>
                    </div>
                    
                    <div className="space-y-4">
                        <h2 className="text-3xl font-extrabold leading-tight text-amber-50 tracking-tight xl:text-4xl">
                            Menjemput Ridha Allah SWT dengan Nyaman & Khusyuk
                        </h2>
                        <div className="h-1 w-20 rounded-full bg-gradient-to-r from-amber-400 to-emerald-500" />
                    </div>
                    
                    <blockquote className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md shadow-2xl">
                        <p className="text-sm leading-relaxed text-emerald-100/90 italic">
                            "Labbaik Allahumma Labbaik. Penuhi panggilan-Nya dengan penuh ketenangan. Kami berkomitmen mendampingi setiap langkah ibadah Anda dengan layanan terbaik, akomodasi premium, dan bimbingan ibadah yang mutawatir."
                        </p>
                        <footer className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                            <Compass className="h-4 w-4 animate-spin-slow" />
                            <span>Mahira Tour & Travel</span>
                        </footer>
                    </blockquote>
                </div>

                {/* Footer Copyright */}
                <div className="relative z-20 text-xs text-emerald-200/50">
                    &copy; {new Date().getFullYear()} {name}. All rights reserved.
                </div>
            </div>

            {/* Right Side (Mobile & Desktop Content) */}
            <div className="flex flex-col items-center justify-center bg-[#FDFDFC] p-6 lg:col-span-7 xl:col-span-8 lg:p-12 dark:bg-[#09090b]">
                <div className="absolute top-6 right-6 lg:top-10 lg:right-10">
                    <Link
                        href={home()}
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-600 shadow-sm hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-800 dark:bg-[#18181b] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 transition-colors"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>

                <div className="w-full max-w-[400px] py-12">
                    <div className="mb-8 flex flex-col items-center text-center lg:items-start lg:text-left">
                        {/* Mobile logo only */}
                        <Link
                            href={home()}
                            className="mb-6 flex items-center gap-2 lg:hidden"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg">
                                <AppLogoIcon className="h-7 w-7 fill-current" />
                            </div>
                            <span className="text-xl font-bold tracking-wide text-neutral-900 dark:text-white">
                                {name}
                            </span>
                        </Link>

                        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                            {title}
                        </h1>
                        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                            {description}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-neutral-900 dark:bg-[#121214] sm:p-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
