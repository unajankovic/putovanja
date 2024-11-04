<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Una Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin123'),
            'uloga' => 'admin',
        ]);

        $faker = \Faker\Factory::create();

        foreach (range(1, 10) as $id) {
            User::create([
                'name' => $faker->name,
                'email' => $faker->email,
                'password' => bcrypt('password'),
                'uloga' => 'korisnik',
            ]);
        }
    }
}
