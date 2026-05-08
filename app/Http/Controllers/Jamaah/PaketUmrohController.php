<?php

namespace App\Http\Controllers\Jamaah;

use App\Http\Controllers\Controller;
use App\Models\PaketUmroh;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaketUmrohController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all packages with their facilities and departures
        $paketUmroh = PaketUmroh::with(['fasilitas', 'keberangkatan' => function($q) {
            $q->where('tanggal_berangkat', '>=', today());
        }])->get();

        return Inertia::render('jamaah/paket-umroh/index', [
            'paketUmroh' => $paketUmroh
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $paket = PaketUmroh::with(['fasilitas', 'keberangkatan' => function($q) {
            $q->where('tanggal_berangkat', '>=', today());
        }])->findOrFail($id);

        return Inertia::render('jamaah/paket-umroh/show', [
            'paket' => $paket
        ]);
    }
}
