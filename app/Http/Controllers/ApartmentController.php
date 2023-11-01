<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Apartment;

class ApartmentController extends Controller
{
    public function indexApartments(Request $request)
    {
        // Get the authenticated user's apartments
        $apartments = Apartment::where('user_id', auth()->id())->get();

        return response()->json(['apartments' => $apartments]);
    }

    public function createApartment()
    {
        // Return any necessary data for creating a new apartment
        return response()->json(['message' => 'Create a new apartment']);
    }

    public function storeApartment(Request $request)
    {
        $data = $request->all();
        $data['user_id'] = auth()->id(); // Set the user_id
        $apartment = Apartment::create($data);
        return response()->json(['message' => 'Apartment created', 'apartment' => $apartment]);
    }

    public function editApartment(Apartment $apartment)
    {
        // Check if the authenticated user owns the apartment
        if ($apartment->user_id != auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json(['apartment' => $apartment]);
    }

    public function updateApartment(Request $request, Apartment $apartment)
    {
        // Check if the authenticated user owns the apartment
        if ($apartment->user_id != auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Validate and update the apartment data
        $data = $request->validate([
            // Validation rules here
        ]);

        $apartment->update($data);

        return response()->json(['message' => 'Apartment updated', 'apartment' => $apartment]);
    }

    public function destroyApartment(Apartment $apartment)
    {
        // Check if the authenticated user owns the apartment
        if ($apartment->user_id != auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $apartment->delete();

        return response()->json(['message' => 'Apartment deleted']);
    }
}
