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
import { Eye, Edit2, Trash2, Package, Plane, Hotel, Clock } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';

export interface PaketData {
    id: number;
    nama_paket: string;
    harga: number;
    durasi_hari: number;
    maskapai: string;
    hotel: string;
    kuota: number;
    keberangkatan_count: number;
}

export function PaketTable({ data }: { data: PaketData[] }) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="rounded-2xl border border-neutral-100 bg-white dark:bg-neutral-900/50 overflow-hidden shadow-xl shadow-neutral-100/50">
            <Table>
                <TableHeader className="bg-neutral-50/50">
                    <TableRow className="hover:bg-transparent border-neutral-100">
                        <TableHead className="w-[300px]">Nama Paket</TableHead>
                        <TableHead>Fasilitas Utama</TableHead>
                        <TableHead>Harga & Durasi</TableHead>
                        <TableHead>Kuota</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-48 text-center">
                                <div className="flex flex-col items-center justify-center gap-2 opacity-20">
                                    <Package className="h-12 w-12" />
                                    <p className="text-lg font-black">Belum ada paket umroh</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow key={item.id} className="hover:bg-neutral-50/50 transition-colors border-neutral-100">
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg">
                                            {item.nama_paket.charAt(0)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-black text-foreground leading-tight">{item.nama_paket}</span>
                                            <span className="text-[10px] text-muted-foreground tracking-widest font-bold uppercase mt-1">
                                                {item.keberangkatan_count} Jadwal Keberangkatan
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-xs font-medium">
                                            <Plane className="h-3 w-3 text-blue-500" />
                                            {item.maskapai || '-'}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-medium">
                                            <Hotel className="h-3 w-3 text-amber-500" />
                                            {item.hotel || '-'}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-sm text-blue-700">{formatCurrency(item.harga)}</span>
                                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
                                            <Clock className="h-3 w-3" />
                                            {item.durasi_hari} HARI
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="rounded-lg px-2 py-0.5 font-bold text-[10px] bg-neutral-50 border-neutral-200">
                                        {item.kuota} Kursi
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button asChild variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-blue-50 hover:text-blue-700">
                                            <Link href={route('admin.paket-umroh.show', item.id)}>
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button asChild variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-amber-50 hover:text-amber-700">
                                            <Link href={route('admin.paket-umroh.edit', item.id)}>
                                                <Edit2 className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-9 w-9 p-0 rounded-xl hover:bg-red-50 hover:text-red-700"
                                            onClick={() => {
                                                if (confirm('Apakah Anda yakin ingin menghapus paket umroh ini?')) {
                                                    router.delete(route('admin.paket-umroh.destroy', item.id));
                                                }
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
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
