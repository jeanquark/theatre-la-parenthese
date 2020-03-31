<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plans', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->unsignedBigInteger('performance_id');
			$table->foreign('performance_id')->references('id')->on('performances')->onDelete('cascade');
			$table->string('svg_id');
			$table->string('name');
			$table->string('slug');
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
        Schema::dropIfExists('plans');
    }
}
