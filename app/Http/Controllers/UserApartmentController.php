<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Apartment;

class UserApartmentController extends Controller
{
    public function ApartmentById($apartment_id)
    {
        try {
            // Retrieve the apartment with the given apartment_id
            $apartment = Apartment::where('id', $apartment_id)
                ->firstOrFail();
    
            return response()->json([
                'apartment' => $apartment,
                'user_id' => $apartment->user_id,
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Catch the exception for no results and return a custom error message
            return response()->json(['error' => 'Apartment not found'], 404);
        }
    }
}
