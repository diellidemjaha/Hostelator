<?php 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateApartmentImagesTable extends Migration
{
    public function up()
    {
        Schema::create('apartment_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('apartment_id');
            $table->text('image_path');
            $table->timestamps();

            $table->foreign('apartment_id')
                ->references('id')
                ->on('apartments')
                ->onDelete('cascade');
        });

        // Set the image_path column to be an array in PostgreSQL
        if (config('database.default') === 'pgsql') {
            DB::statement('ALTER TABLE apartment_images ALTER COLUMN image_path SET DATA TYPE text[]');
        }
    }

    public function down()
    {
        Schema::dropIfExists('apartment_images');
    }
}
