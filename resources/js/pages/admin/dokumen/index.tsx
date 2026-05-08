import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import { DokumenTable, type DokumenData } from './sections/dokumen-table';
import { FileText, ShieldCheck, Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';

interface PageProps {
    dokumen: DokumenData[];
}

export default function DokumenIndex({ dokumen }: PageProps) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [jenisFilter, setJenisFilter] = useState('all');

    const pendingCount = dokumen.filter(d => d.status_verifikasi === 'pending').length;

    const filteredDokumen = useMemo(() => {
        return dokumen.filter(doc => {
            const matchesSearch = doc.jamaah.nama_lengkap.toLowerCase().includes(search.toLowerCase()) || 
                                 doc.jamaah.nik.includes(search);
            const matchesStatus = statusFilter === 'all' || doc.status_verifikasi === statusFilter;
            const matchesJenis = jenisFilter === 'all' || doc.jenis === jenisFilter;
            
            return matchesSearch && matchesStatus && matchesJenis;
        });
    }, [dokumen, search, statusFilter, jenisFilter]);

    const resetFilters = () => {
        setSearch('');
        setStatusFilter('all');
        setJenisFilter('all');
    };

    return (
        <>
            <Head title="Verifikasi Dokumen" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight text-foreground">Verifikasi Dokumen</h1>
                        </div>
                        <p className="text-muted-foreground text-lg italic max-w-2xl">
                            Lakukan validasi persyaratan dokumen jamaah secara global atau per jenis dokumen.
                        </p>
                    </div>

                    {pendingCount > 0 && (
                        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-4 animate-pulse">
                            <div className="h-10 w-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black">
                                {pendingCount}
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase text-amber-600 tracking-widest">Pending Verifikasi</p>
                                <p className="text-[10px] text-amber-900/60 font-medium italic">Butuh perhatian segera</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Filter Section */}
                <Card className="border-none shadow-lg rounded-[32px] p-6 bg-white/50 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative md:col-span-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                            <Input 
                                placeholder="Cari Jamaah / NIK..." 
                                className="pl-10 rounded-xl h-11 border-neutral-100"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="rounded-xl h-11 border-neutral-100">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-neutral-400" />
                                    <SelectValue placeholder="Status Verifikasi" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="all">Semua Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="valid">Valid</SelectItem>
                                <SelectItem value="ditolak">Ditolak</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={jenisFilter} onValueChange={setJenisFilter}>
                            <SelectTrigger className="rounded-xl h-11 border-neutral-100">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-neutral-400" />
                                    <SelectValue placeholder="Jenis Dokumen" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="all">Semua Jenis</SelectItem>
                                <SelectItem value="pas_foto">Pas Foto</SelectItem>
                                <SelectItem value="passport">Paspor</SelectItem>
                                <SelectItem value="ktp_akta">KTP / Akta</SelectItem>
                                <SelectItem value="kk">Kartu Keluarga</SelectItem>
                                <SelectItem value="surat_nikah">Surat Nikah</SelectItem>
                                <SelectItem value="vaksin">Sertifikat Vaksin</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button 
                            variant="ghost" 
                            className="h-11 rounded-xl font-bold text-neutral-500 gap-2 hover:bg-neutral-100"
                            onClick={resetFilters}
                        >
                            <X className="h-4 w-4" /> Reset Filter
                        </Button>
                    </div>
                </Card>

                {/* Table Section */}
                <DokumenTable data={filteredDokumen} />
            </div>
        </>
    );
}

DokumenIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Dokumen', href: '/admin/dokumen' },
    ],
};
