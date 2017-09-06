$(function(){
     $(".secondly").click(function(){
         window.location=$(this).find("a").attr("href");
         return false;
    });
     $(".hourly").click(function(){
         window.location=$(this).find("a").attr("href");
         return false;
    });
         $(".daily").click(function(){
         window.location=$(this).find("a").attr("href");
         return false;
    });
});

