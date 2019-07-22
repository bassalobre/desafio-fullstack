<?php

use Illuminate\Http\Request;

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

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

$users = [
    [
        'id' => 1,
        'name' => 'William Bassalobre',
        'email' => 'williambassalobre@gmail.com',
        'birthDate' => '1996-09-30',
        'address' => [
            'cep' => 87055520,
            'street' => 'Rua 1',
            'number' => '117',
            'comp' => ''
        ],
    ],
    [
        'id' => 2,
        'name' => 'José da Silva',
        'email' => 'josesilva@gmail.com',
        'birthDate' => '1980-01-01',
        'address' => [
            'cep' => 87055520,
            'street' => 'Rua 1',
            'number' => '117',
            'comp' => ''
        ],
    ],
];

Route::middleware('api')->get('/users', function (Request $request) use($users) {
    return response()->json($users);
});

Route::middleware('api')->get('/users/{id}', function (Request $request, $id) use($users)  {
    $user = [];
    foreach ($users as $item) {
        if ($item['id'] == $id) {
            $user = $item;
        }
    }

    return response()->json($user);
});
