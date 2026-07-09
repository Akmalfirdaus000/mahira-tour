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
        .footer { margin-top: 30px; text-align: right; font-style: italic; font-size: 10px; clear: both; }
        .summary { margin-top: 20px; padding: 15px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; width: 350px; float: right; }
        .summary-title { margin-top: 0; color: #1e40af; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; font-size: 12px; font-weight: bold; }
        .summary-table { width: 100%; border: none; margin-top: 5px; }
        .summary-table td { border: none; padding: 4px 0; }
        .total-highlight { font-weight: bold; font-size: 13px; color: #16a34a; }
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

    @if(isset($summary) && is_array($summary))
        <div class="summary">
            <div class="summary-title">Ringkasan Laporan</div>
            <table class="summary-table">
                @foreach($summary as $label => $value)
                    <tr>
                        <td style="font-weight: bold; color: #4b5563;">{{ $label }}</td>
                        <td style="text-align: right; font-weight: bold;" class="{{ str_contains(strtolower($label), 'sukses') || str_contains(strtolower($label), 'pendapatan') ? 'total-highlight' : '' }}">{{ $value }}</td>
                    </tr>
                @endforeach
            </table>
        </div>
        <div style="clear: both;"></div>
    @endif

    <div class="footer">
        Mahira Tour - Solusi Perjalanan Ibadah Anda
    </div>
</body>
</html>
