<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slika extends Model
{
    protected $table = 'slike';

    protected $fillable = ['url', 'putovanje_id'];

    public function putovanje()
    {
        return $this->belongsTo(Putovanje::class);
    }
}
