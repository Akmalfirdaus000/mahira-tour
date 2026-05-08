<!DOCTYPE html>
<html>
<head>
    <title>{{ $title }}</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        .header { text-align: center; margin-bottom: 20px; }
        .header h1 { margin: 0; padding: 0; color: #1e40af; }
        .header p { margin: 5px 0; color: #666; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f3f4f6; font-weight: bold; }
        .footer { margin-top: 30px; text-align: right; font-style: italic; font-size: 10px; }
        .summary { margin-top: 20px; padding: 10px; background-color: #f9fafb; border-radius: 5px; }
        .total { font-weight: bold; font-size: 14px; color: #1e40af; }
    </style>
</head>
<body>
    <div class="header">
        <h1>MAHIRA TOUR & TRAVEL</h1>
        <p>Laporan Resmi Operasional & Keuangan</p>
        <hr>
        <h3>{{ $title }}</h3>
        <p>Dicetak pada: {{ date('d F Y H:i') }}</p>
    </div>

    <table>
        <thead>
            <tr>
                @foreach($headers as $header)
                    <th>{{ $header }}</th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @foreach($data as $row)
                <tr>
                    @foreach($row as $cell)
                        <td>{{ $cell }}</td>
                    @endforeach
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Mahira Tour - Solusi Perjalanan Ibadah Anda
    </div>
</body>
</html>
