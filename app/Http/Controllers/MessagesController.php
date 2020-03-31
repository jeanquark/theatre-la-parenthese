<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Events\NewMessage;
use App\Events\UpdateSeat;


class MessagesController extends Controller
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


    public function sendMessage(Request $request)
    {
        $this->validate($request, [
            'message' => 'required',
            // 'password' => 'required',
        ]);

		$message = $request->message;
		// $message = 'Hi everyone!';
        event(new NewMessage($message));
        // event(new UpdateSeat($message));

        return response()->json([
			'success' => true,
            'message' => $message
			// 'request' => $request,
			// 'request->message' => $request->message
		], 200);
    }
}