import { Badge } from '@/components/ui/badge';

export type StatusType = 'pending' | 'dp' | 'lunas' | 'batal';

export function PendaftaranStatus({ status }: { status: StatusType | string }) {
    switch (status.toLowerCase()) {
        case 'pending':
            return <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/20">Menunggu</Badge>;
        case 'dp':
            return <Badge variant="outline" className="border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-950/20">DP</Badge>;
        case 'lunas':
            return <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 dark:bg-green-950/20">Lunas</Badge>;
        case 'batal':
            return <Badge variant="outline" className="border-red-500 text-red-600 bg-red-50 dark:bg-red-950/20">Batal</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
}
