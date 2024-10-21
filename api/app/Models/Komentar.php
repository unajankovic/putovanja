<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Komentar extends Model
{
    protected $table = 'komentari';

    protected $fillable = ['tekst', 'datumKomentara', 'putovanje_id', 'user_id'];

    public function putovanje()
    {
        return $this->belongsTo(Putovanje::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
