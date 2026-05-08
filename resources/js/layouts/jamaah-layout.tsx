import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import type { BreadcrumbItem } from '@/types';
import { Home, Package, Calendar, FileText, FolderOpen, CreditCard, Activity } from 'lucide-react';

const jamaahNavItems = [
    { title: 'Beranda', href: '/jamaah/beranda', icon: Home },
    { title: 'Paket Umroh', href: '/jamaah/paket-umroh', icon: Package },
    { title: 'Pendaftaran', href: '/jamaah/pendaftaran', icon: FileText },
    { title: 'Dokumen', href: '/jamaah/dokumen', icon: FolderOpen },
    { title: 'Pembayaran', href: '/jamaah/pembayaran', icon: CreditCard },
    { title: 'Status', href: '/jamaah/status', icon: Activity },
];

export default function JamaahLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} mainNavItems={jamaahNavItems} rightNavItems={[]}>
            {children}
        </AppLayoutTemplate>
    );
}
