import { Head, Link } from '@inertiajs/react';
import { PendaftaranTable, type PendaftaranData } from './sections/pendaftaran-table';
import { AlertCircle, ArrowRight, ClipboardList, Clock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface PageProps {
    pendaftaran: PendaftaranData[];
}

export default function PendaftaranPage({ pendaftaran }: PageProps) {
    const unpaidRegistrations = pendaftaran.filter(p => p.status !== 'lunas' && p.status !== 'batal');
    
    // Check if there's any registration with at least one pending payment
    const hasPendingVerification = unpaidRegistrations.some(p => 
        p.pembayaran && p.pembayaran.some(pay => pay.status === 'pending')
    );

    // Check if there's any registration with NO payments at all
    const hasNoPayment = unpaidRegistrations.some(p => 
        !p.pembayaran || p.pembayaran.length === 0
    );

    return (
        <>
            <Head title="Riwayat Pendaftaran" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-white shadow-lg shadow-amber-500/20">
                            <ClipboardList className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-foreground">Riwayat Pendaftaran</h1>
                    </div>
                    <p className="text-muted-foreground text-lg italic max-w-2xl">
                        Pantau status pendaftaran umroh Anda dan riwayat transaksi pendaftaran yang pernah dilakukan.
                    </p>
                </div>

                {hasNoPayment && (
                    <Alert className="bg-red-50 border-red-200 shadow-sm rounded-2xl p-6">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                            <div className="ml-2">
                                <AlertTitle className="text-red-900 font-black text-lg">Belum Ada Pembayaran</AlertTitle>
                                <AlertDescription className="text-red-800 italic">
                                    Anda memiliki pendaftaran yang belum dibayar. Segera lakukan pembayaran untuk mengamankan kuota keberangkatan.
                                </AlertDescription>
                            </div>
                            <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold px-6">
                                <Link href={route('jamaah.pendaftaran.show', unpaidRegistrations.find(p => !p.pembayaran || p.pembayaran.length === 0)?.id)}>
                                    Bayar Sekarang <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </Alert>
                )}

                {hasPendingVerification && (
                    <Alert className="bg-blue-50 border-blue-200 shadow-sm rounded-2xl p-6">
                        <Clock className="h-6 w-6 text-blue-600" />
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                            <div className="ml-2">
                                <AlertTitle className="text-blue-900 font-black text-lg">Menunggu Verifikasi</AlertTitle>
                                <AlertDescription className="text-blue-800 italic">
                                    Bukti pembayaran Anda telah kami terima dan sedang dalam proses pengecekan oleh tim admin Mahira Tour.
                                </AlertDescription>
                            </div>
                            <Button asChild variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100 rounded-xl font-bold px-6">
                                <Link href={route('jamaah.pembayaran')}>
                                    Cek Riwayat <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </Alert>
                )}
                
                <PendaftaranTable data={pendaftaran} />
            </div>
        </>
    );
}

function Button({ children, className, asChild }: any) {
    return (
        <div className={cn("inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", className)}>
            {children}
        </div>
    );
}

PendaftaranPage.layout = {
    breadcrumbs: [
        { title: 'Beranda', href: '/jamaah/beranda' },
        { title: 'Pendaftaran', href: '/jamaah/pendaftaran' },
    ],
};
