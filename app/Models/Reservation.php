<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'number',
        'apartment_id',
        'owner_id',
        'user_id',
        'date_in',
        'date_out',
        'status',
        'price',
    ];
    public function apartment()
{
    return $this->belongsTo(Apartment::class);
}
}
