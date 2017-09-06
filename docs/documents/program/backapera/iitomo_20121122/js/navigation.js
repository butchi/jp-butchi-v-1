location.href = '#s0';

var currentSlide = 0;
$slide = $('.slide');
var i;
for(i=0; i<$slide.length; i++) {
  $($slide[i]).attr('id', 's'+i);
}

function next() {
  goto(++currentSlide);
}

function goto(n) {
  location.href = '#s' + n;
}

// ブラウザバック時に現在のスライドをセット
onhashchange = function() {
  console.log(location.hash);
  if(location.hash=='') {
    currentSlide = 0;
    console.log($('html, body').scrollTop());
  } else {
    currentSlide = ~~location.hash.slice(2);
  }
}
