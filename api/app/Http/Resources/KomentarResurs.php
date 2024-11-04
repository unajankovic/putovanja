<?php

namespace App\Http\Resources;

use App\Models\Putovanje;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KomentarResurs extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $putovanje = Putovanje::find($this->putovanje_id);
        $user =  User::find($this->user_id);

        return [
            'id' => $this->id,
            'tekst' => $this->tekst,
            'datumKomentara' => $this->datumKomentara,
            'putovanje' => new PutovanjeResurs($putovanje),
            'user' => new UserResurs($user)
        ];
    }
}
