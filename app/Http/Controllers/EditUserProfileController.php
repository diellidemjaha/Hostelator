<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\EditUserProfile;
use Illuminate\Support\Facades\Storage; // Import Storage facade for file operations
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Profiler\Profile;
use App\Http\Controllers\AuthController;

// use Intervention\Image\Facades\Image as Image;

class EditUserProfileController extends Controller
{

    public function editUserProfile(Request $request)
    {
        try {
            // Find the user by the given ID
            // $user = User::findOrFail($id);
            $id = $request->input('id');
            // $currentProfile = EditUserProfile::find($id);
            // $currentProfile = EditUserProfile::find(['id' => $id]);
            // $hasData  = EditUserProfile::has($id);
            // if ($hasData) {
            // $currentProfile = EditUserProfile::find($id);
            $currentProfile = EditUserProfile::find($id);

            if (!$currentProfile) {
                $student = new EditUserProfile;
                $student->user_id = Auth::id();
                $student->full_name = $request->input('full_name');
                $student->address = $request->input('address');
                if ($request->hasFile('profile_pic')) {
                    // Store the new profile picture
                    $imageName = 'profile_pics/' . $id . '_' . now()->format('YmdHis') . '.' . $request->file('profile_pic')->extension();
                    $request->file('profile_pic')->storeAs('public', $imageName);
                    // Update the profile picture path in the database
                    $student->profile_pic_path = $imageName;
                }
                $student->save();
            } else {

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
                $currentProfile->update();
            }
            // Save the user profile


            // Build the response
            $response = [
                'message' => 'User info and profile picture successfully updated',
                'user_id' => $currentProfile->user_id,
            ];

            return response()->json($response, 200);
        } catch (\Exception $e) {

            $e->getMessage();
        }
    }
}
