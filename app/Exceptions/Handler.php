<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Response;
use Auth;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        // return parent::render($request, $exception);
       //  if ($exception){
       //      return response()->json([
       //          'success' => false,
       //          // 'code' => $exception->getCode(),
       //          'error' => $exception->getMessage()
       //      ]);
       // }

       $userLevelCheck = $exception instanceof \jeremykenedy\LaravelRoles\App\Exceptions\RoleDeniedException ||
            $exception instanceof \jeremykenedy\LaravelRoles\App\Exceptions\RoleDeniedException ||
            $exception instanceof \jeremykenedy\LaravelRoles\App\Exceptions\PermissionDeniedException ||
            $exception instanceof \jeremykenedy\LaravelRoles\App\Exceptions\LevelDeniedException;

        if ($userLevelCheck) {

            if ($request->expectsJson()) {
                return Response::json(array(
                    'error'    =>  403,
                    'message'   =>  "Unauthorized. " . $exception->getMessage(),
                    '$exception->getCode()' => $exception->getCode(),
                    '$exception->getMessage()' => $exception->getMessage(),
                    '$userLevelCheck' => $userLevelCheck,
                    'Auth::user()' => Auth::user()
                ), 403);
            }

            abort(403);
        }

        return parent::render($request, $exception);

    }

    /**
     * Convert an authentication exception into a response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Illuminate\Http\Response
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        return $request->expectsJson()
                    ? response()->json(['message' => $exception->getMessage()], 401)
                    : redirect()->guest(url('/login'));
    }
}
