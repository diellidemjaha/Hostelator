<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum', ['except' => ['login', 'register', 'registerPost', 'loginPost', 'getApartmentsWithImageThumbnails', 'logout']]);
    }
    public function register()
    {
        return view('app');
    }

    public function index()
    {
        return view('app');
    }

    public function registerPost(Request $request)
    {

        echo ($request);
        $user = new User();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();

        $token = $user->createToken('myAppToken')->plainTextToken;

        $response = [
            'message' => 'User successfully registered',
            'user' => $user,
            'token' => $token,
        ];

        return response($response, 201);
    }

    public function login()
    {
        return view('app');
    }

    public function loginPost(Request $request)
    {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $userId = Auth::id();

            $token = $user->createToken('myAppToken')->plainTextToken;

            $response = [
                'message' => 'User successfully logged in',
                'user' => $user,
                'user_id' => $user->id,
                'token' => $token,
                'user_id' => $userId,
            ];
    
            return response($response, 201);
        }

        return response()->json(['error' => 'Email or Password incorrect'], 400);
    }

    public function logout()
    {
        if (auth()->check()) {
            auth()->user()->tokens->each(function ($token, $key) {
                $token->delete();
            });
    
            return response()->json([
                'message' => 'User successfully logged out',
            ], 200);
        } else {
            return response()->json([
                'message' => 'User is not authenticated',
            ], 401); 
        }
    }
}
