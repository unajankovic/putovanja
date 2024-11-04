<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KomentarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $putovanja = \App\Models\Putovanje::all();
        $users = \App\Models\User::all();

        foreach (range(1, 100) as $id) {
            \App\Models\Komentar::create([
                'tekst' => $faker->sentence(rand(6,15)),
                'datumKomentara' => $faker->dateTimeBetween('-1 month', '+1 month'),
                'putovanje_id' => $faker->randomElement($putovanja)->id,
                'user_id' => $faker->randomElement($users)->id,
            ]);
        }
    }
}
