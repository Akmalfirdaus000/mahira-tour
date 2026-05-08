<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pendaftaran;
use App\Models\Jamaah;
use App\Models\Keberangkatan;

class PendaftaranController extends Controller
{
    public function index()
    {
        $pendaftaran = Pendaftaran::with(['jamaah.user', 'keberangkatan.paketUmroh'])
            ->latest()
            ->get();

        return Inertia::render('admin/pendaftaran/index', [
            'pendaftaran' => $pendaftaran
        ]);
    }

    public function show(Pendaftaran $pendaftaran)
    {
        $pendaftaran->load(['jamaah.user', 'keberangkatan.paketUmroh', 'pembayaran']);
        return Inertia::render('admin/pendaftaran/show', [
            'pendaftaran' => $pendaftaran
        ]);
    }

    public function update(Request $request, Pendaftaran $pendaftaran)
    {
        $request->validate([
            'status' => 'required|in:pending,dp,lunas,batal',
            'catatan_admin' => 'nullable|string',
        ]);

        $pendaftaran->update($request->all());

        return redirect()->back()->with('success', 'Status pendaftaran berhasil diperbarui!');
    }

    public function destroy(Pendaftaran $pendaftaran)
    {
        // When pendaftaran is deleted, we should increment sisa_kuota in keberangkatan
        $keberangkatan = $pendaftaran->keberangkatan;
        $keberangkatan->increment('sisa_kuota');

        $pendaftaran->delete();

        return redirect()->route('admin.pendaftaran.index')->with('success', 'Data pendaftaran berhasil dihapus!');
    }
}
