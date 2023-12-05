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
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('apartment_id');
            $table->unsignedBigInteger('user_id');
            $table->decimal('rating', 3, 2);
            $table->timestamps();

               // Foreign key relationships
               $table->foreign('apartment_id')->references('id')->on('apartments')->onDelete('cascade');
               $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};
