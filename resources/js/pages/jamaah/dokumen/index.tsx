import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
    Upload, 
    FileText, 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    Info, 
    X,
    Eye,
    ChevronRight,
    FileUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useRef } from 'react';

interface DocumentData {
    id: number;
    jenis: string;
    file_path: string;
    status_verifikasi: string;
    catatan: string;
    uploaded_at: string;
}

interface Category {
    id: string;
    label: string;
}

interface PageProps {
    dokumen: Record<string, DocumentData[]>;
    categories: Category[];
}

export default function DokumenIndex({ dokumen, categories }: PageProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, progress, reset } = useForm({
        jenis: '',
        file: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData({
                jenis: categoryId,
                file: file
            });
            
            // Auto submit after selection
            const formData = new FormData();
            formData.append('jenis', categoryId);
            formData.append('file', file);
            
            const categoryLabel = categories.find(c => c.id === categoryId)?.label || 'dokumen';
            const toastId = toast.loading(`Mengunggah ${categoryLabel}...`);
            
            router.post(route('jamaah.dokumen.store'), formData, {
                forceFormData: true,
                onSuccess: () => {
                    toast.dismiss(toastId);
                    reset();
                },
                onError: () => {
                    toast.dismiss(toastId);
                }
            });
        }
    };

    const triggerUpload = (categoryId: string) => {
        setSelectedCategory(categoryId);
        fileInputRef.current?.click();
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'valid':
                return <span className="text-[10px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-tighter">Verified</span>;
            case 'ditolak':
                return <span className="text-[10px] font-black bg-red-100 text-red-700 px-2 py-0.5 rounded-full uppercase tracking-tighter">Rejected</span>;
            default:
                return <span className="text-[10px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase tracking-tighter">Pending</span>;
        }
    };

    return (
        <>
            <Head title="Dokumen Saya" />
            <div className="flex flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-black text-foreground">Dokumen Saya</h1>
                        <p className="text-muted-foreground italic">Lengkapi dokumen persyaratan keberangkatan Anda.</p>
                    </div>
                    
                    <Card className="border-none shadow-none bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-4">
                        <div className="flex items-center gap-3 text-blue-800 dark:text-blue-200">
                            <Info className="h-5 w-5 shrink-0" />
                            <div className="text-xs">
                                <p className="font-bold uppercase tracking-tight">Format File</p>
                                <p>JPG, PNG, atau PDF (Maks. 2MB)</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => {
                        const userDoc = dokumen[category.id]?.[0];
                        const isUploaded = !!userDoc;

                        return (
                            <Card key={category.id} className={cn(
                                "border-2 transition-all rounded-[28px] overflow-hidden group",
                                isUploaded ? "border-green-100 bg-green-50/10" : "border-dashed border-neutral-200 hover:border-amber-400"
                            )}>
                                <CardHeader className="p-6 pb-2">
                                    <div className="flex items-start justify-between">
                                        <div className={cn(
                                            "h-12 w-12 rounded-2xl flex items-center justify-center transition-colors",
                                            isUploaded ? "bg-green-100 text-green-600" : "bg-neutral-100 text-neutral-400 group-hover:bg-amber-100 group-hover:text-amber-600"
                                        )}>
                                            {isUploaded ? <CheckCircle2 className="h-6 w-6" /> : <FileUp className="h-6 w-6" />}
                                        </div>
                                        {isUploaded && getStatusBadge(userDoc.status_verifikasi)}
                                    </div>
                                    <CardTitle className="mt-4 text-lg font-black">{category.label}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 pt-2 space-y-4">
                                    <p className="text-xs text-muted-foreground italic min-h-[32px]">
                                        {isUploaded 
                                            ? `Diunggah pada ${new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(userDoc.uploaded_at))}`
                                            : "Silakan unggah dokumen dalam format gambar atau PDF."}
                                    </p>

                                    {isUploaded && userDoc.catatan && (
                                        <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-xl text-[10px] text-red-600 border border-red-100">
                                            <p className="font-bold uppercase mb-1">Catatan Admin:</p>
                                            <p className="italic">{userDoc.catatan}</p>
                                        </div>
                                    )}

                                    <div className="flex gap-2">
                                        {isUploaded ? (
                                            <>
                                                <Button 
                                                    variant="outline" 
                                                    className="flex-1 rounded-xl h-10 text-xs font-bold"
                                                    onClick={() => window.open(`/storage/${userDoc.file_path}`, '_blank')}
                                                >
                                                    <Eye className="h-3 w-3 mr-2" />
                                                    Lihat
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    className="flex-1 rounded-xl h-10 text-xs font-bold text-amber-600 hover:bg-amber-50"
                                                    onClick={() => triggerUpload(category.id)}
                                                    disabled={processing}
                                                >
                                                    <Upload className="h-3 w-3 mr-2" />
                                                    Ganti
                                                </Button>
                                            </>
                                        ) : (
                                            <Button 
                                                className="w-full rounded-xl h-12 font-black bg-amber-600 hover:bg-amber-700 text-white"
                                                onClick={() => triggerUpload(category.id)}
                                                disabled={processing}
                                            >
                                                {processing && selectedCategory === category.id ? (
                                                    <Clock className="h-4 w-4 animate-spin mr-2" />
                                                ) : (
                                                    <Upload className="h-4 w-4 mr-2" />
                                                )}
                                                Unggah Sekarang
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Hidden File Input */}
                <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={(e) => selectedCategory && handleFileChange(e, selectedCategory)}
                    accept=".jpg,.jpeg,.png,.pdf"
                />

                {progress && (
                    <div className="fixed bottom-8 right-8 w-64 bg-white dark:bg-neutral-900 border shadow-2xl rounded-2xl p-4 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Upload className="h-4 w-4 text-blue-600 animate-bounce" />
                            <span className="text-xs font-black uppercase tracking-tight">Sedang Mengunggah...</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                            <div 
                                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
                                style={{ width: `${progress.percentage}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

// Add the router import at the top of the file as well
import { router } from '@inertiajs/react';

DokumenIndex.layout = {
    breadcrumbs: [
        { title: 'Beranda', href: '/jamaah/beranda' },
        { title: 'Dokumen Saya', href: '#' },
    ],
};
