$(function () {

    $(".recipe-div,.recipe").mouseover(function () {
        $(this).find(".overlay,.overlay-top").css('display', 'block');
    });
    $(".recipe-div,.recipe").mouseout(function () {
        $(this).find(".overlay,.overlay-top").css('display', 'none');
    });
    //  to scroll the page to top
    $("#pageToTop").click(function () {
        $("html,body").animate({ scrollTop: 0 }, 300, "linear");
    });

    //  Show view recipe modal
    $(".viewRecipeModalShow").click(function () {
        $("#main-overlay").css("display", "block");
        $("#main-overlay-top").css("display", "block");
        $("#viewRecipeWhitebox").css("display", "block");
    });
    
    //  Show add recipe modal
    $("#addRecipeModalShow").click(function () {
        $("#main-overlay").css("display", "block");
        $("#main-overlay-top").css("display", "block");
        $("#addRecipeWhitebox").css("display", "block");
    });

    //  Show add recipe modal
    $(".confirmOpsModalShow").click(function () {
        $("#main-overlay").css("display", "block");
        $("#main-overlay-top").css("display", "block");
        $("#confirmOpsWhitebox").css("display", "block");
    });
    
    //  Show signin modal
    $("#signInModalShow").click(function () {
        $("#main-overlay").css("display", "block");
        $("#main-overlay-top").css("display", "block");
        $("#signInWhiteBox").css("display", "block");
    });

    //  Hide white box
    $("#main-overlay-top,.closeModal").click(function (e) {
        if ($(this).is(e.target)) {
            $("#main-overlay,#main-overlay-top").css("display", "none");
            $(".main-whitebox,.container-whitebox").css("display", "none");
        }
    });

    //  Shoe signup modal
    $("#signUpModalShow").click(function () {
        $("#main-overlay").css("display", "block");
        $("#main-overlay-top").css("display", "block");
        $("#signUpWhiteBox").css("display", "block");
    });

    $("#sm-nav").hide();
    $("#header-navbut").click(function(){
        if($("#sm-nav").css("display") === "none"){
            $("#header-navbut i").removeClass("fa-bars").addClass("fa-times");
        }
        else{
            $("#header-navbut i").addClass("fa-bars").removeClass("fa-times");
        }
        $("#sm-nav").slideToggle(100);
    });
});