import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

export default function Dashboard() {
    return (
        <>
            <Head title="Super Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold">Selamat Datang di Dashboard Super Admin</h2>
                    <p className="text-muted-foreground">Anda login sebagai Super Admin.</p>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-indigo-50 dark:bg-indigo-900/20">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-indigo-900/20 dark:stroke-indigo-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-indigo-50 dark:bg-indigo-900/20">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-indigo-900/20 dark:stroke-indigo-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-indigo-50 dark:bg-indigo-900/20">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-indigo-900/20 dark:stroke-indigo-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Super Admin Dashboard',
            href: '/super-admin/dashboard',
        },
    ],
};
