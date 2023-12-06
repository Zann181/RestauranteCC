<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TableController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ChefController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\WaiterController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\CashRegisterController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::resource('tables', TableController::class );
Route::resource('products', ProductController::class );
Route::resource('chefs', ChefController::class);
Route::resource('orders', OrderController::class);
Route::resource('waiters', WaiterController::class);
Route::resource('bills', BillController::class);
Route::resource('cash-registers', CashRegisterController::class);






Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    Route::apiResource('tables', TableController::class);
    Route::apiResource('orders', OrderController::class);
    Route::apiResource('waiters', WaiterController::class);
    Route::apiResource('bills', BillController::class);
    Route::apiResource('cash-registers', CashRegisterController::class);



    return $request->user();
});
