import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Eye, Search, Filter } from 'lucide-react';

interface Props {
    pendaftaran: any[];
}

export default function PendaftaranIndex({ pendaftaran }: Props) {
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
        if (!dateString) return 'Belum diset';
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

    const filteredData = pendaftaran.filter(item => {
        const matchesSearch = item.jamaah.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.id.toString().includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <>
            <Head title="List Pendaftaran" />
            <div className="flex flex-col gap-10 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tight text-foreground">Data Pendaftaran</h1>
                    <p className="text-muted-foreground font-medium italic">Manajemen pendaftaran dan penagihan jamaah.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[32px] shadow-sm border border-neutral-100">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <Input 
                            placeholder="Cari jamaah atau kode..." 
                            className="pl-10 rounded-2xl border-neutral-100 bg-neutral-50/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Filter className="h-4 w-4 text-neutral-400" />
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px] rounded-2xl border-neutral-100 bg-neutral-50/50">
                                <SelectValue placeholder="Filter Status" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl">
                                <SelectItem value="all">Semua Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="dp">DP</SelectItem>
                                <SelectItem value="lunas">Lunas</SelectItem>
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
                                        <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Paket & Keberangkatan</th>
                                        <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Pembayaran</th>
                                        <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</th>
                                        <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Tanggal Daftar</th>
                                        <th className="py-4 px-4 text-right text-[10px] font-black uppercase tracking-widest text-neutral-400">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-50">
                                    {filteredData.map((reg) => (
                                        <tr key={reg.id} className="group hover:bg-neutral-50/50 transition-colors">
                                            <td className="py-4 px-4">
                                                <span className="font-black text-xs text-blue-600">#{reg.id}</span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="font-bold text-sm text-neutral-900">{reg.jamaah.nama_lengkap}</span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-neutral-800">{reg.keberangkatan.paket_umroh.nama_paket}</span>
                                                    <span className="text-[10px] font-bold text-neutral-400 italic">{formatDate(reg.keberangkatan.tanggal_berangkat)}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-emerald-600">{formatCurrency(reg.total_paid)}</span>
                                                    <span className="text-[9px] font-bold text-red-400 italic">Sisa: {formatCurrency(reg.remaining_bill)}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <Badge className={cn(
                                                    "rounded-lg px-2 py-0.5 font-black text-[8px] uppercase tracking-widest border-none",
                                                    reg.status === 'lunas' ? "bg-green-600" :
                                                    reg.status === 'dp' ? "bg-blue-600" : "bg-amber-500"
                                                )}>
                                                    {reg.status}
                                                </Badge>
                                            </td>
                                            <td className="py-4 px-4 text-[10px] font-bold text-neutral-400">
                                                {formatDate(reg.created_at)}
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <Button asChild size="sm" variant="outline" className="rounded-xl font-bold text-[10px] h-8 border-neutral-200 hover:bg-blue-600 hover:text-white hover:border-blue-600">
                                                    <Link href={route('staff-keuangan.pendaftaran.show', reg.id)}>
                                                        <Eye className="h-3 w-3 mr-1" /> Detail
                                                    </Link>
                                                </Button>
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

PendaftaranIndex.layout = {
    breadcrumbs: [
        { title: 'Pendaftaran', href: '#' },
    ],
};
