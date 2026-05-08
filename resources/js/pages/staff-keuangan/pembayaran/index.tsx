import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, CheckCircle2, XCircle, Search, Filter, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Props {
    pembayaran: any[];
}

export default function PembayaranIndex({ pembayaran }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '-';
        try {
            return new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            }).format(new Date(dateString));
        } catch (e) {
            return '-';
        }
    };

    const handleVerify = (id: number, status: 'sukses' | 'gagal') => {
        router.post(route('staff-keuangan.pembayaran.verify', id), {
            status: status
        }, {
            onSuccess: () => toast.success(`Pembayaran berhasil di-${status}!`),
        });
    };

    const filteredData = pembayaran.filter(item => {
        const matchesSearch = item.pendaftaran.jamaah.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.id.toString().includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <>
            <Head title="Validasi Pembayaran" />
            <div className="flex flex-col gap-10 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tight text-foreground">Daftar Transaksi</h1>
                    <p className="text-muted-foreground font-medium italic">Validasi bukti pembayaran dan kelola riwayat transaksi.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[32px] shadow-sm border border-neutral-100">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <Input 
                            placeholder="Cari jamaah atau kode transaksi..." 
                            className="pl-10 rounded-2xl border-neutral-100 bg-neutral-50/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Filter className="h-4 w-4 text-neutral-400" />
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px] rounded-2xl border-neutral-100 bg-neutral-50/50">
                                <SelectValue placeholder="Status Transaksi" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl">
                                <SelectItem value="all">Semua Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="sukses">Sukses</SelectItem>
                                <SelectItem value="gagal">Gagal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden">
                    <CardContent className="p-8">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-neutral-100 text-left">
                                        <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Kode</th>
                                        <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Jamaah</th>
                                        <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Jumlah</th>
                                        <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Metode</th>
                                        <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</th>
                                        <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Tanggal</th>
                                        <th className="py-4 px-4 text-right text-[10px] font-black uppercase tracking-widest text-neutral-400">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-50">
                                    {filteredData.map((pay) => (
                                        <tr key={pay.id} className="group hover:bg-neutral-50/50 transition-colors">
                                            <td className="py-4 px-4 font-black text-xs text-emerald-600">
                                                TRX-{pay.id}
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm text-neutral-900 leading-none mb-1">{pay.pendaftaran.jamaah.nama_lengkap}</span>
                                                    <span className="text-[10px] text-neutral-400 uppercase font-black tracking-widest">#{pay.pendaftaran.id}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 font-black text-sm text-emerald-600">
                                                {formatCurrency(pay.jumlah)}
                                            </td>
                                            <td className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                                                {pay.metode}
                                            </td>
                                            <td className="py-4 px-4">
                                                <Badge className={cn(
                                                    "rounded-lg px-2 py-0.5 font-black text-[8px] uppercase tracking-widest border-none",
                                                    pay.status === 'sukses' ? "bg-green-600" :
                                                    pay.status === 'gagal' ? "bg-red-600" : "bg-amber-500"
                                                )}>
                                                    {pay.status}
                                                </Badge>
                                            </td>
                                            <td className="py-4 px-4 text-[10px] font-bold text-neutral-400 italic">
                                                {formatDate(pay.created_at)}
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button asChild size="sm" variant="ghost" className="rounded-xl font-bold text-[10px] h-8 text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50">
                                                        <Link href={route('staff-keuangan.pembayaran.show', pay.id)}>
                                                            <Eye className="h-3 w-3 mr-1" /> Detail
                                                        </Link>
                                                    </Button>
                                                    {pay.status === 'pending' && (
                                                        <>
                                                            <Button 
                                                                size="sm" 
                                                                variant="outline" 
                                                                className="rounded-xl font-bold text-[10px] h-8 border-red-200 text-red-600 hover:bg-red-600 hover:text-white shadow-sm"
                                                                onClick={() => handleVerify(pay.id, 'gagal')}
                                                            >
                                                                Tolak
                                                            </Button>
                                                            <Button 
                                                                size="sm" 
                                                                className="rounded-xl font-bold text-[10px] h-8 bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-100"
                                                                onClick={() => handleVerify(pay.id, 'sukses')}
                                                            >
                                                                Validasi
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

PembayaranIndex.layout = {
    breadcrumbs: [
        { title: 'Pembayaran', href: '#' },
    ],
};
