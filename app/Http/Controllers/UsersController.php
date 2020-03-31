<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use jeremykenedy\LaravelRoles\Models\Role;
use View;
use App\Http\Requests\StoreUser;
use App\Http\Requests\EditUser;
use Illuminate\Support\Facades\Storage;


class UsersController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('guest');
    }


    public function getUsers()
    {
        // $users = User::get();
        $users = User::with(['roles'])->get();

        return response()->json($users, 200);
    }

    public function getUser(Request $request, $id)
    {
        $user = User::find($id);

        return response()->json([
            'success' => true,
            'user' => $user,
        ], 200);
    }

    protected function createUser(Request $request) {
        $user = json_decode($request->form);

        $newUser = new User;

        $newUser->firstname = $user->firstname;
        $newUser->lastname = $user->lastname;
        $newUser->email = $user->email;
        $newUser->phone = $user->phone;
        $newUser->is_active = false;

        $newUser->save();

        // Save users relationships
        // foreach ($user->shows as $show) {
        //     $newUser->shows()->attach($show->id);
        // }
        
        return response()->json([
            'success' => true,
            'newUser' => $newUser,
        ], 201);
    }

    protected function update(Request $request, $id)
    {

        // $updatedUser = json_decode($request->form);
        $user = $request->user;
        $newRole = $request->newRole;
        $userToUpdate = User::find($id);

        // return response()->json([
        //     'success' => true,
        //     'updatedUser' => $updatedUser,
        //     'updatedUser["firstname"]' => $updatedUser['firstname'],
        //     'user' => $user,
        //     'id' => $id,
        //     'request->newRole' => $request->newRole
        // ], 201);

        if ($newRole) {
            // Update role
            $updatedRole = Role::where('slug', '=', $newRole)->first();
            $userToUpdate->syncRoles($updatedRole);        
        } else {
            $userToUpdate->updateOrInsert(
                ['id' => $id],
                [
                    'firstname' => $updatedUser['firstname'],
                    'lastname' => $updatedUser['lastname'],
                ]
            );
        }



        

        // Update users relationships
        // $showIdArray = [];
        // foreach($updatedUser->shows as $show) {
        //     array_push($showIdArray, $show->id);
        // }
        // $user->users()->sync($showIdArray);
        $updatedUser = User::with('roles')->find($id);

        return response()->json([
            'success' => true,
            'updatedUser' => $updatedUser,
        ], 201);
    }

    protected function delete(Request $request, $id)
    {
        $user = User::find($id);

        $user->delete();

        return response()->json([
            'success' => true,
            'user' => $user
        ], 204);
    }
}