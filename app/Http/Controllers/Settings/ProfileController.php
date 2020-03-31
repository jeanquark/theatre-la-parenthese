<?php

namespace App\Http\Controllers\Settings;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProfileController extends Controller
{
    public function getAuthUser(Request $request)
    {
        $user = $request->user();

        $userRoles = $user->getRoles();
        $rolesArray = [];
        foreach ($userRoles as $role) {
            array_push($rolesArray, $role->slug);
        }
        $user->roles = $rolesArray;

        return $user;
    }


    /**
     * Update the user's profile information.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$user->id,
        ]);

        return tap($user)->update($request->only('name', 'email'));
    }
}
