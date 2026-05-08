<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Keuangan - Mahira Tour</title>
    <style>
        body {
            font-family: 'Times New Roman', Times, serif;
            line-height: 1.6;
            color: #000;
            margin: 0;
            padding: 40px;
            background: #fff;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #000;
            margin-bottom: 30px;
            padding-bottom: 10px;
        }
        .header h1 {
            margin: 0;
            text-transform: uppercase;
            font-size: 24px;
        }
        .header p {
            margin: 5px 0;
            font-size: 14px;
        }
        .report-info {
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
        }
        .report-info div {
            font-size: 14px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        th, td {
            border: 1px solid #000;
            padding: 10px;
            text-align: left;
            font-size: 12px;
        }
        th {
            background-color: #f2f2f2;
            text-transform: uppercase;
        }
        .total-section {
            text-align: right;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
        }
        .footer {
            margin-top: 50px;
            display: flex;
            justify-content: flex-end;
        }
        .signature {
            text-align: center;
            width: 200px;
        }
        .signature-space {
            height: 80px;
        }
        @media print {
            .no-print {
                display: none;
            }
            body {
                padding: 0;
            }
        }
    </style>
</head>
<body>
    <div class="no-print" style="margin-bottom: 20px; text-align: right;">
        <button onclick="window.print()" style="padding: 10px 20px; cursor: pointer; font-weight: bold; border: 1px solid #000; background: #fff;">Cetak / Simpan PDF</button>
    </div>

    <div class="header">
        <h1>Mahira Tour & Travel</h1>
        <p>Laporan Transaksi Keuangan</p>
        <p>Jl. Utama No. 123, Jakarta, Indonesia</p>
    </div>

    <div class="report-info">
        <div>
            <strong>Tanggal Cetak:</strong> {{ $tanggal }}
        </div>
        <div>
            <strong>Unit:</strong> Staff Keuangan
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Kode</th>
                <th>Jamaah</th>
                <th>Metode</th>
                <th>Jumlah</th>
            </tr>
        </thead>
        <tbody>
            @foreach($pembayaran as $index => $pay)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $pay->created_at->format('d/m/Y H:i') }}</td>
                <td>TRX-{{ $pay->id }}</td>
                <td>{{ $pay->pendaftaran->jamaah->nama_lengkap }}</td>
                <td>{{ strtoupper($pay->metode) }}</td>
                <td style="text-align: right;">Rp {{ number_format($pay->jumlah, 0, ',', '.') }}</td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="5" style="text-align: right; font-weight: bold;">TOTAL PENDAPATAN</td>
                <td style="text-align: right; font-weight: bold;">Rp {{ number_format($total_pendapatan, 0, ',', '.') }}</td>
            </tr>
        </tfoot>
    </table>

    <div class="footer">
        <div class="signature">
            <p>Jakarta, {{ $tanggal }}</p>
            <p>Staff Keuangan,</p>
            <div class="signature-space"></div>
            <p><strong>( ____________________ )</strong></p>
        </div>
    </div>
</body>
</html>
