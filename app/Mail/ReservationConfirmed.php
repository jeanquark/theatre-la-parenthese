<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReservationConfirmed extends Mailable
{
    use Queueable, SerializesModels;

    // public $data;
    public $reservations;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Array $reservations)
    {
        // $this->data = $data;
        $this->reservations = $reservations;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $subject = "Théâtre La Parenthèse - Vos réservations";
        // $subject = {{ config('app.name') }} . ' - Vos réservations';

        return $this->view('emails.reservations.confirmation')
                ->subject($subject);

        // return $this->markdown('emails.reservations.confirm')
        //     ->subject($subject);
    }
}
