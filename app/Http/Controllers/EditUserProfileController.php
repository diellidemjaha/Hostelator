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
            $id = $request->input('id');
            $currentProfile = EditUserProfile::find($id);

            if (!$currentProfile) {
                $student = new EditUserProfile;
                $student->user_id = Auth::id();
                $student->full_name = $request->input('full_name');
                $student->address = $request->input('address');
                $user_id = $student->user_id;
            } else {
                $currentProfile->address = $request->input('address');
                $currentProfile->full_name = $request->input('full_name');
                $currentProfile->profession = $request->input('profession');
                $currentProfile->website_link = $request->input('website_link');
                $currentProfile->twitter_link = $request->input('twitter_link');
                $currentProfile->instagram_link = $request->input('instagram_link');
                $currentProfile->facebook_link = $request->input('facebook_link');
                $user_id = $currentProfile->user_id;
            }

            if ($request->hasFile('profile_pic')) {
                if ($currentProfile && $currentProfile->profile_pic_path) {
                    Storage::delete('/profile_pics/' . $currentProfile->profile_pic_path);
                }

                $imageName = $id . '_' . now()->format('YmdHis') . '.' . $request->file('profile_pic')->extension();
                $request->file('profile_pic')->move(public_path('/profile_pics'), $imageName);

                if (!$currentProfile) {
                    $student->profile_pic_path = $imageName;
                } else {
                    $currentProfile->profile_pic_path = $imageName;
                }
            }

            if (!$currentProfile) {
                $student->save();
                // $user_id = $student->user_id;
            } 
            // else {
            //     $currentProfile->update();
            //     $user_id = $currentProfile->user_id;
            // }

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