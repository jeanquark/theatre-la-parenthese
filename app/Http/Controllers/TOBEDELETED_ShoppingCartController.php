<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\PlanSeat;
use View;
use Auth;
// use Illuminate\Support\Facades\Storage;


class ShoppingCartController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('guest');
    }


    public function getShoppingCart()
    {
        $userId = Auth::user()->id;
        $planSeats = PlanSeat::where('user_id', '=', $userId)
            ->with('user')
            ->with('table.plan.performance')
            ->get();

        return response()->json($planSeats, 200);
    }
}