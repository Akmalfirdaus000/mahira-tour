<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\PaketFasilitas;
use App\Models\PaketUmroh;
use App\Models\Fasilitas;

class PaketFasilitasController extends Controller
{
    public function index()
    {
        $paketFasilitas = PaketFasilitas::with(['paketUmroh', 'fasilitas'])->latest()->get();

        return Inertia::render('admin/paket-fasilitas/index', [
            'paketFasilitas' => $paketFasilitas
        ]);
    }

    public function create()
    {
        $paket = PaketUmroh::select('id', 'nama_paket')->get();
        $fasilitas = Fasilitas::select('id', 'nama', 'tipe')->get();

        return Inertia::render('admin/paket-fasilitas/create', [
            'paket' => $paket,
            'fasilitas' => $fasilitas
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'paket_id' => 'required|exists:paket_umroh,id',
            'fasilitas_id' => 'required|exists:fasilitas,id',
            'keterangan' => 'nullable|string',
        ]);

        // Check if already exists (unique constraint)
        $exists = PaketFasilitas::where('paket_id', $request->paket_id)
            ->where('fasilitas_id', $request->fasilitas_id)
            ->exists();

        if ($exists) {
            return redirect()->back()->with('error', 'Fasilitas ini sudah ada di paket tersebut!');
        }

        PaketFasilitas::create($request->all());

        return redirect()->route('admin.paket-fasilitas.index')->with('success', 'Fasilitas berhasil ditambahkan ke paket!');
    }

    public function edit($id)
    {
        $paketFasilitas = PaketFasilitas::findOrFail($id);
        $paket = PaketUmroh::select('id', 'nama_paket')->get();
        $fasilitas = Fasilitas::select('id', 'nama', 'tipe')->get();

        return Inertia::render('admin/paket-fasilitas/edit', [
            'paketFasilitas' => $paketFasilitas,
            'paket' => $paket,
            'fasilitas' => $fasilitas
        ]);
    }

    public function update(Request $request, $id)
    {
        $paketFasilitas = PaketFasilitas::findOrFail($id);

        $request->validate([
            'paket_id' => 'required|exists:paket_umroh,id',
            'fasilitas_id' => 'required|exists:fasilitas,id',
            'keterangan' => 'nullable|string',
        ]);

        // Check unique if changed
        if ($paketFasilitas->paket_id != $request->paket_id || $paketFasilitas->fasilitas_id != $request->fasilitas_id) {
            $exists = PaketFasilitas::where('paket_id', $request->paket_id)
                ->where('fasilitas_id', $request->fasilitas_id)
                ->exists();

            if ($exists) {
                return redirect()->back()->with('error', 'Fasilitas ini sudah ada di paket tersebut!');
            }
        }

        $paketFasilitas->update($request->all());

        return redirect()->route('admin.paket-fasilitas.index')->with('success', 'Paket Fasilitas berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $paketFasilitas = PaketFasilitas::findOrFail($id);
        $paketFasilitas->delete();

        return redirect()->route('admin.paket-fasilitas.index')->with('success', 'Fasilitas berhasil dihapus dari paket!');
    }
}
