<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePlan;
use App\Performance;
use App\Plan;
use App\PlanSeat;
use App\PlanTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Str;

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
            'svgPlan' => $svgPlan,
        ], 200);
    }

    protected function createPlan(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|unique:plans',
            'newPerformance.show_id' => 'required',
            'newPerformance.name' => 'required'
        ]);

        // return response()->json([
        //     'status' => 'success',
        //     'request' => $request,
        //     // '$request->newPlanSVG' => $request->newPlanSVG,
        //     // '$request->newPlan' => $request->newPlan,
        //     '$request->newPerformance' => $request->newPerformance,
        //     '$request->newTablesArray' => $request->newTablesArray,
        // ], 200);

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
        // $newPlan->svg_id = $request->newPlan['svg_id'];
        $newPlan->svg_id = $request->svg_id;
        // $newPlan->name = $request->newPlan['name'];
        $newPlan->name = $request->name;
        // $newPlan->slug = Str::slug($request->newPlan['name'], '-');
        $newPlan->slug = Str::slug($request->name, '-');

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
                    for ($j = 0; $j < $newTablesArray[$i]['total_seats']; $j++) {

                        $newTable = new PlanSeat;

                        $newTable->plan_table_id = $table->id;
                        $newTable->svg_id = 'table_' . $newTablesArray[$i]['svg_id'] . '_seat' . $this->formattedTableNumber($j + 1);
                        $newTable->seat_number = $newTablesArray[$i]['seats'][$j]['seat_number'];
                        $newTable->price = $newTablesArray[$i]['seats'][$j]['price'];

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
            'newPlan' => $newPlan,
        ], 201);
    }

    protected function updatePlan(Request $request)
    {
        $validatedData = $request->validate([]);

        // 1) Update seat info
        $planSeatsArray = $request->plan_seats;
        for ($i = 0; $i < count($planSeatsArray); $i++) {
            PlanSeat::updateOrInsert(
                [
                    'id' => $planSeatsArray[$i]['id']
                ],
                [
                    'seat_number' => $planSeatsArray[$i]['seat_number'],
                    'price' => $planSeatsArray[$i]['price']
                ]
            );
        }

        // 2) Save new tables and seats in database
        $newTablesArray = $request->newTablesArray;
        if ($newTablesArray) {
            for ($i = 0; $i < count($newTablesArray); $i++) {
                PlanTable::updateOrInsert(
                    [
                        'svg_id' => $newTablesArray[$i]['svg_id'],
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
                        'created_at' => \Carbon\Carbon::now(),
                        'updated_at' => \Carbon\Carbon::now(),
                    ]
                );

                $table = PlanTable::where('svg_id', '=', $newTablesArray[$i]['svg_id'])->first();

                // Update plan_seats table
                if ($table->id) {
                    for ($j = 0; $j < $newTablesArray[$i]['total_seats']; $j++) {
                        PlanSeat::updateOrInsert(
                            [
                                'plan_table_id' => $table->id,
                                'svg_id' => 'table_' . $newTablesArray[$i]['svg_id'] . '_seat' . $this->formattedTableNumber($j + 1),
                                'seat_number' => $newTablesArray[$i]['seats'][$j]['seat_number'],
                                // 'price' => $newTablesArray[$i]['seat_price'],
                                'price' => $newTablesArray[$i]['seats'][$j]['price'],
                                'created_at' => \Carbon\Carbon::now(),
                                'updated_at' => \Carbon\Carbon::now(),
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

        // 4) Save new Plan as SVG image
        if ($request->newPlanSVG) {
            $newSvgFile = fopen('images/svg/plans/' . $request->planSvgId . '.svg', 'w') or die('Unable to open file!');
            $newPlanSVG = $request->newPlanSVG;
            $write = fwrite($newSvgFile, $newPlanSVG);
            fclose($newSvgFile);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Table updated successfully.',
            // 'tablesArray' => $request->tablesArray,
            // 'newTablesArray' => $request->newTablesArray,
            'newPlanSVG' => $request->newPlanSVG,
            '$newTablesArray' => $newTablesArray,
            '$deletedTablesArray' => $deletedTablesArray,
        ], 200);
    }

    protected function deletePlan($id)
    {
        $plan = Plan::where('id', '=', $id)->first();

        // 1) Delete file
        if (Storage::disk('images')->exists('svg/plans/' . $plan->svg_id . '.svg')) {
            Storage::disk('images')->delete('svg/plans/' . $plan->svg_id . '.svg');
        }

        // 2) Delete entry in plans table
        $plan->delete();

        // 3) Delete entry in performance table
        $performance = Performance::where('id', '=', $id)->first();
        $performance->delete();

        return response()->json([
            'success' => true,
            // '$plan' => $plan,
            // '$plan->plan_tables' => $plan->plan_tables,
            // '$plan->svg_id' => $plan->svg_id
        ], 200);
    }

    public function formattedTableNumber($number)
    {
        return substr("0" . $number, -2);
    }
}
