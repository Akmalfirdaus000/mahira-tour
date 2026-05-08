import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    Users, 
    UserPlus, 
    Key, 
    Trash2, 
    Shield, 
    CheckCircle2, 
    XCircle,
    MoreHorizontal,
    Search,
    Loader2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Props {
    users: any[];
    roles: any[];
}

export default function UserManagement({ users, roles }: Props) {
    const [search, setSearch] = React.useState('');
    const [isAddOpen, setIsAddOpen] = React.useState(false);
    
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        role_id: ''
    });

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(search.toLowerCase()) || 
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('super-admin.user.store'), {
            onSuccess: () => {
                setIsAddOpen(false);
                reset();
            }
        });
    };

    return (
        <>
            <Head title="Manajemen User" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-black text-foreground">Manajemen <span className="text-blue-600">User</span></h1>
                        <p className="text-muted-foreground italic text-sm">Kelola akses akun admin, staff, dan jamaah.</p>
                    </div>

                    <Dialog open={isAddOpen} onOpenChange={(open) => {
                        setIsAddOpen(open);
                        if (!open) {
                            clearErrors();
                            reset();
                        }
                    }}>
                        <DialogTrigger asChild>
                            <Button className="rounded-2xl h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 gap-2 shadow-lg shadow-blue-600/20">
                                <UserPlus className="h-4 w-4" />
                                Tambah User Baru
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-[32px] p-8 max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-black">Tambah User</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Nama Lengkap</Label>
                                    <Input 
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="John Doe" 
                                        required 
                                        className={cn("rounded-xl h-12 border-2", errors.name && "border-red-500")} 
                                    />
                                    {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Email</Label>
                                    <Input 
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        type="email" 
                                        placeholder="john@example.com" 
                                        required 
                                        className={cn("rounded-xl h-12 border-2", errors.email && "border-red-500")} 
                                    />
                                    {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Password Awal</Label>
                                    <Input 
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        type="password" 
                                        required 
                                        className={cn("rounded-xl h-12 border-2", errors.password && "border-red-500")} 
                                    />
                                    {errors.password && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.password}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Role Akses</Label>
                                    <Select 
                                        value={data.role_id}
                                        onValueChange={value => setData('role_id', value)}
                                        required
                                    >
                                        <SelectTrigger className={cn("h-12 rounded-xl border-2", errors.role_id && "border-red-500")}>
                                            <SelectValue placeholder="Pilih Role" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-2">
                                            {roles.map(r => (
                                                <SelectItem key={r.id} value={r.id.toString()}>{r.name.toUpperCase()}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.role_id && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.role_id}</p>}
                                </div>
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold flex items-center gap-2"
                                >
                                    {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                                    Simpan User
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card className="border-none shadow-xl rounded-[40px] overflow-hidden">
                    <CardHeader className="bg-neutral-50/50 p-8 border-b">
                        <div className="relative max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                            <Input 
                                placeholder="Cari nama atau email..." 
                                className="pl-12 h-12 rounded-2xl border-2 border-neutral-100 bg-white"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <Table>
                        <TableHeader className="bg-neutral-50/30">
                            <TableRow>
                                <TableHead className="w-[80px]">Avatar</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id} className="group transition-colors hover:bg-blue-50/30">
                                    <TableCell>
                                        <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-black text-sm">
                                            {user.name.charAt(0)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-neutral-900">{user.name}</span>
                                            <span className="text-xs text-neutral-500 italic">{user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {user.roles.map((r: any) => (
                                                <Badge key={r.id} variant="outline" className="rounded-lg px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border-blue-200 text-blue-600">
                                                    {r.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 rounded-lg border-none text-[8px] font-black uppercase tracking-widest px-2 py-1">
                                            Aktif
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="h-9 w-9 p-0 rounded-xl hover:bg-blue-100 text-blue-600"
                                                onClick={() => {
                                                    const newPass = prompt('Masukkan password baru untuk ' + user.name);
                                                    if (newPass) {
                                                        router.post(route('super-admin.user.reset-password', user.id), { password: newPass });
                                                    }
                                                }}
                                            >
                                                <Key className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="h-9 w-9 p-0 rounded-xl hover:bg-red-100 text-red-600"
                                                onClick={() => {
                                                    if (confirm('Hapus user ini?')) {
                                                        router.delete(route('super-admin.user.destroy', user.id));
                                                    }
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </>
    );
}

UserManagement.layout = {
    breadcrumbs: [
        { title: 'Super Admin', href: route('super-admin.dashboard') },
        { title: 'Manajemen User', href: '#' },
    ],
};
