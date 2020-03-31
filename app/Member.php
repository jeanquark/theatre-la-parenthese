<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname', 'lastname', 'email', 'phone', 'is_active'
    ];

    /**
     * Get the performances for the show.
     */
    public function performances()
    {
        return $this->hasMany('App\Performance');
    }

    /**
     * The shows that members are part of.
     */
    public function shows()
    {
        return $this->belongsToMany('App\Show', 'member_show', 'member_id', 'show_id' );
    }
}
