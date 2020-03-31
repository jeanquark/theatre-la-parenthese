<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Seat;
use DB;
use Auth;

class SeatReservationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('guest');
        $this->middleware('auth');
    }

    /**
     * Get the response for a successful password reset link.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  string  $response
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function reserveOneSeat(Request $request)
    {
        $seatId = $request->seatId;
        $seat = DB::table('plan_seats')->where('svg_seat_id', '=', $seatId);

        if ($seat->first()->is_reserved) {
            return response()->json([
                'status' => 'error',
                // '$seat->first()->is_reserved' => $seat->first()->is_reserved,
                'message' => 'Seat is already reserved.'
            ], 409);
        }

        $update = $seat->update(
            [
                'user_id' => Auth::user()->id,
                'is_reserved' => true,
                'status' => 'reserved',
            ]
        );

        if ($update === 1) {
            return response()->json([
                'status' => 'success',
                'message' => 'Seat reserved successfully.',
                'seatId' => $seatId,
                'seat' => $seat->first(),
                'update' => $update,
                'user' => Auth::user(),
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Seat could not be reserved.',
                'seatId' => $seatId,
                'update' => $update,
            ], 500);
        }
    }
}
