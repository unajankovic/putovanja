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
        Schema::create('putovanja', function (Blueprint $table) {
            $table->id();
            $table->string('nazivPutovanja');
            $table->unsignedBigInteger('drzava_id');
            $table->date('datumPolaska');
            $table->date('datumPovratka');
            $table->unsignedBigInteger('user_id');

            $table->foreign('drzava_id')
                ->references('id')
                ->on('drzave')
                ->onDelete('cascade');

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('putovanja');
    }
};
