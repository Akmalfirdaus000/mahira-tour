import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    ArrowLeft, 
    User, 
    MapPin, 
    Calendar, 
    Phone, 
    Mail, 
    Edit2, 
    ClipboardCheck, 
    FileText, 
    CreditCard,
    CheckCircle2,
    XCircle,
    Clock,
    ExternalLink,
    ShieldCheck,
    AlertCircle,
    Info,
    Image as ImageIcon,
    MoreHorizontal,
    Eye
} from 'lucide-react';
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs";
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
    jamaah: any;
}

export default function ShowJamaah({ jamaah }: Props) {
    const allPayments = React.useMemo(() => {
        if (!jamaah.pendaftaran) return [];
        const payments: any[] = [];
        jamaah.pendaftaran.forEach((reg: any) => {
            if (reg.pembayaran && Array.isArray(reg.pembayaran)) {
                payments.push(...reg.pembayaran);
            }
        });
        return payments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }, [jamaah.pendaftaran]);

    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getJenisLabel = (jenis: string) => {
        const labels: Record<string, string> = {
            'pas_foto': 'Pas Foto',
            'passport': 'Paspor',
            'ktp_akta': 'KTP / Akta',
            'kk': 'Kartu Keluarga',
            'surat_nikah': 'Surat Nikah',
            'vaksin': 'Sertifikat Vaksin'
        };
        return labels[jenis] || jenis;
    };

    return (
        <>
            <Head title={`Profil ${jamaah.nama_lengkap}`} />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button asChild variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-neutral-100">
                            <Link href={route('admin.jamaah.index')}>
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-black tracking-tight text-foreground">Detail Jamaah</h1>
                    </div>
                    {!window.location.pathname.startsWith('/super-admin') && (
                        <Button asChild className="rounded-2xl h-11 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 gap-2">
                            <Link href={route('admin.jamaah.edit', jamaah.id)}>
                                <Edit2 className="h-4 w-4" />
                                Edit Profil
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left: Quick Profile Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="border-none shadow-xl rounded-[40px] overflow-hidden bg-neutral-900 text-white">
                            <CardContent className="p-8 flex flex-col items-center text-center">
                                <div className="h-24 w-24 rounded-[32px] bg-blue-600 flex items-center justify-center text-3xl font-black mb-6 shadow-2xl shadow-blue-600/50">
                                    {jamaah.nama_lengkap.charAt(0)}
                                </div>
                                <h2 className="text-xl font-black leading-tight mb-2">{jamaah.nama_lengkap}</h2>
                                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">NIK: {jamaah.nik}</p>
                                
                                <div className="w-full space-y-4 pt-6 border-t border-white/10 text-left">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-4 w-4 text-neutral-500" />
                                        <span className="text-sm font-medium">{jamaah.user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-4 w-4 text-neutral-500" />
                                        <span className="text-sm font-medium">{jamaah.no_hp}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-6 rounded-[32px] bg-blue-50 border border-blue-100 space-y-4">
                            <div className="flex items-center gap-2">
                                <Info className="h-4 w-4 text-blue-600" />
                                <span className="text-xs font-black uppercase text-blue-600 tracking-widest">Informasi Penting</span>
                            </div>
                            <p className="text-xs text-blue-900/60 leading-relaxed italic">
                                Pastikan seluruh dokumen persyaratan telah divalidasi sebelum jamaah melakukan pelunasan pembayaran.
                            </p>
                        </div>
                    </div>

                    {/* Right: Tabbed Content */}
                    <div className="lg:col-span-3">
                        <Tabs defaultValue="profil" className="w-full">
                            <TabsList className="w-full justify-start mb-8 p-1">
                                <TabsTrigger value="profil" className="gap-2">
                                    <User className="h-4 w-4" /> Profil
                                </TabsTrigger>
                                <TabsTrigger value="dokumen" className="gap-2">
                                    <FileText className="h-4 w-4" /> Dokumen
                                </TabsTrigger>
                                <TabsTrigger value="pendaftaran" className="gap-2">
                                    <ClipboardCheck className="h-4 w-4" /> Pendaftaran
                                </TabsTrigger>
                                <TabsTrigger value="pembayaran" className="gap-2">
                                    <CreditCard className="h-4 w-4" /> Pembayaran
                                </TabsTrigger>
                            </TabsList>

                            {/* Tab Content: Profil */}
                            <TabsContent value="profil" className="space-y-6 m-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="border-none shadow-xl rounded-[32px] p-8">
                                        <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-red-500" /> Domisili
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Alamat Lengkap</p>
                                                <p className="text-sm font-bold mt-1 leading-relaxed">{jamaah.alamat}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Kota</p>
                                                    <p className="text-sm font-bold mt-1">{jamaah.kota}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Provinsi</p>
                                                    <p className="text-sm font-bold mt-1">{jamaah.provinsi}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="border-none shadow-xl rounded-[32px] p-8">
                                        <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                                            <Calendar className="h-5 w-5 text-blue-500" /> Data Lahir
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Tempat Lahir</p>
                                                <p className="text-sm font-bold mt-1">{jamaah.tempat_lahir}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Tanggal Lahir</p>
                                                <p className="text-sm font-bold mt-1">{formatDate(jamaah.tanggal_lahir)}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </TabsContent>

                            {/* Tab Content: Dokumen */}
                            <TabsContent value="dokumen" className="m-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                                    <Table>
                                        <TableHeader className="bg-neutral-50/50">
                                            <TableRow>
                                                <TableHead>Jenis Dokumen</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Aksi</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {!jamaah.dokumen || jamaah.dokumen.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={3} className="h-32 text-center text-neutral-400 font-bold italic">
                                                        Belum ada dokumen yang diunggah.
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                jamaah.dokumen.map((doc: any) => (
                                                    <TableRow key={doc.id}>
                                                        <TableCell>
                                                            <div className="flex items-center gap-3">
                                                                <FileText className="h-4 w-4 text-blue-500" />
                                                                <span className="font-bold text-sm">{getJenisLabel(doc.jenis)}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge className={cn(
                                                                "rounded-md px-2 py-0.5 font-black text-[9px] uppercase tracking-widest border-none",
                                                                doc.status_verifikasi === 'valid' ? "bg-green-600" :
                                                                doc.status_verifikasi === 'ditolak' ? "bg-red-600" : "bg-amber-500"
                                                            )}>
                                                                {doc.status_verifikasi}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="rounded-xl w-48 p-2">
                                                                    <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-2 py-1.5">Aksi Dokumen</DropdownMenuLabel>
                                                                    <DropdownMenuItem asChild className="rounded-lg gap-2 cursor-pointer font-bold text-xs">
                                                                        <a href={`/storage/${doc.file_path}`} target="_blank" rel="noopener noreferrer">
                                                                            <Eye className="h-4 w-4 text-blue-500" /> Lihat File
                                                                        </a>
                                                                    </DropdownMenuItem>
                                                                    {!window.location.pathname.startsWith('/super-admin') && (
                                                                        <>
                                                                            <DropdownMenuSeparator />
                                                                            <DropdownMenuItem 
                                                                                onClick={() => {
                                                                                    router.post(route('admin.dokumen.verify', doc.id), { status_verifikasi: 'valid' });
                                                                                }}
                                                                                disabled={doc.status_verifikasi === 'valid'}
                                                                                className="rounded-lg gap-2 cursor-pointer font-bold text-xs text-green-600"
                                                                            >
                                                                                <ShieldCheck className="h-4 w-4" /> Tandai Valid
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem 
                                                                                onClick={() => {
                                                                                    const catatan = prompt('Alasan penolakan:');
                                                                                    if (catatan !== null) {
                                                                                        router.post(route('admin.dokumen.verify', doc.id), { status_verifikasi: 'ditolak', catatan });
                                                                                    }
                                                                                }}
                                                                                disabled={doc.status_verifikasi === 'ditolak'}
                                                                                className="rounded-lg gap-2 cursor-pointer font-bold text-xs text-red-600"
                                                                            >
                                                                                <AlertCircle className="h-4 w-4" /> Tolak Dokumen
                                                                            </DropdownMenuItem>
                                                                        </>
                                                                    )}
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </Card>
                            </TabsContent>

                            {/* Tab Content: Pendaftaran */}
                            <TabsContent value="pendaftaran" className="m-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="grid grid-cols-1 gap-6">
                                    {!jamaah.pendaftaran || jamaah.pendaftaran.length === 0 ? (
                                        <Card className="border-none shadow-xl rounded-[32px] p-12 text-center opacity-30 italic font-bold">
                                            Jamaah belum melakukan pendaftaran paket apapun.
                                        </Card>
                                    ) : (
                                        jamaah.pendaftaran.map((reg: any) => (
                                            <Card key={reg.id} className="border-none shadow-xl rounded-[32px] overflow-hidden">
                                                <CardHeader className="bg-neutral-50 p-6 border-b flex flex-row items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Badge className="bg-blue-600 border-none font-black text-[9px] uppercase">REG #{reg.id}</Badge>
                                                        <span className="text-xs font-bold text-neutral-500 italic">Daftar pada: {formatDate(reg.tanggal_daftar)}</span>
                                                    </div>
                                                    <Badge className={cn(
                                                        "rounded-md px-3 py-1 font-black text-[10px] uppercase tracking-widest border-none shadow-lg",
                                                        reg.status === 'lunas' ? "bg-green-600" :
                                                        reg.status === 'dp' ? "bg-blue-600" : "bg-amber-500"
                                                    )}>
                                                        {reg.status}
                                                    </Badge>
                                                </CardHeader>
                                                <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-4">
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Paket Pilihan</span>
                                                            <span className="text-lg font-black text-blue-900">{reg.keberangkatan.paket_umroh.nama_paket}</span>
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Tanggal Keberangkatan</span>
                                                            <span className="text-sm font-bold text-neutral-700 flex items-center gap-2">
                                                                <Calendar className="h-4 w-4 text-blue-500" />
                                                                {formatDate(reg.keberangkatan.tanggal_berangkat)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="bg-neutral-50 rounded-3xl p-6 flex items-center justify-center border-2 border-dashed border-neutral-200">
                                                        <div className="text-center">
                                                            <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest mb-1">Total Biaya</p>
                                                            <p className="text-2xl font-black text-neutral-900">{formatCurrency(reg.keberangkatan.paket_umroh.harga)}</p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    )}
                                </div>
                            </TabsContent>

                            {/* Tab Content: Pembayaran */}
                            <TabsContent value="pembayaran" className="m-0 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                                {jamaah.pendaftaran && jamaah.pendaftaran.length > 0 && (
                                    <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-neutral-50 p-8">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Total Tagihan (Semua Paket)</p>
                                                <p className="text-xl font-black text-neutral-900">
                                                    {formatCurrency(jamaah.pendaftaran.reduce((acc: number, reg: any) => acc + Number(reg.keberangkatan.paket_umroh.harga), 0))}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black uppercase text-green-600 tracking-widest">Total Sudah Dibayar</p>
                                                <p className="text-xl font-black text-green-700">
                                                    {formatCurrency(allPayments.filter(p => p.status === 'sukses').reduce((acc: number, p: any) => acc + Number(p.jumlah), 0))}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black uppercase text-red-600 tracking-widest">Sisa Tagihan</p>
                                                <p className="text-xl font-black text-red-700">
                                                    {formatCurrency(
                                                        jamaah.pendaftaran.reduce((acc: number, reg: any) => acc + Number(reg.keberangkatan.paket_umroh.harga), 0) - 
                                                        allPayments.filter(p => p.status === 'sukses').reduce((acc: number, p: any) => acc + Number(p.jumlah), 0)
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                )}
                                <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                                    <Table>
                                        <TableHeader className="bg-neutral-50/50">
                                            <TableRow>
                                                <TableHead>Tgl Transaksi</TableHead>
                                                <TableHead>Jumlah</TableHead>
                                                <TableHead>Metode</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Bukti</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {allPayments.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="h-32 text-center text-neutral-400 font-bold italic">
                                                        Belum ada histori pembayaran.
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                allPayments.map((pay: any) => (
                                                    <TableRow key={pay.id}>
                                                        <TableCell className="text-xs font-bold">{formatDate(pay.created_at)}</TableCell>
                                                        <TableCell className="font-black text-blue-700">{formatCurrency(pay.jumlah)}</TableCell>
                                                        <TableCell className="text-xs font-medium uppercase">{pay.metode || 'Transfer'}</TableCell>
                                                        <TableCell>
                                                            <Badge className={cn(
                                                                "rounded-md px-2 py-0.5 font-black text-[9px] uppercase tracking-widest border-none",
                                                                pay.status === 'sukses' ? "bg-green-600" :
                                                                pay.status === 'gagal' ? "bg-red-600" : "bg-amber-500"
                                                            )}>
                                                                {pay.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            {pay.bukti_bayar ? (
                                                                <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-blue-50 hover:text-blue-600">
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
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}

ShowJamaah.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Jamaah', href: '/admin/jamaah' },
        { title: 'Detail Profil', href: '#' },
    ],
};
