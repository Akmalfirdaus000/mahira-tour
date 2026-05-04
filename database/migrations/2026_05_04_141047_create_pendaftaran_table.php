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
        Schema::create('pendaftaran', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jamaah_id')->constrained('jamaah')->cascadeOnDelete();
            $table->foreignId('keberangkatan_id')->constrained('keberangkatan')->cascadeOnDelete();
            $table->date('tanggal_daftar');
            $table->enum('status', ['pending', 'dp', 'lunas', 'batal'])->default('pending');
            $table->text('catatan_admin')->nullable();
            $table->timestamps();
            
            $table->unique(['jamaah_id', 'keberangkatan_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendaftaran');
    }
};
