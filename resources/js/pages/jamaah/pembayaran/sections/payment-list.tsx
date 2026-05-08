import { PaymentStatus } from '../components/payment-status';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

export interface PaymentData {
    id: number;
    tanggal_bayar: string;
    jumlah: string | number;
    metode: string;
    status: string;
    keterangan: string | null;
    pendaftaran: {
        keberangkatan: {
            paket_umroh: {
                nama_paket: string;
            };
        };
    };
}

export function PaymentList({ data }: { data: PaymentData[] }) {
    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    const formatCurrency = (amount: string | number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(Number(amount));
    };

    return (
        <div className="rounded-xl border border-sidebar-border/60 bg-white dark:bg-neutral-900/50 overflow-hidden shadow-sm">
            <Table>
                <TableHeader className="bg-muted/40">
                    <TableRow>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Keterangan Paket</TableHead>
                        <TableHead>Metode</TableHead>
                        <TableHead>Jumlah</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-32 text-center text-muted-foreground italic">
                                Belum ada riwayat transaksi pembayaran.
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow key={item.id} className="hover:bg-muted/10 transition-colors">
                                <TableCell className="text-xs font-medium">
                                    {formatDate(item.tanggal_bayar)}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-foreground text-sm line-clamp-1">
                                            {item.pendaftaran.keberangkatan.paket_umroh.nama_paket}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground italic">
                                            {item.keterangan || 'Pembayaran Umroh'}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-xs uppercase font-bold text-muted-foreground">
                                    {item.metode}
                                </TableCell>
                                <TableCell className="font-black text-amber-600">
                                    {formatCurrency(item.jumlah)}
                                </TableCell>
                                <TableCell>
                                    <PaymentStatus status={item.status} />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                                        <Download className="h-4 w-4" />
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
