<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\DB;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')
		//          ->hourly();

  //       $host = '127.0.0.1';
  //       $port = 6001;
    
  //       $connection = @fsockopen($host, $port);
    
  //       if (is_resource($connection))
  //       {
  //           // $this->info('Websocket running!');
  //           fclose($connection);
  //       }
  //       else
  //       {
  //           // $this->info('Port is not responding. Starting server...');
  //           \Illuminate\Support\Facades\Artisan::call('websockets:serve');
		// }
		

		// $schedule->call(function () {
        //     $env_activate_websockets;
        //     if (env('ACTIVATE_WEBSOCKETS') == true) {
        //         $env_activate_websockets = true;
        //     } else {
        //         $env_activate_websockets = false;
        //     }
        
        //     DB::table('members')->where('id', '=', 1)->update(['phone' => $env_activate_websockets]);
		// 	return 'Schedule function called 2!';
		// })->everyMinute();
		

		// Laravel Websockets Up
		// $schedule->command('websockets:serve')->when(function () {
        //     $connection = @fsockopen('127.0.0.1', '6001');

        //     return !is_resource($connection);
        // })
		// 	->everyMinute()
		// 	->runInBackground()
		// 	->withoutOverlapping();


		
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
