<?php

namespace App\Http\Controllers;

class OdgovorController extends Controller
{

    public function uspesanOdgovor($data, string $poruka = ''): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'podaci' => $data,
            'poruka' => $poruka,
            'uspesno' => true
        ]);
    }

    public function neuspesanOdgovor(array $greske = [], string $poruka = ''): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'greske' => $greske,
            'poruka' => $poruka,
            'uspesno' => false
        ]);
    }
}
