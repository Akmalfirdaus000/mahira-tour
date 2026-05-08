<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Keberangkatan;
use App\Models\PaketUmroh;

class KeberangkatanController extends Controller
{
    public function index()
    {
        $keberangkatan = Keberangkatan::with('paketUmroh')->latest()->get();

        return Inertia::render('admin/keberangkatan/index', [
            'keberangkatan' => $keberangkatan
        ]);
    }

    public function create()
    {
        $paket = PaketUmroh::select('id', 'nama_paket')->get();
        return Inertia::render('admin/keberangkatan/create', [
            'paket' => $paket
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'paket_id' => 'required|exists:paket_umroh,id',
            'tanggal_berangkat' => 'required|date',
            'tanggal_pulang' => 'required|date|after:tanggal_berangkat',
            'kuota' => 'required|integer|min:1',
            'keterangan' => 'nullable|string',
        ]);

        $data = $request->all();
        $data['sisa_kuota'] = $request->kuota;

        Keberangkatan::create($data);

        return redirect()->route('admin.keberangkatan.index')->with('success', 'Jadwal Keberangkatan berhasil ditambahkan!');
    }
    public function show(Keberangkatan $keberangkatan)
    {
        $keberangkatan->load(['paketUmroh', 'pendaftaran.jamaah.user']);

        return Inertia::render('admin/keberangkatan/show', [
            'keberangkatan' => $keberangkatan
        ]);
    }

    public function edit(Keberangkatan $keberangkatan)
    {
        $paket = PaketUmroh::select('id', 'nama_paket')->get();
        return Inertia::render('admin/keberangkatan/edit', [
            'keberangkatan' => $keberangkatan,
            'paket' => $paket
        ]);
    }

    public function update(Request $request, Keberangkatan $keberangkatan)
    {
        $request->validate([
            'paket_id' => 'required|exists:paket_umroh,id',
            'tanggal_berangkat' => 'required|date',
            'tanggal_pulang' => 'required|date|after:tanggal_berangkat',
            'kuota' => 'required|integer|min:1',
            'keterangan' => 'nullable|string',
        ]);

        // Adjust sisa_kuota if kuota changes
        $diff = $request->kuota - $keberangkatan->kuota;
        $newSisa = $keberangkatan->sisa_kuota + $diff;

        if ($newSisa < 0) {
            return redirect()->back()->with('error', 'Kuota tidak boleh kurang dari jumlah jamaah yang sudah mendaftar!');
        }

        $data = $request->all();
        $data['sisa_kuota'] = $newSisa;

        $keberangkatan->update($data);

        return redirect()->route('admin.keberangkatan.index')->with('success', 'Jadwal Keberangkatan berhasil diperbarui!');
    }

    public function destroy(Keberangkatan $keberangkatan)
    {
        if ($keberangkatan->sisa_kuota < $keberangkatan->kuota) {
            return redirect()->back()->with('error', 'Tidak dapat menghapus jadwal yang sudah memiliki jamaah!');
        }

        $keberangkatan->delete();

        return redirect()->route('admin.keberangkatan.index')->with('success', 'Jadwal Keberangkatan berhasil dihapus!');
    }
}
