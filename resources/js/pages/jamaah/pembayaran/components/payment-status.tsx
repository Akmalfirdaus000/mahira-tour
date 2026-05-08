import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

export function PaymentStatus({ status }: { status: string }) {
    switch (status.toLowerCase()) {
        case 'success':
        case 'berhasil':
        case 'lunas':
            return (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1.5 py-1 px-3">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Berhasil
                </Badge>
            );
        case 'pending':
        case 'menunggu':
            return (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1.5 py-1 px-3">
                    <Clock className="h-3.5 w-3.5" />
                    Pending
                </Badge>
            );
        case 'failed':
        case 'gagal':
            return (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1.5 py-1 px-3">
                    <XCircle className="h-3.5 w-3.5" />
                    Gagal
                </Badge>
            );
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
}
