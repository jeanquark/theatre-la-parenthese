<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Performance;
use View;
use App\Http\Requests\StorePerformance;
use App\Http\Requests\EditPerformance;
use Illuminate\Support\Facades\Storage;


class PerformancesController extends Controller
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


    public function getPerformances()
    {
        $performances = Performance::with(['plan', 'show'])->get();

        return response()->json($performances, 200);
    }

    public function getPerformance(Request $request, $id)
    {
        $performance = Performance::with(['plan', 'show'])->find($id);
        // $performance['show'] = $performance->show;

        return response()->json([
            'success' => true,
            'performance' => $performance,
        ], 200);
    }

    public function getPerformanceById(Request $request, $id)
    {
        $performance = Performance::with(['plan', 'show'])->find($id);

        return response()->json([
            'success' => true,
            'performance' => $performance,
        ], 200);
    }

    public function getPerformancesByShow(Request $request, $id)
    {
        $performances = Performance::where('show_id', '=', $id)
            ->orderBy('date', 'asc')
            ->with(['plan', 'show'])
            ->get();

        return response()->json([
            'success' => true,
            'performances' => $performances,
        ], 200);
    }

    protected function createPerformance(Request $request) {
        $performance = json_decode($request->form);

        $newPerformance = new Performance;

        $newPerformance->show_id = $performance->show_id;
        $newPerformance->name = $performance->name;
        $newPerformance->slug = str_slug($performance->name);
        $newPerformance->location = $performance->location;
        $newPerformance->date = $performance->date;
        $newPerformance->is_sold_out = $performance->is_sold_out;

        $newPerformance->save();

        // Re-retrieve the instance to get all of the fields in the table
        $newPerformance = Performance::with(['plan', 'show'])->find($newPerformance->id);


        // Save performances relationships
        // foreach ($performance->members as $member) {
        //     $newPerformance->members()->attach($member->id);
        // }
        
        return response()->json([
            'success' => true,
            'performance' => $performance,
            'newPerformance' => $newPerformance,
        ], 201);
    }

    protected function updatePerformance(Request $request, $id) {

        $updatedPerformance = json_decode($request->form);
        $performance = Performance::find($id);

        $performance->updateOrInsert(
            ['id' => $id],
            [
                'name' => $updatedPerformance->name,
                'slug' => str_slug($updatedPerformance->slug),
                'date' => $updatedPerformance->date,
            ]
        );

        // Update performances relationships
        // $memberIdArray = [];
        // foreach($updatedPerformance->members as $member) {
        //     array_push($memberIdArray, $member->id);
        // }
        // $performance->performances()->sync($performanceIdArray);

        return response()->json([
            'success' => true,
            'performance' => $performance,
        ], 201);
    }

    protected function deletePerformance(Request $request, $id) {
        $performance = Performance::find($id);

        $performance->delete();

        return response()->json([
            'success' => true,
            'performance' => $performance
        ], 204);
    }
}