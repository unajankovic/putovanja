<?php

namespace Database\Seeders;

use App\Models\Drzava;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PutovanjeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $drzave = Drzava::all();
        $users = User::all();

        foreach (range(1, 20) as $id) {
            \App\Models\Putovanje::create([
                'nazivPutovanja' => $faker->sentence(rand(2,5)),
                'drzava_id' => $faker->randomElement($drzave)->id,
                'opisPutovanja' => $faker->paragraph(3),
                'datumPolaska' => $faker->dateTimeBetween('-1 month', '+1 month'),
                'datumPovratka' => $faker->dateTimeBetween('+1 month', '+2 month'),
                'user_id' => $faker->randomElement($users)->id,
            ]);
        }
    }
}
