<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Performance;
use App\Plan;
use App\PlanTable;
use App\PlanSeat;
use View;
use App\Http\Requests\StorePlan;
use Illuminate\Support\Facades\Storage;
use Str;
use File;


class PlansController extends Controller
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


    public function getAll()
    {
        $plans = Plan::with(['performance', 'performance.show', 'plan_tables', 'plan_seats'])->get();

        return response()->json([
            'success' => true,
            'plans' => $plans,
            ], 200);
    }

    public function getPlan(Request $request, $id)
    {
        $plan = Plan::with(['performance', 'performance.show', 'plan_tables', 'plan_seats'])->find($id);
        $svgPlan = Storage::disk('images')->get('svg/plans/' . $plan->svg_id . '.svg');

        return response()->json([
            'success' => true,
            'plan' => $plan,
            'svgPlan' => $svgPlan
            ], 200);
    }

    protected function create(StorePlan $request)
    {   
        // return response()->json([
        //     'status' => 'success',
        //     '$request->newPlanSVG' => $request->newPlanSVG,
        //     '$request->newPlan' => $request->newPlan,
        //     '$request->newPerformance' => $request->newPerformance,
        //     '$request->newTablesArray' => $request->newTablesArray,
        //     ], 200);

        // 1) Save new performance
        $newPerformance = new Performance;
        $newPerformance->show_id = $request->newPerformance['show_id'];
        $newPerformance->name = $request->newPerformance['name'];
        $newPerformance->slug = str_slug($request->newPerformance['name']);
        $newPerformance->date = $request->newPerformance['date'];
        $newPerformance->location = $request->newPerformance['location'];

        $newPerformance->save();

        // 2) Save new plan
        $newPlan = new Plan;
        $newPlan->performance_id = $newPerformance->id;
        $newPlan->svg_id = $request->newPlan['svg_id'];
        $newPlan->name = $request->newPlan['name'];
        $newPlan->slug = Str::slug($request->newPlan['name'], '-');

        $newPlan->save();

        // 3) Save new tables and seats
        $newTablesArray = $request->newTablesArray;
        if ($newTablesArray) {
            for ($i = 0; $i < count($newTablesArray); $i++) {
                $newTablePlan = new PlanTable;
                $newTablePlan->svg_id = $newTablesArray[$i]['svg_id'];
                $newTablePlan->plan_id = $newPlan->id;
                $newTablePlan->table_number = $newTablesArray[$i]['table_number'];
                $newTablePlan->svg_type = $newTablesArray[$i]['svg_type'];
                $newTablePlan->svg_model = $newTablesArray[$i]['svg_model'];
                $newTablePlan->total_seats = $newTablesArray[$i]['total_seats'];
                $newTablePlan->r = $newTablesArray[$i]['r'];
                $newTablePlan->cx = $newTablesArray[$i]['cx'];
                $newTablePlan->cy = $newTablesArray[$i]['cy'];
                $newTablePlan->d = $newTablesArray[$i]['d'];

                $newTablePlan->save();

                $table = PlanTable::where('svg_id', '=', $newTablesArray[$i]['svg_id'])->first();

                // Update plan_seats table
                if ($table->id) {
                    for ($j = 1; $j <= $newTablesArray[$i]['total_seats']; $j++) {

                        $newTable = new PlanSeat;

                        $newTable->plan_table_id = $table->id;
                        $newTable->svg_id = 'table_' . $newTablesArray[$i]['svg_id'] . '_seat' . $this->formattedTableNumber($j);
                        $newTable->seat_number = $this->formattedTableNumber($j);

                        $newTable->save();
                    }
                }
            }
        }

        // 4) Save new Plan as SVG images
        if ($request->newPlanSVG) {
            Storage::disk('images')->put('svg/plans/' . $newPlan->svg_id . '.svg', $request->newPlanSVG);
        }
        // if ($request->newPlanSVG) {
        //     file_put_contents('images/svg/plans/' . $newPlan->svg_id . '.svg', $request->newPlanSVG);
        //     Storage::disk('images')->delete('svg/plans/' . $plan->svg_id . '.svg');
        // }

        return response()->json([
            'status' => 'success',
            'message' => 'Table created successfully.',
            'newPlan' => $newPlan
            ], 201);
    }


    protected function update(Request $request)
    {
        // return response()->json([
        //     'status' => 'success',
        //     'message' => 'Table updated successfully.',
        //     'newPlanSVG' => $request->newPlanSVG,
        //     'newTablesArray' => $request->newTablesArray,
        //     'deletedTablesArray' => $request->deletedTablesArray
        //     ], 200);

        // // 1) Save new plan as SVG image
        // if ($request->newTablesSVGArray) {
        //     Storage::disk('images')->put('svg/plans/' . $request->newTablesSVGArray[$i]['id'] . '.svg', $request->newTablesSVGArray[$i]['svg']);
        // }
        

        // 1) Save new tables and seats in database
        $newTablesArray = $request->newTablesArray;
        if ($newTablesArray) {
            for ($i = 0; $i < count($newTablesArray); $i++) {
                PlanTable::updateOrInsert(
                    [
                        'svg_id' => $newTablesArray[$i]['svg_id']
                    ],
                    [
                        'plan_id' => $newTablesArray[$i]['plan_id'],
                        'table_number' => $newTablesArray[$i]['table_number'],
                        'svg_type' => $newTablesArray[$i]['svg_type'],
                        'svg_model' => $newTablesArray[$i]['svg_model'],
                        'total_seats' => $newTablesArray[$i]['total_seats'],
                        'r' => $newTablesArray[$i]['r'],
                        'cx' => $newTablesArray[$i]['cx'],
                        'cy' => $newTablesArray[$i]['cy'],
                        'd' => $newTablesArray[$i]['d'],
                        'created_at' =>  \Carbon\Carbon::now(),
                        'updated_at' => \Carbon\Carbon::now()
                    ]
                );

                $table = PlanTable::where('svg_id', '=', $newTablesArray[$i]['svg_id'])->first();

                // Update plan_seats table
                if ($table->id) {
                    for ($j = 1; $j <= $newTablesArray[$i]['total_seats']; $j++) {
                        PlanSeat::updateOrInsert(
                            [
                            'plan_table_id' => $table->id,
                            'svg_id' => 'table_' . $newTablesArray[$i]['svg_id'] . '_seat' . $this->formattedTableNumber($j),
                            'seat_number' => $this->formattedTableNumber($j),
                            'created_at' =>  \Carbon\Carbon::now(),
                            'updated_at' => \Carbon\Carbon::now()
                            ]
                            );
                    }
                }
            }
        }

        // 2) Delete dropped tables
        $deletedTablesArray = $request->deletedTablesArray;
        for ($i = 0; $i < count($deletedTablesArray); $i++) {
            PlanTable::where('id', '=', $deletedTablesArray[$i]['id'])->delete();
        }

        // 3) Save new Plan as SVG images
        if ($request->newPlanSVG) {
            $newSvgFile = fopen('images/svg/plans/' . $request->planSvgId . '.svg', 'w') or die('Unable to open file!');
            $newPlanSVG = $request->newPlanSVG;
            $write = fwrite($newSvgFile, $newPlanSVG);
            fclose($newSvgFile);
        }

        // return redirect('/');
        // return redirect()->route('home');
        // return back();
        // if ($write != false) {
        return response()->json([
            'status' => 'success',
            'message' => 'Table updated successfully.',
                // 'tablesArray' => $request->tablesArray,
                // 'newTablesArray' => $request->newTablesArray,
            'newPlanSVG' => $request->newPlanSVG,
            '$newTablesArray' => $newTablesArray,
            '$deletedTablesArray' => $deletedTablesArray
            ], 200);
        // } else {
        //     return response()->json([
        //         'status' => 'error',
        //         'message' => "Le plan n'a pas pu être sauvegardé",
        //         'newPlanSVG' => $request->newPlanSVG,
        //         '$newTablesArray' => $newTablesArray,
        //         '$deletedTablesArray' => $deletedTablesArray
        //     ], 500);
        // }

    }

    protected function delete($id) {
        $plan = Plan::where('id', '=', $id)->first();

        // 1) Delete file
        if (Storage::disk('images')->exists('svg/plans/' . $plan->svg_id . '.svg')) {
            Storage::disk('images')->delete('svg/plans/' . $plan->svg_id . '.svg');
        }

        // 2) Delete entry in DB
        $plan->delete();

        return response()->json([
            'success' => true,
            // '$plan' => $plan,
            // '$plan->plan_tables' => $plan->plan_tables,
            // '$plan->svg_id' => $plan->svg_id
        ], 200);
    }

    public function formattedTableNumber ($number) {
        return substr("0" . $number, -2);
    }
}
