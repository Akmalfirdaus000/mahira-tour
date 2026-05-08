import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useFlashToast(): void {
    useEffect(() => {
        const handlePage = (page: any) => {
            if (!page?.props) return;
            
            const flash = page.props.flash;
            const errors = page.props.errors;

            if (flash) {
                if (flash.success) toast.success(flash.success);
                if (flash.error) toast.error(flash.error);
                if (flash.info) toast.info(flash.info);
                if (flash.warning) toast.warning(flash.warning);
                if (flash.message) toast(flash.message);
            }

            if (errors && Object.keys(errors).length > 0) {
                toast.error('Terdapat kesalahan pada input Anda. Silakan periksa kembali.');
            }
        };

        // Handle flash messages from router events (subsequent navigations)
        const removeSuccess = router.on('success', (event) => {
            handlePage(event.detail.page);
        });

        // Handle initial load if already available
        if (router.page) {
            handlePage(router.page);
        }

        return () => {
            removeSuccess();
        };
    }, []);
}
