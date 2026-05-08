<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Dokumen extends Model
{
    protected $table = 'dokumen';

    // Disable updated_at since it's not in the migration
    const UPDATED_AT = null;
    const CREATED_AT = null;

    protected $fillable = [
        'jamaah_id',
        'jenis',
        'file_path',
        'status_verifikasi', // pending, valid, ditolak
        'catatan',
        'uploaded_at',
        'verified_by',
    ];

    protected function casts(): array
    {
        return [
            'uploaded_at' => 'datetime',
        ];
    }

    public function jamaah(): BelongsTo
    {
        return $this->belongsTo(Jamaah::class, 'jamaah_id');
    }

    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
}
