<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dokumen', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jamaah_id')->constrained('jamaah')->cascadeOnDelete();
            $table->enum('jenis', [
                'pas_foto',
                'passport',
                'ktp_akta',
                'kk',
                'surat_nikah',
                'vaksin_polio',
                'vaksin_meningitis'
            ]);
            $table->string('file_path');
            $table->enum('status_verifikasi', ['pending', 'valid', 'ditolak'])->default('pending');
            $table->text('catatan')->nullable();
            $table->timestamp('uploaded_at')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            
            $table->unique(['jamaah_id', 'jenis']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumen');
    }
};
