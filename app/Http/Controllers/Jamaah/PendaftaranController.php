<?php

namespace App\Http\Controllers\Jamaah;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pendaftaran;
use App\Models\Keberangkatan;

class PendaftaranController extends Controller
{
    public function show($id)
    {
        $user = auth()->user();
        $pendaftaran = Pendaftaran::with(['keberangkatan.paketUmroh', 'pembayaran'])
            ->where('jamaah_id', $user->jamaah->id)
            ->findOrFail($id);

        $total_bayar = $pendaftaran->pembayaran->where('status', 'sukses')->sum('jumlah');
        $total_pending = $pendaftaran->pembayaran->where('status', 'pending')->sum('jumlah');
        $sisa_bayar = $pendaftaran->keberangkatan->paketUmroh->harga - $total_bayar;

        $documents = \App\Models\Dokumen::where('jamaah_id', $user->jamaah->id)->get()->groupBy('jenis');
        
        return Inertia::render('jamaah/pendaftaran/show', [
            'pendaftaran' => $pendaftaran,
            'summary' => [
                'total_harga' => $pendaftaran->keberangkatan->paketUmroh->harga,
                'sudah_dibayar' => $total_bayar,
                'total_pending' => $total_pending,
                'sisa_pembayaran' => $sisa_bayar,
            ],
            'documents' => $documents,
            'categories' => [
                ['id' => 'pas_foto', 'label' => 'Pas Foto'],
                ['id' => 'passport', 'label' => 'Passport'],
                ['id' => 'ktp_akta', 'label' => 'KTP / Akta'],
                ['id' => 'kk', 'label' => 'KK'],
                ['id' => 'surat_nikah', 'label' => 'Surat Nikah'],
                ['id' => 'vaksin', 'label' => 'Vaksin'],
            ]
        ]);
    }

    public function index(Request $request)
    {
        $user = $request->user();
        
        if (!$user->jamaah) {
            return Inertia::render('jamaah/pendaftaran/index', [
                'pendaftaran' => []
            ]);
        }

        $pendaftaran = Pendaftaran::with(['keberangkatan.paketUmroh', 'pembayaran'])
            ->where('jamaah_id', $user->jamaah->id)
            ->withCount('dokumen')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('jamaah/pendaftaran/index', [
            'pendaftaran' => $pendaftaran
        ]);
    }

    public function konfirmasi($keberangkatan_id)
    {
        $user = auth()->user();
        $keberangkatan = Keberangkatan::with('paketUmroh')->findOrFail($keberangkatan_id);

        if (\Carbon\Carbon::parse($keberangkatan->tanggal_berangkat)->lt(today())) {
            return redirect()->route('jamaah.paket-umroh')
                ->with('error', 'Jadwal keberangkatan ini sudah lewat/kadaluarsa.');
        }

        $jamaah = $user->jamaah;
        
        $all_keberangkatan = Keberangkatan::where('paket_id', $keberangkatan->paket_id)
            ->where('tanggal_berangkat', '>=', today())
            ->where('sisa_kuota', '>', 0)
            ->get();

        $documents = $jamaah 
            ? \App\Models\Dokumen::where('jamaah_id', $jamaah->id)->get()->groupBy('jenis')
            : (object) [];

        return Inertia::render('jamaah/pendaftaran/konfirmasi', [
            'keberangkatan' => $keberangkatan,
            'all_keberangkatan' => $all_keberangkatan,
            'jamaah' => $jamaah,
            'documents' => $documents,
            'categories' => [
                ['id' => 'pas_foto', 'label' => 'Pas Foto'],
                ['id' => 'passport', 'label' => 'Passport'],
                ['id' => 'ktp_akta', 'label' => 'KTP / Akta'],
                ['id' => 'kk', 'label' => 'KK'],
                ['id' => 'surat_nikah', 'label' => 'Surat Nikah'],
                ['id' => 'vaksin', 'label' => 'Vaksin'],
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'keberangkatan_id' => 'required|exists:keberangkatan,id',
            'nik' => 'required|string|size:16',
            'nama_lengkap' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:100',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'no_hp' => 'required|string|max:20',
            'alamat' => 'required|string',
            'kota' => 'required|string|max:100',
            'provinsi' => 'required|string|max:100',
            'konfirmasi' => 'accepted',
        ]);

        $keberangkatan = Keberangkatan::findOrFail($request->keberangkatan_id);
        if (\Carbon\Carbon::parse($keberangkatan->tanggal_berangkat)->lt(today())) {
            return redirect()->route('jamaah.paket-umroh')
                ->with('error', 'Jadwal keberangkatan ini sudah lewat/kadaluarsa.');
        }

        if ($keberangkatan->sisa_kuota <= 0) {
            return redirect()->route('jamaah.paket-umroh')
                ->with('error', 'Maaf, kuota untuk keberangkatan ini sudah penuh.');
        }

        $user = $request->user();
        $jamaah = $user->jamaah;

        if (!$jamaah) {
            $jamaah = \App\Models\Jamaah::create([
                'user_id' => $user->id,
                'nik' => $request->nik,
                'nama_lengkap' => $request->nama_lengkap,
                'tempat_lahir' => $request->tempat_lahir,
                'tanggal_lahir' => $request->tanggal_lahir,
                'jenis_kelamin' => $request->jenis_kelamin,
                'no_hp' => $request->no_hp,
                'alamat' => $request->alamat,
                'kota' => $request->kota,
                'provinsi' => $request->provinsi,
            ]);
        } else {
            $jamaah->update([
                'nik' => $request->nik,
                'nama_lengkap' => $request->nama_lengkap,
                'tempat_lahir' => $request->tempat_lahir,
                'tanggal_lahir' => $request->tanggal_lahir,
                'jenis_kelamin' => $request->jenis_kelamin,
                'no_hp' => $request->no_hp,
                'alamat' => $request->alamat,
                'kota' => $request->kota,
                'provinsi' => $request->provinsi,
            ]);
        }

        $pendaftaran = Pendaftaran::where('jamaah_id', $jamaah->id)
            ->where('keberangkatan_id', $request->keberangkatan_id)
            ->first();

        if ($pendaftaran) {
            return redirect()->route('jamaah.pendaftaran')->with('info', 'Anda sudah terdaftar untuk keberangkatan ini.');
        }

        $pendaftaran = Pendaftaran::create([
            'jamaah_id' => $jamaah->id,
            'keberangkatan_id' => $request->keberangkatan_id,
            'tanggal_daftar' => now(),
            'status' => 'pending',
        ]);

        $keberangkatan->decrement('sisa_kuota');

        return redirect()->route('jamaah.pendaftaran')->with('success', 'Pendaftaran berhasil dikirim! Silakan pantau status pendaftaran Anda.');
    }
}
