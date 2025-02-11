<?php

namespace App\Http\Controllers;

use App\Models\Slika;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SlikaController extends OdgovorController
{
    public function pronadjiPoPutovanju(Request $request, $putovanjeId): \Illuminate\Http\JsonResponse
    {
        $slike = Slika::where('putovanje_id', $putovanjeId)->get();
        return $this->uspesanOdgovor($slike, 'Slike za putovanje uspesno vracene');
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'putovanje_id' => 'required|integer',
            'slikaFajl' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return $this->neuspesanOdgovor($validator->errors()->toArray(), 'Slika nije sacuvana, nevalidni podaci');
        }

        $slika = $request->file('slikaFajl');
        $slikaIme = time() . '.' . $slika->getClientOriginalExtension();
        $slika->move(public_path('images'), $slikaIme);
        $imageUrl = url('images/' . $slikaIme);

        $slikaObjekat = Slika::create([
            'putovanje_id' => $request->putovanje_id,
            'url' => $imageUrl
        ]);


        return $this->uspesanOdgovor($slikaObjekat, 'Slika uspesno sacuvana');
    }
}
