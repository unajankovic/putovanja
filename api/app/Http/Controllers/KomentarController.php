<?php

namespace App\Http\Controllers;
use App\Http\Resources\KomentarResurs;
use App\Models\Komentar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KomentarController extends OdgovorController
{
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        $komentari = Komentar::all();
        return $this->uspesanOdgovor(KomentarResurs::collection($komentari), 'Svi komentari uspesno vraceni');
    }

    public function pronadjiPoPutovanju(Request $request, $putovanje_id): \Illuminate\Http\JsonResponse
    {
        $komentari = Komentar::where('putovanje_id', $putovanje_id)->get();
        return $this->uspesanOdgovor(KomentarResurs::collection($komentari), 'Komentari za putovanje uspesno vraceni');
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'tekst' => 'required|string|max:255',
            'datumKomentara' => 'required|date',
            'putovanje_id' => 'required|integer',
            'user_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return $this->neuspesanOdgovor($validator->errors()->toArray(), 'Komentar nije sacuvan, nevalidni podaci');
        }

        $komentar = new Komentar();
        $komentar->tekst = $request->tekst;
        $komentar->datumKomentara = $request->datumKomentara;
        $komentar->putovanje_id = $request->putovanje_id;
        $komentar->user_id = $request->user_id;
        $komentar->save();

        return $this->uspesanOdgovor(new KomentarResurs($komentar), 'Komentar uspesno kreiran');
    }
}
