<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Apartment;

class UserController extends Controller
{
    public function getAllUserNames()
    {
        $users = User::all();
    
        $apartmentsWithUsers = Apartment::with(['user:id,name', 'images'])
            ->get();
    
        $apartmentsWithThumbnails = $apartmentsWithUsers->map(function ($apartment) {
            $thumbnail = $apartment->images->first();
            return [
                'id' => $apartment->id,
                'title' => $apartment->title,
                'price' => $apartment->price,
                'description' => $apartment->description,
                'first_image_path' => $thumbnail ? $thumbnail->image_path : null,
                'user' => $apartment->user,
            ];
        });
    
        return response()->json(['names' => $apartmentsWithThumbnails]);
    }
}
