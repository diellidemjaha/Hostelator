<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\EditUserProfile;
use Illuminate\Support\Facades\Storage; // Import Storage facade for file operations
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Profiler\Profile;
// use Intervention\Image\Facades\Image as Image;

class EditUserProfileController extends Controller
{

    public function showUserProfile($id)
    {
        try {
            // Find the user by the given ID
            $user = User::findOrFail($id);

            // Retrieve the user's profile from the EditUserProfile model
            $userProfile = EditUserProfile::where('user_id', $user->id)->first();

            if (!$userProfile) {
                return response()->json(['message' => 'User profile not found.'], 404);
            }

            // Build the response
            $response = [
                'user_id' => $user->id,
                'user' => $userProfile,
            ];

            return response()->json($response, 200);
        } catch (\Exception $e) {
            $response = [
                'message' => 'An error occurred while retrieving the profile.' . $e->getMessage(),
            ];

            // Handle exceptions and log errors
            Log::error('Error retrieving profile: ' . $e->getMessage());
            return response()->json($response, 500);
        }
    }

    public function editUserProfile(Request $request)
    {
        try {
            // Find the user by the given ID
            // $user = User::findOrFail($id);
            $id = $request->input('id');;
            $currentProfile = EditUserProfile::find($id);
       
            $currentProfile->address = $request->input('address');
            $currentProfile->full_name = $request->input('full_name');
            $currentProfile->profession = $request->input('profession');
            $currentProfile->website_link = $request->input('website_link');
            $currentProfile->twitter_link = $request->input('twitter_link');
            $currentProfile->instagram_link = $request->input('instagram_link');
            $currentProfile->facebook_link = $request->input('facebook_link');
          

            // Handle profile picture update
            if ($request->hasFile('profile_pic')) {

                // Delete the previous profile picture if it exists
                if ($currentProfile->profile_pic_path) {
                    Storage::delete('profile_pics/' . $currentProfile->profile_pic_path);
                }

                // Store the new profile picture
                $imageName = 'profile_pics/' . $id . '_' . now()->format('YmdHis') . '.' . $request->file('profile_pic')->extension();
                $request->file('profile_pic')->storeAs('public', $imageName);
                // Update the profile picture path in the database
                $currentProfile->profile_pic_path = $imageName;
            }

            // Save the user profile
            $currentProfile->update();

            // Build the response
            $response = [
                'message' => 'User info and profile picture successfully updated'
            ];

            return response()->json($response, 200);
        } catch (\Exception $e) {
           
            $e->getMessage();
        }
    }
}
