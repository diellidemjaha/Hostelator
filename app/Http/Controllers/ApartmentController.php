<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Apartment;
use App\Models\ApartmentImage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


class ApartmentController extends Controller
{
    // Display a listing of the resource.
    public function getApartments()
    {
        $apartments = Apartment::all();
        // return view('apartments.index', compact('apartments'));
        return response()->json(['apartments' => $apartments]);
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
    // public function updateApartment(Request $request, $id)
    // {
    //     $apartment = Apartment::find($id);

    //     if (!$apartment) {
    //         return response()->json(['message' => 'Apartment not found'], 404);
    //     }

    //     try {

    //         $data = [
    //             'title' => $request->input('title'),
    //             'description' => $request->input('description'),
    //             'price' => $request->input('price'),
    //             'latitude' => $request->input('latitude'),
    //             'longitude' => $request->input('longitude'),
    //             'parking' => $request->input('parking'),
    //             'wi_fi' => $request->input('wi_fi'),
    //             'breakfast_included' => $request->input('breakfast_included'), ];
    //         // Validate the request data if needed
    //         // $data = $request->validate([...]);
    //         Log::info('Data received for update:', $data);
    //         // Update the apartment with the provided data
    //         $apartment->save($data);

    //         Log::info('Apartment Updated:', ['id' => $id, 'data' => $request->all()]);

    //         // Update apartment images
    //         $apartmentImages = [];

    //         for ($i = 1; $i <= 4; $i++) {
    //             $imageKey = "image{$i}";

    //             if ($request->hasFile($imageKey)) {
    //                 $image = $request->file($imageKey);
    //                 $imageName = time() . "_{$i}." . $image->getClientOriginalExtension();

    //                 $directory = '/apartment_images';
    //                 $imagePath = $directory . '/' . $imageName;

    //                 $image->move(public_path('/apartment_images'), $imageName);

    //                 $apartmentImage = new ApartmentImage();
    //                 $apartmentImage->apartment_id = $apartment->id;
    //                 $apartmentImage->image_path = $imagePath;
    //                 $apartmentImage->save();

    //                 $apartmentImages[] = $apartmentImage;
    //             }
    //         }
    //     } catch (\Exception $e) {
    //         Log::error('Update failed: ' . $e->getMessage());
    //         return response()->json(['message' => 'Update failed', 'error' => $e->getMessage()], 500);
    //     }

    //     return response()->json([
    //         'message' => 'Apartment and Images Updated',
    //         'apartment' => $apartment,
    //         'images' => $apartmentImages,
    //     ]);
    // }
    public function updateApartment(Request $request, $id)
    {
        $apartment = Apartment::find($id);

        if (!$apartment) {
            return response()->json(['message' => 'Apartment not found'], 404);
        }

        // Uncomment the line below if you have specific validation rules
        // $request->validate([...]);

        DB::beginTransaction();

        try {
            $data = [
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'latitude' => $request->input('latitude'),
                'longitude' => $request->input('longitude'),
                'parking' => $request->input('parking'),
                'wi_fi' => $request->input('wi_fi'),
                'breakfast_included' => $request->input('breakfast_included'),
            ];

            Log::info('Data received for update:', $data);

            // Validate image uploads
            $request->validate([
                'image1' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'image2' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'image3' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'image4' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // Update the apartment with the provided data
            $apartment->update($data);

            Log::info('Apartment Updated:', ['id' => $id, 'data' => $request->all()]);

            // Update apartment images
            $apartmentImages = [];

            for ($i = 1; $i <= 4; $i++) {
                $imageKey = "image{$i}";

                if ($request->hasFile($imageKey)) {
                    $image = $request->file($imageKey);
                    $imageName = time() . "_{$i}." . $image->getClientOriginalExtension();

                    $directory = '/apartment_images';
                    $imagePath = $directory . '/' . $imageName;

                    $image->move(public_path($directory), $imageName);

                    $apartmentImage = new ApartmentImage();
                    $apartmentImage->apartment_id = $apartment->id;
                    $apartmentImage->image_path = $imagePath;
                    $apartmentImage->save();

                    $apartmentImages[] = $apartmentImage;
                }
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Update failed: ' . $e->getMessage());
            return response()->json(['message' => 'Update failed', 'error' => $e->getMessage()], 500);
        }

        return response()->json([
            'message' => 'Apartment and Images Updated',
            'apartment' => $apartment,
            'images' => $apartmentImages,
        ], 200);
    }

    // Remove the specified resource from storage.
    public function destroyApartment(Apartment $apartment)
    {
        // Delete associated images first
        $apartment->images()->delete();

        // Then delete the apartment
        $apartment->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Apartment and associated images deleted successfully',
        ], 200);
    }

    public function destroyApartmentImages(ApartmentImage $id)
    {
        try {
            // No need to use ApartmentImage::find($id) as Laravel already fetches the model instance based on the route parameter

            if (!$id) {
                return response()->json(['message' => 'Apartment Image not found'], 404);
            }

            $apartmentId = $id->id;

            $id->delete();

            Log::info('Apartment Image Deleted:', ['id' => $id->id]);

            return response()->json(['message' => 'Apartment Image Deleted', 'apartment_id' => $apartmentId], 200);
        } catch (\Exception $e) {
            Log::error('Delete failed: ' . $e->getMessage());
            return response()->json(['message' => 'Delete failed', 'error' => $e->getMessage()], 500);
        }
    }

    public function getApartmentsWithImageThumbnails()
    {
        $apartments = Apartment::with('images')
            ->get();

        // Process the apartments and retrieve the first image path for each
        $apartmentsWithThumbnails = $apartments->map(function ($apartment) {
            $thumbnail = $apartment->images->first();
            return [
                'id' => $apartment->id,
                'title' => $apartment->title,
                'price' => $apartment->price,
                'description' => $apartment->description,
                'first_image_path' => $thumbnail ? $thumbnail->image_path : 'default-thumbnail.jpg',
                // Add other apartment details as needed
            ];
        });

        return response()->json($apartmentsWithThumbnails);
    }
    public function getUserApartmentsWithThumbnails($user_id)
    {
        $apartments = Apartment::where('user_id', $user_id)->get();

        $result = $apartments->map(function ($apartment) {
            $firstImage = $apartment->images->first();

            return [
                'id' => $apartment->id,
                'title' => $apartment->title,
                'price' => $apartment->price,
                'description' => $apartment->description,
                'first_image_path' => optional($firstImage)->image_path ?? 'default-thumbnail.jpg',
            ];
        });

        return response()->json($result);
    }

    public function getApartmentById($apartmentId)
    {
        $apartment = Apartment::with('images')->find($apartmentId);

        if (!$apartment) {
            return response()->json(['error' => 'Apartment not found'], 404);
        }

        $thumbnail = $apartment->images->first();

        $result = [
            'id' => $apartment->id,
            'title' => $apartment->title,
            'price' => $apartment->price,
            'description' => $apartment->description,
            'latitude' => $apartment->latitude,
            'longitude' => $apartment->longitude,
            'wi_fi' => $apartment->wi_fi,
            'parking' => $apartment->parking,
            'breakfast_included' => $apartment->breakfast_included,
            'first_image_path' => optional($thumbnail)->image_path ?? 'default-thumbnail.jpg'
        ];

        return response()->json($result);
    }
    public function updateApartmentImages(Request $request, $id)
{
    try {
        // Find the apartment
        $apartment = Apartment::find($id);

        if (!$apartment) {
            return response()->json(['message' => 'Apartment not found'], 404);
        }

        // Clear existing images for the apartment
        $apartment->images()->delete();

        // Update apartment images
        $apartmentImages = [];

        for ($i = 1; $i <= 4; $i++) {
            $imageKey = "image{$i}";

            if ($request->hasFile($imageKey)) {
                $image = $request->file($imageKey);
                $imageName = time() . "_{$i}." . $image->getClientOriginalExtension();

                $directory = '/apartment_images';
                $imagePath = $directory . '/' . $imageName;

                $image->move(public_path($directory), $imageName);

                $apartmentImage = new ApartmentImage();
                $apartmentImage->apartment_id = $apartment->id;
                $apartmentImage->image_path = $imagePath;
                $apartmentImage->save();

                $apartmentImages[] = $apartmentImage;
            }
        }

        Log::info('Apartment Images Updated:', ['apartment_id' => $id, 'images' => $apartmentImages]);

        return response()->json([
            'message' => 'Apartment Images Updated',
            'apartment_id' => $apartment->id,
            'images' => $apartmentImages,
        ], 200);
    } catch (\Exception $e) {
        Log::error('Update failed: ' . $e->getMessage());
        return response()->json(['message' => 'Update failed', 'error' => $e->getMessage()], 500);
    }
}
}
