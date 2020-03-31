<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\PlanTable;
use App\PlanSeat;
use App\Performance;
use DB;
use View;

class TablePlansController extends Controller
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

    // public function index()
    // {
    //     $tables = PlanTable::all();
    //     // $seats = Table::has('seats')->get();
    //     $seats = PlanTable::find(3)->seats;

    //     return response()->json([
    //         'tables' => $tables,
    //         'seats' => $seats
    //     ], 200);
    // }

    public function getPlanTables()
    {
        $tables = PlanTable::all();

        return response()->json($tables, 200);
    }

    // public function show($id)
    // {
    //     $table = PlanTable::where('svg_id', '=', $id)->first();
    //     // $table = Table::all();
    //     $seats = PlanTable::find($table->id)->seats;
    //     // $seats = 'abc';

    //     return response()->json([
    //         'table' => $table,
    //         'seats' => $seats
    //     ], 200);

    //     // return response()->json($table, $seats, 200);
    // }

    public function getPlanTableBySvgId($svgId) {
        $planTable = PlanTable::where('svg_id', '=', $svgId)->with('seats')->first();
        // $seats = $table->seats;

        return response()->json($planTable, 200);

        // return response()->json([
        //     'table' => $table,
        //     'seats' => $seats
        // ], 200);
    }

    public function getPlanTablesByPlanId ($planId) {
        $planTables = PlanTable::where('plan_id', '=', $planId)->with('seats')->get();

        return response()->json($planTables, 200);
    }


    public function addTable(Request $request) {
        // $filename = 'test.txt';
        // $newSvgFile = fopen('images/svg/tables_plan.svg', 'w') or die('Unable to open file!');
        // $newSVG = $request->newSVG;
        // fwrite($newSvgFile, $newSVG);
        // fclose($newSvgFile);

        file_put_contents('images/svg/tables/table_' . $request->tableId . '.svg', $request->newSVG);

        return response()->json([
            'abc' => $request->abc
        ], 200);
    }

    // protected function create(Request $request)
    // {   
    //     // 1) Save new performance in database
    //     // $newPerformance = Performance::create($request->newPerformance);
    //     $newPerformance = new Performance;
    //     $newPerformance->show_id = $request->newPerformance['show_id'];
    //     $newPerformance->name = $request->newPerformance['name'];
    //     $newPerformance->slug = str_slug($request->newPerforamnce['name']);
    //     $newPerformance->date = $request->newPerformance['date'];
    //     $newPerformance->location = $request->newPerformance['location'];

    //     $newPerformance->save();

    //     // 2) Save new plan
    //     $newPlan = new Plan;
    //     $newPlan->performance_id = $newPerformance->id;
    //     $newPlan->svg_id = $request->newPlan['svg_id'];
    //     $newPlan->name = $request->newPlan['name'];
    //     $newPlan->slug = str_slug($request->newPlan['slug']);
    //     $newPerformance->location = $request->newPlan['location'];

    //     $newPlan->save();

    //     // 3) Save new tables and seats in database
    //     $newTablesArray = $request->newTablesArray;
    //     if ($newTablesArray) {
    //         for ($i = 0; $i < count($newTablesArray); $i++) {
    //             $newTablePlan = new PlanTable;
    //             $newTablePlan->svg_id = $newTablesArray[$i]['svg_id'];
    //             $newTablePlan->plan_id = $newTablesArray[$i]['plan_id'];
    //             $newTablePlan->table_number = $newTablesArray[$i]['table_number'];
    //             $newTablePlan->svg_type = $newTablesArray[$i]['svg_type'];
    //             $newTablePlan->svg_model = $newTablesArray[$i]['svg_model'];
    //             $newTablePlan->total_seats = $newTablesArray[$i]['total_seats'];
    //             $newTablePlan->r = $newTablesArray[$i]['r'];
    //             $newTablePlan->cx = $newTablesArray[$i]['cx'];
    //             $newTablePlan->cy = $newTablesArray[$i]['cy'];
    //             $newTablePlan->d = $newTablesArray[$i]['d'];

    //             $newTablePlan->save();
    //             // DB::table('plan_tables')
    //             //     ::create(
    //             //         [
    //             //             'svg_id' => $newTablesArray[$i]['svg_id'],
    //             //             'plan_id' => $newTablesArray[$i]['plan_id'],
    //             //             'table_number' => $newTablesArray[$i]['table_number'],
    //             //             'svg_type' => $newTablesArray[$i]['svg_type'],
    //             //             'svg_model' => $newTablesArray[$i]['svg_model'],
    //             //             'total_seats' => $newTablesArray[$i]['total_seats'],
    //             //             'r' => $newTablesArray[$i]['r'],
    //             //             'cx' => $newTablesArray[$i]['cx'],
    //             //             'cy' => $newTablesArray[$i]['cy'],
    //             //             'd' => $newTablesArray[$i]['d'],
    //             //             'created_at' =>  \Carbon\Carbon::now(),
    //             //             'updated_at' => \Carbon\Carbon::now()
    //             //         ]
    //             //     );

    //             $table = DB::table('plan_tables')->where('svg_id', '=', $newTablesArray[$i]['svg_id'])->first();

    //             // Update plan_seats table
    //             if ($table->id) {
    //                 for ($j = 1; $j <= $newTablesArray[$i]['total_seats']; $j++) {

    //                     $newTable = new PlanSeat;

    //                     $newTable->plan_table_id = $table->id;
    //                     $newTable->svg_id = 'table_' . $newTablesArray[$i]['svg_id'] . '_seat_' . $j;
    //                     $newTable->seat_number = $j;

    //                     $newTable->save();
    //                     // DB::table('plan_seats')
    //                     //     ->updateOrInsert(
    //                     //         [
    //                     //             'plan_table_id' => $table->id,
    //                     //             'svg_id' => 'table_' . $newTablesArray[$i]['svg_id'] . '_seat_' . $j,
    //                     //             'seat_number' => $j,
    //                     //             'created_at' =>  \Carbon\Carbon::now(),
    //                     //             'updated_at' => \Carbon\Carbon::now()
    //                     //         ]
    //                     //     );
    //                 }
    //             }
    //         }
    //     }

    //     // 4) Save new Plan as SVG images
    //     if ($request->newPlanSVG) {
    //         $newSvgFile = fopen('images/svg/plans/plan_1/plan_1.svg', 'w') or die('Unable to open file!');
    //         $newPlanSVG = $request->newPlanSVG;
    //         $write = fwrite($newSvgFile, $newPlanSVG);
    //         fflush($newSvgFile);
    //         fclose($newSvgFile);
    //     }

    //     return response()->json([
    //         'status' => 'success',
    //         'message' => 'Table created successfully.',
    //     ], 201);
    // }

    /**
     * 
     *
     * @param  \Illuminate\Http\Request $request
     * @param  string  $response
     * @return \Illuminate\Http\RedirectResponse
     */
    // protected function update(Request $request)
    // {
    //     // 1) Save new tables as SVG images
    //     if ($request->newTablesSVGArray) {
    //         for ($i = 0; $i < count($request->newTablesSVGArray); $i++) {
    //             // file_put_contents('images/svg/tables/table_' . $request->newTablesArray[$i]['svg_id'] . '.svg', $request->newTablesSVGArray[$i]);
    //             // file_put_contents('images/svg/plans/' . $request->planSvgId . '/table_' . $request->newTablesSVGArray[$i]['id'] . '.svg', $request->newTablesSVGArray[$i]['svg']);
    //             file_put_contents('images/svg/plans/' . $request->planSvgId . '/table_' . $request->newTablesSVGArray[$i]['id'] . '.svg', $request->newTablesSVGArray[$i]['svg']);
    //         }
    //     }
    //     if ($request->newTablesArray) {
    //         for ($i = 0; $i < count($request->newTablesArray); $i++) {
    //             // $model = fopen('images/svg/models/model_' . $request->newTablesArray[$i]['svg_model'], 'w') or die('Unable to open file!');
    //             // file_put_contents('images/svg/plans/' . $request->planSvgId . '/table_' . $request->newTablesArray[$i]['svg_id'] . '.svg', $model);
    //         }
    //     }
        

    //     // 2) Save new tables and seats in database
    //     $newTablesArray = $request->newTablesArray;
    //     if ($newTablesArray) {
    //         for ($i = 0; $i < count($newTablesArray); $i++) {
    //             DB::table('plan_tables')
    //                 ->updateOrInsert(
    //                     [
    //                         'svg_id' => $newTablesArray[$i]['svg_id']
    //                     ],
    //                     [
    //                         'plan_id' => $newTablesArray[$i]['plan_id'],
    //                         'table_number' => $newTablesArray[$i]['table_number'],
    //                         'svg_type' => $newTablesArray[$i]['svg_type'],
    //                         'svg_model' => $newTablesArray[$i]['svg_model'],
    //                         'total_seats' => $newTablesArray[$i]['total_seats'],
    //                         'r' => $newTablesArray[$i]['r'],
    //                         'cx' => $newTablesArray[$i]['cx'],
    //                         'cy' => $newTablesArray[$i]['cy'],
    //                         'd' => $newTablesArray[$i]['d'],
    //                         'created_at' =>  \Carbon\Carbon::now(),
    //                         'updated_at' => \Carbon\Carbon::now()
    //                     ]
    //                 );

    //             $table = DB::table('plan_tables')->where('svg_id', '=', $newTablesArray[$i]['svg_id'])->first();

    //             // Update plan_seats table
    //             if ($table->id) {
    //                 for ($j = 1; $j <= $newTablesArray[$i]['total_seats']; $j++) {
    //                     DB::table('plan_seats')
    //                         ->updateOrInsert(
    //                             [
    //                                 'plan_table_id' => $table->id,
    //                                 'svg_id' => 'table_' . $newTablesArray[$i]['svg_id'] . '_seat_' . $j,
    //                                 'seat_number' => $j,
    //                                 'created_at' =>  \Carbon\Carbon::now(),
    //                                 'updated_at' => \Carbon\Carbon::now()
    //                             ]
    //                         );
    //                 }
    //             }
    //         }
    //     }

    //     // 3) Delete tables
    //     $deletedTablesArray = $request->deletedTablesArray;
    //     for ($i = 0; $i < count($deletedTablesArray); $i++) {
    //         DB::table('plan_tables')->where('id', '=', $deletedTablesArray[$i]['id'])->delete();
    //     }

    //     // 3) Save new Plan as SVG images
    //     if ($request->newPlanSVG) {
    //         $newSvgFile = fopen('images/svg/plans/plan_1/plan_1.svg', 'w') or die('Unable to open file!');
    //         $newPlanSVG = $request->newPlanSVG;
    //         $write = fwrite($newSvgFile, $newPlanSVG);
    //         fflush($newSvgFile);
    //         fclose($newSvgFile);
    //     }

    //     // return redirect('/');
    //     // return redirect()->route('home');
    //     // return back();
    //     if ($write != false) {
    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'Table updated successfully.',
    //             // 'tablesArray' => $request->tablesArray,
    //             // 'newTablesArray' => $request->newTablesArray,
    //             'newPlanSVG' => $request->newPlanSVG,
    //             '$newTablesArray' => $newTablesArray,
    //             '$deletedTablesArray' => $deletedTablesArray
    //         ], 200);
    //     } else {
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => "Le plan n'a pas pu être sauvegardé",
    //             'newPlanSVG' => $request->newPlanSVG,
    //             '$newTablesArray' => $newTablesArray,
    //             '$deletedTablesArray' => $deletedTablesArray
    //         ], 500);
    //     }

    // }

    // protected function update3(Request $request) {
    //     // return view('/');
    //     // return View::make("home");
    //     // return view('home');
    //     $planSvgId = $request->planSvgId;

    //     // 3) Save new SVG Plan
    //     if ($request->newPlanSVG) {
    //         $newSvgFile = fopen('images/svg/plans/' . $planSvgId . '/' . $planSvgId . '.svg', 'w') or die('Unable to open file!');
    //         $newPlanSVG = $request->newPlanSVG;
    //         fwrite($newSvgFile, $newPlanSVG);
    //         fclose($newSvgFile);

    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'Plan updated successfully.',
    //             // '$newSvgFile' => $newSvgFile,
    //             '$newPlanSVG' => $newPlanSVG,
    //             '$planSvgId' => $planSvgId
    //         ], 200);
    //     } else {
    //         return response()->json([
    //             'status' => 'warning',
    //             'message' => 'No existing plan found.'
    //         ], 200);
    //     }

    // }

    protected function delete($svg_id) {
        $table = PlanTable::where('svg_id', '=', $svg_id)->first();

        $reservedSeat = false;
        foreach($table->seats as $seat) {
            if ($seat->is_reserved) {
                $reservedSeat = true;
            }
        }

        // Can only delete selected table if none of its seats is reserved
        if (!$reservedSeat) {
            // 1) Delete table
            $table->delete();
            // 2) Delete all seats related to the table
            foreach($table->seats as $seat) {
                $seat->delete();
            }
            // 3) Remove table from plan SVG
            unlink('images/svg/plans/' . $table->plan->svg_id . '/table_' . $svg_id . '.svg');

        // 4) Update plan SVG
        } else {
            return response()->json([
                'success' => false,
                'status' => 'error',
                'message' => 'There is at least one reserved seat.'
            ], 409);
        }

        return response()->json([
            'success' => false,
            'status' => 'success',
            'message' => 'Table deleted successfully.',
            '$table' => $table,
            '$table->plan' => $table->plan
        ], 200);
    }
}