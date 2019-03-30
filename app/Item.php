<?php

namespace App;

use App\Ciudad;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    public $fillable = ['title','description','id_ciudad'];

    public function ciudades(){
        return $this->hasOne(Ciudad::class);
    }
}
