<?php

namespace App\Http\Resources;

use App\Models\Drzava;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PutovanjeResurs extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $drzava = Drzava::find($this->drzava_id);
        $user =  User::find($this->user_id);

        return [
            'id' => $this->id,
            'nazivPutovanja' => $this->nazivPutovanja,
            'drzava' => new DrzavaResurs($drzava),
            'opisPutovanja' => $this->opisPutovanja,
            'datumPolaska' => $this->datumPolaska,
            'datumPovratka' => $this->datumPovratka,
            'user' => new UserResurs($user)
        ];
    }
}
