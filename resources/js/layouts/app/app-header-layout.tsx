import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import type { AppLayoutProps, NavItem } from '@/types';

type ExtendedAppLayoutProps = AppLayoutProps & {
    mainNavItems?: NavItem[];
    rightNavItems?: NavItem[];
};

export default function AppHeaderLayout({
    children,
    breadcrumbs,
    mainNavItems,
    rightNavItems,
}: ExtendedAppLayoutProps) {
    return (
        <AppShell variant="header">
            <AppHeader breadcrumbs={breadcrumbs} mainNavItems={mainNavItems} rightNavItems={rightNavItems} />
            <AppContent variant="header">{children}</AppContent>
        </AppShell>
    );
}
