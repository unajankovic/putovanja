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
        Schema::table('putovanja', function (Blueprint $table) {
            $table->string('opisPutovanja')->after('nazivPutovanja');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('putovanja', function (Blueprint $table) {
            $table->dropColumn('opisPutovanja');
        });
    }
};
