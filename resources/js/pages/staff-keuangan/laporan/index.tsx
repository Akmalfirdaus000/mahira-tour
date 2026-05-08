import { Head } from '@inertiajs/react';
import { TrendingUp, PieChart, BarChart3, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    monthlyRevenue: any[];
    paymentMethods: any[];
}

export default function LaporanIndex({ monthlyRevenue, paymentMethods }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <>
            <Head title="Laporan Keuangan" />
            <div className="flex flex-col gap-10 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tight text-foreground">Laporan Keuangan</h1>
                        <p className="text-muted-foreground font-medium italic">Analisis pendapatan dan statistik pembayaran.</p>
                    </div>
                    <Button asChild className="rounded-2xl font-black bg-neutral-900 hover:bg-black shadow-xl">
                        <a href={route('staff-keuangan.laporan.export')} target="_blank">
                            <FileDown className="mr-2 h-4 w-4" /> Cetak Laporan (.html)
                        </a>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Monthly Revenue */}
                    <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden">
                        <CardHeader className="p-8 pb-4">
                            <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-emerald-600" />
                                Pendapatan Bulanan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-4">
                            <div className="space-y-4">
                                {monthlyRevenue.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-neutral-50">
                                        <span className="font-bold text-sm text-neutral-600 uppercase tracking-widest">{item.month}</span>
                                        <span className="font-black text-sm text-emerald-600">{formatCurrency(item.total)}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Methods */}
                    <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden">
                        <CardHeader className="p-8 pb-4">
                            <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                                <PieChart className="h-5 w-5 text-blue-600" />
                                Metode Pembayaran
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-4">
                            <div className="space-y-4">
                                {paymentMethods.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-neutral-50">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm text-neutral-900 uppercase tracking-widest">{item.metode}</span>
                                            <span className="text-[10px] text-neutral-400 font-bold italic">{item.count} Transaksi</span>
                                        </div>
                                        <span className="font-black text-sm text-blue-600">{formatCurrency(item.total)}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

LaporanIndex.layout = {
    breadcrumbs: [
        { title: 'Laporan Keuangan', href: '#' },
    ],
};
