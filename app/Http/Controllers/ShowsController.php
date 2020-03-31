<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Show;
use View;
use App\Http\Requests\StoreShow;
use App\Http\Requests\EditShow;
use Illuminate\Support\Facades\Storage;


class ShowsController extends Controller
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


    public function getShows()
    {
        // $shows = Show::with('members')->get();
        $shows = Show::with('members')->get();

        return response()->json($shows, 200);
    }

    public function getShow(Request $request, $id)
    {
        $show = Show::find($id);
        $show['members'] = $show->members;

        return response()->json([
            'success' => true,
            'show' => $show,
        ], 200);
    }

    protected function createShow(Request $request) {
        $show = json_decode($request->form);

        $newShow = new Show;

        $newShow->name = $show->name;
        $newShow->slug = str_slug($show->name);
        $newShow->start_date = $show->start_date;
        $newShow->end_date = $show->end_date;
        $newShow->season = $show->season;

        $newShow->save();

        // Save shows relationships
        foreach ($show->members as $member) {
            $newShow->members()->attach($member);
        }
        
        return response()->json([
            'success' => true,
            'newShow' => $newShow,
        ], 201);
    }

    protected function updateShow(Request $request, $id) {

        $updatedShow = json_decode($request->form);
        $show = Show::find($id);

        $show->updateOrInsert(
            ['id' => $id],
            [
                'name' => $updatedShow->name,
                'slug' => str_slug($updatedShow->slug),
                'start_date' => $updatedShow->start_date,
                'end_date' => $updatedShow->end_date,
                'season' => $updatedShow->season,
            ]
        );

        // Update shows relationships
        $memberIdArray = [];
        foreach($updatedShow->members as $member) {
            array_push($memberIdArray, $member->id);
        }
        $show->shows()->sync($showIdArray);

        return response()->json([
            'success' => true,
            'show' => $show,
        ], 201);
    }

    protected function deleteShow(Request $request, $id) {
        $show = Show::find($id);

        $show->delete();

        return response()->json([
            'success' => true,
            'show' => $show
        ], 204);
    }
}