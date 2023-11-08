<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApartmentController as ApiController;
use App\Http\Controllers\UserApartmentController;
use App\Http\Controllers\UserApartmentsController;
use App\Http\Controllers\ApartmentImageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/{any}', function () {
    return view('app'); // This is your main React app view
})->where('any', '.*');

Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('apartment_images', [ApartmentImageController::class, 'getImagePaths']);

    Route::get('/', [AuthController::class, 'index'])->name('dashboard.index');
    Route::post('/apartments', [ApiController::class, 'storeApartment']);
    Route::get('/apartments/index', [ApiController::class, 'indexApartments']);
    Route::put('/apartments/{id}', [ApiController::class, 'editApartment']);
    Route::delete('/apartments/{id}', [ApiController::class, 'destroyApartment']);

    Route::get('/user-apartments/{user_id}/{apartment_id}', [UserApartmentController::class, 'ApartmentById']);

    Route::get('/user-apartments/{user_id}', [UserApartmentsController::class, 'ApartmentsById']);

    Route::get('/apartment_images', [ApartmentImageController::class, 'getApartment']);
});

Route::get('/register', [AuthController::class, 'register'])->name('register');
Route::post('/registerUser', [AuthController::class, 'registerPost']);
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/loginUser', [AuthController::class, 'loginPost']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/singleApartment', [ApiController::class, 'singleApartment']);
