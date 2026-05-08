<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\Jamaah;
use App\Models\Fasilitas;
use App\Models\PaketUmroh;
use App\Models\Keberangkatan;
use App\Models\Pendaftaran;
use App\Models\Pembayaran;
use App\Models\Dokumen;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Roles
        $roles = ['super_admin', 'admin', 'staff_keuangan', 'jamaah'];
        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
        }

        // 2. Create Users
        $password = Hash::make('123');

        $superAdmin = User::firstOrCreate(
            ['email' => 'superadmin@gmail.com'],
            ['name' => 'Super Admin', 'password' => $password, 'phone' => '081111111111']
        );
        $superAdmin->roles()->sync([Role::where('name', 'super_admin')->first()->id]);

        $admin = User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            ['name' => 'Admin Mahira', 'password' => $password, 'phone' => '082222222222']
        );
        $admin->roles()->sync([Role::where('name', 'admin')->first()->id]);

        $staffKeuangan = User::firstOrCreate(
            ['email' => 'staff@gmail.com'],
            ['name' => 'Staff Keuangan', 'password' => $password, 'phone' => '083333333333']
        );
        $staffKeuangan->roles()->sync([Role::where('name', 'staff_keuangan')->first()->id]);

        $userJamaah = User::firstOrCreate(
            ['email' => 'jamaah@gmail.com'],
            ['name' => 'Ahmad Jamaah', 'password' => $password, 'phone' => '084444444444']
        );
        $userJamaah->roles()->sync([Role::where('name', 'jamaah')->first()->id]);

        // 3. Create Jamaah Profile
        $jamaah = Jamaah::firstOrCreate(
            ['user_id' => $userJamaah->id],
            [
                'nik' => '3271123456789012',
                'nama_lengkap' => 'Ahmad Jamaah bin Fulan',
                'tempat_lahir' => 'Jakarta',
                'tanggal_lahir' => '1990-01-01',
                'jenis_kelamin' => 'Laki-laki',
                'alamat' => 'Jl. Sudirman No. 123, Kebayoran Baru',
                'kota' => 'Jakarta Selatan',
                'provinsi' => 'DKI Jakarta',
                'no_hp' => '084444444444',
            ]
        );

        // 4. Create Fasilitas (✈️ Fasilitas)
        $fTiket = Fasilitas::firstOrCreate(['nama' => 'Tiket PP'], ['tipe' => 'fasilitas']);
        $fHotel = Fasilitas::firstOrCreate(['nama' => 'Hotel'], ['tipe' => 'fasilitas']);
        $fMakan = Fasilitas::firstOrCreate(['nama' => 'Makan'], ['tipe' => 'fasilitas']);
        $fBus = Fasilitas::firstOrCreate(['nama' => 'Bus'], ['tipe' => 'fasilitas']);
        $fAsuransi = Fasilitas::firstOrCreate(['nama' => 'Asuransi'], ['tipe' => 'fasilitas']);

        // 5. Create Perlengkapan (🎒 Perlengkapan)
        $fKoper = Fasilitas::firstOrCreate(['nama' => 'Koper'], ['tipe' => 'perlengkapan']);
        $fMukena = Fasilitas::firstOrCreate(['nama' => 'Mukena'], ['tipe' => 'perlengkapan']);
        $fKainIhram = Fasilitas::firstOrCreate(['nama' => 'Kain Ihram'], ['tipe' => 'perlengkapan']);

        // 6. Create Paket Umroh
        $paketVip = PaketUmroh::firstOrCreate(
            ['nama_paket' => 'Paket Berkah VIP'],
            [
                'harga' => 45000000.00,
                'durasi_hari' => 12,
                'maskapai' => 'Garuda Indonesia',
                'hotel' => 'Movenpick Mekkah (Bintang 5)',
                'deskripsi' => 'Paket umroh VIP dengan pelayanan terbaik dan jarak hotel yang sangat dekat dari Masjidil Haram.',
                'kuota' => 20,
            ]
        );
        $paketVip->fasilitas()->sync([
            $fTiket->id => ['keterangan' => 'Garuda Direct'],
            $fHotel->id => ['keterangan' => 'Hotel Bintang 5'],
            $fMakan->id => ['keterangan' => '3x Sehari (Prasmanan)'],
            $fBus->id => ['keterangan' => 'Bus Eksekutif'],
            $fAsuransi->id => ['keterangan' => 'Full Cover'],
            $fKoper->id => ['keterangan' => 'Koper 24 inch Fiber'],
            $fMukena->id => ['keterangan' => 'Mukena Premium'],
        ]);

        $paketReguler = PaketUmroh::firstOrCreate(
            ['nama_paket' => 'Paket Umroh Reguler'],
            [
                'harga' => 28500000.00,
                'durasi_hari' => 9,
                'maskapai' => 'Saudia Airlines',
                'hotel' => 'Olayan Madinah (Bintang 4)',
                'deskripsi' => 'Paket umroh reguler yang ekonomis dan nyaman.',
                'kuota' => 45,
            ]
        );
        $paketReguler->fasilitas()->sync([
            $fTiket->id => ['keterangan' => 'Transit Dubai'],
            $fHotel->id => ['keterangan' => 'Hotel Bintang 4'],
            $fMakan->id => ['keterangan' => '3x Sehari'],
            $fKoper->id => ['keterangan' => 'Koper Standar'],
            $fKainIhram->id => ['keterangan' => 'Kain Ihram Katun'],
        ]);

        // 7. Create Keberangkatan
        $keberangkatanVip = Keberangkatan::firstOrCreate(
            ['paket_id' => $paketVip->id],
            [
                'tanggal_berangkat' => now()->addMonths(1)->format('Y-m-d'),
                'tanggal_pulang' => now()->addMonths(1)->addDays(12)->format('Y-m-d'),
                'kuota' => 20,
                'sisa_kuota' => 20,
                'keterangan' => 'Keberangkatan VIP Jakarta',
            ]
        );

        $keberangkatanReguler = Keberangkatan::firstOrCreate(
            ['paket_id' => $paketReguler->id],
            [
                'tanggal_berangkat' => now()->addMonths(2)->format('Y-m-d'),
                'tanggal_pulang' => now()->addMonths(2)->addDays(9)->format('Y-m-d'),
                'kuota' => 45,
                'sisa_kuota' => 44,
                'keterangan' => 'Keberangkatan Reguler Jakarta',
            ]
        );

        // 8. Create Pendaftaran
        $pendaftaran = Pendaftaran::firstOrCreate(
            [
                'jamaah_id' => $jamaah->id,
                'keberangkatan_id' => $keberangkatanReguler->id,
            ],
            [
                'tanggal_daftar' => now()->subDays(5)->format('Y-m-d'),
                'status' => 'pending',
                'catatan_admin' => 'Dokumen belum lengkap',
            ]
        );

        // 9. Create Pembayaran
        Pembayaran::firstOrCreate(
            ['pendaftaran_id' => $pendaftaran->id],
            [
                'jumlah' => 5000000.00,
                'metode' => 'transfer',
                'status' => 'sukses',
                'bukti_bayar' => 'bukti_dp.jpg',
                'tanggal_bayar' => now()->subDays(4)->format('Y-m-d'),
            ]
        );

        // 10. Create Dokumen (Categories: pas_foto, passport, ktp_akta, kk, surat_nikah, vaksin)
        $requiredDocs = [
            'passport' => 'Valid',
            'ktp_akta' => 'Valid',
            'vaksin' => 'Pending',
        ];

        foreach ($requiredDocs as $jenis => $status) {
            Dokumen::firstOrCreate(
                [
                    'jamaah_id' => $jamaah->id,
                    'jenis' => $jenis,
                ],
                [
                    'file_path' => "dokumen/{$jenis}_ahmad.jpg",
                    'status_verifikasi' => strtolower($status),
                    'catatan' => $status === 'Valid' ? 'Dokumen Sesuai' : 'Sedang ditinjau',
                    'uploaded_at' => now()->subDays(5),
                    'verified_by' => $status === 'Valid' ? $admin->id : null,
                ]
            );
        }

        $this->command->info('Database telah berhasil di-seed dengan data fasilitas & perlengkapan yang dipisah!');
    }
}
