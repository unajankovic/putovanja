<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DrzavaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //nazivDrzave
        $drzave = [
            'Srbija',
            'Hrvatska',
            'Bosna i Hercegovina',
            'Crna Gora',
            'Severna Makedonija',
            'Slovenija',
            'Slovačka',
            'Češka',
            'Poljska',
            'Mađarska',
            'Austrija',
            'Nemačka',
            'Holandija',
            'Belgija',
            'Francuska',
            'Španija',
            'Portugal',
            'Italija',
            'Švajcarska',
            'Luksemburg',
            'Danska',
            'Norveška',
            'Švedska',
            'Finska',
            'Island',
            'Irska',
            'Velika Britanija',
            'Grčka',
            'Turska',
        ];

        foreach ($drzave as $drzava) {
            \App\Models\Drzava::create([
                'nazivDrzave' => $drzava,
            ]);
        }
    }
}
