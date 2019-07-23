<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \Illuminate\Support\Facades\DB::table('users')->insert([
            'id' => 1,
            'name' => 'William Bassalobre',
            'email' => 'admin@bs2.com.br',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'birthDate' => date('Y-m-d', strtotime('-22 years')),
            'address_id' => 1,
            'remember_token' => Str::random(10),
            'created_at' => date('Y-m-d H:i:s', strtotime('-12 minutes')),
            'updated_at' => date('Y-m-d H:i:s', strtotime('-12 minutes')),
        ]);

        factory(\App\Models\User::class, 50)->create();
    }
}
