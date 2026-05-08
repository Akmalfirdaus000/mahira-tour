import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    ArrowLeft, 
    Calendar, 
    Plane, 
    Users, 
    MapPin, 
    Clock, 
    CheckCircle2, 
    Edit2,
    User,
    Mail,
    Phone,
    ClipboardCheck,
    Info
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
    keberangkatan: any;
}

export default function ShowKeberangkatan({ keberangkatan }: Props) {
    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    const okupansi = ((keberangkatan.kuota - keberangkatan.sisa_kuota) / keberangkatan.kuota) * 100;

    return (
        <>
            <Head title={`Detail Keberangkatan #${keberangkatan.id}`} />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button asChild variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-neutral-100">
                            <Link href={route('admin.keberangkatan.index')}>
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-black tracking-tight text-foreground">Detail Keberangkatan</h1>
                    </div>
                    <Button asChild className="rounded-2xl h-11 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 gap-2">
                        <Link href={route('admin.keberangkatan.edit', keberangkatan.id)}>
                            <Edit2 className="h-4 w-4" />
                            Edit Jadwal
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Schedule Info */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-xl rounded-[40px] overflow-hidden">
                            <CardHeader className="bg-neutral-900 text-white p-8">
                                <div className="flex justify-between items-start">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                                        <Plane className="h-6 w-6" />
                                    </div>
                                    <Badge className="bg-blue-600 border-none px-3 py-1 rounded-full font-black text-[10px]">
                                        BATCH #{keberangkatan.id}
                                    </Badge>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-xl font-black leading-tight text-white">{keberangkatan.paket_umroh.nama_paket}</h2>
                                    <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mt-1">Status Keberangkatan</p>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-3xl bg-neutral-50 flex flex-col gap-1">
                                        <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest leading-none">Berangkat</span>
                                        <span className="text-sm font-black text-blue-700">{formatDate(keberangkatan.tanggal_berangkat)}</span>
                                    </div>
                                    <div className="p-4 rounded-3xl bg-neutral-50 flex flex-col gap-1">
                                        <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest leading-none">Pulang</span>
                                        <span className="text-sm font-black text-neutral-600">{formatDate(keberangkatan.tanggal_pulang)}</span>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-neutral-100">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Okupansi Kuota</span>
                                        <span className="text-xl font-black text-neutral-900">{keberangkatan.kuota - keberangkatan.sisa_kuota} / {keberangkatan.kuota}</span>
                                    </div>
                                    <div className="h-3 w-full bg-neutral-100 rounded-full overflow-hidden p-0.5">
                                        <div 
                                            className={cn(
                                                "h-full rounded-full transition-all duration-1000",
                                                okupansi > 80 ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                                            )}
                                            style={{ width: `${okupansi}%` }}
                                        />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground italic text-center">
                                        Tersisa {keberangkatan.sisa_kuota} kursi lagi untuk batch ini.
                                    </p>
                                </div>

                                {keberangkatan.keterangan && (
                                    <div className="p-4 rounded-3xl bg-amber-50 border border-amber-100 mt-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Info className="h-3 w-3 text-amber-600" />
                                            <span className="text-[10px] font-black uppercase text-amber-600 tracking-widest">Catatan Admin</span>
                                        </div>
                                        <p className="text-xs text-amber-900/70 italic leading-relaxed">{keberangkatan.keterangan}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Jamaah List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-600" />
                                Daftar Jamaah Terdaftar
                            </h3>
                            <Badge className="bg-neutral-100 text-neutral-600 border-none font-black rounded-lg">
                                {keberangkatan.pendaftaran?.length || 0} Orang
                            </Badge>
                        </div>

                        <div className="rounded-[40px] border border-neutral-100 bg-white overflow-hidden shadow-xl">
                            <Table>
                                <TableHeader className="bg-neutral-50/50">
                                    <TableRow className="hover:bg-transparent border-neutral-100">
                                        <TableHead className="w-[300px]">Jamaah</TableHead>
                                        <TableHead>Kontak</TableHead>
                                        <TableHead>Status Bayar</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {!keberangkatan.pendaftaran || keberangkatan.pendaftaran.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-64 text-center">
                                                <div className="flex flex-col items-center justify-center gap-3 opacity-20">
                                                    <Users className="h-16 w-16" />
                                                    <p className="text-lg font-black italic">Belum ada jamaah terdaftar di batch ini</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        keberangkatan.pendaftaran.map((reg: any) => (
                                            <TableRow key={reg.id} className="hover:bg-neutral-50/50 transition-colors border-neutral-100">
                                                <TableCell>
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                                                            {reg.jamaah.nama_lengkap.charAt(0)}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-black text-sm text-foreground">{reg.jamaah.nama_lengkap}</span>
                                                            <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">NIK: {reg.jamaah.nik}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2 text-[10px] font-medium">
                                                            <Mail className="h-3 w-3 text-neutral-400" />
                                                            {reg.jamaah.user.email}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-[10px] font-medium">
                                                            <Phone className="h-3 w-3 text-neutral-400" />
                                                            {reg.jamaah.no_hp}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={cn(
                                                        "rounded-md px-2 py-0.5 font-black text-[9px] uppercase tracking-widest border-none",
                                                        reg.status === 'lunas' ? "bg-green-600" :
                                                        reg.status === 'pending' ? "bg-amber-600" :
                                                        "bg-blue-600"
                                                    )}>
                                                        {reg.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button asChild variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-blue-50 hover:text-blue-700">
                                                        <Link href={route('admin.jamaah.show', reg.jamaah.id)}>
                                                            <ClipboardCheck className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ShowKeberangkatan.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Keberangkatan', href: '/admin/keberangkatan' },
        { title: 'Detail Batch', href: '#' },
    ],
};
