<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PaketUmroh extends Model
{
    protected $table = 'paket_umroh';

    protected $fillable = [
        'nama_paket',
        'harga',
        'durasi_hari',
        'maskapai',
        'hotel',
        'deskripsi',
        'kuota',
    ];

    protected function casts(): array
    {
        return [
            'harga' => 'decimal:2',
            'durasi_hari' => 'integer',
            'kuota' => 'integer',
        ];
    }

    public function keberangkatan(): HasMany
    {
        return $this->hasMany(Keberangkatan::class, 'paket_id');
    }

    public function fasilitas(): BelongsToMany
    {
        return $this->belongsToMany(Fasilitas::class, 'paket_fasilitas', 'paket_id', 'fasilitas_id')
            ->withPivot('keterangan', 'created_at');
    }

    public function pendaftaran(): \Illuminate\Database\Eloquent\Relations\HasManyThrough
    {
        return $this->hasManyThrough(Pendaftaran::class, Keberangkatan::class, 'paket_id', 'keberangkatan_id');
    }
}
