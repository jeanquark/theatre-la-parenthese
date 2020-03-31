<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tables', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('svg_id')->unique();
            $table->string('name')->nullable();
            $table->string('image')->nullable();
            $table->string('svg_type');
            $table->string('svg_model')->nullable();
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
        Schema::dropIfExists('tables');
    }
}
