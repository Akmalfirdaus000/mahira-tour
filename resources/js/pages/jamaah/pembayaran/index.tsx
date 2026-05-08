import { Head } from '@inertiajs/react';
import { PaymentList, type PaymentData } from './sections/payment-list';
import { CreditCard, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PageProps {
    pembayaran: PaymentData[];
}

export default function PembayaranPage({ pembayaran }: PageProps) {
    const totalBayar = pembayaran.reduce((acc, curr) => acc + Number(curr.jumlah), 0);

    const formatCurrency = (amount: string | number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(Number(amount));
    };

    return (
        <>
            <Head title="Riwayat Pembayaran" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600 text-white shadow-lg shadow-amber-600/20">
                                <CreditCard className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight text-foreground">Riwayat Pembayaran</h1>
                        </div>
                        <p className="text-muted-foreground text-lg italic">
                            Daftar seluruh transaksi pembayaran yang telah Anda lakukan.
                        </p>
                    </div>

                    <Card className="bg-amber-600 text-white border-none shadow-xl shadow-amber-600/20 rounded-2xl min-w-[280px]">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                                <Wallet className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider opacity-80">Total Pembayaran</p>
                                <p className="text-2xl font-black">{formatCurrency(totalBayar)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                <PaymentList data={pembayaran} />
            </div>
        </>
    );
}

PembayaranPage.layout = {
    breadcrumbs: [
        { title: 'Beranda', href: '/jamaah/beranda' },
        { title: 'Pembayaran', href: '/jamaah/pembayaran' },
    ],
};
