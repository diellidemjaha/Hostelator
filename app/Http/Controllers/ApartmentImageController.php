<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ApartmentImage;

class ApartmentImageController extends Controller
{
    // Store apartment images
    public function storeApartmentImages(Request $request)
    {
        $request->validate([
            'apartment_id' => 'required',
            'image1' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image2' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image3' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image4' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $apartmentImages = [];

        for ($i = 1; $i <= 4; $i++) {
            $imageKey = "image{$i}";

            if ($request->hasFile($imageKey)) {
                $image = $request->file($imageKey);
                $imageName = time() . "_{$i}." . $image->getClientOriginalExtension();
                $image->move(public_path('/apartment_images'), $imageName);

                $apartmentImage = new ApartmentImage();
                $apartmentImage->apartment_id = $request->input('apartment_id');
                $apartmentImage->image_path = $imageName;
                $apartmentImage->save();

                $apartmentImages[] = $apartmentImage;
            }
        }

        return response()->json(['message' => 'Apartment images saved', 'apartment_images' => $apartmentImages]);
    }
}
