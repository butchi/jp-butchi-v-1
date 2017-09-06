(function() {
	"use strict";
	var $areaPanel = $('.area-panel');
	var $btnClose = $('.btnClose');
	var $txtDefault = $('.area-panel .default');
	var $log = $('.log');
	var debugNum = 7;
	var debugCnt = debugNum;

	//localStorage.removeItem('log');
	$log.append(localStorage.getItem('log'));

	$('.area-select li').click(function(e) {
		var answer = $(this).attr('data-label');
		$areaPanel.find('.label').html($(this).html());
		$areaPanel.attr('data-select', answer);
		$btnClose.removeClass('hide');
		$txtDefault.addClass('hide');
		log(answer);
	});

	$('.btnClose').click(function(e) {
		$areaPanel.attr('data-select', 'x');
		$areaPanel.find('.label').html('');
		$btnClose.addClass('hide');
		$txtDefault.removeClass('hide');
	});

	$('.area-panel').click(function(e) {
		if($log.is(':visible')) {
			$log.hide();
			debugCnt = debugNum;
		}
		if($(this).attr('data-select')=='x') {
			debugCnt--;
			if(debugCnt<=0) {
				$log.show();
			}
			//console.log(debugCnt);
		}
	});

	function log(answer) {
		var now = new Date();
		var h = now.getHours();
		if(h < 10) {
			h = '0' + h;
		}
		var m = now.getMinutes();
		if(m < 10) {
			m = '0' + m;
		}
		var s = now.getSeconds();
		if(s < 10) {
			s = '0' + s;
		}
		var nowStr = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 'T' + h + ':' + m + ':' + s;
		$log.prepend('<li>'+nowStr + ' <span data-select='+answer+'>'+answer.toUpperCase()+'</span>'+'</li>');
		localStorage.setItem('log', $log.html())
	}
})();