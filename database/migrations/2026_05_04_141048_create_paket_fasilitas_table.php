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
        Schema::create('paket_fasilitas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('paket_id')->constrained('paket_umroh')->cascadeOnDelete();
            $table->foreignId('fasilitas_id')->constrained('fasilitas')->cascadeOnDelete();
            $table->text('keterangan')->nullable();
            $table->timestamp('created_at')->nullable();
            
            $table->unique(['paket_id', 'fasilitas_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paket_fasilitas');
    }
};
