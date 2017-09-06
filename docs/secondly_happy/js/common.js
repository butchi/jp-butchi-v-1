$(document).ready(function(){
	$(".content:not(" + "#" + $("#menu .now").attr("id") + "on)" ).css("display" , "none");
	$("#menu p").click(function(){
		$("#menu p").removeClass("now");
		$(this).addClass("now");
		$(".content").hide();
		$("#" + $(this).attr("id") + "on").show();
	});
});