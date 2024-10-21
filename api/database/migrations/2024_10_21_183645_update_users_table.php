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
        // Add new column to the users table
        Schema::table('users', function (Blueprint $table) {
            $table->string('uloga')->default('user')->after('password');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the column from the users table
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('uloga');
        });
    }
};
