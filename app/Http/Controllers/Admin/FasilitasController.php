<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Fasilitas;

class FasilitasController extends Controller
{
    public function index()
    {
        $fasilitas = Fasilitas::latest()->get();

        return Inertia::render('admin/fasilitas/index', [
            'fasilitas' => $fasilitas
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/fasilitas/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'tipe' => 'required|in:fasilitas,perlengkapan',
            'deskripsi' => 'nullable|string',
        ]);

        Fasilitas::create($request->all());

        return redirect()->route('admin.fasilitas.index')->with('success', 'Fasilitas berhasil ditambahkan!');
    }

    public function edit(Fasilitas $fasilita)
    {
        return Inertia::render('admin/fasilitas/edit', [
            'fasilitas' => $fasilita
        ]);
    }

    public function update(Request $request, Fasilitas $fasilita)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'tipe' => 'required|in:fasilitas,perlengkapan',
            'deskripsi' => 'nullable|string',
        ]);

        $fasilita->update($request->all());

        return redirect()->route('admin.fasilitas.index')->with('success', 'Fasilitas berhasil diperbarui!');
    }

    public function destroy(Fasilitas $fasilita)
    {
        $fasilita->delete();

        return redirect()->route('admin.fasilitas.index')->with('success', 'Fasilitas berhasil dihapus!');
    }
}
