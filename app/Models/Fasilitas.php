<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Fasilitas extends Model
{
    protected $table = 'fasilitas';

    protected $fillable = [
        'nama',
        'tipe', // fasilitas, perlengkapan
        'deskripsi',
    ];

    public function paketUmroh(): BelongsToMany
    {
        return $this->belongsToMany(PaketUmroh::class, 'paket_fasilitas', 'fasilitas_id', 'paket_id')
            ->withPivot('keterangan', 'created_at');
    }
}
