<?php

namespace App\Http\Controllers;

use App\Http\Resources\PutovanjeResurs;
use App\Models\Putovanje;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PutovanjeController extends OdgovorController
{
    public function index()
    {
        $putovanja = Putovanje::all();
        return $this->uspesanOdgovor(PutovanjeResurs::collection($putovanja));
    }

    public function show($id)
    {
        $putovanje = Putovanje::find($id);
        if ($putovanje) {
            return $this->uspesanOdgovor(new PutovanjeResurs($putovanje));
        } else {
            return $this->neuspesanOdgovor([], 'Putovanje nije pronadjeno');
        }
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'nazivPutovanja' => 'required|string|max:255',
            'drzava_id' => 'required|integer',
            'opisPutovanja' => 'required|string',
            'datumPolaska' => 'required|date',
            'datumPovratka' => 'required|date',
            'user_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return $this->neuspesanOdgovor($validator->errors()->toArray(), 'Putovanje nije sacuvano, nevalidni podaci');
        }

        $putovanje = new Putovanje();
        $putovanje->nazivPutovanja = $request->nazivPutovanja;
        $putovanje->drzava_id = $request->drzava_id;
        $putovanje->opisPutovanja = $request->opisPutovanja;
        $putovanje->datumPolaska = $request->datumPolaska;
        $putovanje->datumPovratka = $request->datumPovratka;
        $putovanje->user_id = $request->user_id;
        $putovanje->save();

        return $this->uspesanOdgovor(new PutovanjeResurs($putovanje), 'Putovanje uspesno kreirano');
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nazivPutovanja' => 'required|string|max:255',
            'opisPutovanja' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->neuspesanOdgovor($validator->errors()->toArray(), 'Putovanje nije sacuvano, nevalidni podaci');
        }

        $putovanje = Putovanje::find($id);

        if ($putovanje) {
            $putovanje->nazivPutovanja = $request->nazivPutovanja;
            $putovanje->opisPutovanja = $request->opisPutovanja;
            $putovanje->save();

            return $this->uspesanOdgovor(new PutovanjeResurs($putovanje), 'Putovanje uspesno izmenjeno');
        }
        return $this->neuspesanOdgovor([], 'Putovanje nije pronadjeno');
    }

    public function destroy($id)
    {
        $putovanje = Putovanje::find($id);
        if ($putovanje) {
            $putovanje->delete();
            return $this->uspesanOdgovor([], 'Putovanje uspesno obrisano');
        }
        return $this->neuspesanOdgovor([], 'Putovanje nije pronadjeno');
    }

    public function pronadjiPoDrzavi(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        $putovanja = Putovanje::where('drzava_id', $id)->get();

        return $this->uspesanOdgovor(PutovanjeResurs::collection($putovanja), 'Putovanja pronadjena');
    }

    public function pronadjiPoKorisniku(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        $putovanja = Putovanje::where('user_id', $id)->get();

        return $this->uspesanOdgovor(PutovanjeResurs::collection($putovanja), 'Putovanja pronadjena');
    }

    public function paginacija(Request $request): \Illuminate\Http\JsonResponse
    {
        $poStrani = $request->per_page ?? 3;
        $putovanja = DB::table('putovanja')->join('drzave', 'putovanja.drzava_id', '=', 'drzave.id')
            ->join('users', 'putovanja.user_id', '=', 'users.id')
            ->select('putovanja.*', 'drzave.nazivDrzave', 'users.name')
            ->paginate($poStrani);

        return $this->uspesanOdgovor($putovanja, 'Putovanja pronadjena');
    }
}
