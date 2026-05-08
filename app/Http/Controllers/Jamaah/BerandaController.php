<?php

namespace App\Http\Controllers\Jamaah;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pendaftaran;
use App\Models\Dokumen;

class BerandaController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $jamaah = $user->jamaah;

        if (!$jamaah) {
            return Inertia::render('jamaah/beranda/index', [
                'active_pendaftaran' => null,
                'stats' => null,
            ]);
        }

        $active_pendaftaran = Pendaftaran::where('jamaah_id', $jamaah->id)
            ->with(['keberangkatan.paketUmroh'])
            ->latest()
            ->first();

        $stats = [
            'total_pendaftaran' => Pendaftaran::where('jamaah_id', $jamaah->id)->count(),
            'uploaded_docs' => Dokumen::where('jamaah_id', $jamaah->id)->count(),
            'total_payment' => $active_pendaftaran ? $active_pendaftaran->pembayaran()->where('status', 'sukses')->sum('jumlah') : 0,
        ];

        return Inertia::render('jamaah/beranda/index', [
            'active_pendaftaran' => $active_pendaftaran,
            'stats' => $stats,
        ]);
    }
}
