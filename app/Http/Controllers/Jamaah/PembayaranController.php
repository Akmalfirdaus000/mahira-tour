<?php

namespace App\Http\Controllers\Jamaah;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pembayaran;
use App\Models\Pendaftaran;

class PembayaranController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        if (!$user->jamaah) {
            return Inertia::render('jamaah/pembayaran/index', [
                'pembayaran' => []
            ]);
        }

        $pembayaran = Pembayaran::with(['pendaftaran.keberangkatan.paketUmroh'])
            ->whereHas('pendaftaran', function($q) use ($user) {
                $q->where('jamaah_id', $user->jamaah->id);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('jamaah/pembayaran/index', [
            'pembayaran' => $pembayaran
        ]);
    }

    public function create($pendaftaran_id)
    {
        $user = auth()->user();
        $pendaftaran = Pendaftaran::with(['keberangkatan.paketUmroh'])
            ->where('jamaah_id', $user->jamaah->id)
            ->findOrFail($pendaftaran_id);

        $total_bayar = $pendaftaran->pembayaran->where('status', 'sukses')->sum('jumlah');
        $sisa_bayar = $pendaftaran->keberangkatan->paketUmroh->harga - $total_bayar;

        return Inertia::render('jamaah/pembayaran/create', [
            'pendaftaran' => $pendaftaran,
            'sisa_bayar' => $sisa_bayar
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'pendaftaran_id' => 'required|exists:pendaftaran,id',
            'jumlah' => 'required|numeric|min:1000',
            'metode' => 'required|in:transfer,cash',
            'bukti_bayar' => 'required|image|max:2048',
        ]);

        $user = $request->user();
        $pendaftaran = Pendaftaran::where('jamaah_id', $user->jamaah->id)
            ->findOrFail($request->pendaftaran_id);

        // Handle file upload
        $path = $request->file('bukti_bayar')->store('pembayaran/' . $pendaftaran->id, 'public');

        Pembayaran::create([
            'pendaftaran_id' => $pendaftaran->id,
            'jumlah' => $request->jumlah,
            'metode' => $request->metode,
            'status' => 'pending',
            'bukti_bayar' => $path,
            'tanggal_bayar' => now(),
        ]);

        return redirect()->route('jamaah.pendaftaran.show', $pendaftaran->id)
            ->with('success', 'Pembayaran berhasil dikirim! Silakan tunggu verifikasi admin.');
    }
}
