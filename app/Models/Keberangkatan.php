<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Keberangkatan extends Model
{
    protected $table = 'keberangkatan';
    
    // Disable updated_at since it only has created_at in the migration
    const UPDATED_AT = null;

    protected $fillable = [
        'paket_id',
        'tanggal_berangkat',
        'tanggal_pulang',
        'kuota',
        'sisa_kuota',
        'keterangan',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_berangkat' => 'date',
            'tanggal_pulang' => 'date',
            'kuota' => 'integer',
            'sisa_kuota' => 'integer',
        ];
    }

    public function paketUmroh(): BelongsTo
    {
        return $this->belongsTo(PaketUmroh::class, 'paket_id');
    }

    public function pendaftaran(): HasMany
    {
        return $this->hasMany(Pendaftaran::class, 'keberangkatan_id');
    }
}
