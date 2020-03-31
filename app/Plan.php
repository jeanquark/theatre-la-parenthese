<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
	protected $table = 'plans';

    protected $fillable = ['performance_id', 'svg_id', 'name', 'slug'];

	/**
     * Get the performance that is associated with the plan.
     */
    public function performance()
    {
        return $this->belongsTo('App\Performance');
	}

    /**
     * Get the tables for the plan.
     */
    public function plan_tables()
    {
        return $this->hasMany('App\PlanTable');
	}
	
	/**
     * Get all of the seats for the plan.
     */
    public function plan_seats()
    {
        return $this->hasManyThrough('App\PlanSeat', 'App\PlanTable', 'plan_id', 'plan_table_id');
    }
}
