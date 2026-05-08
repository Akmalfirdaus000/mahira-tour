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
import { ArrowLeft, Calendar, Save, Loader2, Info } from 'lucide-react';

interface Props {
    paket: { id: number; nama_paket: string }[];
}

export default function CreateKeberangkatan({ paket }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        paket_id: '',
        tanggal_berangkat: '',
        tanggal_pulang: '',
        kuota: '',
        keterangan: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.keberangkatan.store'));
    };

    return (
        <>
            <Head title="Tambah Jadwal Keberangkatan" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-4xl mx-auto w-full">
                <div className="flex items-center gap-3">
                    <Button asChild variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-neutral-100">
                        <Link href={route('admin.keberangkatan.index')}>
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-black tracking-tight text-foreground">Tambah Jadwal Baru</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <Card className="border-none shadow-xl rounded-[32px] overflow-hidden">
                        <CardHeader className="bg-neutral-900 text-white p-6">
                            <CardTitle className="text-lg font-black flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-blue-500" />
                                Detail Keberangkatan
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="tanggal_berangkat">Tanggal Keberangkatan</Label>
                                    <Input 
                                        id="tanggal_berangkat" 
                                        type="date"
                                        value={data.tanggal_berangkat} 
                                        onChange={e => setData('tanggal_berangkat', e.target.value)} 
                                        className="rounded-xl h-11"
                                    />
                                    {errors.tanggal_berangkat && <p className="text-xs font-bold text-red-600">{errors.tanggal_berangkat}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tanggal_pulang">Tanggal Kepulangan</Label>
                                    <Input 
                                        id="tanggal_pulang" 
                                        type="date"
                                        value={data.tanggal_pulang} 
                                        onChange={e => setData('tanggal_pulang', e.target.value)} 
                                        className="rounded-xl h-11"
                                    />
                                    {errors.tanggal_pulang && <p className="text-xs font-bold text-red-600">{errors.tanggal_pulang}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="kuota">Total Kuota (Jamaah)</Label>
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
                                <Label htmlFor="keterangan">Keterangan Tambahan</Label>
                                <Textarea 
                                    id="keterangan" 
                                    value={data.keterangan} 
                                    onChange={e => setData('keterangan', e.target.value)} 
                                    className="rounded-xl min-h-[120px]"
                                    placeholder="Informasi tambahan terkait jadwal ini..."
                                />
                                {errors.keterangan && <p className="text-xs font-bold text-red-600">{errors.keterangan}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4 mb-10">
                        <Button asChild variant="outline" className="h-12 rounded-2xl px-8 font-bold border-neutral-200">
                            <Link href={route('admin.keberangkatan.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className="h-12 rounded-2xl px-12 font-black bg-neutral-900 hover:bg-neutral-800 gap-2 shadow-xl">
                            {processing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                            Simpan Jadwal
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

CreateKeberangkatan.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Keberangkatan', href: '/admin/keberangkatan' },
        { title: 'Tambah', href: '#' },
    ],
};
