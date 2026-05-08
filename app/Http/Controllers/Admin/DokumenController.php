<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Dokumen;
use Illuminate\Support\Facades\Auth;

class DokumenController extends Controller
{
    public function index()
    {
        $dokumen = Dokumen::with(['jamaah.user', 'verifier'])
            ->latest('uploaded_at')
            ->get();

        return Inertia::render('admin/dokumen/index', [
            'dokumen' => $dokumen
        ]);
    }

    public function verify(Request $request, Dokumen $dokumen)
    {
        $request->validate([
            'status_verifikasi' => 'required|in:pending,valid,ditolak',
            'catatan' => 'nullable|string',
        ]);

        $dokumen->update([
            'status_verifikasi' => $request->status_verifikasi,
            'catatan' => $request->catatan,
            'verified_by' => Auth::id(),
        ]);

        return redirect()->back()->with('success', 'Dokumen berhasil diverifikasi!');
    }

    public function destroy(Dokumen $dokumen)
    {
        $dokumen->delete();
        return redirect()->back()->with('success', 'Dokumen berhasil dihapus!');
    }
}
