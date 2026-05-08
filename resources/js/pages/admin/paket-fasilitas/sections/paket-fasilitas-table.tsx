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
import { Edit2, Trash2, Link as LinkIcon, Package, Box, Info } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';

export interface PaketFasilitasData {
    id: number;
    paket_umroh: {
        nama_paket: string;
    };
    fasilitas: {
        nama: string;
        tipe: string;
    };
    keterangan: string;
}

export function PaketFasilitasTable({ data }: { data: PaketFasilitasData[] }) {
    return (
        <div className="rounded-2xl border border-neutral-100 bg-white dark:bg-neutral-900/50 overflow-hidden shadow-xl shadow-neutral-100/50">
            <Table>
                <TableHeader className="bg-neutral-50/50">
                    <TableRow className="hover:bg-transparent border-neutral-100">
                        <TableHead className="w-[250px]">Paket Umroh</TableHead>
                        <TableHead className="w-[250px]">Fasilitas / Perlengkapan</TableHead>
                        <TableHead>Keterangan Detail</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-48 text-center">
                                <div className="flex flex-col items-center justify-center gap-2 opacity-20">
                                    <LinkIcon className="h-12 w-12" />
                                    <p className="text-lg font-black">Belum ada fasilitas dihubungkan</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow key={item.id} className="hover:bg-neutral-50/50 transition-colors border-neutral-100">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Package className="h-4 w-4 text-blue-500" />
                                        <span className="font-black text-foreground">{item.paket_umroh.nama_paket}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <Box className="h-4 w-4 text-purple-500" />
                                            <span className="font-bold text-sm">{item.fasilitas.nama}</span>
                                        </div>
                                        <Badge variant="outline" className="w-fit text-[8px] px-1.5 py-0 font-black tracking-widest uppercase">
                                            {item.fasilitas.tipe}
                                        </Badge>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <p className="text-xs text-muted-foreground italic">
                                        {item.keterangan || '-'}
                                    </p>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button asChild variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-amber-50 hover:text-amber-700">
                                            <Link href={route('admin.paket-fasilitas.edit', item.id)}>
                                                <Edit2 className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-9 w-9 p-0 rounded-xl hover:bg-red-50 hover:text-red-700"
                                            onClick={() => {
                                                if (confirm('Apakah Anda yakin ingin menghapus fasilitas ini dari paket?')) {
                                                    router.delete(route('admin.paket-fasilitas.destroy', item.id));
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
