<?php

namespace App\Http\Controllers\StaffKeuangan;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PembayaranController extends Controller
{
    public function index()
    {
        $pembayaran = Pembayaran::with(['pendaftaran.jamaah'])
            ->latest()
            ->get();

        return Inertia::render('staff-keuangan/pembayaran/index', [
            'pembayaran' => $pembayaran
        ]);
    }

    public function show(Pembayaran $pembayaran)
    {
        $pembayaran->load(['pendaftaran.jamaah', 'pendaftaran.keberangkatan.paketUmroh', 'pendaftaran.pembayaran']);
        
        return Inertia::render('staff-keuangan/pembayaran/show', [
            'pembayaran' => $pembayaran
        ]);
    }

    public function verify(Request $request, Pembayaran $pembayaran)
    {
        $request->validate([
            'status' => 'required|in:sukses,gagal',
            'catatan' => 'nullable|string'
        ]);

        $pembayaran->update([
            'status' => $request->status,
            'catatan' => $request->catatan
        ]);

        // Update pendaftaran status
        $pendaftaran = $pembayaran->pendaftaran;
        $total_paid = $pendaftaran->pembayaran()->where('status', 'sukses')->sum('jumlah');
        $total_price = $pendaftaran->keberangkatan->paketUmroh->harga;

        if ($total_paid >= $total_price) {
            $pendaftaran->update(['status' => 'lunas']);
        } elseif ($total_paid > 0) {
            $pendaftaran->update(['status' => 'dp']);
        }

        return redirect()->route('staff-keuangan.pembayaran')->with('success', 'Status pembayaran berhasil diperbarui!');
    }
}
