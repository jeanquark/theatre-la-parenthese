<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanSeat extends Model
{
	protected $table = 'plan_seats';

	protected $fillable = ['user_id', 'svg_seat_id', 'is_reserved', 'status', 'price', 'remarks'];

    /**
     * Get the table that owns the seats.
     */
    public function table()
    {
        return $this->belongsTo('App\PlanTable', 'plan_table_id', 'id');
    }

    /**
     * Get the table that owns the seats.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
