<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::group(['middleware' => 'auth'], function () {

	Route::get('manage-item-ajax', 'ItemAjaxController@manageItemAjax');
	Route::resource('item-ajax', 'ItemAjaxController');
	Route::get('edit_info/{id}','ItemAjaxController@edit_info');

});

Route::get('/home', 'HomeController@index')->name('home');
