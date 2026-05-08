<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Jamaah;
use App\Models\Pendaftaran;
use App\Models\Pembayaran;
use App\Models\Dokumen;
use App\Models\PaketUmroh;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_jamaah' => Jamaah::count(),
            'total_pendaftaran' => Pendaftaran::count(),
            'pendaftaran_bulan_ini' => Pendaftaran::whereMonth('created_at', Carbon::now()->month)->count(),
            'total_pendapatan' => Pembayaran::where('status', 'sukses')->sum('jumlah'),
            'dokumen_pending' => Dokumen::where('status_verifikasi', 'pending')->count(),
        ];

        $recent_registrations = Pendaftaran::with(['jamaah', 'keberangkatan.paketUmroh'])
            ->latest()
            ->limit(5)
            ->get();

        $recent_payments = Pembayaran::with(['pendaftaran.jamaah'])
            ->latest()
            ->limit(5)
            ->get();

        $paket_stats = PaketUmroh::withCount('keberangkatan')
            ->get()
            ->map(function($paket) {
                return [
                    'nama' => $paket->nama_paket,
                    'total_keberangkatan' => $paket->keberangkatan_count,
                ];
            });

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentRegistrations' => $recent_registrations,
            'recentPayments' => $recent_payments,
            'paketStats' => $paket_stats,
        ]);
    }
}
