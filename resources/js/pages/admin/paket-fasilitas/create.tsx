import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, LinkIcon, Save, Loader2, Info } from 'lucide-react';

interface Props {
    paket: { id: number; nama_paket: string }[];
    fasilitas: { id: number; nama: string; tipe: string }[];
}

export default function CreatePaketFasilitas({ paket, fasilitas }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        paket_id: '',
        fasilitas_id: '',
        keterangan: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.paket-fasilitas.store'));
    };

    return (
        <>
            <Head title="Hubungkan Fasilitas ke Paket" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-3xl mx-auto w-full">
                <div className="flex items-center gap-3">
                    <Button asChild variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-neutral-100">
                        <Link href={route('admin.paket-fasilitas.index')}>
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-black tracking-tight text-foreground">Hubungkan Fasilitas</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                        <CardHeader className="bg-neutral-900 text-white p-6">
                            <CardTitle className="text-lg font-black flex items-center gap-2">
                                <LinkIcon className="h-5 w-5 text-indigo-400" />
                                Relasi Paket & Fasilitas
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="paket_id">Pilih Paket Umroh</Label>
                                <Select value={data.paket_id} onValueChange={v => setData('paket_id', v)}>
                                    <SelectTrigger className="rounded-xl h-11">
                                        <SelectValue placeholder="Pilih Paket..." />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {paket.map(p => (
                                            <SelectItem key={p.id} value={p.id.toString()}>{p.nama_paket}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.paket_id && <p className="text-xs font-bold text-red-600">{errors.paket_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fasilitas_id">Pilih Fasilitas / Perlengkapan</Label>
                                <Select value={data.fasilitas_id} onValueChange={v => setData('fasilitas_id', v)}>
                                    <SelectTrigger className="rounded-xl h-11">
                                        <SelectValue placeholder="Pilih Fasilitas..." />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {fasilitas.map(f => (
                                            <SelectItem key={f.id} value={f.id.toString()}>
                                                <span className="flex items-center gap-2">
                                                    {f.nama} 
                                                    <span className="text-[10px] opacity-50 uppercase font-black">({f.tipe})</span>
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.fasilitas_id && <p className="text-xs font-bold text-red-600">{errors.fasilitas_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="keterangan">Keterangan Spesifik Paket</Label>
                                <Textarea 
                                    id="keterangan" 
                                    value={data.keterangan} 
                                    onChange={e => setData('keterangan', e.target.value)} 
                                    className="rounded-xl min-h-[120px]"
                                    placeholder="Contoh: Hilton Bintang 5, Pesawat Boeing 777..."
                                />
                                {errors.keterangan && <p className="text-xs font-bold text-red-600">{errors.keterangan}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4 mb-10">
                        <Button asChild variant="outline" className="h-12 rounded-2xl px-8 font-bold border-neutral-200">
                            <Link href={route('admin.paket-fasilitas.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className="h-12 rounded-2xl px-12 font-black bg-neutral-900 hover:bg-neutral-800 gap-2 shadow-xl">
                            {processing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                            Hubungkan Sekarang
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

CreatePaketFasilitas.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Paket Fasilitas', href: '/admin/paket-fasilitas' },
        { title: 'Tambah', href: '#' },
    ],
};
