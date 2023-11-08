<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Apartment;
use App\Models\ApartmentImage;
class ApartmentController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $apartments = Apartment::all();
        return view('apartments.index', compact('apartments'));
    }

    // Show the form for creating a new resource.
    public function create()
    {
        return view('apartments.create');
    }

    // Store a newly created resource in storage.
    public function storeApartment(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required',
            'title' => 'required',
            'description' => 'required',
            'price' => 'required',
            'address' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
            'parking' => 'required',
            'wi_fi' => 'required',
            'breakfast_included' => 'required',
        ]);
    
        // Create the apartment with the provided data
        $apartment = Apartment::create($data);
    
        $apartmentImages = [];
    
        for ($i = 1; $i <= 4; $i++) {
            $imageKey = "image{$i}";
    
            if ($request->hasFile($imageKey)) {
                $image = $request->file($imageKey);
                $imageName = time() . "_{$i}." . $image->getClientOriginalExtension();

                $directory = '/apartment_images';
                $imagePath = $directory . '/' . $imageName;
                
                $image->move(public_path('/apartment_images'), $imageName);
    
                $apartmentImage = new ApartmentImage();
                $apartmentImage->apartment_id = $apartment->id; // Use the newly created apartment's ID
                $apartmentImage->image_path = $imagePath;
                $apartmentImage->save();
                
                $apartmentImages[] = $apartmentImage;
            }
        }
    
        return response()->json([
            'message' => 'Apartment and Images Saved',
            'apartment' => $apartment,
            'images' => $apartmentImages,
        ]);
    }
    

    // Display the specified resource.
    public function show(Apartment $apartment)
    {
        return view('apartments.show', compact('apartment'));
    }

    // Show the form for editing the specified resource.
    public function edit(Apartment $apartment)
    {
        return view('apartments.edit', compact('apartment'));
    }

    // Update the specified resource in storage.
    public function update(Request $request, Apartment $apartment)
    {
        $data = $request->validate([
            'user_id' => 'required',
            'title' => 'required',
            'description' => 'required',
            'price' => 'required',
            'address' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
            'parking' => 'required',
            'wi_fi' => 'required',
            'breakfast_included' => 'required',
            // 'apartment_picture_paths' => 'required|array',
            // 'available_dates' => 'required|array',
        ]);

        $apartment->update($data);

        return response()->json(['message' => 'Apartment Saved', 'apartment' => $apartment]);
    }

    // Remove the specified resource from storage.
    public function destroy(Apartment $apartment)
    {
        $apartment->delete();
        return redirect()->route('apartments.index');
    }
}
