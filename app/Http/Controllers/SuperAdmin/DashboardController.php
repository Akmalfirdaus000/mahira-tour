<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Jamaah;
use App\Models\Pendaftaran;
use App\Models\Pembayaran;
use App\Models\PaketUmroh;
use App\Models\Keberangkatan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_jamaah' => Jamaah::count(),
            'total_pendaftaran' => Pendaftaran::count(),
            'total_pembayaran' => Pembayaran::where('status', 'sukses')->sum('jumlah'),
            'paket_aktif' => PaketUmroh::count(),
        ];

        $keberangkatan_terdekat = Keberangkatan::with('paketUmroh')
            ->where('tanggal_berangkat', '>=', now())
            ->orderBy('tanggal_berangkat', 'asc')
            ->limit(5)
            ->get();

        // Grafik pemasukan 6 bulan terakhir
        $monthly_revenue = Pembayaran::where('status', 'sukses')
            ->select(
                DB::raw('SUM(jumlah) as total'),
                DB::raw("DATE_FORMAT(tanggal_bayar, '%Y-%m') as month")
            )
            ->groupBy('month')
            ->orderBy('month', 'desc')
            ->limit(6)
            ->get()
            ->reverse()
            ->values();

        return Inertia::render('super-admin/dashboard/index', [
            'stats' => $stats,
            'keberangkatan_terdekat' => $keberangkatan_terdekat,
            'monthly_revenue' => $monthly_revenue,
        ]);
    }
}
