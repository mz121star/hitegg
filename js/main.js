$(function(){
    $(".main-box").css({"width":$(window).width() +"px" });
   var w=($(window).width()-$("#mcover img").width())/2 ;
    $("#mcover img").css({"left":w}).show() ;
    $(".main-box").css("top",($(window).height()-478)/3+"px")   ;
    $("#shape").css("top",($(window).height()-478)/3+420+"px")    ;

})

function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}
var a = document.cookie;
var jiangjin = a.match("jiang=([0-9]+)");

if (jiangjin && jiangjin[1]) {

    jiangjin = jiangjin[1];
    jiangjin = parseInt(jiangjin, 10);
    var _n1, _n2, _n3;
    _n1 = GetRandomNum(1, 30);
    _n2 = jiangjin - _n1 - GetRandomNum(1, 30);
    _n3 = jiangjin - _n1 - _n2;
    $(".num1").html(_n1);
    $(".num2").html(_n2);
    $(".num3").html(_n3);
    if( jiangjin==0){
        $(".num1").html("0");
        $(".num2").html("0");
        $(".num3").html("0");
    }
} else {
  //  document.getElementById('mcover').style.display='block';
}

var playAudio = function(url) {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', url);
    audioElement.setAttribute('preload', 'preload');

    $.get();

    audioElement.addEventListener("load",
        function() {
            audioElement.play();
        },
        true);
    audioElement.play();
}
function flyAudio() {
    playAudio("audio/fly.wav");
}
function hiteAudio() {
    playAudio("audio/break.wav");
} (function(jQuery) {

    jQuery.eventEmitter = {
        _JQInit: function() {
            this._JQ = jQuery(this);
        },
        emit: function(evt, data) { ! this._JQ && this._JQInit();
            this._JQ.trigger(evt, data);
        },
        once: function(evt, handler) { ! this._JQ && this._JQInit();
            this._JQ.one(evt, handler);
        },
        on: function(evt, handler) { ! this._JQ && this._JQInit();
            this._JQ.bind(evt, handler);
        },
        off: function(evt, handler) { ! this._JQ && this._JQInit();
            this._JQ.unbind(evt, handler);
        }
    };

} (jQuery));

var over = 0;
var jiangxiang = 0;
function App() {}
jQuery.extend(App.prototype, jQuery.eventEmitter);

var eggapp = new App();

$(".p").hide();
eggapp.on("zhongjiang",
    function(event, data) {
        $(".jiang1 .p1").hide();
        $(".p").hide();
        $(".infopic").hide();
        if (over == 1) {
            $(".jiang1").css({
                "top": "1000px",
                "opacity": "0"
            });
        }
        if (over == 3) {
            $(".jiang1").css({
                "top": "-200px",
                "opacity": "0"
            });
        }
        if (over == 2) {
            $(".jiang1").css({
                "top": "-200px",
                "opacity": "0"
            });
        }

        if (over == 1) {
            $(".jiang1 .p1").show();
        }
        if (over == 2) {
            $(".jiang1 .p2").show();
        }
        if (over == 3) {
            $(".jiang1 .p3").show();
            $(".p3").show().delay(1200).animate({
                    "font-size": "1.5rem"
                },
                1000);
        }

        $(".jiang1").show().delay(300).animate({
                "top": "0px",
                "left": "0px",
                "opacity": "1"
            },
            1000);

        window.setTimeout(function() {

                flyAudio();
            },
            500);
        window.setTimeout(function(){
            if(over<3)
            breakEgg.init();
            $("#hammer").show();
        },4000)

    });
var clicknum=1;
breakEgg.config({
    imgSrc: "images/a.png" ,
    hammer: "egg",
    x: 0,
    click: function(){
        $(".jiang1 .p1").hide();
       window.setTimeout(function(){
           $("#hammer").hide();

       },1000);
        if (over >= 3) return false;
        //hiteAudio();
        var num =clicknum;

        jiangxiang = num;

         window.setTimeout(function(){
             console.log(num);
             $(".e"+num).css("background-image", "url(img/e2.png)");
             clicknum++;
         },1000);

        over++;

        eggapp.emit("zhongjiang", {
            num: num
        });
    }
}).init();
