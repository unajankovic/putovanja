<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Putovanje extends Model
{
    protected $table = 'putovanja';

    protected $fillable = ['nazivPutovanja', 'drzava_id', 'opisPutovanja', 'datumPolaska', 'datumPovratka', 'user_id'];

    public function drzava()
    {
        return $this->belongsTo(Drzava::class);
    }

    public function slike()
    {
        return $this->hasMany(Slika::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
