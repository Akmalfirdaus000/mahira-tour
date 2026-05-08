<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pembayaran extends Model
{
    protected $table = 'pembayaran';
    
    // Disable updated_at since it only has created_at in the migration
    const UPDATED_AT = null;

    protected $fillable = [
        'pendaftaran_id',
        'jumlah',
        'metode', // transfer, cash, gateway
        'status', // pending, sukses, gagal
        'bukti_bayar',
        'tanggal_bayar',
    ];

    protected function casts(): array
    {
        return [
            'jumlah' => 'decimal:2',
            'tanggal_bayar' => 'date',
        ];
    }

    public function pendaftaran(): BelongsTo
    {
        return $this->belongsTo(Pendaftaran::class, 'pendaftaran_id');
    }
}
