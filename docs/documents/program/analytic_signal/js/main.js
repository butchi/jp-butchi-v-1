navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

var width = 256;
var height = 256;

var kernelLen = 127;
var amp = 128;

function initialize() {

    var audioElm = document.getElementById("audio");
    // var frequencyElement = document.getElementById("frequency");
    var canvasElm = document.getElementById("canvas");
    // var frequencyContext = frequencyElement.getContext("2d");
    var canvasContext = canvasElm.getContext("2d");

    // frequencyElement.width = width;
    // frequencyElement.height = height;
    canvasElm.width = width;
    canvasElm.height = height;

    if(navigator.getUserMedia) {
        log('getUserMedia');
        navigator.getUserMedia(
            {audio : true},
            function(stream) {
                log('success to get stream');

                var url = URL.createObjectURL(stream);
                audioElm.src = url;
                audioElm.volume = 0;
                var audioContext = new AudioContext();
                var mediastreamsource = audioContext.createMediaStreamSource(stream);
                var analyser = audioContext.createAnalyser();
                var frequencyData = new Uint8Array(analyser.frequencyBinCount);
                var timeDomainData = new Uint8Array(analyser.frequencyBinCount);
                mediastreamsource.connect(analyser);

                var animation = function(){

                    analyser.getByteFrequencyData(frequencyData);
                    analyser.getByteTimeDomainData(timeDomainData);

                    // frequencyContext.clearRect(0, 0, width, height);
                    // frequencyContext.beginPath();
                    // frequencyContext.moveTo(0, height - frequencyData[0]);
                    // for (var i = 1, l = frequencyData.length; i < l; i++) {
                    //  frequencyContext.lineTo(i, height - frequencyData[i]);
                    // }
                    // frequencyContext.stroke();

                    var hzUnit = audioContext.sampleRate / analyser.fftSize; // frequencyData 1つあたりの周波数
                    var hz = maxIndexOf(frequencyData) * hzUnit;
                    var octave = Math.log(hz/243) / Math.log(2);
                    var hue = mod(octave, 1) * 360;

                    var i;
                    canvasContext.clearRect(0, 0, width, height);
                    canvasContext.strokeStyle = tinycolor({ h: hue, s: 100, v: 100 }).toRgbString();
                    canvasContext.beginPath();

                    for (var i = kernelLen, l = timeDomainData.length - kernelLen; i < l; i++) {
                        var hilbTmp = 0;
                        for(k = -kernelLen; k <= kernelLen; k++) {
                            hilbTmp += inv(k) * (normalize(timeDomainData[i + k]) || 0);
                        }
                        var x = width/2 + amp * normalize(timeDomainData[i]);
                        var y = height/2 - amp * hilbTmp;
                        canvasContext.lineTo(x, y);
                    }
                    canvasContext.stroke();

                    requestAnimationFrame(animation);
                };

                animation();

            },
            function(err) {
                log("The following error occured: " + err);
            }
        );
    } else {
        log("getUserMedia not supported");
    }
}

function inv(n) {
    if(n === 0) {
        return 0;
    } else {
        return 1 / (n * Math.PI);
    }
}

function normalize(val) {
    return (val - 128) / 128;
}

function maxIndexOf(arr) {
    return _.indexOf(arr, _.max(arr));
}

// from http://shnya.jp/blog/?p=323
function mod(i, j) {
    return i % j + ((i < 0) ? j : 0);
}

function log(txt) {
    $('.log').append('<p>'+txt+'</p>');
}
window.addEventListener("load", initialize, false);