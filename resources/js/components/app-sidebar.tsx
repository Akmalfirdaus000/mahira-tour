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
    FileText 
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
    
    // Check if user is admin
    const isAdmin = (user as any).roles?.some((r: any) => r.name === 'admin' || r.name === 'super_admin') || 
                    window.location.pathname.startsWith('/admin') || 
                    window.location.pathname.startsWith('/super-admin');

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

    const mainNavItems: NavItem[] = isAdmin ? adminNavItems : [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
    ];

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
