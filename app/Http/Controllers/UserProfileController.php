<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\AuthController;


class UserProfileController extends Controller
{
    public function showUserProfile()
    {
        try {
            // Find the user by the given ID with eager loading the user's profile
            // $user = User::with('profile')->findOrFail($id);
            // $userId = 1;
            // $user = User::with('profile')->where('user_id', $userId)->first();
            $user = auth()->user();
            // $id = 1;
            // $user = User::with('profile')->findOrFail($id);
            // $user =  $users->profile;


            if (!$user->profile) {
                return response()->json(['message' => 'User profile not found.'], 404);
            }

            $response = [
                'message' => 'User profile fetched successfully',
                'user' => [
                    'user_id' => $user->id,
                    'profile' => $user->profile,
                ],
            ];

            return response()->json($response, 200);
        } catch (\Exception $e) {
            $response = [
                'message' => 'An error occurred while retrieving the profile.' . $e->getMessage(),
            ];

            // Log the error for debugging
            Log::error('Error retrieving profile: ' . $e->getMessage());

            return response()->json($response, 500);
        }
    }
}
