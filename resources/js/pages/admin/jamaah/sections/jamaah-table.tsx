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
    Eye, 
    User, 
    Phone, 
    MapPin, 
    Search, 
    Edit2, 
    Trash2 
} from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface JamaahData {
    id: number;
    nama_lengkap: string;
    nik: string;
    no_hp: string;
    kota: string;
    pendaftaran: Array<{
        id: number;
        status: string;
    }>;
}

export function JamaahTable({ data }: { data: JamaahData[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data.filter(item => 
        item.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nik.includes(searchTerm) ||
        item.no_hp.includes(searchTerm)
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Cari nama, NIK, atau No. HP..." 
                        className="pl-10 h-11 rounded-xl bg-white shadow-sm border-neutral-100"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="text-sm text-muted-foreground font-medium italic">
                    Menampilkan {filteredData.length} dari {data.length} Jamaah
                </div>
            </div>

            <div className="rounded-2xl border border-neutral-100 bg-white dark:bg-neutral-900/50 overflow-hidden shadow-xl shadow-neutral-100/50">
                <Table>
                    <TableHeader className="bg-neutral-50/50">
                        <TableRow className="hover:bg-transparent border-neutral-100">
                            <TableHead className="w-[300px]">Jamaah</TableHead>
                            <TableHead>Kontak & Lokasi</TableHead>
                            <TableHead>Status Terakhir</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-48 text-center">
                                    <div className="flex flex-col items-center justify-center gap-2 opacity-20">
                                        <User className="h-12 w-12" />
                                        <p className="text-lg font-black">Data tidak ditemukan</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredData.map((item) => (
                                <TableRow key={item.id} className="hover:bg-neutral-50/50 transition-colors border-neutral-100">
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-lg">
                                                {item.nama_lengkap.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-foreground">{item.nama_lengkap}</span>
                                                <span className="text-[10px] text-muted-foreground tracking-widest font-bold uppercase">NIK: {item.nik}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-xs font-medium">
                                                <Phone className="h-3 w-3 text-blue-500" />
                                                {item.no_hp}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground italic">
                                                <MapPin className="h-3 w-3" />
                                                {item.kota}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {item.pendaftaran && item.pendaftaran.length > 0 ? (
                                            <Badge variant="outline" className={cn(
                                                "rounded-lg px-2 py-0.5 font-bold text-[10px] uppercase tracking-wider",
                                                item.pendaftaran[0].status === 'lunas' ? "bg-green-50 text-green-700 border-green-200" :
                                                item.pendaftaran[0].status === 'pending' ? "bg-amber-50 text-amber-700 border-amber-200" :
                                                "bg-blue-50 text-blue-700 border-blue-200"
                                            )}>
                                                {item.pendaftaran[0].status}
                                            </Badge>
                                        ) : (
                                            <span className="text-[10px] text-muted-foreground italic">Belum Mendaftar</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button asChild variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-blue-50 hover:text-blue-700">
                                                <Link href={route('admin.jamaah.show', item.id)}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button asChild variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-amber-50 hover:text-amber-700">
                                                <Link href={route('admin.jamaah.edit', item.id)}>
                                                    <Edit2 className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="h-9 w-9 p-0 rounded-xl hover:bg-red-50 hover:text-red-700"
                                                onClick={() => {
                                                    if (confirm('Apakah Anda yakin ingin menghapus data jamaah ini? Seluruh data user terkait juga akan dihapus.')) {
                                                        router.delete(route('admin.jamaah.destroy', item.id));
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
        </div>
    );
}
