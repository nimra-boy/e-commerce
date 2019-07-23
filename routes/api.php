<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Auth-Token');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group.
|
*/

// Auth Endpoints
Route::group([
    'middleware' => 'cors',
    'prefix' => 'v1/auth'
], function ($router) {
    Route::post('login', 'Auth\LoginController@login');
    Route::post('logout', 'Auth\LogoutController@logout');
    Route::post('register', 'Auth\RegisterController@register');
    Route::post('forgot-password', 'Auth\ForgotPasswordController@email');
    Route::post('password-reset', 'Auth\ResetPasswordController@reset');
});

// Resource Endpoints
Route::group([
    'middleware' => 'cors',
    'prefix' => 'v1'
], function ($router) {

    Route::apiResource('product', 'ProductController');

    Route::post('cart', 'CartController@setCart');

    Route::post('cart/product', 'CartController@getCart');
    Route::post('cart/add', 'CartController@addCart');
    Route::post('cart/remove', 'CartController@removeCart');
    Route::post('cart/delete', 'CartController@deleteCart');

    Route::post('order/store', 'OrderController@storeOrder');
    Route::post('order/storepaypal', 'OrderController@storeOrderPaypal');

    Route::get('order/get', 'OrderController@getOrder');
    Route::post('order/myorder', 'OrderController@getMyOrder');

    Route::get('order/providers', 'OrderController@getProviders');
    Route::post('order/addprovider', 'OrderController@addProvider');
    Route::post('order/deleteproviders', 'OrderController@deleteProviders');
    Route::put('shipping/update/{product}', 'OrderController@updatePriceShipping');

    Route::post('product/house', 'ProductController@house');

    Route::post('product/search', 'ProductController@searchResult');
    Route::get('category/pro', 'ProductController@categoryPro');
    Route::get('category/private', 'ProductController@categoryPrivate');
    Route::get('category/all', 'ProductController@getAllProducts');
    Route::put('sale/update/{product}', 'ProductController@updateProductSale');
    Route::put('username/update/{product}', 'AuthController@editName');
    Route::put('useremail/update/{product}', 'AuthController@editEmail');
});

// Not Found
Route::fallback(function(){
    return response()->json(['message' => 'Resource not found.'], 404);
});
