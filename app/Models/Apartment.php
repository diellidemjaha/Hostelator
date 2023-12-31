<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apartment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'price',
        'address',
        'latitude',
        'longitude',
        'parking',
        'wi_fi',
        'breakfast_included',
        // 'apartment_picture_paths' => 'array',
        // 'available_dates' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function images()
    {
        return $this->hasMany(ApartmentImage::class, 'apartment_id');
    }
    public function reservations()
{
    return $this->hasMany(Reservation::class);
}
public function updateOverallRating()
{
    $averageRating = $this->ratings()->avg('rating');
    $this->rating = $averageRating;
    $this->save();
}
public function ratings()
{
    return $this->hasMany(Rating::class);
}
}
