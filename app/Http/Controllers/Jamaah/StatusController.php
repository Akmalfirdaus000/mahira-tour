<?php

namespace App\Http\Controllers\Jamaah;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pendaftaran;
use App\Models\Dokumen;

class StatusController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $jamaah = $user->jamaah;

        if (!$jamaah) {
            return Inertia::render('jamaah/status/index', [
                'active_pendaftaran' => null,
                'all_pendaftaran' => [],
                'stats' => null,
            ]);
        }

        // Get all pendaftaran for the dropdown
        $all_pendaftaran = Pendaftaran::where('jamaah_id', $jamaah->id)
            ->with(['keberangkatan.paketUmroh'])
            ->latest()
            ->get();

        // Get the selected pendaftaran or latest
        $selected_id = $request->query('id');
        $active_pendaftaran = $selected_id 
            ? $all_pendaftaran->firstWhere('id', $selected_id) 
            : $all_pendaftaran->first();

        if (!$active_pendaftaran) {
            return Inertia::render('jamaah/status/index', [
                'active_pendaftaran' => null,
                'all_pendaftaran' => [],
                'stats' => null,
            ]);
        }

        // Calculate stats
        $total_categories = 6;
        $uploaded_docs = Dokumen::where('jamaah_id', $jamaah->id)->count();
        
        $payment_amount = $active_pendaftaran->pembayaran()->where('status', 'sukses')->sum('jumlah');
        $payment_target = $active_pendaftaran->keberangkatan->paketUmroh->harga;
        $payment_percentage = $payment_target > 0 ? round(($payment_amount / $payment_target) * 100) : 0;

        return Inertia::render('jamaah/status/index', [
            'active_pendaftaran' => $active_pendaftaran,
            'all_pendaftaran' => $all_pendaftaran,
            'stats' => [
                'documents_uploaded' => $uploaded_docs,
                'documents_total' => $total_categories,
                'payment_amount' => (float)$payment_amount,
                'payment_target' => (float)$payment_target,
                'payment_percentage' => $payment_percentage > 100 ? 100 : $payment_percentage,
            ],
        ]);
    }
}
