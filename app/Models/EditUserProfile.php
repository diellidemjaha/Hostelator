<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EditUserProfile extends Model
{
    use HasFactory;

    protected $table = 'edit_user_profiles'; // Replace with your actual table name

    protected $fillable = [
        'user_id',
        'profile_pic_path',
        'full_name',
        'address',
        'profession',
        'website_link',
        'twitter_link',
        'instagram_link',
        'facebook_link',
    ];

    public function user()
{
    return $this->belongsTo(User::class);
}
}
