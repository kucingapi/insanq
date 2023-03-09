<?php

use Illuminate\Http\Request;

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function (Request $request) use ($router) {
    return "test";
});
$router->get('/table', function (Request $request) use ($router) {
    $name = $request->input('name');
    $results = app('db')->select("SELECT * FROM $name");
    return response()->json(['data' => $results]);
});
