<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Item;
use App\Ciudad;

class ItemAjaxController extends Controller
{
     public function manageItemAjax()
    {
        $ciudades = Ciudad::all();
        return view('manage-item-ajax')->with(['ciudades' => $ciudades]);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //$items = Item::latest()->paginate(5);

        $items = \DB::table('items')
                ->join('ciudades','ciudades.id','=','items.id_ciudad')
                ->select('ciudades.nombre as ciudad', 'items.title as title', 'items.description as description', 'items.id as id', 'ciudades.id as city_id')
                ->orderBy('items.id', 'desc')
                ->paginate(5);


        return response()->json($items);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $create = Item::create($request->all());
        return response()->json($create);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $edit = Item::find($id)->update($request->all());
        return response()->json($edit);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit_info($id)
    {
        $edit = Item::find($id);
        return response()->json($edit);

    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Item::find($id)->delete();
        return response()->json(['done']);
    }
}
