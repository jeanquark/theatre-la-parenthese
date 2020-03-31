<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

use App\PlanSeat;

class UpdateTableSeat implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    // public $tableSeat;
    public $updatedSeat;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    // public function __construct(PlanSeat $tableSeat)
    public function __construct(PlanSeat $updatedSeat)
    {
        // $this->tableSeat = $tableSeat;
        $this->updatedSeat = $updatedSeat;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('update-table-seat');
        // return new Channel('update-table-seat . ' . $this->tableSeat->plan_table_id);
    }

    // public function broadcastWith () {
    //     return [
    //         'seat' => $this->tableSeat,
    //     ]
    // }
}
