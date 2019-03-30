<?php

use Illuminate\Database\Seeder;

class Ciudad extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('ciudades')->delete();
        $ciudades = array(
            ['id' => 1, 'nombre' => 'Cali', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 2, 'nombre' => 'Bogota','created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 3, 'nombre' => 'Medellin', 'created_at' => new DateTime, 'updated_at' => new DateTime]
        );
        DB::table('ciudades')->insert($ciudades);
    }
}
