<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plan_tables', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->unsignedBigInteger('plan_id');
			$table->foreign('plan_id')->references('id')->on('plans')->onDelete('cascade');
            $table->string('svg_id');
            $table->string('svg_type');
            $table->string('svg_model')->nullable();
            $table->string('table_number');
            $table->decimal('r', 10, 6)->nullable();
            $table->decimal('cx', 10, 6)->nullable();
            $table->decimal('cy', 10, 6)->nullable();
			$table->text('d')->nullable();
			$table->integer('total_seats')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('plan_tables');
    }
}
