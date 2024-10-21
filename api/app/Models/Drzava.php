<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Drzava extends Model
{
    protected $table = 'drzave';

    protected $fillable = ['nazivDrzave'];

    public function putovanja()
    {
        return $this->hasMany(Putovanje::class);
    }
}
