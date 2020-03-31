<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Performance;
use App\Plan;
use App\PlanTable;
use App\PlanSeat;
use View;
use App\Http\Requests\StorePerformance;
use App\Http\Requests\EditPerformance;
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
        $svgPlan = Storage::disk('images')->get('svg/plans/plan_' . $plan->id . '.svg');

        return response()->json([
            'success' => true,
            'plan' => $plan,
            'svgPlan' => $svgPlan
            ], 200);
    }

    public function getSvg (Request $request, $planSvgId) {
        $svgPlan = Storage::disk('images')->get('svg/plans/' . $planSvgId);

        return response()->json([
            'success' => true,
            'svgPlan' => $svgPlan
            ], 200);
    }

    // public function getSvg (Request $request) {
    //     $svgPlan = Storage::disk('images')->get('svg/plans/' . $request->planSVG);

    //     return response()->json([
    //         'success' => true,
    //         'svgPlan' => $svgPlan
    //         ], 200);
    // }

    protected function create(Request $request)
    {   
        // 1) Save new performance
        $newPerformance = new Performance;
        $newPerformance->show_id = $request->newPerformance['show_id'];
        $newPerformance->name = $request->newPerformance['name'];
        $newPerformance->slug = str_slug($request->newPerforamnce['name']);
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
            file_put_contents('images/svg/plans/' . $newPlan->svg_id . '.svg', $request->newPlanSVG);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Table created successfully.',
            ], 201);
    }


    protected function update(Request $request)
    {
        // 1) Save new tables as SVG images
        if ($request->newTablesSVGArray) {
            for ($i = 0; $i < count($request->newTablesSVGArray); $i++) {
                // file_put_contents('images/svg/tables/table_' . $request->newTablesArray[$i]['svg_id'] . '.svg', $request->newTablesSVGArray[$i]);
                // file_put_contents('images/svg/plans/' . $request->planSvgId . '/table_' . $request->newTablesSVGArray[$i]['id'] . '.svg', $request->newTablesSVGArray[$i]['svg']);
                file_put_contents('images/svg/plans/table_' . $request->newTablesSVGArray[$i]['id'] . '.svg', $request->newTablesSVGArray[$i]['svg']);
            }
        }
        if ($request->newTablesArray) {
            for ($i = 0; $i < count($request->newTablesArray); $i++) {
                // $model = fopen('images/svg/models/model_' . $request->newTablesArray[$i]['svg_model'], 'w') or die('Unable to open file!');
                // file_put_contents('images/svg/plans/' . $request->planSvgId . '/table_' . $request->newTablesArray[$i]['svg_id'] . '.svg', $model);
            }
        }
        

        // 2) Save new tables and seats in database
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

        // 3) Delete dropped tables
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
        $plan->delete();

        // $reservedSeat = false;
        // foreach($table->seats as $seat) {
        //     if ($seat->is_reserved) {
        //         $reservedSeat = true;
        //     }
        // }

        // // Can only delete selected table if none of its seats is reserved
        // if (!$reservedSeat) {
        //     // 1) Delete table
        //     $table->delete();
        //     // 2) Delete all seats related to the table
        //     foreach($table->seats as $seat) {
        //         $seat->delete();
        //     }
        //     // 3) Remove table from plan SVG
        //     unlink('images/svg/plans/' . $table->plan->svg_id . '/table_' . $svg_id . '.svg');

        // // 4) Update plan SVG
        // } else {
        //     return response()->json([
        //         'success' => false,
        //         'status' => 'error',
        //         'message' => 'There is at least one reserved seat.'
        //     ], 409);
        // }

        return response()->json([
            'success' => false,
            '$plan' => $plan,
            '$plan->plan_tables' => $plan->plan_tables
        ], 200);
    }

    public function formattedTableNumber ($number) {
        return substr("0" . $number, -2);
    }
}
