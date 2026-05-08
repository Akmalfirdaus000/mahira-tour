<?php

namespace App\Http\Controllers\StaffKeuangan;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use App\Models\Pendaftaran;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'pembayaran_pending' => Pembayaran::where('status', 'pending')->count(),
            'total_pendapatan' => Pembayaran::where('status', 'sukses')->sum('jumlah'),
            'pendaftaran_baru' => Pendaftaran::whereMonth('created_at', Carbon::now()->month)->count(),
            'total_transaksi' => Pembayaran::count(),
        ];

        $recent_payments = Pembayaran::with(['pendaftaran.jamaah'])
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('staff-keuangan/dashboard', [
            'stats' => $stats,
            'recentPayments' => $recent_payments,
        ]);
    }
}
