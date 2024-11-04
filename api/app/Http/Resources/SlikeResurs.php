<?php

namespace App\Http\Resources;

use App\Models\Putovanje;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SlikeResurs extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $putovanje = Putovanje::find($this->putovanje_id);

        return [
            'id' => $this->id,
            'putovanje' => new PutovanjeResurs($putovanje),
            'url' => $this->url
        ];
    }
}
