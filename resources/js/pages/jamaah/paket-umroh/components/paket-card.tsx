import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Calendar, Plane, MapPin, Users, CheckCircle2 } from 'lucide-react';

export interface PaketUmrohProps {
    id: number;
    nama_paket: string;
    harga: string | number;
    durasi_hari: number;
    maskapai: string | null;
    hotel: string | null;
    deskripsi: string | null;
    kuota: number;
    fasilitas: Array<{
        id: number;
        nama: string;
        tipe: string;
        pivot: {
            keterangan: string;
        };
    }>;
    keberangkatan: Array<{
        id: number;
        tanggal_berangkat: string;
        sisa_kuota: number;
    }>;
}

export function PaketCard({ paket }: { paket: PaketUmrohProps }) {
    const formattedHarga = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(Number(paket.harga));

    const keberangkatanTerdekat = paket.keberangkatan && paket.keberangkatan.length > 0
        ? paket.keberangkatan.sort((a, b) => new Date(a.tanggal_berangkat).getTime() - new Date(b.tanggal_berangkat).getTime())[0]
        : null;

    const formatterDate = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:ring-1 hover:ring-amber-500/50">
            <div className="relative h-48 w-full overflow-hidden bg-amber-100 dark:bg-amber-900/30">
                <div className="absolute inset-0 flex items-center justify-center opacity-20 transition-transform duration-500 group-hover:scale-110">
                    <img 
                        src="https://images.unsplash.com/photo-1565552643983-61f22e831102?auto=format&fit=crop&q=80&w=800" 
                        alt="Kaaba" 
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="line-clamp-2 text-xl font-bold leading-tight">{paket.nama_paket}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-md hover:bg-white/30">
                            {paket.durasi_hari} Hari
                        </Badge>
                        {keberangkatanTerdekat && (
                            <Badge variant="secondary" className="bg-amber-500/80 text-white backdrop-blur-md hover:bg-amber-500">
                                Sisa {keberangkatanTerdekat.sisa_kuota} Kuota
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            <CardContent className="flex flex-1 flex-col p-5">
                <div className="mb-4 flex items-end justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Mulai dari</p>
                        <p className="text-2xl font-bold text-amber-600 dark:text-amber-500">{formattedHarga}</p>
                    </div>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Plane className="h-4 w-4 text-amber-500" />
                        <span className="line-clamp-1">{paket.maskapai || 'Maskapai Belum Ditentukan'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-amber-500" />
                        <span className="line-clamp-1">{paket.hotel || 'Hotel Belum Ditentukan'}</span>
                    </div>
                    {keberangkatanTerdekat && (
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-amber-500" />
                            <span>Berangkat: <strong className="text-foreground">{formatterDate.format(new Date(keberangkatanTerdekat.tanggal_berangkat))}</strong></span>
                        </div>
                    )}
                </div>

                <div className="mt-6 border-t pt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fasilitas Termasuk</p>
                    <ul className="grid grid-cols-1 gap-2 text-sm">
                        {paket.fasilitas && paket.fasilitas.slice(0, 3).map((fasilitas) => (
                            <li key={fasilitas.id} className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                                <span className="line-clamp-1">{fasilitas.nama}</span>
                            </li>
                        ))}
                        {paket.fasilitas && paket.fasilitas.length > 3 && (
                            <li className="text-xs italic text-muted-foreground">
                                + {paket.fasilitas.length - 3} fasilitas lainnya
                            </li>
                        )}
                    </ul>
                </div>
            </CardContent>

            <CardFooter className="bg-muted/30 p-5 pt-0">
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white transition-colors" asChild>
                    <Link href={`/jamaah/paket-umroh/${paket.id}`}>
                        Lihat Detail & Daftar
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
