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
    FileText, 
    CheckCircle2, 
    XCircle, 
    Clock, 
    ExternalLink,
    Search,
    ShieldCheck,
    AlertCircle,
    User,
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
import { router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export interface DokumenData {
    id: number;
    jamaah: {
        nama_lengkap: string;
        nik: string;
    };
    jenis: string;
    file_path: string;
    status_verifikasi: 'pending' | 'valid' | 'ditolak';
    catatan: string;
    uploaded_at: string;
    verifier?: {
        name: string;
    }
}

export function DokumenTable({ data }: { data: DokumenData[] }) {
    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    };

    const verify = (id: number, status: string) => {
        const catatan = status === 'ditolak' ? prompt('Alasan penolakan:') : '';
        if (status === 'ditolak' && catatan === null) return;
        
        router.post(route('admin.dokumen.verify', id), { 
            status_verifikasi: status,
            catatan: catatan
        });
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
        <div className="rounded-2xl border border-neutral-100 bg-white dark:bg-neutral-900/50 overflow-hidden shadow-xl shadow-neutral-100/50">
            <Table>
                <TableHeader className="bg-neutral-50/50">
                    <TableRow className="hover:bg-transparent border-neutral-100">
                        <TableHead className="w-[250px]">Jamaah</TableHead>
                        <TableHead className="w-[180px]">Jenis Dokumen</TableHead>
                        <TableHead>Tgl Upload</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-48 text-center text-neutral-400 font-bold italic">
                                Belum ada dokumen yang diupload
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow key={item.id} className="hover:bg-neutral-50/50 transition-colors border-neutral-100">
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-black text-sm text-foreground">{item.jamaah.nama_lengkap}</span>
                                        <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">{item.jamaah.nik}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500">
                                            <FileText className="h-4 w-4" />
                                        </div>
                                        <span className="text-xs font-bold text-neutral-900">{getJenisLabel(item.jenis)}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-[10px] font-medium text-neutral-500">{formatDate(item.uploaded_at)}</span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <Badge className={cn(
                                            "w-fit rounded-md px-2 py-0.5 font-black text-[9px] uppercase tracking-widest border-none",
                                            item.status_verifikasi === 'valid' ? "bg-green-600 shadow-[0_0_10px_rgba(22,163,74,0.3)]" :
                                            item.status_verifikasi === 'ditolak' ? "bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]" :
                                            "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                                        )}>
                                            {item.status_verifikasi}
                                        </Badge>
                                        {item.verifier && (
                                            <span className="text-[8px] font-bold text-neutral-400 italic">
                                                Verified by: {item.verifier.name}
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-neutral-100">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-xl w-48 p-2">
                                                <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-2 py-1.5">Aksi Dokumen</DropdownMenuLabel>
                                                <DropdownMenuItem asChild className="rounded-lg gap-2 cursor-pointer font-bold text-xs">
                                                    <a href={`/storage/${item.file_path}`} target="_blank" rel="noopener noreferrer">
                                                        <Eye className="h-4 w-4 text-blue-500" /> Lihat File
                                                    </a>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem 
                                                    onClick={() => verify(item.id, 'valid')}
                                                    disabled={item.status_verifikasi === 'valid'}
                                                    className="rounded-lg gap-2 cursor-pointer font-bold text-xs text-green-600 focus:bg-green-50 focus:text-green-600"
                                                >
                                                    <ShieldCheck className="h-4 w-4" /> Tandai Valid
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    onClick={() => verify(item.id, 'ditolak')}
                                                    disabled={item.status_verifikasi === 'ditolak'}
                                                    className="rounded-lg gap-2 cursor-pointer font-bold text-xs text-red-600 focus:bg-red-50 focus:text-red-600"
                                                >
                                                    <AlertCircle className="h-4 w-4" /> Tolak Dokumen
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
