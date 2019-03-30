<?php

namespace App;

use App\Item;

use Illuminate\Database\Eloquent\Model;

class Ciudad extends Model
{
	protected $table = 'ciudades';

    public $fillable = ['nombre'];

    public function item(){
    	return $this->belongsTo(Item::class);
    }

    public function wasCreatedBy($item){
    	
    	if( is_null($item) ) {
    		return false;
    	}

    	return $this->item_id === $item->id;

    }
}
