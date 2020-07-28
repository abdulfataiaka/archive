@extends('layouts.main')

@section('title', 'Authentication')

@section('style')
<link rel="stylesheet" type="text/css" href="@css(auth)">
@endsection

@section('content')
<header>
  <div>
    <img src="@image(logo.png)" alt="page-logo">

    <button type="button" class="xbutton">
      Register
    </button>
  </div>
</header>

<section>
  <div class="overview">
    <div class="centered">
      <p>Welcome to our customer relationship management system.</p>

      <div class="heading">
        Below are some of the services we provide to support our clients
      </div>

      <div class="check-item">
        <i class="fa fa-check"></i>
        <span>Dynamically managing account details</span>
      </div>

      <div class="check-item">
        <i class="fa fa-check"></i>
        <span>Tracking investment returns</span>
      </div>

      <div class="check-item">
        <i class="fa fa-check"></i>
        <span>Monitoring account activities</span>
      </div>

      <div class="check-item">
        <i class="fa fa-check"></i>
        <span>Realtime support from our helpdesk</span>
      </div>

      <div class="heading">
        Interested in knowing more about us? We are just a button click away
      </div>

      <a href="https://dzccapital.com" target="blank">
        <span class="link-button">Visit our website</span>
      </a>
    </div>
  </div>

  <div class="form">
    <div class="centered">
      <h1>LOGIN TO CONTINUE</h1>

      <div class="xfield">
        <label>Email Address</label>

        <div class="cxfield">
          <span><i class="fa fa-envelope"></i></span>
          <input type="text" placeholder="Enter your email address">
        </div>
      </div>

      <div class="xfield">
        <label>Password</label>

        <div class="cxfield">
          <span><i class="fa fa-eye"></i></span>
          <input type="password" placeholder="Enter your password">
        </div>
      </div>

      <div class="base">
        <button type="button" class="xbutton">
          Login
        </button>

        <span>
          <a href="#">Forgot Password</a>
        </span>
    </div>
  </div>
</section>
@endsection

@section('script')
<script src="@js(auth)"><script>
@endsection
