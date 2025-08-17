<?php

namespace App\Http\Controllers;

use App\Http\Resources\DrzavaResurs;
use App\Models\Drzava;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class DrzavaController extends OdgovorController
{
    public function index()
    {
        $drzave = Drzava::all();
        return $this->uspesanOdgovor(DrzavaResurs::collection($drzave), 'Sve drzave uspesno vracene');
    }

    public function show($id)
    {
        $drzava = Drzava::find($id);
        if ($drzava) {
            return $this->uspesanOdgovor(new DrzavaResurs($drzava), 'Drzava uspesno vracena');
        } else {
            return $this->neuspesanOdgovor([], 'Drzava nije pronadjena');
        }
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'nazivDrzave' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return $this->neuspesanOdgovor($validator->errors()->toArray(), 'Drzava nije sacuvana, nevalidni podaci');
        }

        $drzava = Drzava::create([
            'nazivDrzave' => $request->nazivDrzave
        ]);

        return $this->uspesanOdgovor(new DrzavaResurs($drzava), 'Drzava uspesno sacuvana');
    }

    public function update(Request $request, $id)
    {
        $drzava = Drzava::find($id);
        if ($drzava) {
            $validator = Validator::make($request->all(), [
                'nazivDrzave' => 'required|string|max:255'
            ]);

            if ($validator->fails()) {
                return $this->neuspesanOdgovor($validator->errors()->toArray(), 'Drzava nije azurirana, nevalidni podaci');
            }

            $drzava->update([
                'nazivDrzave' => $request->nazivDrzave
            ]);

            return $this->uspesanOdgovor(new DrzavaResurs($drzava), 'Drzava uspesno azurirana');
        } else {
            return $this->neuspesanOdgovor([], 'Drzava nije pronadjena');
        }
    }

    public function destroy($id)
    {
        $drzava = Drzava::find($id);
        if ($drzava) {
            $drzava->delete();
            return $this->uspesanOdgovor([], 'Drzava uspesno obrisana');
        } else {
            return $this->neuspesanOdgovor([], 'Drzava nije pronadjena');
        }
    }

    public function putovanjaPoDrzavi()
    {
        $podaci = DB::table('putovanja')
            ->join('drzave', 'putovanja.drzava_id', '=', 'drzave.id')
            ->select('drzave.nazivDrzave', DB::raw('COUNT(putovanja.id) as brojPutovanja'))
            ->groupBy('drzave.nazivDrzave')
            ->get();

        return $this->uspesanOdgovor($podaci, 'Broj putovanja po drzavama uspesno vracen');
    }
}