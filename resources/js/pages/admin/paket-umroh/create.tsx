import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Package, Save, Loader2, Plane, Hotel, Clock, Users } from 'lucide-react';

export default function CreatePaketUmroh() {
    const { data, setData, post, processing, errors } = useForm({
        nama_paket: '',
        harga: '',
        durasi_hari: '',
        maskapai: '',
        hotel: '',
        deskripsi: '',
        kuota: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.paket-umroh.store'));
    };

    return (
        <>
            <Head title="Tambah Paket Umroh" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-5xl mx-auto w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button asChild variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-neutral-100">
                            <Link href={route('admin.paket-umroh.index')}>
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-black tracking-tight text-foreground">Tambah Paket Baru</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Basic Info */}
                    <Card className="border-none shadow-xl rounded-[32px] overflow-hidden md:col-span-2">
                        <CardHeader className="bg-neutral-900 text-white p-6">
                            <CardTitle className="text-lg font-black flex items-center gap-2">
                                <Package className="h-5 w-5 text-blue-500" />
                                Informasi Dasar Paket
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4 md:col-span-2">
                                <Label htmlFor="nama_paket">Nama Paket Umroh</Label>
                                <Input 
                                    id="nama_paket" 
                                    value={data.nama_paket} 
                                    onChange={e => setData('nama_paket', e.target.value)} 
                                    className="rounded-xl h-11"
                                    placeholder="Contoh: Paket Umroh Plus Turki 2024"
                                />
                                {errors.nama_paket && <p className="text-xs font-bold text-red-600">{errors.nama_paket}</p>}
                            </div>

                            <div className="space-y-4">
                                <Label htmlFor="harga">Harga Paket (IDR)</Label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-neutral-400">Rp</span>
                                    <Input 
                                        id="harga" 
                                        type="number"
                                        value={data.harga} 
                                        onChange={e => setData('harga', e.target.value)} 
                                        className="rounded-xl h-11 pl-12"
                                        placeholder="0"
                                    />
                                </div>
                                {errors.harga && <p className="text-xs font-bold text-red-600">{errors.harga}</p>}
                            </div>

                            <div className="space-y-4">
                                <Label htmlFor="durasi_hari" className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" /> Durasi (Hari)
                                </Label>
                                <Input 
                                    id="durasi_hari" 
                                    type="number"
                                    value={data.durasi_hari} 
                                    onChange={e => setData('durasi_hari', e.target.value)} 
                                    className="rounded-xl h-11"
                                    placeholder="Contoh: 9"
                                />
                                {errors.durasi_hari && <p className="text-xs font-bold text-red-600">{errors.durasi_hari}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Facilities */}
                    <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                        <CardHeader className="bg-neutral-50 p-6 border-b">
                            <CardTitle className="text-lg font-black flex items-center gap-2">
                                <Plane className="h-5 w-5 text-blue-600" />
                                Maskapai & Hotel
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="maskapai">Nama Maskapai</Label>
                                <Input 
                                    id="maskapai" 
                                    value={data.maskapai} 
                                    onChange={e => setData('maskapai', e.target.value)} 
                                    className="rounded-xl h-11"
                                    placeholder="Contoh: Saudi Arabian Airlines"
                                />
                                {errors.maskapai && <p className="text-xs font-bold text-red-600">{errors.maskapai}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hotel">Nama/Kategori Hotel</Label>
                                <Input 
                                    id="hotel" 
                                    value={data.hotel} 
                                    onChange={e => setData('hotel', e.target.value)} 
                                    className="rounded-xl h-11"
                                    placeholder="Contoh: Hotel Bintang 5"
                                />
                                {errors.hotel && <p className="text-xs font-bold text-red-600">{errors.hotel}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Other Details */}
                    <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                        <CardHeader className="bg-neutral-50 p-6 border-b">
                            <CardTitle className="text-lg font-black flex items-center gap-2">
                                <Users className="h-5 w-5 text-green-600" />
                                Kuota & Deskripsi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="kuota">Kuota Per Keberangkatan</Label>
                                <Input 
                                    id="kuota" 
                                    type="number"
                                    value={data.kuota} 
                                    onChange={e => setData('kuota', e.target.value)} 
                                    className="rounded-xl h-11"
                                    placeholder="Contoh: 45"
                                />
                                {errors.kuota && <p className="text-xs font-bold text-red-600">{errors.kuota}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="deskripsi">Deskripsi Singkat</Label>
                                <Textarea 
                                    id="deskripsi" 
                                    value={data.deskripsi} 
                                    onChange={e => setData('deskripsi', e.target.value)} 
                                    className="rounded-xl min-h-[100px]"
                                    placeholder="Jelaskan keunggulan paket ini..."
                                />
                                {errors.deskripsi && <p className="text-xs font-bold text-red-600">{errors.deskripsi}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="md:col-span-2 flex justify-end gap-4 mb-10">
                        <Button asChild variant="outline" className="h-12 rounded-2xl px-8 font-bold border-neutral-200">
                            <Link href={route('admin.paket-umroh.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className="h-12 rounded-2xl px-12 font-black bg-neutral-900 hover:bg-neutral-800 gap-2 shadow-xl">
                            {processing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                            Simpan Paket Umroh
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

CreatePaketUmroh.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Paket Umroh', href: '/admin/paket-umroh' },
        { title: 'Tambah Paket', href: '/admin/paket-umroh/create' },
    ],
};
