(function() {
	"use strict";
	var t = new Date();
	var sec = t.getSeconds();
	var secOld;

	var $body = $('body');
	var $clock = $('.clock');
	var $hour = $clock.find('.hour');
	var $minute = $clock.find('.minute');
	var $second = $clock.find('.second');

	$body.on('secchange', function() {
		$second.attr('transform', 'rotate('+sec*360/60+')');
		$minute.attr('transform', 'rotate('+(t.getMinutes() + sec/60)*360/60+')');
		$hour.attr('transform', 'rotate('+(t.getHours()%12 + t.getMinutes()/60)*360/12+')');
		if(t.getMinutes() === 0 && t.getSeconds() === 0) {
			if(t.getHours() === 0 || t.getHours() === 12) {
				var $gozen = $('.gozen');
				var $gogo = $('.gogo');
				$gozen.removeClass('gozen').addClass('gogo');
				$gogo.removeClass('gogo').addClass('gozen');
			}
		}
	});

	function init() {
		window.setInterval(function() {
			secOld = sec;
			t = new Date();
			sec = t.getSeconds();
			if(sec !== secOld) {
				$body.trigger('secchange');
			}
		}, 10);

		$body.trigger('secchange');
	}

	init();
})();