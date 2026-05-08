import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { DocumentStatusBadge } from '../components/document-status-badge';
import { FileText, FileImage, Upload, AlertCircle, Trash2, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface DocumentData {
    id: number;
    jenis: string;
    file_path: string;
    status_verifikasi: string;
    catatan: string | null;
    uploaded_at: string | null;
}

interface Category {
    id: string;
    label: string;
}

export function DocumentGrid({ documents, categories }: { documents: Record<string, DocumentData[]>, categories: Category[] }) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => {
                const docList = documents[cat.id] || [];
                const doc = docList[0]; // Get the latest one if multiple

                return (
                    <Card key={cat.id} className={cn(
                        "overflow-hidden border-sidebar-border/60 transition-all duration-300",
                        doc ? "hover:shadow-lg" : "border-dashed bg-muted/20"
                    )}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                                {cat.label}
                            </CardTitle>
                            {doc ? (
                                <DocumentStatusBadge status={doc.status_verifikasi} />
                            ) : (
                                <Badge variant="secondary" className="bg-muted text-muted-foreground">Belum Ada</Badge>
                            )}
                        </CardHeader>
                        <CardContent className="pt-4 min-h-[120px] flex flex-col justify-center">
                            {doc ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                            {doc.file_path.match(/\.(jpg|jpeg|png)$/i) ? <FileImage className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold line-clamp-1">Berkas Terlampir</p>
                                            <p className="text-[10px] text-muted-foreground italic">
                                                Diunggah: {doc.uploaded_at ? new Intl.DateTimeFormat('id-ID').format(new Date(doc.uploaded_at)) : '-'}
                                            </p>
                                        </div>
                                    </div>
                                    {doc.catatan && (
                                        <div className="flex gap-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-900/10 text-amber-800 dark:text-amber-200 text-[10px] border border-amber-100 dark:border-amber-900/30">
                                            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                                            <span>{doc.catatan}</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-center py-4">
                                    <HelpCircle className="h-8 w-8 text-muted-foreground/30" />
                                    <p className="text-xs text-muted-foreground italic">Belum ada dokumen yang diunggah untuk kategori ini.</p>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="bg-muted/30 border-t flex gap-2 p-3">
                            <Button variant={doc ? "outline" : "default"} size="sm" className="flex-1 gap-1.5 h-9 bg-blue-600 hover:bg-blue-700 text-white border-none">
                                <Upload className="h-3.5 w-3.5" />
                                {doc ? 'Ganti File' : 'Unggah Sekarang'}
                            </Button>
                            {doc && (
                                <Button variant="ghost" size="icon" className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}

// Re-importing Badge here because it's used in the logic
function Badge({ children, className, variant = "default" }: any) {
    return (
        <div className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            variant === "default" && "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
            variant === "secondary" && "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            className
        )}>
            {children}
        </div>
    );
}
