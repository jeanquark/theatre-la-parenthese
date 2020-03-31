<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanSeatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plan_seats', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('plan_table_id');
            $table->foreign('plan_table_id')->references('id')->on('plan_tables')->onDelete('cascade');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('seat_number');
            $table->string('svg_id');
            $table->boolean('is_reserved')->default(0);
            $table->enum('status', ['pre_reservation', 'confirmation_pending', 'reservation_confirmed', 'reservation_rejected'])->nullable();
            $table->integer('price')->nullable();
            $table->text('remarks')->nullable();
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
        Schema::dropIfExists('plan_seats');

    }
}
