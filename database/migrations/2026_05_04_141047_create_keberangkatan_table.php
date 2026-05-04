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
        Schema::create('keberangkatan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('paket_id')->constrained('paket_umroh')->cascadeOnDelete();
            $table->date('tanggal_berangkat');
            $table->date('tanggal_pulang');
            $table->integer('kuota');
            $table->integer('sisa_kuota');
            $table->text('keterangan')->nullable();
            $table->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('keberangkatan');
    }
};
