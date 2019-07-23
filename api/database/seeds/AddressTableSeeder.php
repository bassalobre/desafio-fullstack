<?php

use Illuminate\Database\Seeder;

class AddressTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \Illuminate\Support\Facades\DB::table('addresses')->insert([
            'id' => 1,
            'cep' => 87013210,
            'city' => 'Maringá',
            'state' => 'PR',
            'neighborhood' => 'Centro',
            'street' => 'Av. Tamandaré',
            'number' => '100',
            'created_at' => date('Y-m-d H:i:s', strtotime('-12 minutes')),
            'updated_at' => date('Y-m-d H:i:s', strtotime('-12 minutes')),
        ]);
    }
}
