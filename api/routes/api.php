<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::resource('/drzave', \App\Http\Controllers\DrzavaController::class);
Route::post('/prijava', [\App\Http\Controllers\PrijavaController::class, 'prijava']);
Route::post('/registracija', [\App\Http\Controllers\PrijavaController::class, 'registracija']);
Route::get('/putovanja', [\App\Http\Controllers\PutovanjeController::class, 'index']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/odjava', [\App\Http\Controllers\PrijavaController::class, 'odjava']);
    Route::get('/putovanja/{id}', [\App\Http\Controllers\PutovanjeController::class, 'show']);
    Route::post('/putovanja', [\App\Http\Controllers\PutovanjeController::class, 'store']);
    Route::put('/putovanja/{id}', [\App\Http\Controllers\PutovanjeController::class, 'update']);
    Route::delete('/putovanja/{id}', [\App\Http\Controllers\PutovanjeController::class, 'destroy']);

    Route::get('/korisnici/{id}/putovanja', [\App\Http\Controllers\PutovanjeController::class, 'pronadjiPoKorisniku']);
    Route::get('/drzave/{id}/putovanja', [\App\Http\Controllers\PutovanjeController::class, 'pronadjiPoDrzavi']);

    //komentari
    Route::get('/komentari', [\App\Http\Controllers\KomentarController::class, 'index']);
    Route::get('/putovanja/{putovanje_id}/komentari', [\App\Http\Controllers\KomentarController::class, 'pronadjiPoPutovanju']);
    Route::post('/komentari', [\App\Http\Controllers\KomentarController::class, 'store']);


    //slike
    Route::get('/putovanja/{putovanje_id}/slike', [\App\Http\Controllers\SlikaController::class, 'pronadjiPoPutovanju']);
    Route::post('/slike', [\App\Http\Controllers\SlikaController::class, 'store']);
});
