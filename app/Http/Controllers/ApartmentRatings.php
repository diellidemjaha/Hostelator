<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Apartment;
use App\Models\Rating;
use Illuminate\Support\Facades\Auth;

class ApartmentRatings extends Controller
{
    public function store(Request $request)
    {

        $user = Auth::user();

        $rating = new Rating([
            'apartment_id' => $request->input('apartment_id'),
            'user_id' => $user->id,
            'rating' => $request->input('rating'), 
        ]);

        $rating->save();

        $apartment = $rating->apartment;
        $apartment->updateOverallRating();

        return response()->json(['message' => 'Rating added successfully']);
    }
    // public function getRatings($id)
    // {
    //     try {
    //         $apartment = Apartment::findOrFail($id);
    //         $ratings = $apartment->ratings;

    //         return response()->json(['ratings' => $ratings], 200);
    //     } catch (\Exception $e) {
    //         // Handle the exception, return an error response, or log the error
    //         return response()->json(['error' => 'Failed to fetch ratings.'], 500);
    //     }
    // }
    public function getRatings($id)
{
    try {
        $apartment = Apartment::findOrFail($id);
        $ratings = $apartment->ratings;

        if ($ratings->isEmpty()) {
            return response()->json(['error' => 'No ratings available.'], 404);
        }

        $totalRatings = count($ratings);
        $sumRatings = 0;

        foreach ($ratings as $rating) {
            $sumRatings += $rating->rating;
        }

        $averageRating = $sumRatings / $totalRatings;

        return response()->json(['average_rating' => number_format($averageRating, 2)], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to fetch ratings.'], 500);
    }
}

}
