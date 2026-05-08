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
import { ArrowLeft, User, Save, Loader2, Key } from 'lucide-react';

interface Props {
    jamaah: any;
}

export default function EditJamaah({ jamaah }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        name: jamaah.user.name || '',
        email: jamaah.user.email || '',
        password: '',
        nik: jamaah.nik || '',
        nama_lengkap: jamaah.nama_lengkap || '',
        tempat_lahir: jamaah.tempat_lahir || '',
        tanggal_lahir: jamaah.tanggal_lahir || '',
        jenis_kelamin: jamaah.jenis_kelamin || '',
        alamat: jamaah.alamat || '',
        kota: jamaah.kota || '',
        provinsi: jamaah.provinsi || '',
        no_hp: jamaah.no_hp || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.jamaah.update', jamaah.id));
    };

    return (
        <>
            <Head title="Edit Jamaah" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-5xl mx-auto w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button asChild variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-neutral-100">
                            <Link href={route('admin.jamaah.index')}>
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-black tracking-tight text-foreground">Edit Data Jamaah</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Account Information */}
                    <Card className="border-none shadow-xl rounded-[32px] overflow-hidden md:col-span-2">
                        <CardHeader className="bg-neutral-900 text-white p-6">
                            <CardTitle className="text-lg font-black flex items-center gap-2">
                                <User className="h-5 w-5 text-amber-500" />
                                Informasi Akun
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Username</Label>
                                <Input 
                                    id="name" 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)} 
                                    className="rounded-xl h-11"
                                />
                                {errors.name && <p className="text-xs font-bold text-red-600">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Alamat Email</Label>
                                <Input 
                                    id="email" 
                                    type="email"
                                    value={data.email} 
                                    onChange={e => setData('email', e.target.value)} 
                                    className="rounded-xl h-11"
                                />
                                {errors.email && <p className="text-xs font-bold text-red-600">{errors.email}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Ganti Password (Opsional)</Label>
                                <div className="relative">
                                    <Input 
                                        id="password" 
                                        type="password"
                                        value={data.password} 
                                        onChange={e => setData('password', e.target.value)} 
                                        className="rounded-xl h-11 pl-10"
                                        placeholder="Kosongkan jika tidak diganti"
                                    />
                                    <Key className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                                </div>
                                {errors.password && <p className="text-xs font-bold text-red-600">{errors.password}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personal Information */}
                    <Card className="border-none shadow-xl rounded-[32px] overflow-hidden md:col-span-2">
                        <CardHeader className="bg-neutral-50 p-6 border-b">
                            <CardTitle className="text-lg font-black">Data Profil Jamaah</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
                                    <Input 
                                        id="nama_lengkap" 
                                        value={data.nama_lengkap} 
                                        onChange={e => setData('nama_lengkap', e.target.value)} 
                                        className="rounded-xl h-11"
                                    />
                                    {errors.nama_lengkap && <p className="text-xs font-bold text-red-600">{errors.nama_lengkap}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nik">NIK</Label>
                                    <Input 
                                        id="nik" 
                                        value={data.nik} 
                                        onChange={e => setData('nik', e.target.value)} 
                                        className="rounded-xl h-11"
                                    />
                                    {errors.nik && <p className="text-xs font-bold text-red-600">{errors.nik}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
                                        <Input 
                                            id="tempat_lahir" 
                                            value={data.tempat_lahir} 
                                            onChange={e => setData('tempat_lahir', e.target.value)} 
                                            className="rounded-xl h-11"
                                        />
                                        {errors.tempat_lahir && <p className="text-xs font-bold text-red-600">{errors.tempat_lahir}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
                                        <Input 
                                            id="tanggal_lahir" 
                                            type="date"
                                            value={data.tanggal_lahir} 
                                            onChange={e => setData('tanggal_lahir', e.target.value)} 
                                            className="rounded-xl h-11"
                                        />
                                        {errors.tanggal_lahir && <p className="text-xs font-bold text-red-600">{errors.tanggal_lahir}</p>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                                    <Select value={data.jenis_kelamin} onValueChange={v => setData('jenis_kelamin', v)}>
                                        <SelectTrigger className="rounded-xl h-11">
                                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            <SelectItem value="L">Laki-laki</SelectItem>
                                            <SelectItem value="P">Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.jenis_kelamin && <p className="text-xs font-bold text-red-600">{errors.jenis_kelamin}</p>}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="no_hp">Nomor HP / WhatsApp</Label>
                                    <Input 
                                        id="no_hp" 
                                        value={data.no_hp} 
                                        onChange={e => setData('no_hp', e.target.value)} 
                                        className="rounded-xl h-11"
                                    />
                                    {errors.no_hp && <p className="text-xs font-bold text-red-600">{errors.no_hp}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="provinsi">Provinsi</Label>
                                        <Input 
                                            id="provinsi" 
                                            value={data.provinsi} 
                                            onChange={e => setData('provinsi', e.target.value)} 
                                            className="rounded-xl h-11"
                                        />
                                        {errors.provinsi && <p className="text-xs font-bold text-red-600">{errors.provinsi}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="kota">Kota/Kabupaten</Label>
                                        <Input 
                                            id="kota" 
                                            value={data.kota} 
                                            onChange={e => setData('kota', e.target.value)} 
                                            className="rounded-xl h-11"
                                        />
                                        {errors.kota && <p className="text-xs font-bold text-red-600">{errors.kota}</p>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="alamat">Alamat Lengkap</Label>
                                    <Textarea 
                                        id="alamat" 
                                        value={data.alamat} 
                                        onChange={e => setData('alamat', e.target.value)} 
                                        className="rounded-xl min-h-[120px]"
                                    />
                                    {errors.alamat && <p className="text-xs font-bold text-red-600">{errors.alamat}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="md:col-span-2 flex justify-end gap-4 mb-10">
                        <Button asChild variant="outline" className="h-12 rounded-2xl px-8 font-bold border-neutral-200">
                            <Link href={route('admin.jamaah.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className="h-12 rounded-2xl px-12 font-black bg-amber-600 hover:bg-amber-700 text-white gap-2 shadow-xl shadow-amber-600/20">
                            {processing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                            Update Data Jamaah
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

EditJamaah.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Data Jamaah', href: '/admin/jamaah' },
        { title: 'Edit', href: '#' },
    ],
};
