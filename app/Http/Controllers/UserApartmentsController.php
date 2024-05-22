<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Apartment;

class UserApartmentsController extends Controller
{
    public function ApartmentsById($user_id)
    {
        $apartments = Apartment::where('user_id', $user_id)->get();

        return response()->json(['apartments' => $apartments]);
    }
}
