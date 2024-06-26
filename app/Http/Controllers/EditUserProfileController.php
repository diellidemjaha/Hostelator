<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\EditUserProfile;
use Illuminate\Support\Facades\Storage; 
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Profiler\Profile;
use App\Http\Controllers\AuthController;


class EditUserProfileController extends Controller
{
    public function editUserProfile(Request $request)
    {
        try {
            $user_id = Auth::id();
    
            // Check if a profile record exists for the current user
            $currentProfile = EditUserProfile::where('user_id', $user_id)->first();
    
            // Update existing profile or create a new one
            if (!$currentProfile) {
                $currentProfile = new EditUserProfile;
                $currentProfile->user_id = $user_id;
            }
    
            // Update profile fields
            $currentProfile->full_name = $request->input('full_name');
            $currentProfile->address = $request->input('address');
            $currentProfile->profession = $request->input('profession');
            $currentProfile->website_link = $request->input('website_link');
            $currentProfile->twitter_link = $request->input('twitter_link');
            $currentProfile->instagram_link = $request->input('instagram_link');
            $currentProfile->facebook_link = $request->input('facebook_link');
    
            // Handle profile picture upload
            if ($request->hasFile('profile_pic')) {
                // Delete old profile picture if exists
                if ($currentProfile->profile_pic_path) {
                    Storage::delete('/profile_pics/' . $currentProfile->profile_pic_path);
                }
    
                // Save new profile picture
                $imageName = $user_id . '_' . now()->format('YmdHis') . '.' . $request->file('profile_pic')->extension();
                $request->file('profile_pic')->move(public_path('/profile_pics'), $imageName);
                $currentProfile->profile_pic_path = $imageName;
            }
    
            // Save the updated or new profile
            $currentProfile->save();
    
            $response = [
                'message' => 'User info and profile picture successfully updated',
                'user_id' => $user_id,
            ];
    
            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while processing the request.'], 500);
        }
    }
    
}
