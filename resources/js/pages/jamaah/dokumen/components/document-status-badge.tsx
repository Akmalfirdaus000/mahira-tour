import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

export function DocumentStatusBadge({ status }: { status: string }) {
    switch (status.toLowerCase()) {
        case 'valid':
            return (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1.5 py-1 px-3">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Valid
                </Badge>
            );
        case 'pending':
            return (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1.5 py-1 px-3">
                    <Clock className="h-3.5 w-3.5" />
                    Menunggu Verifikasi
                </Badge>
            );
        case 'ditolak':
            return (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1.5 py-1 px-3">
                    <XCircle className="h-3.5 w-3.5" />
                    Ditolak
                </Badge>
            );
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
}
