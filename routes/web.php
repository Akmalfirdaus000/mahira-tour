<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $user = request()->user();

        if ($user->hasRole('super_admin')) {
            return redirect()->route('super-admin.dashboard');
        }

        if ($user->hasRole('admin')) {
            return redirect()->route('admin.dashboard');
        }

        if ($user->hasRole('staff_keuangan')) {
            return redirect()->route('staff-keuangan.dashboard');
        }

        return redirect()->route('jamaah.beranda');
    })->name('dashboard');

    Route::middleware('role:super_admin')->prefix('super-admin')->name('super-admin.')->group(function () {
        Route::get('dashboard', [\App\Http\Controllers\SuperAdmin\DashboardController::class, 'index'])->name('dashboard');
        
        // Data User
        Route::resource('user', \App\Http\Controllers\SuperAdmin\UserController::class);
        Route::post('user/{user}/reset-password', [\App\Http\Controllers\SuperAdmin\UserController::class, 'resetPassword'])->name('user.reset-password');
        Route::post('user/{user}/toggle-status', [\App\Http\Controllers\SuperAdmin\UserController::class, 'toggleStatus'])->name('user.toggle-status');
        
        // Roles (Read Only)
        Route::get('role', [\App\Http\Controllers\SuperAdmin\RoleController::class, 'index'])->name('role.index');

        // Monitoring Modules (Read Only for Super Admin)
        Route::get('jamaah/export', [\App\Http\Controllers\Admin\JamaahController::class, 'export'])->name('jamaah.export');
        Route::resource('jamaah', \App\Http\Controllers\Admin\JamaahController::class)->only(['index', 'show']);
        
        Route::get('paket-umroh/export', [\App\Http\Controllers\Admin\PaketUmrohController::class, 'export'])->name('paket-umroh.export');
        Route::resource('paket-umroh', \App\Http\Controllers\Admin\PaketUmrohController::class)->only(['index', 'show']);
        
        Route::resource('keberangkatan', \App\Http\Controllers\Admin\KeberangkatanController::class)->only(['index', 'show']);
        Route::resource('fasilitas', \App\Http\Controllers\Admin\FasilitasController::class)->only(['index', 'show']);
        Route::resource('paket-fasilitas', \App\Http\Controllers\Admin\PaketFasilitasController::class)->only(['index', 'show']);
        Route::resource('pendaftaran', \App\Http\Controllers\Admin\PendaftaranController::class)->only(['index', 'show']);
        Route::resource('dokumen', \App\Http\Controllers\Admin\DokumenController::class)->only(['index', 'show']);
        
        // Pembayaran (Read Only for Super Admin)
        Route::get('pembayaran', [\App\Http\Controllers\StaffKeuangan\PembayaranController::class, 'index'])->name('pembayaran');
        Route::get('pembayaran/{pembayaran}', [\App\Http\Controllers\StaffKeuangan\PembayaranController::class, 'show'])->name('pembayaran.show');
        // REMOVED: pembayaran.verify
        
        // Laporan
        Route::get('laporan', [\App\Http\Controllers\SuperAdmin\LaporanController::class, 'index'])->name('laporan.index');
        Route::get('laporan/export', [\App\Http\Controllers\SuperAdmin\LaporanController::class, 'export'])->name('laporan.export');
        Route::get('laporan/jamaah', [\App\Http\Controllers\SuperAdmin\LaporanController::class, 'exportJamaah'])->name('laporan.jamaah');
        Route::get('laporan/keuangan', [\App\Http\Controllers\SuperAdmin\LaporanController::class, 'exportKeuangan'])->name('laporan.keuangan');
        Route::get('laporan/paket', [\App\Http\Controllers\SuperAdmin\LaporanController::class, 'exportPaket'])->name('laporan.paket');
        Route::get('laporan/summary', [\App\Http\Controllers\SuperAdmin\LaporanController::class, 'exportSummary'])->name('laporan.summary');
    });

    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
        
        Route::get('jamaah/export', [\App\Http\Controllers\Admin\JamaahController::class, 'export'])->name('jamaah.export');
        Route::resource('jamaah', \App\Http\Controllers\Admin\JamaahController::class);
        
        Route::get('paket-umroh/export', [\App\Http\Controllers\Admin\PaketUmrohController::class, 'export'])->name('paket-umroh.export');
        Route::resource('paket-umroh', \App\Http\Controllers\Admin\PaketUmrohController::class);
        
        Route::resource('keberangkatan', \App\Http\Controllers\Admin\KeberangkatanController::class);
        Route::resource('fasilitas', \App\Http\Controllers\Admin\FasilitasController::class);
        Route::resource('paket-fasilitas', \App\Http\Controllers\Admin\PaketFasilitasController::class);
        Route::resource('pendaftaran', \App\Http\Controllers\Admin\PendaftaranController::class);
        Route::resource('dokumen', \App\Http\Controllers\Admin\DokumenController::class);
        Route::post('dokumen/{dokumen}/verify', [\App\Http\Controllers\Admin\DokumenController::class, 'verify'])->name('dokumen.verify');
    });

    Route::middleware('role:staff_keuangan')->prefix('staff-keuangan')->name('staff-keuangan.')->group(function () {
        Route::get('dashboard', [\App\Http\Controllers\StaffKeuangan\DashboardController::class, 'index'])->name('dashboard');
        
        Route::get('pembayaran', [\App\Http\Controllers\StaffKeuangan\PembayaranController::class, 'index'])->name('pembayaran');
        Route::get('pembayaran/{pembayaran}', [\App\Http\Controllers\StaffKeuangan\PembayaranController::class, 'show'])->name('pembayaran.show');
        Route::post('pembayaran/{pembayaran}/verify', [\App\Http\Controllers\StaffKeuangan\PembayaranController::class, 'verify'])->name('pembayaran.verify');
        
        Route::get('pendaftaran', [\App\Http\Controllers\StaffKeuangan\PendaftaranController::class, 'index'])->name('pendaftaran');
        Route::get('pendaftaran/{pendaftaran}', [\App\Http\Controllers\StaffKeuangan\PendaftaranController::class, 'show'])->name('pendaftaran.show');
        
        Route::get('laporan', [\App\Http\Controllers\StaffKeuangan\LaporanController::class, 'index'])->name('laporan');
        Route::get('laporan/export', [\App\Http\Controllers\StaffKeuangan\LaporanController::class, 'export'])->name('laporan.export');
    });

    Route::middleware('role:jamaah')->prefix('jamaah')->name('jamaah.')->group(function () {
        Route::get('beranda', [\App\Http\Controllers\Jamaah\BerandaController::class, 'index'])->name('beranda');
        Route::get('paket-umroh', [\App\Http\Controllers\Jamaah\PaketUmrohController::class, 'index'])->name('paket-umroh');
        Route::get('paket-umroh/{id}', [\App\Http\Controllers\Jamaah\PaketUmrohController::class, 'show'])->name('paket-umroh.show');
        Route::get('pendaftaran', [\App\Http\Controllers\Jamaah\PendaftaranController::class, 'index'])->name('pendaftaran');
        Route::get('pendaftaran/konfirmasi/{keberangkatan_id}', [\App\Http\Controllers\Jamaah\PendaftaranController::class, 'konfirmasi'])->name('pendaftaran.konfirmasi');
        Route::get('pendaftaran/{id}', [\App\Http\Controllers\Jamaah\PendaftaranController::class, 'show'])->name('pendaftaran.show');
        Route::post('pendaftaran', [\App\Http\Controllers\Jamaah\PendaftaranController::class, 'store'])->name('pendaftaran.store');
        
        Route::get('dokumen', [\App\Http\Controllers\Jamaah\DokumenController::class, 'index'])->name('dokumen');
        Route::post('dokumen', [\App\Http\Controllers\Jamaah\DokumenController::class, 'store'])->name('dokumen.store');
        
        Route::get('pembayaran', [\App\Http\Controllers\Jamaah\PembayaranController::class, 'index'])->name('pembayaran');
        Route::get('pembayaran/create/{pendaftaran_id}', [\App\Http\Controllers\Jamaah\PembayaranController::class, 'create'])->name('pembayaran.create');
        Route::post('pembayaran', [\App\Http\Controllers\Jamaah\PembayaranController::class, 'store'])->name('pembayaran.store');
        
        Route::get('status', [\App\Http\Controllers\Jamaah\StatusController::class, 'index'])->name('status');
    });
});

require __DIR__ . '/settings.php';
