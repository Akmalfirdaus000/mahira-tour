<?php

namespace App\Http\Controllers\StaffKeuangan;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class LaporanController extends Controller
{
    public function index()
    {
        $monthly_revenue = Pembayaran::where('status', 'sukses')
            ->select(
                DB::raw('SUM(jumlah) as total'),
                DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month")
            )
            ->groupBy('month')
            ->orderBy('month', 'desc')
            ->get();

        $payment_methods = Pembayaran::where('status', 'sukses')
            ->select('metode', DB::raw('count(*) as count'), DB::raw('sum(jumlah) as total'))
            ->groupBy('metode')
            ->get();

        return Inertia::render('staff-keuangan/laporan/index', [
            'monthlyRevenue' => $monthly_revenue,
            'paymentMethods' => $payment_methods,
        ]);
    }

    public function export()
    {
        $pembayaran = Pembayaran::with(['pendaftaran.jamaah'])
            ->where('status', 'sukses')
            ->orderBy('created_at', 'desc')
            ->get();

        $total_pendapatan = $pembayaran->sum('jumlah');

        return view('reports.keuangan', [
            'pembayaran' => $pembayaran,
            'total_pendapatan' => $total_pendapatan,
            'tanggal' => now()->format('d F Y')
        ]);
    }
}
