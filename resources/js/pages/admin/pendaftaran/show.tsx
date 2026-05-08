import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    ArrowLeft, 
    ClipboardCheck, 
    User, 
    Calendar, 
    Package, 
    CreditCard,
    CheckCircle2,
    XCircle,
    Clock,
    Info,
    Image as ImageIcon,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';

interface Props {
    pendaftaran: any;
}

export default function ShowPendaftaran({ pendaftaran }: Props) {
    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const updateStatus = (status: string) => {
        router.patch(route('admin.pendaftaran.update', pendaftaran.id), { status });
    };

    return (
        <>
            <Head title={`Detail Pendaftaran #${pendaftaran.id}`} />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-3">
                    <Button asChild variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-neutral-100">
                        <Link href={route('admin.pendaftaran.index')}>
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-black tracking-tight text-foreground">Detail Pendaftaran</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Registration & Package Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="border-none shadow-xl rounded-[40px] overflow-hidden">
                            <CardHeader className="bg-neutral-900 text-white p-8">
                                <div className="flex justify-between items-start">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg">
                                        <ClipboardCheck className="h-6 w-6" />
                                    </div>
                                    <Badge className={cn(
                                        "border-none px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg",
                                        pendaftaran.status === 'lunas' ? "bg-green-600" :
                                        pendaftaran.status === 'dp' ? "bg-blue-600" : "bg-amber-500"
                                    )}>
                                        {pendaftaran.status}
                                    </Badge>
                                </div>
                                <div className="mt-6">
                                    <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">ID Pendaftaran</p>
                                    <h2 className="text-2xl font-black leading-tight text-white">REG-{pendaftaran.id}</h2>
                                    <p className="text-neutral-400 text-xs font-bold mt-1 italic">Terdaftar pada: {formatDate(pendaftaran.tanggal_daftar)}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Paket Pilihan</span>
                                        <span className="text-lg font-black text-blue-900">{pendaftaran.keberangkatan.paket_umroh.nama_paket}</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 rounded-3xl bg-neutral-50">
                                        <Calendar className="h-5 w-5 text-blue-600" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase text-neutral-400">Jadwal Berangkat</span>
                                            <span className="text-sm font-bold text-neutral-900">{formatDate(pendaftaran.keberangkatan.tanggal_berangkat)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-neutral-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Update Status</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="rounded-xl font-bold text-[10px] h-9 gap-1.5"
                                            onClick={() => updateStatus('pending')}
                                            disabled={pendaftaran.status === 'pending'}
                                        >
                                            <Clock className="h-3 w-3" /> SETEL KE PENDING
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="rounded-xl font-bold text-[10px] h-9 gap-1.5 text-red-600 border-red-100 hover:bg-red-50"
                                            onClick={() => updateStatus('batal')}
                                            disabled={pendaftaran.status === 'batal'}
                                        >
                                            <XCircle className="h-3 w-3" /> BATALKAN PENDAFTARAN
                                        </Button>
                                        <p className="text-[9px] text-muted-foreground italic mt-2 leading-tight">
                                            * Verifikasi pembayaran (DP/Lunas) dilakukan oleh <strong>Staf Keuangan</strong>.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Middle & Right: Jamaah & Payment Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Jamaah Section */}
                        <Card className="border-none shadow-xl rounded-[40px] p-8">
                            <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2 mb-8">
                                <User className="h-5 w-5 text-blue-600" />
                                Informasi Jamaah
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-[24px] bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-black shadow-inner">
                                        {pendaftaran.jamaah.nama_lengkap.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="text-lg font-black text-neutral-900 leading-tight">{pendaftaran.jamaah.nama_lengkap}</h4>
                                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mt-1">NIK: {pendaftaran.jamaah.nik}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex items-center gap-3 text-sm font-medium">
                                        <Mail className="h-4 w-4 text-neutral-400" /> {pendaftaran.jamaah.user.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-medium">
                                        <Phone className="h-4 w-4 text-neutral-400" /> {pendaftaran.jamaah.no_hp}
                                    </div>
                                </div>
                            </div>
                            <Button asChild variant="link" className="mt-6 p-0 h-auto text-blue-600 font-bold">
                                <Link href={route('admin.jamaah.show', pendaftaran.jamaah.id)}>Lihat Profil Lengkap &rarr;</Link>
                            </Button>
                        </Card>

                        {/* Payment History Section */}
                        <Card className="border-none shadow-xl rounded-[40px] overflow-hidden">
                            <CardHeader className="p-8 pb-0">
                                <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-emerald-600" />
                                    Histori Transaksi
                                </h3>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="rounded-[32px] border border-neutral-100 overflow-hidden bg-neutral-50/30">
                                    <Table>
                                        <TableHeader className="bg-neutral-50/50">
                                            <TableRow className="hover:bg-transparent">
                                                <TableHead>Tgl Bayar</TableHead>
                                                <TableHead>Jumlah</TableHead>
                                                <TableHead>Metode</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Bukti</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {!pendaftaran.pembayaran || pendaftaran.pembayaran.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="h-32 text-center text-neutral-400 font-bold italic">
                                                        Belum ada histori pembayaran.
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                pendaftaran.pembayaran.map((pay: any) => (
                                                    <TableRow key={pay.id} className="hover:bg-white transition-colors">
                                                        <TableCell className="text-[10px] font-black uppercase text-neutral-500">
                                                            {formatDate(pay.created_at)}
                                                        </TableCell>
                                                        <TableCell className="font-black text-blue-700">
                                                            {formatCurrency(pay.jumlah)}
                                                        </TableCell>
                                                        <TableCell className="text-[10px] font-black uppercase text-neutral-600">
                                                            {pay.metode}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge className={cn(
                                                                "rounded-md px-2 py-0.5 font-black text-[8px] uppercase tracking-widest border-none",
                                                                pay.status === 'sukses' ? "bg-green-600" :
                                                                pay.status === 'gagal' ? "bg-red-600" : "bg-amber-500"
                                                            )}>
                                                                {pay.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            {pay.bukti_bayar ? (
                                                                <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-emerald-50 hover:text-emerald-600">
                                                                    <a href={`/storage/${pay.bukti_bayar}`} target="_blank" rel="noopener noreferrer">
                                                                        <ImageIcon className="h-4 w-4" />
                                                                    </a>
                                                                </Button>
                                                            ) : '-'}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

ShowPendaftaran.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Pendaftaran', href: '/admin/pendaftaran' },
        { title: 'Detail', href: '#' },
    ],
};
