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
        Schema::table('slike', function (Blueprint $table) {
            $table->foreign('putovanje_id')
                ->references('id')
                ->on('putovanja')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('slike', function (Blueprint $table) {
            $table->dropForeign(['putovanje_id']);
        });
    }
};
