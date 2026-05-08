<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pendaftaran extends Model
{
    protected $table = 'pendaftaran';

    protected $fillable = [
        'jamaah_id',
        'keberangkatan_id',
        'tanggal_daftar',
        'status', // pending, dp, lunas, batal
        'catatan_admin',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_daftar' => 'date',
        ];
    }

    public function jamaah(): BelongsTo
    {
        return $this->belongsTo(Jamaah::class, 'jamaah_id');
    }

    public function keberangkatan(): BelongsTo
    {
        return $this->belongsTo(Keberangkatan::class, 'keberangkatan_id');
    }

    public function pembayaran(): HasMany
    {
        return $this->hasMany(Pembayaran::class, 'pendaftaran_id');
    }

    public function dokumen(): HasMany
    {
        return $this->hasMany(Dokumen::class, 'jamaah_id', 'jamaah_id');
    }
}
