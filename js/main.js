
var  playAudio=function(url) {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', url);
    audioElement.setAttribute('preload', 'preload');

    $.get();

    audioElement.addEventListener("load", function() {
        audioElement.play();
    }, true);
    audioElement.play();
    }
 function flyAudio(){
    playAudio("audio/fly.wav");
}
 function hiteAudio(){
    playAudio("audio/break.wav");
}
(function (jQuery) {

    jQuery.eventEmitter = {
        _JQInit: function () {
            this._JQ = jQuery(this);
        },
        emit: function (evt, data) {
            !this._JQ && this._JQInit();
            this._JQ.trigger(evt, data);
        },
        once: function (evt, handler) {
            !this._JQ && this._JQInit();
            this._JQ.one(evt, handler);
        },
        on: function (evt, handler) {
            !this._JQ && this._JQInit();
            this._JQ.bind(evt, handler);
        },
        off: function (evt, handler) {
            !this._JQ && this._JQInit();
            this._JQ.unbind(evt, handler);
        }
    };

    }(jQuery));

var over = 0;
var jiangxiang = 0;
function App() {
 }
jQuery.extend(App.prototype, jQuery.eventEmitter);

var eggapp = new App();
$(".egga").one("click", function (e) {

    if (over > 3)
    return false;
   hiteAudio();
    var num = $(this).data("num");
    if(num==3){
        $(".chui img").attr("src","img/chui2.png");
    }
    else{
        if($(".chui img").attr("src")=="img/chui2.png")
            $(".chui img").attr("src","img/chui1.png");
    }
    jiangxiang = num;

    var a = $(".eggb" + num);


    var l, t;
    l = $(this).offset().left;
    t = $(this).offset().top;

    console.log(l + ";;" + t)
    $(".chui").addClass("chuiaddw").addClass("chuiadd");
    if(num==3){
        l="a";
    }


    $(".chui").animate({//锤子动画
    "top": t - 25,
    "left": l + 25

    }, 0, function () {

    var i =2;
        $(a).parent().css("-webkit-animation-name","none");
    var inter = window.setInterval(function () {
    $(a).css("background-image", "url(img/d10" + i + "1.png)");
    i++;
    if (i == 8) {
    window.clearInterval(inter);

         $(".chui").removeClass("chuiaddw").removeClass("chuiadd");
    }
    }, 100);

    over = over + 1;
    }).animate({
    "top": t - 50,
    "left": l + 65,
    "-webkit-transform": "rotateZ(0deg)"
    }, 30);

    eggapp.emit("zhongjiang", {num: num});
    });
$(".p").hide();
eggapp.on("zhongjiang", function (event, data) {
    $(".p").hide();
    $(".infopic").hide();
    if (over == 1 || over == 3) {
    $(".jiang1").css({ "top": "-200px", "opacity": "0" });
    }
    if (over == 2) {
    $(".jiang1").css({ "left": "-600px", "opacity": "0" });
    }


    if (over == 1) {
    $(".jiang1 .p1").show();
    }
    if (over == 2) {
    $(".jiang1 .p2").show();
    }
    if (over == 3) {
    $(".jiang1 .p3").show();
    }

    $(".jiang1").show().delay(300).animate({
    "top": "0px",
    "left": "0px",
    "opacity": "1"
    }, 1000);
    window.setTimeout(function () {

       flyAudio();
    }, 500);
    });


