<?php
use App\Http\Controllers\ApartmentController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
// use App\Models\EditUserProfile;
use App\Http\Controllers\EditUserProfileController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\UserApartmentsController;
use App\Http\Controllers\UserApartmentController;
use App\Http\Controllers\ApartmentImageController;

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


// Example routes for ApartmentImageController
// Route::post('/apartment_images', [ApartmentImageController::class, 'storeApartmentImages']);
Route::get('/apartment_images/{user_id}/{id}', [ApartmentImageController::class, 'getImagePaths']);


Route::get('/user-apartments/{user_id}/{apartment_id}', [UserApartmentController::class, 'ApartmentById']);

Route::get('/user-apartments/{user_id}', [UserApartmentsController::class, 'ApartmentsById']);


Route::post('/registerUser', [AuthController::class, 'registerPost']);
Route::post('/login', [AuthController::class, 'loginPost']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Route::put('/update-profile', [EditUserProfileController::class, 'updateUserProfile']);
Route::post('/update-profile/{id}', [EditUserProfileController::class, 'editUserProfile']);
Route::get('/profile', [UserProfileController::class, 'showUserProfile']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/apartments', [ApartmentController::class, 'storeApartment']);
    // Route::post('/apartments', [AuthController::class, 'storeApartment'])->middleware('api');
    // Route::post('/apartments', [ApartmentController::class, 'storeApartment'])->middleware('web');
    Route::get('/apartments/index', [ApartmentController::class, 'indexApartments']);
    Route::put('/apartments/{id}', [ApartmentController::class, 'editApartment']);
    Route::delete('/apartments/{id}', [ApartmentController::class, 'destroyApartment']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
