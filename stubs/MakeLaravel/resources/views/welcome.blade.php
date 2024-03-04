<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Description of this awesome app.">

    <title>{{ config('app.name') }}</title>
    <link rel="canonical"
          href="{{ url()->current() }}"/>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Alumni+Sans+Pinstripe&family=Rajdhani:wght@300;400;500;600&family=Roboto+Condensed:wght@300;400;700&display=swap"
          rel="stylesheet">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
          integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A=="
          crossorigin="anonymous" referrerpolicy="no-referrer"/>

    @include('_google-analytics')
    @include('_google-recaptcha')
    @vite('resources/js/app.js')
</head>
<body class="antialiased">
<div id="app">
    <h1>Your new app is ready</h1>
    <p>Build something awesome!</p>
    <o-button class="p-4 bg-blue-500 text-slate-200" @click="helloWorld()">Click me</o-button>
</div>
</body>
</html>
