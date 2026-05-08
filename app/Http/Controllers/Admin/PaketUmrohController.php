<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\PaketUmroh;

class PaketUmrohController extends Controller
{
    public function index()
    {
        $paket = PaketUmroh::withCount('keberangkatan')->latest()->get();

        return Inertia::render('admin/paket-umroh/index', [
            'paket' => $paket
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/paket-umroh/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_paket' => 'required|string|max:255',
            'harga' => 'required|numeric|min:0',
            'durasi_hari' => 'required|integer|min:1',
            'maskapai' => 'nullable|string|max:255',
            'hotel' => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'kuota' => 'required|integer|min:1',
        ]);

        PaketUmroh::create($request->all());

        return redirect()->route('admin.paket-umroh.index')->with('success', 'Paket Umroh berhasil ditambahkan!');
    }

    public function show(PaketUmroh $paketUmroh)
    {
        $paketUmroh->load(['keberangkatan.pendaftaran', 'fasilitas']);
        
        return Inertia::render('admin/paket-umroh/show', [
            'paket' => $paketUmroh
        ]);
    }

    public function edit(PaketUmroh $paketUmroh)
    {
        return Inertia::render('admin/paket-umroh/edit', [
            'paket' => $paketUmroh
        ]);
    }

    public function update(Request $request, PaketUmroh $paketUmroh)
    {
        $request->validate([
            'nama_paket' => 'required|string|max:255',
            'harga' => 'required|numeric|min:0',
            'durasi_hari' => 'required|integer|min:1',
            'maskapai' => 'nullable|string|max:255',
            'hotel' => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'kuota' => 'required|integer|min:1',
        ]);

        $paketUmroh->update($request->all());

        return redirect()->route('admin.paket-umroh.index')->with('success', 'Paket Umroh berhasil diperbarui!');
    }

    public function destroy(PaketUmroh $paketUmroh)
    {
        if ($paketUmroh->keberangkatan()->exists()) {
            return redirect()->back()->with('error', 'Tidak dapat menghapus paket yang sudah memiliki jadwal keberangkatan!');
        }

        $paketUmroh->delete();

        return redirect()->route('admin.paket-umroh.index')->with('success', 'Paket Umroh berhasil dihapus!');
    }
}
