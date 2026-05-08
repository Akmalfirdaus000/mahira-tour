import { Head, useForm, Link, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    ChevronRight
} from 'lucide-react';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription
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

export default function PendaftaranKonfirmasi({ keberangkatan, all_keberangkatan, jamaah, documents, categories }: KonfirmasiProps) {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        keberangkatan_id: keberangkatan.id,
        nik: jamaah?.nik || '',
        nama_lengkap: jamaah?.nama_lengkap || '',
        tempat_lahir: jamaah?.tempat_lahir || '',
        tanggal_lahir: jamaah?.tanggal_lahir ? new Date(jamaah.tanggal_lahir).toISOString().split('T')[0] : '',
        jenis_kelamin: jamaah?.jenis_kelamin || 'Laki-laki',
        no_hp: jamaah?.no_hp || '',
        alamat: jamaah?.alamat || '',
        kota: jamaah?.kota || '',
        provinsi: jamaah?.provinsi || '',
        konfirmasi: false,
    });

    const uploadedCount = categories.filter(cat => documents[cat.id] && documents[cat.id].length > 0).length;
    const isDocumentComplete = uploadedCount === categories.length;

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
            onError: () => {
                toast.dismiss(toastId);
            }
        });
    };

    return (
        <>
            <Head title="Form Pendaftaran" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-6xl mx-auto w-full">
                <Link 
                    href={`/jamaah/paket-umroh/${keberangkatan.id}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-amber-600 transition-colors w-fit"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Detail Paket
                </Link>

                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-black text-foreground tracking-tight">Form Pendaftaran Umroh</h1>
                    <p className="text-muted-foreground italic text-lg">
                        Silakan lengkapi formulir pendaftaran di bawah ini untuk memulai perjalanan ibadah Anda.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    <div className="lg:col-span-8 space-y-8">
                        <Card className="border-none bg-blue-50/50 dark:bg-blue-900/10 shadow-none rounded-[32px] overflow-hidden border-2 border-blue-100 dark:border-blue-900/30">
                            <CardHeader className="bg-blue-600 text-white p-6">
                                <CardTitle className="text-lg flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FileCheck className="h-5 w-5" />
                                        📂 Status Dokumen Persyaratan
                                    </div>
                                    <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full uppercase">
                                        {uploadedCount} / {categories.length} Lengkap
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                    {categories.map((cat) => {
                                        const doc = documents[cat.id]?.[0];
                                        const isUploaded = !!doc;
                                        return (
                                            <div key={cat.id} className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-900 border shadow-sm">
                                                <div className="flex items-center gap-2">
                                                    {isUploaded ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <AlertTriangle className="h-4 w-4 text-amber-500" />}
                                                    <span className="text-xs font-bold">{cat.label}</span>
                                                </div>
                                                <span className={cn("text-[10px] uppercase font-black tracking-widest", isUploaded ? "text-green-600" : "text-amber-600")}>
                                                    {isUploaded ? 'Lengkap' : 'Belum Upload'}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                                
                                {!isDocumentComplete && (
                                    <div className="p-4 bg-amber-100/50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-900/30 flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div className="flex items-start gap-3">
                                            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-bold text-amber-900 dark:text-amber-100">Dokumen Belum Lengkap!</p>
                                                <p className="text-xs text-amber-800 dark:text-amber-200 italic">Anda harus melengkapi seluruh dokumen sebelum dapat mengirim pendaftaran.</p>
                                            </div>
                                        </div>
                                        <Button asChild variant="outline" className="rounded-xl border-amber-500 text-amber-700 hover:bg-amber-500 hover:text-white">
                                            <Link href={route('jamaah.dokumen')}>Upload Sekarang</Link>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                            <CardHeader className="bg-neutral-800 text-white p-8">
                                <CardTitle className="text-2xl flex items-center gap-3">
                                    <User className="h-7 w-7" />
                                    Data Diri Jamaah
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase">NIK</Label>
                                        <Input value={data.nik} onChange={e => setData('nik', e.target.value)} className="h-12 rounded-xl" />
                                        {errors.nik && <p className="text-xs text-red-500">{errors.nik}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase">Nama Lengkap</Label>
                                        <Input value={data.nama_lengkap} onChange={e => setData('nama_lengkap', e.target.value)} className="h-12 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase">Tempat Lahir</Label>
                                        <Input value={data.tempat_lahir} onChange={e => setData('tempat_lahir', e.target.value)} className="h-12 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase">Tanggal Lahir</Label>
                                        <Input type="date" value={data.tanggal_lahir} onChange={e => setData('tanggal_lahir', e.target.value)} className="h-12 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase">Jenis Kelamin</Label>
                                        <Select value={data.jenis_kelamin} onValueChange={v => setData('jenis_kelamin', v)}>
                                            <SelectTrigger className="h-12 rounded-xl"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                                <SelectItem value="Perempuan">Perempuan</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase">No HP</Label>
                                        <Input value={data.no_hp} onChange={e => setData('no_hp', e.target.value)} className="h-12 rounded-xl" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase">Alamat</Label>
                                    <Input value={data.alamat} onChange={e => setData('alamat', e.target.value)} className="h-12 rounded-xl" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase">Kota</Label>
                                        <Input value={data.kota} onChange={e => setData('kota', e.target.value)} className="h-12 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase">Provinsi</Label>
                                        <Input value={data.provinsi} onChange={e => setData('provinsi', e.target.value)} className="h-12 rounded-xl" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <Card className="border-none shadow-xl rounded-[32px] overflow-hidden sticky top-8">
                            <CardHeader className="bg-amber-500 text-white p-6">
                                <CardTitle className="text-lg flex items-center gap-2"><Package className="h-5 w-5" /> Ringkasan</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div>
                                    <p className="font-black text-xl">{keberangkatan.paket_umroh.nama_paket}</p>
                                    <p className="text-2xl font-black text-amber-600">{formatCurrency(keberangkatan.paket_umroh.harga)}</p>
                                </div>
                                <div className="space-y-4 pt-4 border-t">
                                    <Label className="text-xs font-bold">Pilih Tanggal</Label>
                                    <Select value={data.keberangkatan_id.toString()} onValueChange={v => setData('keberangkatan_id', parseInt(v))}>
                                        <SelectTrigger className="h-12 rounded-xl border-2 border-amber-100"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {all_keberangkatan.map(k => <SelectItem key={k.id} value={k.id.toString()}>{formatDate(k.tanggal_berangkat)}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-start space-x-3 pt-4">
                                    <Checkbox id="konfirmasi" checked={data.konfirmasi} onCheckedChange={v => setData('konfirmasi', v as boolean)} />
                                    <Label htmlFor="konfirmasi" className="text-[10px] italic">Data yang saya isi benar.</Label>
                                </div>
                                <Button 
                                    type="submit" 
                                    className={cn("w-full h-16 text-lg font-black rounded-2xl shadow-lg", isDocumentComplete ? "bg-amber-600 text-white" : "bg-muted text-muted-foreground")}
                                    disabled={processing || !data.konfirmasi || !isDocumentComplete}
                                >
                                    {processing ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </form>

                <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                    <DialogContent className="max-w-md rounded-[32px] p-0 overflow-hidden border-none shadow-2xl text-center">
                        <div className="bg-green-600 p-8 text-white">
                            <CheckCircle2 className="h-16 w-16 mx-auto mb-4" />
                            <h2 className="text-2xl font-black">Pendaftaran Berhasil!</h2>
                        </div>
                        <div className="p-8 space-y-4">
                            <p className="font-medium">Silakan lanjut ke pembayaran untuk mengamankan kursi Anda.</p>
                            <Button className="w-full h-14 bg-blue-600 text-white font-bold rounded-2xl" onClick={() => router.visit(route('jamaah.pembayaran'))}>Lanjut ke Pembayaran</Button>
                            <Button variant="ghost" className="w-full" onClick={() => router.visit(route('jamaah.pendaftaran'))}>Lihat Pesanan Saya</Button>
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
