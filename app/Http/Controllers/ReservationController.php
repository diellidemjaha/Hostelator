<?php // app/Http/Controllers/ReservationController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\Apartment;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    // ...

   
    public function store(Request $request)
{
    // Validate the request data
    $request->validate([
        'name' => 'required|string',
        'number' => 'required|string',
        'apartment_id' => 'required|integer',
        'date_in' => 'required|date',
        'date_out' => 'required|date',
        'status' => 'required|integer',
        'price' => 'required|numeric',
    ]);

    // Fetch the apartment to get the owner_id
    $apartment = Apartment::findOrFail($request->input('apartment_id'));

    // Create a new reservation with the correct owner_id
    Reservation::create([
        'user_id' => Auth::id(),
        'owner_id' => $apartment->user_id,
        'apartment_id' => $request->input('apartment_id'),
        'name' => $request->input('name'),
        'number' => $request->input('number'),
        'date_in' => $request->input('date_in'),
        'date_out' => $request->input('date_out'),
        'status' => $request->input('status'),
        'price' => $request->input('price'),
    ]);

    // Return a JSON response
    return response()->json(['message' => 'Reservation created successfully']);
}


    public function getUserReservations($user_id)
    {
        // Display reservations based on user_id
        $reservations = Reservation::where('user_id', $user_id)->get();

        return response()->json(['reservations' => $reservations]);
    }
    public function editReservation($id, Request $request)
    {
        // Ensure the authenticated user owns the reservation
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    
        // Validate the request data
        $request->validate([
            'status' => 'required|integer',
        ]);
    
        // Update the reservation status based on apartment_id and user_id
        Reservation::where('id', $id)
            // ->where('user_id', $user->id)
            ->update(['status' => $request->status]);
    
        // Return a JSON response
        return response()->json(['message' => 'Reservation status updated successfully', 'req' => $request->status]);
    }
    // public function getOwnerReservations($owner)
    // {
    //     // Ensure the user is authenticated
    //     $user = Auth::user();
    //     if (!$user) {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }

    //     // Fetch reservations for apartments owned by the specified owner
    //     $ownerReservations = Reservation::where('owner_id', $owner)->get();

    //     // Return a JSON response with the reservations
    //     return response()->json(['ownerReservations' => $ownerReservations]);
    // }
    public function getOwnerReservations($owner)
{
    // Fetch reservations for apartments owned by the specified owner
    $ownerReservations = Reservation::whereHas('apartment', function ($query) use ($owner) {
        $query->where('user_id', $owner);
    })->get();

    // Return a JSON response with the reservations
    return response()->json(['ownerReservations' => $ownerReservations]);
}
}
