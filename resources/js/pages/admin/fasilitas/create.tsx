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
import { ArrowLeft, Box, Save, Loader2 } from 'lucide-react';

export default function CreateFasilitas() {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        tipe: 'fasilitas',
        deskripsi: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.fasilitas.store'));
    };

    return (
        <>
            <Head title="Tambah Fasilitas" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-3xl mx-auto w-full">
                <div className="flex items-center gap-3">
                    <Button asChild variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-neutral-100">
                        <Link href={route('admin.fasilitas.index')}>
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-black tracking-tight text-foreground">Tambah Fasilitas</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                        <CardHeader className="bg-neutral-900 text-white p-6">
                            <CardTitle className="text-lg font-black flex items-center gap-2">
                                <Box className="h-5 w-5 text-purple-400" />
                                Detail Master Fasilitas
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="nama">Nama Fasilitas / Perlengkapan</Label>
                                <Input 
                                    id="nama" 
                                    value={data.nama} 
                                    onChange={e => setData('nama', e.target.value)} 
                                    className="rounded-xl h-11"
                                    placeholder="Contoh: Koper, Hotel, Asuransi..."
                                />
                                {errors.nama && <p className="text-xs font-bold text-red-600">{errors.nama}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tipe">Tipe</Label>
                                <Select value={data.tipe} onValueChange={v => setData('tipe', v as any)}>
                                    <SelectTrigger className="rounded-xl h-11">
                                        <SelectValue placeholder="Pilih Tipe..." />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value="fasilitas">Fasilitas (Layanan)</SelectItem>
                                        <SelectItem value="perlengkapan">Perlengkapan (Barang)</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.tipe && <p className="text-xs font-bold text-red-600">{errors.tipe}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="deskripsi">Deskripsi Singkat</Label>
                                <Textarea 
                                    id="deskripsi" 
                                    value={data.deskripsi} 
                                    onChange={e => setData('deskripsi', e.target.value)} 
                                    className="rounded-xl min-h-[120px]"
                                    placeholder="Penjelasan terkait fasilitas ini..."
                                />
                                {errors.deskripsi && <p className="text-xs font-bold text-red-600">{errors.deskripsi}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4 mb-10">
                        <Button asChild variant="outline" className="h-12 rounded-2xl px-8 font-bold border-neutral-200">
                            <Link href={route('admin.fasilitas.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className="h-12 rounded-2xl px-12 font-black bg-neutral-900 hover:bg-neutral-800 gap-2 shadow-xl">
                            {processing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                            Simpan Master
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

CreateFasilitas.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Fasilitas', href: '/admin/fasilitas' },
        { title: 'Tambah', href: '#' },
    ],
};
