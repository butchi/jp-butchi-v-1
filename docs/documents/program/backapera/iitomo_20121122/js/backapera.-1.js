/*
 * from backapera04
 */
(function(win, doc) {
  $slide = $('.slide');
  var len = $slide.length-1;
  var colorList = ['#F99','#9F9','#99F','#FF9','#F9F','#99F'];
  var currentPage = 0;
  init();
  setTimeout(changeHash, 0);
  
  $($slide[len]).bind('click', function(){
    console.log('hoeg');
    window.close();
  });
  
  function init() {
    var i;
    for(i=0; i<=len; i++) {
      $s = $($slide[i]);
      $s.css('z-index', len-i);
      $s.css('background-color', colorList[i%colorList.length]);
    }
  }
  
  function changeHash() {
    var i;
    for(i=len-1; i>=0; i--) {
      location.hash = '#a'+i;
    }
    setTimeout(setHashHandler, 0);
  }
  
  function setHashHandler() {
    onhashchange = function() {
      console.log(location.hash);
      if(location.hash=='') {
        var page = len;
      } else {
        var page = ~~location.hash.slice(2);
      }
      jump(page);
    }
  }
  
  function jump(page) {
    var style = getComputedStyle(document.body, '');
    var w = parseInt(style.width,10);
    if(page>currentPage) {
      var p;
      for(p=page-1; p>=currentPage; p--) {
        $s = $($slide[p]);
        $s.stop();
        $s.animate({left:w+'px'},1000, 'easeOutCubic');
      }
    } else if(page<currentPage) {
      var p;
      for(p=page; p<=currentPage; p++) {
        $s = $($slide[p]);
        $s.stop();
        $s.animate({left:0+'px'},1000, 'easeOutCubic');
      }
    }
    currentPage = page;
  }
})(window, document);