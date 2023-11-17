<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Apartment;

class UserController extends Controller
{
    public function getAllUserNames()
    {
        // Retrieve all users (assuming you have a User model)
        $users = User::all();
    
        // Retrieve all apartments with images
        $apartmentsWithUsers = Apartment::with(['user:id,name', 'images'])
            ->get();
    
        // Process the apartments and retrieve the first image path for each
        $apartmentsWithThumbnails = $apartmentsWithUsers->map(function ($apartment) {
            $thumbnail = $apartment->images->first();
            return [
                'id' => $apartment->id,
                'title' => $apartment->title,
                'price' => $apartment->price,
                'description' => $apartment->description,
                'first_image_path' => $thumbnail ? $thumbnail->image_path : null,
                'user' => $apartment->user, // Include user details
                // Add other apartment details as needed
            ];
        });
    
        // Return the array of user names and associated apartments in JSON response
        return response()->json(['names' => $apartmentsWithThumbnails]);
    }
}
