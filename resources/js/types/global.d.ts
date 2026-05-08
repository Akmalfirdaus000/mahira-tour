import type { Auth } from '@/types/auth';
import { route as routeFn } from 'ziggy-js';

declare global {
    var route: typeof routeFn;
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            flash: {
                success: string | null;
                error: string | null;
                info: string | null;
                warning: string | null;
                message: string | null;
            };
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
