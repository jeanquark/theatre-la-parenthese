<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanTable extends Model
{
	protected $table = 'plan_tables';

    protected $fillable = ['plan_id', 'table_number', 'svg_id', 'svg_type', 'svg_model', 'r', 'cx', 'cy', 'd', 'total_seats'];

	/**
     * Get the plan that owns the tables.
     */
    public function plan()
    {
        return $this->belongsTo('App\Plan');
	}
	
    /**
     * Get the seats for the table.
     */
    public function seats()
    {
        // return $this->hasMany('App\PlanSeat', 'id', 'plan_table_id');
        return $this->hasMany('App\PlanSeat');
    }
}
