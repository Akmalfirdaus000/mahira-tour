import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
    CreditCard, 
    ArrowLeft, 
    Info, 
    Upload, 
    CheckCircle2, 
    Building2,
    Copy,
    Image as ImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';

interface PageProps {
    pendaftaran: any;
    sisa_bayar: number;
}

export default function PembayaranCreate({ pendaftaran, sisa_bayar }: PageProps) {
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        pendaftaran_id: pendaftaran.id,
        jumlah: sisa_bayar,
        metode: 'transfer',
        bukti_bayar: null as File | null,
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('bukti_bayar', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Nomor rekening berhasil disalin!');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('jamaah.pembayaran.store'), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Kirim Pembayaran" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-5xl mx-auto w-full">
                <Link 
                    href={route('jamaah.pendaftaran.show', pendaftaran.id)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-amber-600 transition-colors w-fit"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Detail
                </Link>

                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-black text-foreground tracking-tight">Kirim Bukti Pembayaran</h1>
                    <p className="text-muted-foreground italic text-sm">
                        Silakan lengkapi form di bawah ini untuk konfirmasi pembayaran Anda.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Info Rekening */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                            <CardHeader className="bg-blue-600 text-white p-8">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Building2 className="h-5 w-5" />
                                    Rekening Tujuan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 flex flex-col gap-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Bank Mandiri</p>
                                            <p className="text-xl font-black text-foreground tracking-tight">123-000-456-7890</p>
                                            <p className="text-xs font-medium text-muted-foreground">A.N. PT MAHIRA TOUR TRAVEL</p>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard('1230004567890')} className="text-blue-600 hover:bg-blue-100">
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground italic">Tagihan Saat Ini:</span>
                                        <span className="font-black text-lg text-amber-600">{formatCurrency(sisa_bayar)}</span>
                                    </div>
                                    <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 flex items-start gap-3">
                                        <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                                        <p className="text-[10px] text-amber-800 italic leading-relaxed">
                                            Harap masukkan jumlah sesuai dengan nominal yang Anda transfer agar proses verifikasi lebih cepat.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Upload Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-xl font-black">Form Konfirmasi</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <Button 
                                        type="button"
                                        variant="outline"
                                        className={cn(
                                            "rounded-xl h-12 font-bold text-xs border-2",
                                            data.jumlah === 500000 ? "border-blue-600 bg-blue-50 text-blue-600" : "border-neutral-100"
                                        )}
                                        onClick={() => setData('jumlah', 500000)}
                                    >
                                        DP Minimal (500rb)
                                    </Button>
                                    <Button 
                                        type="button"
                                        variant="outline"
                                        className={cn(
                                            "rounded-xl h-12 font-bold text-xs border-2",
                                            data.jumlah === sisa_bayar ? "border-blue-600 bg-blue-50 text-blue-600" : "border-neutral-100"
                                        )}
                                        onClick={() => setData('jumlah', sisa_bayar)}
                                    >
                                        Bayar Lunas
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="jumlah" className="text-xs font-bold uppercase tracking-wider">Jumlah yang Dibayar (IDR)</Label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-muted-foreground">Rp</div>
                                        <Input 
                                            id="jumlah" 
                                            type="number" 
                                            value={data.jumlah} 
                                            onChange={e => setData('jumlah', Number(e.target.value))} 
                                            className="h-14 pl-12 rounded-xl text-xl font-black border-2 focus:border-blue-500 bg-white"
                                        />
                                    </div>
                                    <p className="text-sm font-bold text-blue-600 italic">
                                        Terbilang: {formatCurrency(Number(data.jumlah))}
                                    </p>
                                    {errors.jumlah && <p className="text-xs text-red-500 font-bold">{errors.jumlah}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider">Metode Pembayaran</Label>
                                    <Select value={data.metode} onValueChange={v => setData('metode', v)}>
                                        <SelectTrigger className="h-12 rounded-xl">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="transfer">Transfer Bank</SelectItem>
                                            <SelectItem value="cash">Tunai / Kantor</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider">Bukti Transfer (Gambar)</Label>
                                    <div 
                                        className={cn(
                                            "border-2 border-dashed rounded-3xl p-8 transition-all flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-neutral-50",
                                            preview ? "border-blue-500 bg-blue-50/20" : "border-neutral-200"
                                        )}
                                        onClick={() => document.getElementById('bukti_bayar')?.click()}
                                    >
                                        {preview ? (
                                            <div className="relative group w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                                                <img src={preview} alt="Bukti Transfer" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-white text-xs font-bold">Ganti Gambar</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="h-16 w-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                                                    <Upload className="h-8 w-8" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-sm font-bold">Klik untuk unggah</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">PNG, JPG atau PDF up to 2MB</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <input 
                                        id="bukti_bayar" 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    {errors.bukti_bayar && <p className="text-xs text-red-500">{errors.bukti_bayar}</p>}
                                </div>

                                <Button 
                                    type="submit" 
                                    className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-lg font-black rounded-2xl shadow-lg shadow-blue-600/30"
                                    disabled={processing || !data.bukti_bayar}
                                >
                                    {processing ? 'Mengirim...' : 'Kirim Pembayaran'}
                                </Button>
                            </CardContent>
                        </Card>
                    </form>
                </div>
            </div>
        </>
    );
}

PembayaranCreate.layout = {
    breadcrumbs: [
        { title: 'Beranda', href: '/jamaah/beranda' },
        { title: 'Pembayaran', href: '/jamaah/pembayaran' },
        { title: 'Form Konfirmasi', href: '#' },
    ],
};
