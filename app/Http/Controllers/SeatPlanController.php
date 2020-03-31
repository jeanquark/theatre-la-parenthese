<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
// use App\PlanTable;
use App\PlanSeat;
use DB;
use View;
use Auth;
use App\Events\UpdateTableSeat;
use Illuminate\Database\Eloquent\Builder;
use Session;
use App\Mail\ReservationConfirmed;
use Illuminate\Support\Facades\Mail;


class SeatPlanController extends Controller
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

    public function getSeats()
    {
        $seats = PlanSeat::all();

        return response()->json($seats, 200);
    }


    public function getSeatsByTableId($tableId)
    {
        $seats = PlanSeat::where('plan_table_id', '=', $tableId)->get();

        return response()->json($seats, 200);
    }

    public function getSeatsByPlanId($planId)
    {
        $seats = PlanSeat::whereHas('table', function (Builder $query) use ($planId) {
            $query->where('plan_id', '=', $planId);
        })->with('table')->get()->keyBy('id');
        // $cart = Session::get('cart');
        // dd($cart);

        return response()->json([
            'seats' => $seats,
            'planId' => $planId,
            // 'cart' => $cart
        ], 200);
    }


    public function getUserSeats($userId)
    {
        $seats = PlanSeat::where('user_id', '=', $userId)->with(['table', 'table.plan.performance', 'user'])->get();

        return response()->json($seats, 200);
    }
    
    public function update(Request $request)
    {
        $planTableId = $request->planTableId;
        $seatSvgId = $request->seatSvgId;

        return response()->json([
            'status' => 'success',
            '$planTableId' => $planTableId,
            '$seatSvgId' => $seatSvgId
        ], 200);
    }
	
	public function reserveASeat(Request $request)
	{
        $planTableId = $request->planTableId;
        $tableSvgId = $request->tableSvgId;
		$seatSvgId = $request->seatSvgId;
        $seat = PlanSeat::where('plan_table_id', '=', $planTableId)->where('svg_id', '=', 'table_' . $tableSvgId . '_' . $seatSvgId);

        if ($seat->first()->is_reserved) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ce siège est déjà occupé.'
            ], 409);
        }

        // session()->push('cart', $seat->first());
        // session()->push('cart', $seat->first());
        // $seat = session()->push('cart', 174);

        // return response()->json([
        //     'status' => 'success',
        //     // 'seat' => $seat->first()->id,
        //     'session()->all()' => session()->all()
        // ], 200);
        

		$update = $seat->update(
			[
                // 'user_id' => Auth::user() ? Auth::user()->id : null,
				'is_reserved' => true,
				'status' => 'pre_reservation'
			]
		);
        if ($update === 1) {
			$updatedSeat = PlanSeat::where('plan_table_id', '=', $planTableId)
                ->where('svg_id', '=', 'table_' . $tableSvgId . '_' . $seatSvgId)
                ->with(['user', 'table', 'table.plan.performance'])->first();

			event(new UpdateTableSeat($updatedSeat));

            return response()->json([
                'status' => 'success',
                'message' => 'Seat reserved successfully.',
				'updatedSeat' => $updatedSeat,
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
            ], 500);
        }
    }
    
    public function confirmSeatReservation (Request $request) {

        $confirmedPlanSeats = [];
        // $confirmedPlanSeats = 'abc';

        foreach($request->shoppingCart as $seat) {
            $planSeat = PlanSeat::with(['user', 'table', 'table.plan.performance'])->find($seat['id']);
            if ($planSeat) {

                $update = $planSeat->update(['user_id' => Auth::user()->id, 'status' => 'confirmation_pending']);
                // $update = $planSeat->update(['user_id' => Auth::user()->id, 'status' => 'pre_reservation']);
                // if ($update === 1) {
                    array_push($confirmedPlanSeats, $planSeat);
                // }
            }
        }

        // Send confirmation email
        Mail::to(Auth::user()->email)->send(new ReservationConfirmed($confirmedPlanSeats));


        return response()->json([
            'success' => true,
            // 'request' => $request->shoppingCart
            'userId' => Auth::user()->id,
            'confirmedPlanSeats' => $confirmedPlanSeats
        ], 200);
    }

    public function deleteSeatReservation (Request $request) {
        $planSeat = PlanSeat::where('id', '=', $request->planSeatId)->with(['table', 'user'])->first();

        // Remove seat reservation only if the user that made the reservation is the one currently authenticated or if user is not specified and if reservation is not already confirmed
        if ($planSeat->status !== 'reservation_confirmed') {
            if ($planSeat->user_id === null || $planSeat->user_id === Auth::user()->id) {
                $planSeat->update(['user_id' => NULL, 'is_reserved' => 0, 'status' => NULL]);
			    event(new UpdateTableSeat($planSeat));

            }
        }

        return response()->json([
            'success' => true,
            'planSeat' => $planSeat,
            '$request->planSeatId' => $request->planSeatId,
        ], 200);

    }

    // public function deleteReservations (Request $request) {
    //     $seats = PlanSeat::where('is_reserved', '=', true)->get();

    //     foreach($seats as $seat) {
    //         $seat->update([
    //             'user_id' => null,
    //             'is_reserved' => false,
    //             'status' => null
    //         ]);
    //     }

    //     return response()->json([
    //         'success' => true,
    //         'seats' => $seats
    //     ], 200);
    // }

}