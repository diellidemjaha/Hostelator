<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
// use App\Models\EditUserProfile;
use App\Http\Controllers\EditUserProfileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/registerUser', [AuthController::class, 'registerPost']);
Route::post('/login', [AuthController::class, 'loginPost']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Route::put('/update-profile', [EditUserProfileController::class, 'updateUserProfile']);
Route::post('/update-profile/{id}', [EditUserProfileController::class, 'editUserProfile']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
