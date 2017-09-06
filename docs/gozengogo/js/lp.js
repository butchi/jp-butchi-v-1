(function() {
	"use strict";
	var $left = $('.left-half');
	var $right = $('.right-half');
	if((new Date()).getHours() < 12) {
		$left.addClass('gozen');
		$right.addClass('gogo');
		$('.bg-left').addClass('gozen');
		$('.bg-right').addClass('gogo');
	} else {
		$left.addClass('gogo');
		$right.addClass('gozen');
		$('.bg-left').addClass('gogo');
		$('.bg-right').addClass('gozen');
	}
	var $rightObj = $left.children().clone();
	$right.prepend($rightObj);
})();