<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Jamaah;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class JamaahController extends Controller
{
    public function index()
    {
        $jamaah = Jamaah::with(['user', 'pendaftaran' => function($query) {
            $query->latest()->limit(1);
        }])->latest()->get();

        return Inertia::render('admin/jamaah/index', [
            'jamaah' => $jamaah
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/jamaah/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'nik' => 'required|string|unique:jamaah',
            'nama_lengkap' => 'required|string',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat' => 'required|string',
            'kota' => 'required|string',
            'provinsi' => 'required|string',
            'no_hp' => 'required|string',
        ]);

        DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Assign jamaah role
            $role = Role::where('name', 'jamaah')->first();
            if ($role) {
                $user->roles()->attach($role->id);
            }

            $user->jamaah()->create($request->only([
                'nik', 'nama_lengkap', 'tempat_lahir', 'tanggal_lahir', 
                'jenis_kelamin', 'alamat', 'kota', 'provinsi', 'no_hp'
            ]));
        });

        return redirect()->route('admin.jamaah.index')->with('success', 'Data Jamaah berhasil ditambahkan!');
    }

    public function show(Jamaah $jamaah)
    {
        $jamaah->load(['user', 'pendaftaran.keberangkatan.paketUmroh', 'pendaftaran.pembayaran', 'dokumen']);
        
        return Inertia::render('admin/jamaah/show', [
            'jamaah' => $jamaah
        ]);
    }

    public function edit(Jamaah $jamaah)
    {
        $jamaah->load('user');
        return Inertia::render('admin/jamaah/edit', [
            'jamaah' => $jamaah
        ]);
    }

    public function update(Request $request, Jamaah $jamaah)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $jamaah->user_id,
            'nik' => 'required|string|unique:jamaah,nik,' . $jamaah->id,
            'nama_lengkap' => 'required|string',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat' => 'required|string',
            'kota' => 'required|string',
            'provinsi' => 'required|string',
            'no_hp' => 'required|string',
        ]);

        DB::transaction(function () use ($request, $jamaah) {
            $jamaah->user->update([
                'name' => $request->name,
                'email' => $request->email,
            ]);

            if ($request->password) {
                $jamaah->user->update([
                    'password' => Hash::make($request->password),
                ]);
            }

            $jamaah->update($request->only([
                'nik', 'nama_lengkap', 'tempat_lahir', 'tanggal_lahir', 
                'jenis_kelamin', 'alamat', 'kota', 'provinsi', 'no_hp'
            ]));
        });

        return redirect()->route('admin.jamaah.index')->with('success', 'Data Jamaah berhasil diperbarui!');
    }

    public function destroy(Jamaah $jamaah)
    {
        // User will be deleted due to cascadeOnDelete in migration
        $jamaah->user->delete();
        
        return redirect()->route('admin.jamaah.index')->with('success', 'Data Jamaah berhasil dihapus!');
    }
}
