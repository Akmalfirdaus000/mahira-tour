import { PaketCard, type PaketUmrohProps } from '../components/paket-card';
import { PackageOpen } from 'lucide-react';

export function PaketList({ paketUmroh }: { paketUmroh: PaketUmrohProps[] }) {
    if (!paketUmroh || paketUmroh.length === 0) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-sidebar-border bg-muted/20 p-8 text-center">
                <div className="mb-4 rounded-full bg-amber-100 p-4 dark:bg-amber-900/20">
                    <PackageOpen className="h-10 w-10 text-amber-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Belum Ada Paket Tersedia</h3>
                <p className="max-w-md text-sm text-muted-foreground">
                    Saat ini belum ada paket umroh yang tersedia atau dibuka untuk pendaftaran. Silakan kembali lagi nanti atau hubungi admin.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paketUmroh.map((paket) => (
                <PaketCard key={paket.id} paket={paket} />
            ))}
        </div>
    );
}
