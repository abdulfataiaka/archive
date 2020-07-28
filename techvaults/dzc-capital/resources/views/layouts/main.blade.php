<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Page icon and title -->
    <link rel="icon" href="@image(favicon.png)">
    <title>@yield('title', 'App') | DZC Capital</title>

    <!-- CSS stylesheet files -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap"
    >

    <link
      rel="stylesheet"
      crossorigin="anonymous"
      integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    >

    <link rel="stylesheet" href="@css(main)" type="text/css">

    @section('style')
    @show
</head>
<body>
    @section('content')
    @show

    <!-- Javascript files -->
    <script src="@js(main)"></script>
    @section('script')
    @show
</body>
</html>
