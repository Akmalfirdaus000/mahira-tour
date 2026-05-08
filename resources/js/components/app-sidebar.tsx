import { Link, usePage } from '@inertiajs/react';
import { 
    BookOpen, 
    FolderGit2, 
    LayoutGrid, 
    Users,
    Package, 
    Plane, 
    Hotel, 
    Settings2, 
    UserPlus, 
    FileText,
    CreditCard,
    ShieldCheck
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const { auth } = usePage().props;
    const user = auth.user;
    
    const isSuperAdmin = (user as any).roles?.some((r: any) => r.name === 'super_admin');
    
    const isAdmin = (user as any).roles?.some((r: any) => r.name === 'admin') || 
                    window.location.pathname.startsWith('/admin');

    const isStaffKeuangan = (user as any).roles?.some((r: any) => r.name === 'staff_keuangan') || 
                            window.location.pathname.startsWith('/staff-keuangan');

    const adminNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: route('admin.dashboard'),
            icon: LayoutGrid,
        },
        {
            title: 'Data Jamaah',
            href: route('admin.jamaah.index'),
            icon: Users,
        },
        {
            title: 'Paket Umroh',
            href: route('admin.paket-umroh.index'),
            icon: Package,
        },
        {
            title: 'Keberangkatan',
            href: route('admin.keberangkatan.index'),
            icon: Plane,
        },
        {
            title: 'Fasilitas',
            href: route('admin.fasilitas.index'),
            icon: Hotel,
        },
        {
            title: 'Pendaftaran',
            href: route('admin.pendaftaran.index'),
            icon: UserPlus,
        },
        {
            title: 'Dokumen',
            href: route('admin.dokumen.index'),
            icon: FileText,
        },
    ];

    const staffKeuanganNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: route('staff-keuangan.dashboard'),
            icon: LayoutGrid,
        },
        {
            title: 'Pembayaran',
            href: route('staff-keuangan.pembayaran'),
            icon: CreditCard,
        },
        {
            title: 'Pendaftaran',
            href: route('staff-keuangan.pendaftaran'),
            icon: UserPlus,
        },
        {
            title: 'Laporan Keuangan',
            href: route('staff-keuangan.laporan'),
            icon: FileText,
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: FolderGit2,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    const superAdminNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: route('super-admin.dashboard'),
            icon: LayoutGrid,
        },
        {
            title: 'Data User',
            href: route('super-admin.user.index'),
            icon: Users,
        },
        {
            title: 'Role & Hak Akses',
            href: route('super-admin.role.index'),
            icon: ShieldCheck,
        },
        {
            title: 'Data Jamaah',
            href: route('super-admin.jamaah.index'),
            icon: Users,
        },
        {
            title: 'Paket Umroh',
            href: route('super-admin.paket-umroh.index'),
            icon: Package,
        },
        {
            title: 'Keberangkatan',
            href: route('super-admin.keberangkatan.index'),
            icon: Plane,
        },
        {
            title: 'Fasilitas',
            href: route('super-admin.fasilitas.index'),
            icon: Hotel,
        },
        {
            title: 'Paket Fasilitas',
            href: route('super-admin.paket-fasilitas.index'),
            icon: Settings2,
        },
        {
            title: 'Pendaftaran',
            href: route('super-admin.pendaftaran.index'),
            icon: UserPlus,
        },
        {
            title: 'Pembayaran',
            href: route('super-admin.pembayaran'),
            icon: CreditCard,
        },
        {
            title: 'Dokumen',
            href: route('super-admin.dokumen.index'),
            icon: FileText,
        },
        {
            title: 'Laporan',
            href: route('super-admin.laporan.index'),
            icon: FileText,
        },
    ];

    const mainNavItems: NavItem[] = isSuperAdmin ? superAdminNavItems : (isAdmin ? adminNavItems : (isStaffKeuangan ? staffKeuanganNavItems : [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
    ]));

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
