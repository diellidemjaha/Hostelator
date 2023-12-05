<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApartmentsTable extends Migration
{
    public function up()
    {
        Schema::create('apartments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Foreign key to users table
            $table->foreign('user_id')->references('id')->on('users');
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->string('title');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->string('address');
            $table->boolean('parking')->default(false);
            $table->boolean('wi_fi')->default(false);
            $table->boolean('breakfast_included')->default(false);
            $table->json('available_dates')->nullable();
            $table->decimal('rating', 3, 2)->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('apartments');
    }
}
