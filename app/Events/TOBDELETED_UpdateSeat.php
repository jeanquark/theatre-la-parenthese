<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

use App\PlanSeat;

class UpdateSeat implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

	public $seat;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(PlanSeat $seat)
    {
        $this->seat = $seat;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('update-seat');
    }
}
