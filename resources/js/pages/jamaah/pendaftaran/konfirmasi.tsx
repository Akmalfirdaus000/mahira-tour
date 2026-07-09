import { Head, useForm, Link, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Calendar,
    Package,
    ArrowLeft,
    CheckCircle2,
    User,
    MapPin,
    Phone,
    Fingerprint,
    Plane,
    Building2,
    Info,
    AlertTriangle,
    FileCheck,
    ChevronRight,
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface DocumentData {
    id: number;
    jenis: string;
    status_verifikasi: string;
}

interface Category {
    id: string;
    label: string;
}

interface Keberangkatan {
    id: number;
    tanggal_berangkat: string;
    paket_umroh: {
        nama_paket: string;
        harga: string | number;
        hotel: string;
        maskapai: string;
    };
}

interface Jamaah {
    nik: string;
    nama_lengkap: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    no_hp: string;
    alamat: string;
    kota: string;
    provinsi: string;
}

interface KonfirmasiProps {
    keberangkatan: Keberangkatan;
    all_keberangkatan: Keberangkatan[];
    jamaah: Jamaah | null;
    documents: Record<string, DocumentData[]>;
    categories: Category[];
}

export default function PendaftaranKonfirmasi({
    keberangkatan,
    all_keberangkatan,
    jamaah,
    documents,
    categories,
}: KonfirmasiProps) {
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        keberangkatan_id: keberangkatan.id,
        nik: jamaah?.nik || '',
        nama_lengkap: jamaah?.nama_lengkap || '',
        tempat_lahir: jamaah?.tempat_lahir || '',
        tanggal_lahir: jamaah?.tanggal_lahir
            ? new Date(jamaah.tanggal_lahir).toISOString().split('T')[0]
            : '',
        jenis_kelamin: jamaah?.jenis_kelamin || 'Laki-laki',
        no_hp: jamaah?.no_hp || '',
        alamat: jamaah?.alamat || '',
        kota: jamaah?.kota || '',
        provinsi: jamaah?.provinsi || '',
        konfirmasi: false,
    });

    const requiredCategoryIds = ['pas_foto', 'ktp_akta', 'kk'];
    const uploadedRequiredCount = requiredCategoryIds.filter(
        (id) => documents[id] && documents[id].length > 0,
    ).length;
    const isDocumentComplete =
        uploadedRequiredCount === requiredCategoryIds.length;

    const formatCurrency = (amount: string | number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(Number(amount));
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const toastId = toast.loading('Sedang mengirim pendaftaran...');

        post(route('jamaah.pendaftaran.store'), {
            onSuccess: () => {
                toast.dismiss(toastId);
                setShowSuccessModal(true);
            },
            onError: (errs) => {
                toast.dismiss(toastId);
                toast.error('Gagal mengirim pendaftaran. Silakan periksa kembali inputan Anda.');
            },
        });
    };

    return (
        <>
            <Head title="Form Pendaftaran" />
            <div
                className={cn(
                    'flex',
                    'flex-col',
                    'gap-8',
                    'mx-auto',
                    'p-6',
                    'md:p-10',
                    'w-full',
                    'max-w-6xl',
                )}
            >
                <Link
                    href={`/jamaah/paket-umroh/${keberangkatan.id}`}
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
                    Kembali ke Detail Paket
                </Link>

                <div className={cn('flex', 'flex-col', 'gap-2')}>
                    <h1
                        className={cn(
                            'font-black',
                            'text-foreground',
                            'text-4xl',
                            'tracking-tight',
                        )}
                    >
                        Form Pendaftaran Umroh
                    </h1>
                    <p
                        className={cn(
                            'text-muted-foreground',
                            'text-lg',
                            'italic',
                        )}
                    >
                        Silakan lengkapi formulir pendaftaran di bawah ini untuk
                        memulai perjalanan ibadah Anda.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className={cn(
                        'items-start',
                        'gap-8',
                        'grid',
                        'grid-cols-1',
                        'lg:grid-cols-12',
                    )}
                >
                    <div className={cn('space-y-8', 'lg:col-span-8')}>
                        <Card
                            className={cn(
                                'bg-blue-50/50',
                                'dark:bg-blue-900/10',
                                'shadow-none',
                                'border-2',
                                'border-blue-100',
                                'dark:border-blue-900/30',
                                'border-none',
                                'rounded-[32px]',
                                'overflow-hidden',
                            )}
                        >
                            <CardHeader
                                className={cn(
                                    'bg-blue-600',
                                    'p-6',
                                    'text-white',
                                )}
                            >
                                <CardTitle
                                    className={cn(
                                        'flex',
                                        'justify-between',
                                        'items-center',
                                        'text-lg',
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'flex',
                                            'items-center',
                                            'gap-2',
                                        )}
                                    >
                                        <FileCheck
                                            className={cn('w-5', 'h-5')}
                                        />
                                        📂 Status Dokumen Persyaratan
                                    </div>
                                    <span
                                        className={cn(
                                            'bg-white/20',
                                            'px-3',
                                            'py-1',
                                            'rounded-full',
                                            'font-bold',
                                            'text-xs',
                                            'uppercase',
                                        )}
                                    >
                                        {uploadedRequiredCount} /{' '}
                                        {requiredCategoryIds.length} Wajib
                                        Lengkap
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div
                                    className={cn(
                                        'gap-3',
                                        'grid',
                                        'grid-cols-1',
                                        'sm:grid-cols-2',
                                        'mb-6',
                                    )}
                                >
                                    {categories.map((cat) => {
                                        const doc = documents[cat.id]?.[0];
                                        const isUploaded = !!doc;
                                        const isRequired =
                                            requiredCategoryIds.includes(
                                                cat.id,
                                            );
                                        return (
                                            <div
                                                key={cat.id}
                                                className={cn(
                                                    'flex',
                                                    'justify-between',
                                                    'items-center',
                                                    'bg-white',
                                                    'dark:bg-neutral-900',
                                                    'shadow-sm',
                                                    'p-3',
                                                    'border',
                                                    'rounded-xl',
                                                )}
                                            >
                                                <div
                                                    className={cn(
                                                        'flex',
                                                        'items-center',
                                                        'gap-2',
                                                    )}
                                                >
                                                    {isUploaded ? (
                                                        <CheckCircle2
                                                            className={cn(
                                                                'w-4',
                                                                'h-4',
                                                                'text-green-500',
                                                            )}
                                                        />
                                                    ) : isRequired ? (
                                                        <AlertTriangle
                                                            className={cn(
                                                                'w-4',
                                                                'h-4',
                                                                'text-amber-500',
                                                            )}
                                                        />
                                                    ) : (
                                                        <Info
                                                            className={cn(
                                                                'w-4',
                                                                'h-4',
                                                                'text-neutral-400',
                                                            )}
                                                        />
                                                    )}
                                                    <span
                                                        className={cn(
                                                            'font-bold',
                                                            'text-xs',
                                                        )}
                                                    >
                                                        {cat.label}{' '}
                                                        {!isRequired && (
                                                            <span
                                                                className={cn(
                                                                    'font-normal',
                                                                    'text-[10px]',
                                                                    'text-muted-foreground',
                                                                )}
                                                            >
                                                                (Opsional)
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                                <span
                                                    className={cn(
                                                        'text-[10px] font-black tracking-widest uppercase',
                                                        isUploaded
                                                            ? 'text-green-600'
                                                            : isRequired
                                                              ? 'text-amber-600'
                                                              : 'text-neutral-400',
                                                    )}
                                                >
                                                    {isUploaded
                                                        ? 'Lengkap'
                                                        : 'Belum Upload'}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {!isDocumentComplete && (
                                    <div
                                        className={cn(
                                            'flex',
                                            'md:flex-row',
                                            'flex-col',
                                            'justify-between',
                                            'items-center',
                                            'gap-4',
                                            'bg-amber-100/50',
                                            'dark:bg-amber-900/20',
                                            'p-4',
                                            'border',
                                            'border-amber-200',
                                            'dark:border-amber-900/30',
                                            'rounded-2xl',
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                'flex',
                                                'items-start',
                                                'gap-3',
                                            )}
                                        >
                                            <AlertTriangle
                                                className={cn(
                                                    'mt-0.5',
                                                    'w-5',
                                                    'h-5',
                                                    'text-amber-600',
                                                    'shrink-0',
                                                )}
                                            />
                                            <div>
                                                <p
                                                    className={cn(
                                                        'font-bold',
                                                        'text-amber-900',
                                                        'dark:text-amber-100',
                                                        'text-sm',
                                                    )}
                                                >
                                                    Dokumen Belum Lengkap!
                                                </p>
                                                <p
                                                    className={cn(
                                                        'text-amber-800',
                                                        'dark:text-amber-200',
                                                        'text-xs',
                                                        'italic',
                                                    )}
                                                >
                                                    Anda harus melengkapi
                                                    seluruh dokumen wajib
                                                    sebelum dapat mengirim
                                                    pendaftaran.
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            asChild
                                            variant="outline"
                                            className={cn(
                                                'hover:bg-amber-500',
                                                'border-amber-500',
                                                'rounded-xl',
                                                'text-amber-700',
                                                'hover:text-white',
                                            )}
                                        >
                                            <Link
                                                href={route('jamaah.dokumen')}
                                            >
                                                Upload Sekarang
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

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
                                    'bg-neutral-800',
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
                                    <User className={cn('w-7', 'h-7')} />
                                    Data Diri Jamaah
                                </CardTitle>
                            </CardHeader>
                            <CardContent className={cn('space-y-8', 'p-8')}>
                                <div
                                    className={cn(
                                        'gap-6',
                                        'grid',
                                        'grid-cols-1',
                                        'md:grid-cols-2',
                                    )}
                                >
                                    <div className="space-y-2">
                                        <Label
                                            className={cn(
                                                'font-bold',
                                                'text-xs',
                                                'uppercase',
                                            )}
                                        >
                                            NIK
                                        </Label>
                                        <Input
                                            value={data.nik}
                                            onChange={(e) =>
                                                setData('nik', e.target.value)
                                            }
                                            className={cn('rounded-xl', 'h-12')}
                                        />
                                        {errors.nik && (
                                            <p
                                                className={cn(
                                                    'text-red-500',
                                                    'text-xs',
                                                )}
                                            >
                                                {errors.nik}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            className={cn(
                                                'font-bold',
                                                'text-xs',
                                                'uppercase',
                                            )}
                                        >
                                            Nama Lengkap
                                        </Label>
                                        <Input
                                            value={data.nama_lengkap}
                                            onChange={(e) =>
                                                setData(
                                                    'nama_lengkap',
                                                    e.target.value,
                                                )
                                            }
                                            className={cn('rounded-xl', 'h-12')}
                                        />
                                        {errors.nama_lengkap && (
                                            <p className={cn('text-red-500', 'text-xs', 'mt-1')}>
                                                {errors.nama_lengkap}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            className={cn(
                                                'font-bold',
                                                'text-xs',
                                                'uppercase',
                                            )}
                                        >
                                            Tempat Lahir
                                        </Label>
                                        <Input
                                            value={data.tempat_lahir}
                                            onChange={(e) =>
                                                setData(
                                                    'tempat_lahir',
                                                    e.target.value,
                                                )
                                            }
                                            className={cn('rounded-xl', 'h-12')}
                                        />
                                        {errors.tempat_lahir && (
                                            <p className={cn('text-red-500', 'text-xs', 'mt-1')}>
                                                {errors.tempat_lahir}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            className={cn(
                                                'font-bold',
                                                'text-xs',
                                                'uppercase',
                                            )}
                                        >
                                            Tanggal Lahir
                                        </Label>
                                        <Input
                                            type="date"
                                            value={data.tanggal_lahir}
                                            onChange={(e) =>
                                                setData(
                                                    'tanggal_lahir',
                                                    e.target.value,
                                                )
                                            }
                                            className={cn('rounded-xl', 'h-12')}
                                        />
                                        {errors.tanggal_lahir && (
                                            <p className={cn('text-red-500', 'text-xs', 'mt-1')}>
                                                {errors.tanggal_lahir}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            className={cn(
                                                'font-bold',
                                                'text-xs',
                                                'uppercase',
                                            )}
                                        >
                                            Jenis Kelamin
                                        </Label>
                                        <Select
                                            value={data.jenis_kelamin}
                                            onValueChange={(v) =>
                                                setData('jenis_kelamin', v)
                                            }
                                        >
                                            <SelectTrigger
                                                className={cn(
                                                    'rounded-xl',
                                                    'h-12',
                                                )}
                                            >
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Laki-laki">
                                                    Laki-laki
                                                </SelectItem>
                                                <SelectItem value="Perempuan">
                                                    Perempuan
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.jenis_kelamin && (
                                            <p className={cn('text-red-500', 'text-xs', 'mt-1')}>
                                                {errors.jenis_kelamin}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            className={cn(
                                                'font-bold',
                                                'text-xs',
                                                'uppercase',
                                            )}
                                        >
                                            No HP
                                        </Label>
                                        <Input
                                            value={data.no_hp}
                                            onChange={(e) =>
                                                setData('no_hp', e.target.value)
                                            }
                                            className={cn('rounded-xl', 'h-12')}
                                        />
                                        {errors.no_hp && (
                                            <p className={cn('text-red-500', 'text-xs', 'mt-1')}>
                                                {errors.no_hp}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        className={cn(
                                            'font-bold',
                                            'text-xs',
                                            'uppercase',
                                        )}
                                    >
                                        Alamat
                                    </Label>
                                    <Input
                                        value={data.alamat}
                                        onChange={(e) =>
                                            setData('alamat', e.target.value)
                                        }
                                        className={cn('rounded-xl', 'h-12')}
                                    />
                                    {errors.alamat && (
                                        <p className={cn('text-red-500', 'text-xs', 'mt-1')}>
                                            {errors.alamat}
                                        </p>
                                    )}
                                </div>
                                <div
                                    className={cn(
                                        'gap-6',
                                        'grid',
                                        'grid-cols-1',
                                        'md:grid-cols-2',
                                    )}
                                >
                                    <div className="space-y-2">
                                        <Label
                                            className={cn(
                                                'font-bold',
                                                'text-xs',
                                                'uppercase',
                                            )}
                                        >
                                            Kota
                                        </Label>
                                        <Input
                                            value={data.kota}
                                            onChange={(e) =>
                                                setData('kota', e.target.value)
                                            }
                                            className={cn('rounded-xl', 'h-12')}
                                        />
                                        {errors.kota && (
                                            <p className={cn('text-red-500', 'text-xs', 'mt-1')}>
                                                {errors.kota}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            className={cn(
                                                'font-bold',
                                                'text-xs',
                                                'uppercase',
                                            )}
                                        >
                                            Provinsi
                                        </Label>
                                        <Input
                                            value={data.provinsi}
                                            onChange={(e) =>
                                                setData(
                                                    'provinsi',
                                                    e.target.value,
                                                )
                                            }
                                            className={cn('rounded-xl', 'h-12')}
                                        />
                                        {errors.provinsi && (
                                            <p className={cn('text-red-500', 'text-xs', 'mt-1')}>
                                                {errors.provinsi}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className={cn('space-y-6', 'lg:col-span-4')}>
                        <Card
                            className={cn(
                                'top-8',
                                'sticky',
                                'shadow-xl',
                                'border-none',
                                'rounded-[32px]',
                                'overflow-hidden',
                            )}
                        >
                            <CardHeader
                                className={cn(
                                    'bg-amber-500',
                                    'p-6',
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
                                    <Package className={cn('w-5', 'h-5')} />{' '}
                                    Ringkasan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className={cn('space-y-6', 'p-6')}>
                                <div>
                                    <p className={cn('font-black', 'text-xl')}>
                                        {keberangkatan.paket_umroh.nama_paket}
                                    </p>
                                    <p
                                        className={cn(
                                            'font-black',
                                            'text-amber-600',
                                            'text-2xl',
                                        )}
                                    >
                                        {formatCurrency(
                                            keberangkatan.paket_umroh.harga,
                                        )}
                                    </p>
                                </div>
                                <div
                                    className={cn(
                                        'space-y-4',
                                        'pt-4',
                                        'border-t',
                                    )}
                                >
                                    <Label
                                        className={cn('font-bold', 'text-xs')}
                                    >
                                        Pilih Tanggal
                                    </Label>
                                    <Select
                                        value={data.keberangkatan_id.toString()}
                                        onValueChange={(v) =>
                                            setData(
                                                'keberangkatan_id',
                                                parseInt(v),
                                            )
                                        }
                                    >
                                        <SelectTrigger
                                            className={cn(
                                                'border-2',
                                                'border-amber-100',
                                                'rounded-xl',
                                                'h-12',
                                            )}
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {all_keberangkatan.map((k) => (
                                                <SelectItem
                                                    key={k.id}
                                                    value={k.id.toString()}
                                                >
                                                    {formatDate(
                                                        k.tanggal_berangkat,
                                                    )}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div
                                    className={cn(
                                        'flex',
                                        'items-start',
                                        'space-x-3',
                                        'pt-4',
                                    )}
                                >
                                    <Checkbox
                                        id="konfirmasi"
                                        checked={data.konfirmasi}
                                        onCheckedChange={(v) =>
                                            setData('konfirmasi', v as boolean)
                                        }
                                    />
                                    <Label
                                        htmlFor="konfirmasi"
                                        className={cn(
                                            '[10px textre text-red-800',
                                            'italic',
                                            'textw',
                                        )}
                                    >
                                        Data yang saya isi benar.
                                    </Label>
                                </div>
                                <Button
                                    type="submit"
                                    className={cn(
                                        'h-16 w-full rounded-2xl text-lg font-black shadow-lg',
                                        isDocumentComplete
                                            ? 'bg-amber-600 text-white'
                                            : 'bg-muted text-muted-foreground',
                                    )}
                                    disabled={
                                        processing ||
                                        !data.konfirmasi ||
                                        !isDocumentComplete
                                    }
                                >
                                    {processing
                                        ? 'Mendaftarkan...'
                                        : 'Daftar Sekarang'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </form>

                <Dialog
                    open={showSuccessModal}
                    onOpenChange={setShowSuccessModal}
                >
                    <DialogContent
                        className={cn(
                            'shadow-2xl',
                            'p-0',
                            'border-none',
                            'rounded-[32px]',
                            'max-w-md',
                            'overflow-hidden',
                            'text-center',
                        )}
                    >
                        <div
                            className={cn('bg-green-600', 'p-8', 'text-white')}
                        >
                            <CheckCircle2
                                className={cn(
                                    'mx-auto',
                                    'mb-4',
                                    'w-16',
                                    'h-16',
                                )}
                            />
                            <h2 className={cn('font-black', 'text-2xl')}>
                                Pendaftaran Berhasil!
                            </h2>
                        </div>
                        <div className={cn('space-y-4', 'p-8')}>
                            <p className="font-medium">
                                Silakan lanjut ke pembayaran untuk mengamankan
                                kursi Anda.
                            </p>
                            <Button
                                className={cn(
                                    'bg-blue-600',
                                    'rounded-2xl',
                                    'w-full',
                                    'h-14',
                                    'font-bold',
                                    'text-white',
                                )}
                                onClick={() =>
                                    router.visit(route('jamaah.pembayaran'))
                                }
                            >
                                Lanjut ke Pembayaran
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full"
                                onClick={() =>
                                    router.visit(route('jamaah.pendaftaran'))
                                }
                            >
                                Lihat Pesanan Saya
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

PendaftaranKonfirmasi.layout = {
    breadcrumbs: [
        { title: 'Beranda', href: '/jamaah/beranda' },
        { title: 'Paket Umroh', href: '/jamaah/paket-umroh' },
        { title: 'Form Pendaftaran', href: '#' },
    ],
};
