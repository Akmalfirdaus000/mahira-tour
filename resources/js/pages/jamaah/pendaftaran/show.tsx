import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
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
    ShieldCheck,
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

export default function PendaftaranShow({
    pendaftaran,
    summary,
    documents,
    categories,
}: PageProps) {
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

    const uploadedCount = categories.filter(
        (cat) => documents[cat.id] && documents[cat.id].length > 0,
    ).length;

    const isLunas =
        pendaftaran.status === 'lunas' || summary.sisa_pembayaran <= 0;

    const isPendingLunas = (summary.sisa_pembayaran - summary.total_pending) <= 0;

    return (
        <>
            <Head title="Detail Pendaftaran" />
            <div
                className={cn(
                    'flex',
                    'flex-col',
                    'gap-8',
                    'mx-auto',
                    'p-6',
                    'md:p-10',
                    'w-full',
                    'max-w-7xl',
                )}
            >
                <Link
                    href={route('jamaah.pendaftaran')}
                    className={cn(
                        'flex',
                        'items-center',
                        'gap-2',
                        'w-fit',
                        'text-muted-foreground',
                        'hover:text-amber-600',
                        'text-sm',
                        'transition-colors',
                    )}
                >
                    <ArrowLeft className={cn('w-4', 'h-4')} />
                    Kembali ke Riwayat Pendaftaran
                </Link>

                <div
                    className={cn(
                        'flex',
                        'md:flex-row',
                        'flex-col',
                        'justify-between',
                        'md:items-center',
                        'gap-4',
                    )}
                >
                    <div className={cn('flex', 'flex-col', 'gap-2')}>
                        <div className={cn('flex', 'items-center', 'gap-2')}>
                            <h1
                                className={cn(
                                    'font-black',
                                    'text-foreground',
                                    'text-3xl',
                                )}
                            >
                                Detail Pendaftaran
                            </h1>
                            <span
                                className={cn(
                                    'rounded-full px-3 py-1 text-[10px] font-black tracking-widest uppercase',
                                    pendaftaran.status === 'lunas'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-amber-100 text-amber-700',
                                )}
                            >
                                {pendaftaran.status}
                            </span>
                        </div>
                        <p
                            className={cn(
                                'text-muted-foreground',
                                'text-sm',
                                'italic',
                            )}
                        >
                            ID Pendaftaran: #REG-
                            {pendaftaran.id.toString().padStart(5, '0')}
                        </p>
                    </div>

                    <div className={cn('flex', 'items-center', 'gap-2')}>
                        <div
                            className={cn(
                                'hidden',
                                'md:block',
                                'mr-4',
                                'text-right',
                            )}
                        >
                            <p
                                className={cn(
                                    'font-black',
                                    'text-[10px]',
                                    'text-red-600',
                                    'uppercase',
                                    'tracking-widest',
                                )}
                            >
                                Batas Pelunasan (H-45)
                            </p>
                            <p
                                className={cn(
                                    'font-bold',
                                    'text-neutral-900',
                                    'text-sm',
                                )}
                            >
                                {getDeadline(
                                    pendaftaran.keberangkatan.tanggal_berangkat,
                                )}
                            </p>
                        </div>
                        <Button
                            asChild
                            variant="outline"
                            className={cn('hover:bg-amber-50', 'border-amber-200', 'rounded-xl', 'text-amber-700')}
                        >
                            <a href={`/jamaah/pendaftaran/${pendaftaran.id}/kuitansi`} target="_blank">
                                Download Invoice
                            </a>
                        </Button>
                        <Button
                            asChild
                            className={cn(
                                'bg-blue-600',
                                'hover:bg-blue-700',
                                'rounded-xl',
                            )}
                        >
                            <Link href={route('jamaah.status')}>
                                Lihat Progres
                            </Link>
                        </Button>
                    </div>
                </div>

                <div
                    className={cn(
                        'gap-8',
                        'grid',
                        'grid-cols-1',
                        'lg:grid-cols-12',
                    )}
                >
                    {/* Left: Info & Documents */}
                    <div className={cn('space-y-8', 'lg:col-span-8')}>
                        {/* Info Paket Card */}
                        <Card
                            className={cn(
                                'shadow-xl',
                                'border-none',
                                'rounded-[32px]',
                                'overflow-hidden',
                            )}
                        >
                            <CardHeader
                                className={cn(
                                    'bg-amber-500',
                                    'p-8',
                                    'text-white',
                                )}
                            >
                                <CardTitle
                                    className={cn(
                                        'flex',
                                        'items-center',
                                        'gap-3',
                                        'text-2xl',
                                    )}
                                >
                                    <Package className={cn('w-7', 'h-7')} />
                                    {
                                        pendaftaran.keberangkatan.paket_umroh
                                            .nama_paket
                                    }
                                </CardTitle>
                                <p className={cn('text-amber-100', 'italic')}>
                                    Jadwal Keberangkatan:{' '}
                                    {formatDate(
                                        pendaftaran.keberangkatan
                                            .tanggal_berangkat,
                                    )}
                                </p>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div
                                    className={cn(
                                        'gap-8',
                                        'grid',
                                        'grid-cols-1',
                                        'md:grid-cols-2',
                                    )}
                                >
                                    <div className="space-y-6">
                                        <div
                                            className={cn(
                                                'flex',
                                                'items-start',
                                                'gap-4',
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    'flex',
                                                    'justify-center',
                                                    'items-center',
                                                    'bg-amber-50',
                                                    'rounded-xl',
                                                    'w-10',
                                                    'h-10',
                                                    'shrink-0',
                                                )}
                                            >
                                                <Building2
                                                    className={cn(
                                                        'w-5',
                                                        'h-5',
                                                        'text-amber-600',
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <p
                                                    className={cn(
                                                        'font-bold',
                                                        'text-[10px]',
                                                        'text-muted-foreground',
                                                        'uppercase',
                                                        'tracking-widest',
                                                    )}
                                                >
                                                    Akomodasi Hotel
                                                </p>
                                                <p className="font-bold">
                                                    {
                                                        pendaftaran
                                                            .keberangkatan
                                                            .paket_umroh.hotel
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className={cn(
                                                'flex',
                                                'items-start',
                                                'gap-4',
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    'flex',
                                                    'justify-center',
                                                    'items-center',
                                                    'bg-amber-50',
                                                    'rounded-xl',
                                                    'w-10',
                                                    'h-10',
                                                    'shrink-0',
                                                )}
                                            >
                                                <Plane
                                                    className={cn(
                                                        'w-5',
                                                        'h-5',
                                                        'text-amber-600',
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <p
                                                    className={cn(
                                                        'font-bold',
                                                        'text-[10px]',
                                                        'text-muted-foreground',
                                                        'uppercase',
                                                        'tracking-widest',
                                                    )}
                                                >
                                                    Maskapai Penerbangan
                                                </p>
                                                <p className="font-bold">
                                                    {
                                                        pendaftaran
                                                            .keberangkatan
                                                            .paket_umroh
                                                            .maskapai
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div
                                            className={cn(
                                                'flex',
                                                'items-start',
                                                'gap-4',
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    'flex',
                                                    'justify-center',
                                                    'items-center',
                                                    'bg-blue-50',
                                                    'rounded-xl',
                                                    'w-10',
                                                    'h-10',
                                                    'shrink-0',
                                                )}
                                            >
                                                <FileText
                                                    className={cn(
                                                        'w-5',
                                                        'h-5',
                                                        'text-blue-600',
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <p
                                                    className={cn(
                                                        'font-bold',
                                                        'text-[10px]',
                                                        'text-muted-foreground',
                                                        'uppercase',
                                                        'tracking-widest',
                                                    )}
                                                >
                                                    Status Dokumen
                                                </p>
                                                <p className="font-bold">
                                                    {uploadedCount} /{' '}
                                                    {categories.length} Berkas
                                                    Lengkap
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className={cn(
                                                'flex',
                                                'items-start',
                                                'gap-4',
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    'flex',
                                                    'justify-center',
                                                    'items-center',
                                                    'bg-blue-50',
                                                    'rounded-xl',
                                                    'w-10',
                                                    'h-10',
                                                    'shrink-0',
                                                )}
                                            >
                                                <ShieldCheck
                                                    className={cn(
                                                        'w-5',
                                                        'h-5',
                                                        'text-blue-600',
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <p
                                                    className={cn(
                                                        'font-bold',
                                                        'text-[10px]',
                                                        'text-muted-foreground',
                                                        'uppercase',
                                                        'tracking-widest',
                                                    )}
                                                >
                                                    Status Verifikasi
                                                </p>
                                                <p
                                                    className={cn(
                                                        'font-bold',
                                                        'capitalize',
                                                    )}
                                                >
                                                    {pendaftaran.status}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment List */}
                        <div className="space-y-4">
                            <h3 className={cn('px-2', 'font-black', 'text-xl')}>
                                Riwayat Pembayaran
                            </h3>
                            <div className="space-y-4">
                                {pendaftaran.pembayaran.length > 0 ? (
                                    pendaftaran.pembayaran.map((pay: any) => (
                                        <Card
                                            key={pay.id}
                                            className={cn(
                                                'shadow-md',
                                                'border-none',
                                                'rounded-2xl',
                                                'overflow-hidden',
                                            )}
                                        >
                                            <CardContent
                                                className={cn(
                                                    'flex',
                                                    'justify-between',
                                                    'items-center',
                                                    'p-6',
                                                )}
                                            >
                                                <div
                                                    className={cn(
                                                        'flex',
                                                        'items-center',
                                                        'gap-4',
                                                    )}
                                                >
                                                    <div
                                                        className={cn(
                                                            'flex h-12 w-12 items-center justify-center rounded-xl',
                                                            pay.status ===
                                                                'sukses'
                                                                ? 'bg-green-50 text-green-600'
                                                                : pay.status ===
                                                                    'pending'
                                                                  ? 'bg-blue-50 text-blue-600'
                                                                  : 'bg-red-50 text-red-600',
                                                        )}
                                                    >
                                                        <CreditCard
                                                            className={cn(
                                                                'w-6',
                                                                'h-6',
                                                            )}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p
                                                            className={cn(
                                                                'font-black',
                                                                'text-lg',
                                                            )}
                                                        >
                                                            {formatCurrency(
                                                                pay.jumlah,
                                                            )}
                                                        </p>
                                                        <p
                                                            className={cn(
                                                                'text-muted-foreground',
                                                                'text-xs',
                                                                'italic',
                                                            )}
                                                        >
                                                            {formatDate(
                                                                pay.tanggal_bayar,
                                                            )}{' '}
                                                            •{' '}
                                                            {pay.metode.toUpperCase()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <Badge
                                                        className={cn(
                                                            'rounded-md border-none px-2 py-0.5 text-[8px] font-black tracking-widest uppercase',
                                                            pay.status ===
                                                                'sukses'
                                                                ? 'bg-green-600'
                                                                : pay.status ===
                                                                    'pending'
                                                                  ? 'bg-blue-600'
                                                                  : 'bg-red-600',
                                                        )}
                                                    >
                                                        {pay.status ===
                                                        'pending'
                                                            ? 'Menunggu Verifikasi'
                                                            : pay.status}
                                                    </Badge>
                                                    {pay.status ===
                                                        'pending' && (
                                                        <p
                                                            className={cn(
                                                                'mt-1',
                                                                'font-bold',
                                                                'text-[8px]',
                                                                'text-blue-600',
                                                                'italic',
                                                            )}
                                                        >
                                                            Harap tunggu admin
                                                        </p>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <div
                                        className={cn(
                                            'p-12',
                                            'border-2',
                                            'border-dashed',
                                            'rounded-[32px]',
                                            'text-muted-foreground',
                                            'text-center',
                                            'italic',
                                        )}
                                    >
                                        Belum ada riwayat pembayaran.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Payment Center */}
                    <div className={cn('space-y-6', 'lg:col-span-4')}>
                        <Card
                            className={cn(
                                'top-8',
                                'sticky',
                                'shadow-2xl',
                                'border-none',
                                'rounded-[32px]',
                                'overflow-hidden',
                            )}
                        >
                            <CardHeader
                                className={cn(
                                    'bg-blue-600',
                                    'p-8',
                                    'text-white',
                                )}
                            >
                                <CardTitle
                                    className={cn(
                                        'flex',
                                        'items-center',
                                        'gap-2',
                                        'text-lg',
                                    )}
                                >
                                    <CreditCard className={cn('w-5', 'h-5')} />
                                    Pusat Pembayaran
                                </CardTitle>
                            </CardHeader>
                            <CardContent className={cn('space-y-8', 'p-8')}>
                                <div className="space-y-4">
                                    <div
                                        className={cn(
                                            'flex',
                                            'justify-between',
                                            'items-center',
                                            'text-sm',
                                        )}
                                    >
                                        <span className="text-muted-foreground">
                                            Total Harga Paket
                                        </span>
                                        <span className="font-bold">
                                            {formatCurrency(
                                                summary.total_harga,
                                            )}
                                        </span>
                                    </div>
                                    <div
                                        className={cn(
                                            'flex',
                                            'justify-between',
                                            'items-center',
                                            'font-bold',
                                            'text-green-600',
                                            'text-sm',
                                        )}
                                    >
                                        <span>Total Sudah Verifikasi</span>
                                        <span>
                                            -{' '}
                                            {formatCurrency(
                                                summary.sudah_dibayar,
                                            )}
                                        </span>
                                    </div>
                                    {summary.total_pending > 0 && (
                                        <div
                                            className={cn(
                                                'flex',
                                                'justify-between',
                                                'items-center',
                                                'font-bold',
                                                'text-blue-600',
                                                'text-sm',
                                            )}
                                        >
                                            <span>Menunggu Verifikasi</span>
                                            <span>
                                                {formatCurrency(
                                                    summary.total_pending,
                                                )}
                                            </span>
                                        </div>
                                    )}
                                    <div
                                        className={cn(
                                            'space-y-1',
                                            'pt-4',
                                            'border-t',
                                        )}
                                    >
                                        <p
                                            className={cn(
                                                'font-bold',
                                                'text-muted-foreground',
                                                'text-xs',
                                                'uppercase',
                                                'tracking-widest',
                                            )}
                                        >
                                            Sisa Tagihan (Fix)
                                        </p>
                                        <p
                                            className={cn(
                                                'font-black',
                                                'text-amber-600',
                                                'text-3xl',
                                            )}
                                        >
                                            {formatCurrency(
                                                summary.sisa_pembayaran,
                                            )}
                                        </p>

                                        {isLunas ? (
                                            <p
                                                className={cn(
                                                    'mt-2',
                                                    'font-bold',
                                                    'text-[10px]',
                                                    'text-green-700',
                                                    'italic',
                                                )}
                                            >
                                                * Tagihan Anda sudah lunas.
                                                Terima kasih.
                                            </p>
                                        ) : isPendingLunas ? (
                                            <p
                                                className={cn(
                                                    'mt-2',
                                                    'font-bold',
                                                    'text-[10px]',
                                                    'text-blue-700',
                                                    'italic',
                                                )}
                                            >
                                                * Pembayaran Anda sedang menunggu verifikasi admin.
                                            </p>
                                        ) : (
                                            <p
                                                className={cn(
                                                    'mt-2',
                                                    'font-bold',
                                                    'text-[10px]',
                                                    'text-amber-700',
                                                    'italic',
                                                )}
                                            >
                                                * Harap segera lakukan pelunasan
                                                atau bayar DP minimal 500rb.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {isLunas ? (
                                        <Button
                                            disabled
                                            className={cn(
                                                'bg-neutral-200',
                                                'rounded-2xl',
                                                'w-full',
                                                'h-16',
                                                'font-black',
                                                'text-neutral-400',
                                                'text-lg',
                                                'cursor-not-allowed',
                                            )}
                                        >
                                            Sudah Lunas
                                            <CheckCircle2
                                                className={cn(
                                                    'ml-2',
                                                    'w-5',
                                                    'h-5',
                                                )}
                                            />
                                        </Button>
                                    ) : isPendingLunas ? (
                                        <Button
                                            disabled
                                            className={cn(
                                                'bg-blue-100',
                                                'text-blue-700',
                                                'rounded-2xl',
                                                'w-full',
                                                'h-16',
                                                'font-black',
                                                'text-lg',
                                                'cursor-not-allowed',
                                            )}
                                        >
                                            Menunggu Verifikasi
                                            <Clock
                                                className={cn(
                                                    'ml-2',
                                                    'w-5',
                                                    'h-5',
                                                )}
                                            />
                                        </Button>
                                    ) : (
                                        <>
                                            <div
                                                className={cn(
                                                    'flex',
                                                    'items-start',
                                                    'gap-3',
                                                    'bg-amber-50',
                                                    'dark:bg-amber-900/10',
                                                    'p-4',
                                                    'border',
                                                    'border-amber-100',
                                                    'rounded-2xl',
                                                )}
                                            >
                                                <Info
                                                    className={cn(
                                                        'mt-0.5',
                                                        'w-5',
                                                        'h-5',
                                                        'text-amber-600',
                                                        'shrink-0',
                                                    )}
                                                />
                                                <p
                                                    className={cn(
                                                        'text-[10px]',
                                                        'text-amber-800',
                                                        'italic',
                                                        'leading-relaxed',
                                                    )}
                                                >
                                                    Batas akhir pelunasan paket
                                                    adalah 45 hari sebelum
                                                    keberangkatan (H-45).
                                                </p>
                                            </div>
                                            <Button
                                                asChild
                                                className={cn(
                                                    'group',
                                                    'bg-blue-600',
                                                    'hover:bg-blue-700',
                                                    'shadow-blue-600/30',
                                                    'shadow-lg',
                                                    'rounded-2xl',
                                                    'w-full',
                                                    'h-16',
                                                    'font-black',
                                                    'text-lg',
                                                )}
                                            >
                                                <Link
                                                    href={route(
                                                        'jamaah.pembayaran.create',
                                                        pendaftaran.id,
                                                    )}
                                                >
                                                    Bayar Sekarang
                                                    <ChevronRight
                                                        className={cn(
                                                            'ml-2',
                                                            'w-5',
                                                            'h-5',
                                                            'transition-transform',
                                                            'group-hover:translate-x-1',
                                                        )}
                                                    />
                                                </Link>
                                            </Button>
                                        </>
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
