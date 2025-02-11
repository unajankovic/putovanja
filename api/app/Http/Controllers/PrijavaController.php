<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResurs;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PrijavaController extends OdgovorController
{
    public function prijava(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->neuspesanOdgovor($validator->errors()->toArray(), 'Nevalidni podaci');
        }

        $podaci = $request->only('email', 'password');

        if (!auth()->attempt($podaci)) {
            return $this->neuspesanOdgovor([], 'Pogrešan email ili lozinka');
        }

        $korisnik = auth()->user();

        $token = $korisnik->createToken('token')->plainTextToken;

        return $this->uspesanOdgovor(['token' => $token, 'korisnik' => new UserResurs($korisnik)], 'Uspesno ste se prijavili');
    }

    public function odjava(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->user()->tokens()->delete();
        return $this->uspesanOdgovor([], 'Uspesno ste se odjavili');
    }

    public function registracija(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->neuspesanOdgovor($validator->errors()->toArray(), 'Nevalidni podaci');
        }

        $podaci = $request->only('name', 'email', 'password');
        $podaci['password'] = bcrypt($podaci['password']);

        $korisnik = User::create($podaci);

        return $this->uspesanOdgovor(['korisnik' => new UserResurs($korisnik)], 'Uspesno ste se registrovali');
    }
}
