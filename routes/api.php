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
// use App\Http\Controllers\ApartmentRatings;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ApartmentRatings;

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


// Public routes

// ...

// Authenticated routes
Route::middleware(['auth:sanctum'])->group(function () {
    // Single reservation post/store
    Route::post('/reservations', [ReservationController::class, 'store']);

    // Display reservations based on user_id
    Route::get('/reservations/user/{user_id}', [ReservationController::class, 'getUserReservations']);
    Route::get('/reservations/owner/{owner}', [ReservationController::class, 'getOwnerReservations']);

      // Edit reservation status
      Route::put('/reservations/{id}', [ReservationController::class, 'editReservation']);
});


// Example routes for ApartmentImageController
// Route::post('/apartment_images', [ApartmentImageController::class, 'storeApartmentImages']);
Route::get('/apartment_images/{id}', [ApartmentImageController::class, 'getImagePaths']);


// Route::get('/user-apartments/{user_id}/{apartment_id}', [UserApartmentController::class, 'ApartmentById']);


Route::get('/user-apartmentss/{user_id}', [UserApartmentsController::class, 'ApartmentsById']);
Route::get('/user-apartments/{apartment_id}', [UserApartmentController::class, 'ApartmentById']);

Route::post('/registerUser', [AuthController::class, 'registerPost']);
Route::post('/login', [AuthController::class, 'loginPost']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Route::put('/update-profile', [EditUserProfileController::class, 'updateUserProfile']);
Route::post('/update-profile/{id}', [EditUserProfileController::class, 'editUserProfile']);
Route::get('/profile', [UserProfileController::class, 'showUserProfile']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/apartments', [ApartmentController::class, 'storeApartment']);

    Route::get('/apartments/{user_id}', [ApartmentController::class, 'getUserApartmentsWithThumbnails']);

    Route::get('/apartments/{user_id}/{apartment_id}/image', [ApartmentImageController::class, 'getImageByUserId']);

    Route::post('/apartments/ratings', [ApartmentRatings::class, 'store']);
    Route::get('/apartments/{id}/ratings', [ApartmentRatings::class, 'getRatings']);
    // Route::post('/apartments', [AuthController::class, 'storeApartment'])->middleware('api');
    // Route::post('/apartments', [ApartmentController::class, 'storeApartment'])->middleware('web');
    Route::get('/apartments/index', [ApartmentController::class, 'getApartments']);
    Route::put('/update/apartments/{id}', [ApartmentController::class, 'updateApartment']);
    Route::delete('/delete/apartments/{apartment}', [ApartmentController::class, 'destroyApartment']);
    // Route::delete('/delete/apartments/images/{id}', [ApartmentController::class, 'destroyApartmentImages']);
    Route::delete('/delete/apartment-image/{id}', [ApartmentController::class, 'destroyApartmentImages']);
    Route::post('/update/apartment-image/{id}', [ApartmentController::class, 'updateApartmentImages']);
    Route::get('/single-apartment/{apartmentId}', [ApartmentController::class, 'getApartmentById']);
});

Route::get('/user-names', [UserController::class, 'getAllUserNames']);
Route::get('/apartments-with-thumbnails', [ApartmentController::class, 'getApartmentsWithImageThumbnails']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
