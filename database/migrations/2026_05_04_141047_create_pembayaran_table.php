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
        Schema::create('pembayaran', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pendaftaran_id')->constrained('pendaftaran')->cascadeOnDelete();
            $table->decimal('jumlah', 15, 2);
            $table->enum('metode', ['transfer', 'cash', 'gateway']);
            $table->enum('status', ['pending', 'sukses', 'gagal'])->default('pending');
            $table->string('bukti_bayar')->nullable();
            $table->date('tanggal_bayar')->nullable();
            $table->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayaran');
    }
};
