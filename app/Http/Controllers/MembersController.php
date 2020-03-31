<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Member;
use View;
use App\Http\Requests\StoreMember;
use App\Http\Requests\EditMember;
use Illuminate\Support\Facades\Storage;


class MembersController extends Controller
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


    public function getMembers()
    {
        $members = Member::with('shows')->get();

        return response()->json($members, 200);
    }

    public function getMember(Request $request, $id)
    {
        $member = Member::find($id);
        $member['shows'] = $member->shows;

        return response()->json([
            'success' => true,
            'member' => $member,
        ], 200);
    }

    protected function createMember(StoreMember $request) {
    // protected function createMember(Request $request) {

        // $this->validate($request, [
        //     'firstname' => 'required|max:255',
        //     'lastname' => 'required|min:256',
        //     'email' => 'required|email',
        //     'phone' => 'required|min:256'
        // ]);

        // return response()->json([
        //     'success' => true,
        //     'request' => $request->firstname,
        // ], 201);

        // $member = json_decode($request->form);

        $newMember = new Member;

        $newMember->firstname = $request->firstname;
        $newMember->lastname = $request->lastname;
        $newMember->email = $request->email;
        $newMember->phone = $request->phone;
        $newMember->is_active = false;

        $newMember->save();

        $newMember = Member::find($newMember->id);
        
        return response()->json([
            'success' => true,
            'newMember' => $newMember,
        ], 201);
    }

    protected function updateMember(Request $request, $id) {

        $updatedMember = json_decode($request->form);
        $member = Member::find($id);

        $member->updateOrInsert(
            ['id' => $id],
            [
                'firstname' => $updatedMember->firstname,
                'lastname' => $updatedMember->lastname,
                'email' => $updatedMember->email,
                'phone' => $updatedMember->phone,
                'is_active' => $updatedMember->is_active,
            ]
        );

        // Update members relationships
        $showIdArray = [];
        foreach($updatedMember->shows as $show) {
            array_push($showIdArray, $show->id);
        }
        $member->members()->sync($showIdArray);

        return response()->json([
            'success' => true,
            'member' => $member,
        ], 201);
    }

    protected function deleteMember(Request $request, $id) {
        $member = Member::find($id);

        $member->delete();

        return response()->json([
            'success' => true,
            'member' => $member
        ], 204);
    }
}