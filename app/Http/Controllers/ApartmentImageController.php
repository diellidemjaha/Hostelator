<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\ApartmentImage;

class ApartmentImageController extends Controller
{
    public function getImagePaths($apartmentId)
    {
        $imagePaths = ApartmentImage::where('apartment_id', $apartmentId)
            ->pluck('image_path')
            ->all();

        return response()->json(['images' => $imagePaths]);
    }
}
