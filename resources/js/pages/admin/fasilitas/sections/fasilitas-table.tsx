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
import { Edit2, Trash2, Box, Luggage, Info } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';

export interface FasilitasData {
    id: number;
    nama: string;
    tipe: 'fasilitas' | 'perlengkapan';
    deskripsi: string;
}

export function FasilitasTable({ data }: { data: FasilitasData[] }) {
    return (
        <div className="rounded-2xl border border-neutral-100 bg-white dark:bg-neutral-900/50 overflow-hidden shadow-xl shadow-neutral-100/50">
            <Table>
                <TableHeader className="bg-neutral-50/50">
                    <TableRow className="hover:bg-transparent border-neutral-100">
                        <TableHead className="w-[300px]">Nama Fasilitas / Perlengkapan</TableHead>
                        <TableHead>Tipe</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-48 text-center">
                                <div className="flex flex-col items-center justify-center gap-2 opacity-20">
                                    <Box className="h-12 w-12" />
                                    <p className="text-lg font-black">Belum ada master fasilitas</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow key={item.id} className="hover:bg-neutral-50/50 transition-colors border-neutral-100">
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-600">
                                            {item.tipe === 'fasilitas' ? <Info className="h-5 w-5" /> : <Luggage className="h-5 w-5" />}
                                        </div>
                                        <span className="font-black text-foreground">{item.nama}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge className={item.tipe === 'fasilitas' ? "bg-blue-600" : "bg-purple-600"}>
                                        {item.tipe.toUpperCase()}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <p className="text-xs text-muted-foreground italic max-w-[300px] truncate">
                                        {item.deskripsi || '-'}
                                    </p>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button asChild variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-amber-50 hover:text-amber-700">
                                            <Link href={route('admin.fasilitas.edit', item.id)}>
                                                <Edit2 className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-9 w-9 p-0 rounded-xl hover:bg-red-50 hover:text-red-700"
                                            onClick={() => {
                                                if (confirm('Apakah Anda yakin ingin menghapus master fasilitas ini?')) {
                                                    router.delete(route('admin.fasilitas.destroy', item.id));
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
