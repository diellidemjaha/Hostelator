<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\ApartmentImage;
use App\Models\Apartment;

class ApartmentImageController extends Controller
{
    // public function getImagePaths($apartmentId)
    // {
    //     $imagePaths = ApartmentImage::where('apartment_id', $apartmentId)
    //         ->pluck('image_path')
    //         ->all();

    //     return response()->json([
    //         'images' => $imagePaths
    //     ]);
    // }
    public function getImagePaths($id)
{
    $imageData = ApartmentImage::where('apartment_id', $id)
        ->select('id', 'image_path') // Include the 'id' field in the query
        ->get();

    // Create an array of objects with 'imagePath' and 'id'
    $images = $imageData->map(function ($item) {
        return [
            'id' => $item->id,
            'imagePath' => $item->image_path,
        ];
    });

    return response()->json([
        'images' => $images,
    ]);
}
    public function getImageByUserId($user_id, $apartment_id)
    {
        $apartment = Apartment::where('user_id', $user_id)
            ->where('id', $apartment_id)
            ->first();

        if (!$apartment) {
            return response()->json(['message' => 'Apartment not found'], 404);
        }

        $image = ApartmentImage::where('apartment_id', $apartment->id)
            ->first();

        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        return response()->json([
            'image_path' => $image->image_path
        ]);
    }
}
