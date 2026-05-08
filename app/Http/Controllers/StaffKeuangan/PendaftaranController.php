<?php

namespace App\Http\Controllers\StaffKeuangan;

use App\Http\Controllers\Controller;
use App\Models\Pendaftaran;
use Inertia\Inertia;

class PendaftaranController extends Controller
{
    public function index()
    {
        $pendaftaran = Pendaftaran::with(['jamaah', 'keberangkatan.paketUmroh', 'pembayaran'])
            ->latest()
            ->get()
            ->map(function($item) {
                $item->total_paid = $item->pembayaran->where('status', 'sukses')->sum('jumlah');
                $item->remaining_bill = $item->keberangkatan->paketUmroh->harga - $item->total_paid;
                return $item;
            });

        return Inertia::render('staff-keuangan/pendaftaran/index', [
            'pendaftaran' => $pendaftaran
        ]);
    }

    public function show(Pendaftaran $pendaftaran)
    {
        $pendaftaran->load([
            'jamaah.user', 
            'keberangkatan' => function($query) {
                $query->withCount('pendaftaran');
            },
            'keberangkatan.paketUmroh', 
            'pembayaran' => function($query) {
                $query->latest();
            },
            'jamaah.dokumen'
        ]);

        $stats = [
            'total_paid' => $pendaftaran->pembayaran->where('status', 'sukses')->sum('jumlah'),
            'total_bill' => $pendaftaran->keberangkatan->paketUmroh->harga,
            'remaining_bill' => $pendaftaran->keberangkatan->paketUmroh->harga - $pendaftaran->pembayaran->where('status', 'sukses')->sum('jumlah'),
        ];

        return Inertia::render('staff-keuangan/pendaftaran/show', [
            'pendaftaran' => $pendaftaran,
            'stats' => $stats
        ]);
    }
}
