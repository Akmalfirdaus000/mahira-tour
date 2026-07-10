<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Kuitansi / Invoice</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #f59e0b; padding-bottom: 15px; }
        .header h1 { margin: 0; color: #f59e0b; font-size: 28px; }
        .header p { margin: 5px 0 0 0; font-size: 14px; color: #666; }
        .info-table { width: 100%; margin-bottom: 30px; }
        .info-table td { padding: 5px; vertical-align: top; }
        .info-table .label { font-weight: bold; width: 150px; }
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .items-table th, .items-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        .items-table th { background-color: #f9fafb; font-weight: bold; }
        .text-right { text-align: right; }
        .total-row th, .total-row td { font-weight: bold; background-color: #f9fafb; }
        .status-badge { display: inline-block; padding: 5px 10px; border-radius: 5px; font-weight: bold; font-size: 12px; text-transform: uppercase; border: 1px solid #ddd; }
        .footer { text-align: center; margin-top: 50px; font-size: 12px; color: #888; }
        .ttd { width: 100%; margin-top: 50px; }
        .ttd td { width: 50%; text-align: center; }
        .ttd-space { height: 80px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>MAHIRA TOUR</h1>
        <p>Invoice / Kuitansi Pendaftaran Umroh</p>
    </div>

    <table class="info-table">
        <tr>
            <td class="label">No. Pendaftaran</td>
            <td>: #REG-{{ str_pad($pendaftaran->id, 5, '0', STR_PAD_LEFT) }}</td>
            <td class="label">Tanggal Cetak</td>
            <td>: {{ date('d F Y') }}</td>
        </tr>
        <tr>
            <td class="label">Nama Jamaah</td>
            <td>: {{ $pendaftaran->jamaah->nama_lengkap }}</td>
            <td class="label">Status</td>
            <td>: 
                <span class="status-badge">{{ strtoupper($pendaftaran->status) }}</span>
            </td>
        </tr>
        <tr>
            <td class="label">Paket Umroh</td>
            <td>: {{ $pendaftaran->keberangkatan->paketUmroh->nama_paket }}</td>
            <td class="label">Jadwal Berangkat</td>
            <td>: {{ \Carbon\Carbon::parse($pendaftaran->keberangkatan->tanggal_berangkat)->format('d F Y') }}</td>
        </tr>
    </table>

    <h3>Rincian Tagihan</h3>
    <table class="items-table">
        <thead>
            <tr>
                <th>Deskripsi</th>
                <th class="text-right">Jumlah (Rp)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Biaya Paket Umroh - {{ $pendaftaran->keberangkatan->paketUmroh->nama_paket }}</td>
                <td class="text-right">{{ number_format($pendaftaran->keberangkatan->paketUmroh->harga, 0, ',', '.') }}</td>
            </tr>
        </tbody>
    </table>

    <h3>Riwayat Pembayaran (Sukses)</h3>
    <table class="items-table">
        <thead>
            <tr>
                <th>Tanggal Pembayaran</th>
                <th>Metode</th>
                <th class="text-right">Nominal (Rp)</th>
            </tr>
        </thead>
        <tbody>
            @forelse($pendaftaran->pembayaran as $pay)
            <tr>
                <td>{{ \Carbon\Carbon::parse($pay->tanggal_bayar)->format('d F Y') }}</td>
                <td style="text-transform: uppercase;">{{ $pay->metode }}</td>
                <td class="text-right">{{ number_format($pay->jumlah, 0, ',', '.') }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="3" style="text-align: center; font-style: italic;">Belum ada pembayaran sukses</td>
            </tr>
            @endforelse
            <tr class="total-row">
                <td colspan="2" class="text-right">Total Sudah Dibayar</td>
                <td class="text-right">{{ number_format($total_bayar, 0, ',', '.') }}</td>
            </tr>
            <tr class="total-row">
                <td colspan="2" class="text-right">Sisa Tagihan</td>
                <td class="text-right" style="{{ $sisa_bayar <= 0 ? 'color: #166534;' : 'color: #dc2626;' }}">
                    {{ number_format(max(0, $sisa_bayar), 0, ',', '.') }}
                </td>
            </tr>
        </tbody>
    </table>

    <table class="ttd">
        <tr>
            <td>
                <p>Hormat Kami,</p>
                <div class="ttd-space"></div>
                <p><strong>Mahira Tour</strong></p>
            </td>
            <td>
                <p>Jamaah / Pendaftar,</p>
                <div class="ttd-space"></div>
                <p><strong>{{ $pendaftaran->jamaah->nama_lengkap }}</strong></p>
            </td>
        </tr>
    </table>

    <div class="footer">
        Dokumen ini dicetak otomatis oleh sistem dan sah sebagai bukti pendaftaran & pembayaran meskipun tanpa tanda tangan basah.
    </div>
</body>
</html>
