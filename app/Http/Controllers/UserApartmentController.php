<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Apartment;

class UserApartmentController extends Controller
{
    public function ApartmentById($user_id, $apartment_id)
    {
        // Retrieve the apartment owned by the user with the given user_id and apartment_id
        $apartment = Apartment::where('user_id', $user_id)
            ->where('id', $apartment_id)
            ->first();

        if (!$apartment) {
            return response()->json(['error' => 'Apartment not found'], 404);
        }

        return response()->json(['apartment' => $apartment]);
    }
}
