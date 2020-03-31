@php
$config = [
    'appName' => config('app.name'),
    'locale' => $locale = app()->getLocale(),
    'locales' => config('app.locales'),
    'githubAuth' => config('services.github.client_id'),
];
@endphp
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <!-- Google Analytics -->
        <meta name="google-site-verification" content="NtU0rqtvklNaKelC1FlreOK4rj197P4v9YdXL8cSmzs" />

        <title>{{ config('app.name') }}</title>
        <!-- Favicon -->
        <link rel="icon" href="{{ asset('images/favicon_2019.png') }}" type="image/x-icon">
        <link rel="stylesheet" href="{{ mix('dist/css/app.css') }}">
        
        <style>
            .snip1189 {
                font-family: 'Raleway', Arial, sans-serif;
                text-align: center;
                text-transform: uppercase;
                font-weight: 500;
                height: 100px;
            }
            .snip1189 * {
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                -webkit-transition: all 0.35s ease;
                transition: all 0.35s ease;
            }
            .snip1189 li {
                display: inline-block;
                list-style: outside none none;
                margin: 0 1em;
                padding: 0;
                font-weight: bold;
                height: 100px;
                color: black;
                }
            .snip1189 a {
                padding: 0.5em 0.5em;
                margin: 0.2em 0;
                display: block;
                color: yellowgreen;
                position: relative;
                text-decoration: none;
            }
            .snip1189 a:before,
            .snip1189 a:after {
                height: 113px;
                width: 10px;
                position: absolute;
                content: '';
                -webkit-transition: all 0.35s ease;
                transition: all 0.35s ease;
                opacity: 0;
                color: black;
            }
            .snip1189 a:before {
                left: 0;
                top: 0;
                border-left: 5px solid black;
                border-top: 5px solid black;
                border-bottom: 5px solid black;
                -webkit-transform: translate(100%, 50%);
                transform: translate(100%, 50%);
            }
            .snip1189 a:after {
                right: 0;
                bottom: 0;
                border-right: 5px solid black;
                border-bottom: 5px solid black;
                border-top: 5px solid black;
                -webkit-transform: translate(-100%, -50%);
                transform: translate(-100%, -50%);
            }
            .snip1189 a:hover,
            .snip1189 .current a,
            .snip1189 .nocurrent a {
                color: black;
            }
            .snip1189 a:hover:before,
            .snip1189 .current a:before,
            .snip1189 a:hover:after,
            .snip1189 .current a:after {
                -webkit-transform: translate(0%, 0%);
                transform: translate(0%, 0%);
                opacity: 1;
            }
        </style>
        @yield('css')
    </head>
    <body>
        <div class="container">
            <ul class="snip1189" style="display: none;">
                <li class="current">
                    <span class="logo" style="letter-spacing: 10px; font-size: 1.3em">
                        <a href="/accueil">
                            <span style="color: black">
                                LA
                            </span>
                            <span style="color: yellowgreen">
                                P
                                <span style="letter-spacing: 0">
                                    A
                                </span>
                            </span></br>
                            <span style="color: yellowgreen">
                                REN
                                <span style="letter-spacing: 0">
                                    T
                                </span>
                            </span></br>
                            <span style="color: yellowgreen">
                                HES
                                <span style="letter-spacing: 0">
                                    E
                                </span>
                            </span>
                        </a>
                    </span>
                </li>
                <li class="nocurrent">
                    <a href="/qui-sommes-nous"></br></br>
                        QUI SOMMES-NOUS ?</br>
                        <span style="font-weight: 300; font-size: 12px; color: yellowgreen">
                            Histoire et membres
                        </span>
                    </a>
                </li>
                <li class="nocurrent">
                    <a href="/spectacles">
                        <span class="yellowgreen"></br></br>
                            SPECTACLES</br>
                            <span style="font-weight: 300; font-size: 12px; color: yellowgreen">
                                A venir et archives
                            </span>
                        </span>
                    </a>
                </li>
                <li class="nocurrent">
                    <a href="/reservation"></br></br></br>
                        RESERVATION
                    </a>
                </li>
                {{-- <li class="nocurrent">
                    <a href="/contact"></br></br>
                        CONTACT</br>
                        <span style="font-weight: 300; font-size: 12px; color: yellowgreen">
                            Formulaire, amis et partenaires
                        </span>
                    </a>
                </li> --}}
                <li class="nocurrent">
                    <a href="/admin"><br /><br />
                        ADMIN</br>
                    </a>
                </li>
            </ul>
            @yield('content')
        </div>
        
        <script>
            window.config = @json($config);
        </script>

        <script src="{{ mix('dist/js/app.js') }}"></script>

        @yield('scripts')

    </body>
</html>