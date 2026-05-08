<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Jamaah;
use App\Models\Pembayaran;
use App\Models\PaketUmroh;
use App\Models\Keberangkatan;
use Inertia\Inertia;

class LaporanController extends Controller
{
    public function index()
    {
        return Inertia::render('super-admin/laporan/index', [
            'popular_packages' => PaketUmroh::withCount('pendaftaran')->orderBy('pendaftaran_count', 'desc')->limit(5)->get(),
            'upcoming_departures' => Keberangkatan::with('paketUmroh')->withCount('pendaftaran')->where('tanggal_berangkat', '>=', now())->get(),
        ]);
    }

    public function export()
    {
        return $this->exportPaket();
    }

    public function exportJamaah()
    {
        $jamaah = Jamaah::all();
        $headers = ['NIK', 'Nama Lengkap', 'Jenis Kelamin', 'No HP', 'Kota'];
        $data = $jamaah->map(fn($j) => [
            $j->nik,
            $j->nama_lengkap,
            $j->jenis_kelamin,
            $j->no_hp,
            $j->kota
        ]);

        return $this->generatePdf('Laporan Data Jamaah', $headers, $data);
    }

    public function exportKeuangan()
    {
        $pembayaran = Pembayaran::with(['pendaftaran.jamaah'])->latest()->get();
        $headers = ['Tanggal', 'Jamaah', 'Metode', 'Jumlah', 'Status'];
        $data = $pembayaran->map(fn($p) => [
            $p->tanggal_bayar ? $p->tanggal_bayar->format('d/m/Y') : '-',
            $p->pendaftaran->jamaah->nama_lengkap,
            strtoupper($p->metode),
            'Rp ' . number_format($p->jumlah, 0, ',', '.'),
            strtoupper($p->status)
        ]);

        return $this->generatePdf('Laporan Keuangan', $headers, $data);
    }

    public function exportPaket()
    {
        $packages = PaketUmroh::withCount('pendaftaran')->get();
        $headers = ['Nama Paket', 'Harga', 'Durasi', 'Kuota', 'Terdaftar'];
        $data = $packages->map(fn($p) => [
            $p->nama_paket,
            'Rp ' . number_format($p->harga, 0, ',', '.'),
            $p->durasi_hari . ' Hari',
            $p->kuota,
            $p->pendaftaran_count
        ]);

        return $this->generatePdf('Laporan Paket Umroh', $headers, $data);
    }

    public function exportSummary()
    {
        $totalJamaah = Jamaah::count();
        $totalPendaftaran = \App\Models\Pendaftaran::count();
        $totalPemasukan = Pembayaran::where('status', 'sukses')->sum('jumlah');
        
        $headers = ['Kategori', 'Keterangan', 'Total'];
        $data = [
            ['Jamaah', 'Total Seluruh Jamaah', $totalJamaah],
            ['Pendaftaran', 'Total Transaksi Pendaftaran', $totalPendaftaran],
            ['Pemasukan', 'Total Dana Masuk (Sukses)', 'Rp ' . number_format($totalPemasukan, 0, ',', '.')],
        ];

        return $this->generatePdf('Summary Tahunan Mahira Tour', $headers, $data);
    }

    private function generatePdf($title, $headers, $data)
    {
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.laporan', [
            'title' => $title,
            'headers' => $headers,
            'data' => $data
        ]);

        return $pdf->download(str_replace(' ', '-', strtolower($title)) . '.pdf');
    }
}
