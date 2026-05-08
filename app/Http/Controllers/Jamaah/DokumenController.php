<?php

namespace App\Http\Controllers\Jamaah;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Dokumen;

class DokumenController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        if (!$user->jamaah) {
            return Inertia::render('jamaah/dokumen/index', [
                'dokumen' => [],
                'categories' => $this->getRequiredCategories()
            ]);
        }

        $dokumen = Dokumen::where('jamaah_id', $user->jamaah->id)->get()->groupBy('jenis');

        return Inertia::render('jamaah/dokumen/index', [
            'dokumen' => $dokumen,
            'categories' => $this->getRequiredCategories()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'jenis' => 'required|string|in:pas_foto,passport,ktp_akta,kk,surat_nikah,vaksin',
            'file' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $user = $request->user();
        $jamaah = $user->jamaah;

        if (!$jamaah) {
            return back()->with('error', 'Profil jamaah tidak ditemukan.');
        }

        // Handle file upload
        $path = $request->file('file')->store('dokumen/' . $jamaah->id, 'public');

        // Update or create document record
        Dokumen::updateOrCreate(
            ['jamaah_id' => $jamaah->id, 'jenis' => $request->jenis],
            [
                'file_path' => $path,
                'status_verifikasi' => 'pending',
                'uploaded_at' => now(),
            ]
        );

        return back()->with('success', 'Dokumen berhasil diunggah!');
    }

    private function getRequiredCategories()
    {
        return [
            ['id' => 'pas_foto', 'label' => 'Pas Foto'],
            ['id' => 'passport', 'label' => 'Passport'],
            ['id' => 'ktp_akta', 'label' => 'KTP / Akta Kelahiran'],
            ['id' => 'kk', 'label' => 'Kartu Keluarga'],
            ['id' => 'surat_nikah', 'label' => 'Surat Nikah'],
            ['id' => 'vaksin', 'label' => 'Sertifikat Vaksin'],
        ];
    }
}
