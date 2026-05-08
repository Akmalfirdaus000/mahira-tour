import { PendaftaranStatus } from '../components/pendaftaran-status';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, FileText, ExternalLink } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';

export interface PendaftaranData {
    id: number;
    tanggal_daftar: string;
    status: string;
    catatan_admin: string | null;
    dokumen_count: number;
    keberangkatan: {
        tanggal_berangkat: string;
        paket_umroh: {
            nama_paket: string;
        };
    };
    pembayaran: Array<{
        id: number;
        jumlah: string | number;
        status: string;
    }>;
}

export function PendaftaranTable({ data }: { data: PendaftaranData[] }) {
    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    return (
        <div className="rounded-xl border border-sidebar-border/60 bg-white dark:bg-neutral-900/50 overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/40">
                    <TableRow>
                        <TableHead className="w-[150px]">Tanggal Daftar</TableHead>
                        <TableHead>Paket & Keberangkatan</TableHead>
                        <TableHead>Status Dokumen</TableHead>
                        <TableHead>Status Pendaftaran</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                                Belum ada riwayat pendaftaran.
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow key={item.id} className="hover:bg-muted/20 transition-colors">
                                <TableCell className="font-medium text-xs">
                                    {formatDate(item.tanggal_daftar)}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-foreground line-clamp-1">
                                                {item.keberangkatan.paket_umroh.nama_paket}
                                            </span>
                                            {(() => {
                                                const departureDate = new Date(item.keberangkatan.tanggal_berangkat);
                                                const today = new Date();
                                                today.setHours(0, 0, 0, 0);
                                                const diffTime = departureDate.getTime() - today.getTime();
                                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                
                                                if (diffDays > 0) {
                                                    return <span className="text-[10px] font-black bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md">H-{diffDays}</span>;
                                                } else if (diffDays === 0) {
                                                    return <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-md">Hari Ini</span>;
                                                } else {
                                                    return <span className="text-[10px] font-black bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded-md italic">Selesai</span>;
                                                }
                                            })()}
                                        </div>
                                        <span className="text-[10px] text-muted-foreground">
                                            Berangkat: {formatDate(item.keberangkatan.tanggal_berangkat)}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-2">
                                            <Badge variant={item.dokumen_count >= 6 ? "default" : "outline"} className={item.dokumen_count >= 6 ? "bg-green-600" : "text-amber-600 border-amber-200"}>
                                                {item.dokumen_count}/6 Berkas
                                            </Badge>
                                        </div>
                                        <Link href={route('jamaah.dokumen')} className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline">
                                            Lengkapi Dokumen <ExternalLink className="h-2.5 w-2.5" />
                                        </Link>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <PendaftaranStatus status={item.status} />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button asChild variant="ghost" size="sm" className="h-8 gap-1.5 text-xs hover:bg-amber-50 hover:text-amber-700">
                                        <Link href={route('jamaah.pendaftaran.show', item.id)}>
                                            <Eye className="h-3.5 w-3.5" />
                                            Detail
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
