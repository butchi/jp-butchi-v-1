(function() {
  'use strict';

  // メインステージのコンテンツをズームエリアにコピー
  var $mainStage = $('[data-js-class~="main-stage"]');
  var $subContent = $mainStage.children().clone();
  $('[data-js-class~="sub-stage"]').append($subContent);

  var $fullElm = $('.full');

  var $sheep = $('[data-js-class~="sheep"]');
  var $zoom = $('[data-js-class~="zoom-container"]');
  var $blockZoom = $('[data-js-class~="block-zoom"]');
  var $blockClip = $('[data-js-class~="block-clip"]');

  var $count = $('[data-js-class~="count"]');

  var $lines = $('[data-js-class~="lines"]');
  var $lastLine = $('[data-js-class~="last-line"]');

  var $ksk = $('[data-js-class~="ksk"]');
  var $gnsk = $('[data-js-class~="gnsk"]');

  var rectRadius = 75;

  window.cnt = 0;

  var screenWidth;
  var screenHeight;

  var speed = 0;
  var intv = 1000;

  var isNight;

  $(document).on('deepen', function() {
    $('body').addClass('night');
  });
  $(document).on('dawn', function() {
    $('body').removeClass('night');
  });

  function nightQ() {
    var date = new Date();
    var hour = date.getHours();
    if(hour >= 0 && hour < 4) { // 0:00以降3:59以前
      return true;
    } else {
      return false;
    }
  }

  resizeHandler();

  setTimeout(timeoutHandler, intv);

  function timeoutHandler() {
    cnt++;
    $count.text(cnt);
    updateSheep();

    setTimeout(timeoutHandler, intv);
  }

  $count.on('DOMCharacterDataModified', function(evt) {
    cnt = parseInt($(this).text(), 10);
  });

  $(window).on('resize', resizeHandler);

  function resizeHandler() {
    screenWidth = $(window).width();
    screenHeight = $(window).height();
    updateSheep();
  }

  function updateSheep() {
    var sheepHeight = Math.floor(cnt / screenWidth);

    $lines.css({
      height: sheepHeight
    });
    $lastLine.css({
      top: sheepHeight,
      width: Math.floor(cnt % screenWidth)
    });

    var pageHeight = Math.max(screenHeight, sheepHeight + 1);
    $fullElm.height(pageHeight);

    var isNightTmp = nightQ();
    if(isNight !== isNightTmp) {
      if(isNightTmp) {
        $(document).trigger('deepen');
      } else {
        $(document).trigger('dawn');
      }
    }
    isNight = isNightTmp;
  }

  $('body').on('touchstart mousedown', zoomStartHandler);

  function zoomStartHandler(evt) {
    var touches = evt.originalEvent.touches | [];
    var touch = touches[0] | {};
    var x = touch.pageX || evt.pageX;
    var y = touch.pageY || evt.pageY;

    $('body').on('touchmove mousemove', zoomMoveHandler);
    $('body').on('touchend mouseup', zoomEndHandler);
    updateZoom(x, y);
    $zoom.show();
  }

  function zoomMoveHandler(evt) {
    var touches = evt.originalEvent.touches || [];
    var touch = touches[0] || {};
    var x = touch.pageX || evt.pageX;
    var y = touch.pageY || evt.pageY;

    updateZoom(x, y);
  }

  function zoomEndHandler(evt) {
    $('body').off('touchmove mousemove', zoomMoveHandler);
    $zoom.hide();
  }

  function updateZoom(x, y) {
    $blockZoom.css({
      'transform-origin': x + 'px ' + y + 'px',
      '-o-transform-origin': x + 'px ' + y + 'px',
      'msTransformOrigin': x + 'px ' + y + 'px',
      '-webkit-transform-origin': x + 'px ' + y + 'px'
    });

    $blockClip.css({
      'clip': 'rect(' + (y - rectRadius) + 'px,' + (x + rectRadius) + 'px,' + (y + rectRadius) + 'px,' + (x - rectRadius) + 'px)'
    });
  }

  $ksk.on('click', kskHandler);
  $gnsk.on('click', gnskHandler);

  function kskHandler() {
    speed++;
    setIntv();
  }

  function gnskHandler() {
    speed--;
    setIntv();
  }

  function setIntv() {
    intv = Math.pow(1.618, -speed) * 1000;
  }
}());
