<?php

namespace Database\Seeders;

use App\Models\Slika;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SlikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $slike = [
            "https://5.imimg.com/data5/SELLER/Default/2024/11/464194925/BY/EV/PH/53619710/3d-pvc-nature-wallpaper.jpg",
            "https://webneel.com/wallpaper/sites/default/files/images/08-2018/3-nature-wallpaper-mountain.jpg",
            "https://happytowander.com/wp-content/uploads/Croatia-Pictures-Happy-to-Wander-0609.jpg",
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=jpg"
        ];

        $putovanja = \App\Models\Putovanje::all();

        foreach ($putovanja as $putovanje) {

            $slika1 = Slika::create([
                'putovanje_id' => $putovanje->id,
                'url' => $slike[array_rand($slike)],
            ]);

            $slika2 = Slika::create([
                'putovanje_id' => $putovanje->id,
                'url' => $slike[array_rand($slike)],
            ]);
        }
    }
}
