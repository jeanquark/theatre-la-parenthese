<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Performance extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'show_id', 'name', 'slug', 'date', 'location'
    ];

	/**
     * Get the plan associated with the performance.
     */
    public function plan()
    {
        return $this->hasOne('App\Plan');
	}
	
    /**
     * Get the show that performances are part of.
     */
    public function show()
    {
        return $this->belongsTo('App\Show');
    }
}
