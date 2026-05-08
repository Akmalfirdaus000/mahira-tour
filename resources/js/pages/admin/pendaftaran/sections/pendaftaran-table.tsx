import React from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
    ClipboardCheck, 
    Trash2, 
    User, 
    Calendar, 
    Package, 
    MoreHorizontal,
    CheckCircle2,
    XCircle,
    Clock,
    Eye
} from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface PendaftaranData {
    id: number;
    jamaah: {
        id: number;
        nama_lengkap: string;
        nik: string;
        user: {
            email: string;
        }
    };
    keberangkatan: {
        id: number;
        tanggal_berangkat: string;
        paket_umroh: {
            nama_paket: string;
        }
    };
    tanggal_daftar: string;
    status: 'pending' | 'dp' | 'lunas' | 'batal';
    catatan_admin: string;
}

export function PendaftaranTable({ data }: { data: PendaftaranData[] }) {
    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    const updateStatus = (id: number, status: string) => {
        router.patch(route('admin.pendaftaran.update', id), { status });
    };

    return (
        <div className="rounded-2xl border border-neutral-100 bg-white dark:bg-neutral-900/50 overflow-hidden shadow-xl shadow-neutral-100/50">
            <Table>
                <TableHeader className="bg-neutral-50/50">
                    <TableRow className="hover:bg-transparent border-neutral-100">
                        <TableHead className="w-[250px]">Jamaah</TableHead>
                        <TableHead className="w-[200px]">Paket & Jadwal</TableHead>
                        <TableHead>Tgl Daftar</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-48 text-center text-neutral-400 font-bold italic">
                                Belum ada data pendaftaran
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow key={item.id} className="hover:bg-neutral-50/50 transition-colors border-neutral-100">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                                            {item.jamaah.nama_lengkap.charAt(0)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-black text-sm text-foreground">{item.jamaah.nama_lengkap}</span>
                                            <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">{item.jamaah.nik}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
                                            <Package className="h-3 w-3 text-blue-500" />
                                            {item.keberangkatan.paket_umroh.nama_paket}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400">
                                            <Calendar className="h-3 w-3" />
                                            {formatDate(item.keberangkatan.tanggal_berangkat)}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-xs font-medium text-neutral-600">{formatDate(item.tanggal_daftar)}</span>
                                </TableCell>
                                <TableCell>
                                    <Badge className={cn(
                                        "rounded-md px-2 py-0.5 font-black text-[9px] uppercase tracking-widest border-none",
                                        item.status === 'lunas' ? "bg-green-600 shadow-[0_0_10px_rgba(22,163,74,0.3)]" :
                                        item.status === 'dp' ? "bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]" :
                                        item.status === 'pending' ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]" :
                                        "bg-red-600"
                                    )}>
                                        {item.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-blue-50 hover:text-blue-700">
                                            <Link href={window.location.pathname.startsWith('/super-admin') ? route('super-admin.pendaftaran.show', item.id) : route('admin.pendaftaran.show', item.id)}>
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        
                                        {!window.location.pathname.startsWith('/super-admin') && (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-xl w-56 p-2">
                                                    <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-2 py-1.5">Manajemen Pendaftaran</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => updateStatus(item.id, 'pending')} className="rounded-lg gap-2 cursor-pointer font-bold text-xs">
                                                        <Clock className="h-4 w-4 text-amber-500" /> Setel ke Pending
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => updateStatus(item.id, 'batal')} className="rounded-lg gap-2 cursor-pointer font-bold text-xs text-red-600">
                                                        <XCircle className="h-4 w-4" /> Batalkan Pendaftaran
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <div className="px-2 py-2 text-[9px] text-muted-foreground italic leading-tight">
                                                        * Status Lunas/DP diperbarui secara otomatis oleh Staf Keuangan setelah verifikasi pembayaran.
                                                    </div>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem 
                                                        onClick={() => {
                                                            if(confirm('Hapus permanen data pendaftaran ini?')) {
                                                                router.delete(route('admin.pendaftaran.destroy', item.id));
                                                            }
                                                        }} 
                                                        className="rounded-lg gap-2 cursor-pointer font-bold text-xs text-red-600 focus:bg-red-50 focus:text-red-600"
                                                    >
                                                        <Trash2 className="h-4 w-4" /> Hapus Permanen
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
