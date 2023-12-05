<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'apartment_id',
        'user_id',
        'rating',
    ];

    // Define relationships or any other model-specific methods here
    public function apartment()
{
    return $this->belongsTo(Apartment::class);
}
}