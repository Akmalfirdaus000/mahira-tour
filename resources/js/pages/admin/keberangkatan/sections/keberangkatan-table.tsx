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
import { Edit2, Trash2, Calendar, Plane, MapPin, Users, Clock, Eye } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface KeberangkatanData {
    id: number;
    paket_umroh: {
        nama_paket: string;
    };
    tanggal_berangkat: string;
    tanggal_pulang: string;
    kuota: number;
    sisa_kuota: number;
    keterangan: string;
}

export function KeberangkatanTable({ data }: { data: KeberangkatanData[] }) {
    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    return (
        <div className="rounded-2xl border border-neutral-100 bg-white dark:bg-neutral-900/50 overflow-hidden shadow-xl shadow-neutral-100/50">
            <Table>
                <TableHeader className="bg-neutral-50/50">
                    <TableRow className="hover:bg-transparent border-neutral-100">
                        <TableHead className="w-[250px]">Paket Umroh</TableHead>
                        <TableHead>Jadwal</TableHead>
                        <TableHead>Kuota & Sisa</TableHead>
                        <TableHead>Keterangan</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-48 text-center">
                                <div className="flex flex-col items-center justify-center gap-2 opacity-20">
                                    <Calendar className="h-12 w-12" />
                                    <p className="text-lg font-black">Belum ada jadwal keberangkatan</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => {
                            const okupansi = ((item.kuota - item.sisa_kuota) / item.kuota) * 100;
                            return (
                                <TableRow key={item.id} className="hover:bg-neutral-50/50 transition-colors border-neutral-100">
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-black text-foreground leading-tight">{item.paket_umroh.nama_paket}</span>
                                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">BATCH #{item.id}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                                                <Plane className="h-3 w-3" />
                                                {formatDate(item.tanggal_berangkat)}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-neutral-400">
                                                <Clock className="h-3 w-3" />
                                                {formatDate(item.tanggal_pulang)}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-2 min-w-[120px]">
                                            <div className="flex justify-between text-[10px] font-black uppercase">
                                                <span>{item.kuota - item.sisa_kuota} Terisi</span>
                                                <span className={cn(
                                                    item.sisa_kuota < 5 ? "text-red-600" : "text-green-600"
                                                )}>{item.sisa_kuota} Sisa</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                                                <div 
                                                    className={cn(
                                                        "h-full rounded-full transition-all duration-500",
                                                        okupansi > 80 ? "bg-amber-500" : "bg-blue-600"
                                                    )}
                                                    style={{ width: `${okupansi}%` }}
                                                />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-xs text-muted-foreground italic max-w-[200px] truncate">
                                            {item.keterangan || '-'}
                                        </p>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button asChild variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-blue-50 hover:text-blue-700">
                                                <Link href={window.location.pathname.startsWith('/super-admin') ? route('super-admin.keberangkatan.show', item.id) : route('admin.keberangkatan.show', item.id)}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            {!window.location.pathname.startsWith('/super-admin') && (
                                                <>
                                                    <Button asChild variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-amber-50 hover:text-amber-700">
                                                        <Link href={route('admin.keberangkatan.edit', item.id)}>
                                                            <Edit2 className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className="h-9 w-9 p-0 rounded-xl hover:bg-red-50 hover:text-red-700"
                                                        onClick={() => {
                                                            if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
                                                                router.delete(route('admin.keberangkatan.destroy', item.id));
                                                            }
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
