<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Show extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'slug', 'start_date', 'end_date', 'season', 'is_active'
    ];

    /**
     * Get the performances for the show.
     */
    public function performances()
    {
        return $this->hasMany('App\Performance');
    }

    /**
     * The members that belong to the show.
     */
    public function members()
    {
        return $this->belongsToMany('App\Member', 'member_show', 'show_id', 'member_id' );
    }
}
