function GetRandomNum(b, d) {
    var e = d - b;
    var c = Math.random();
    return(b + Math.round(c * e))
}
var a = document.cookie;
var jiangjin = a.match("jiang=([0-9]+)");
console.log(jiangjin);
if (jiangjin && jiangjin[1]) {
    jiangjin = jiangjin[1];
    jiangjin = parseInt(jiangjin, 10);
    var _n1, _n2, _n3;
    _n1 = GetRandomNum(1, 30);
    _n2 = jiangjin - _n1 - GetRandomNum(1, 30);
    _n3 = jiangjin - _n1 - _n2;
    $(".num1").html(_n1);
    $(".num2").html(_n2);
    $(".num3").html(_n3)
} else {
    alert("奖金为0")
}
var playAudio = function (b) {
    var c = document.createElement("audio");
    c.setAttribute("src", b);
    c.setAttribute("preload", "preload");
    $.get();
    c.addEventListener("load", function () {
        c.play()
    }, true);
    c.play()
};
function flyAudio() {
    playAudio("audio/fly.wav")
}
function hiteAudio() {
    playAudio("audio/break.wav")
}
(function (b) {
    b.eventEmitter = {_JQInit: function () {
        this._JQ = b(this)
    }, emit: function (c, d) {
        !this._JQ && this._JQInit();
        this._JQ.trigger(c, d)
    }, once: function (c, d) {
        !this._JQ && this._JQInit();
        this._JQ.one(c, d)
    }, on: function (c, d) {
        !this._JQ && this._JQInit();
        this._JQ.bind(c, d)
    }, off: function (c, d) {
        !this._JQ && this._JQInit();
        this._JQ.unbind(c, d)
    }}
}(jQuery));
var over = 0;
var jiangxiang = 0;
function App() {
}
jQuery.extend(App.prototype, jQuery.eventEmitter);
var eggapp = new App();
$(".egga").one("click", function (g) {
    if (over > 3) {
        return false
    }
    hiteAudio();
    var d = $(this).data("num");
    if (d == 3) {
        $(".chui img").attr("src", "img/chui2.png")
    } else {
        if ($(".chui img").attr("src") == "img/chui2.png") {
            $(".chui img").attr("src", "img/chui1.png")
        }
    }
    jiangxiang = d;
    var c = $(".eggb" + d);
    var b, f;
    b = $(this).offset().left;
    f = $(this).offset().top;
    console.log(b + ";;" + f);
    $(".chui").addClass("chuiaddw").addClass("chuiadd");
    if (d == 3) {
        b = "a"
    }
    $(".chui").animate({"top": f - 25, "left": b + 25}, 0,function () {
        var h = 2;
        $(c).parent().css("-webkit-animation-name", "none");
        var e = window.setInterval(function () {
            $(c).css("background-image", "url(img/d10" + h + "1.png)");
            h++;
            if (h == 8) {
                window.clearInterval(e);
                $(".chui").removeClass("chuiaddw").removeClass("chuiadd")
            }
        }, 100);
        over = over + 1
    }).animate({"top": f - 50, "left": b + 65, "-webkit-transform": "rotateZ(0deg)"}, 30);
    eggapp.emit("zhongjiang", {num: d})
});
$(".p").hide();
eggapp.on("zhongjiang", function (b, c) {
    $(".p").hide();
    $(".infopic").hide();
    if (over == 1) {
        $(".jiang1").css({"top": "1000px", "opacity": "0"})
    }
    if (over == 3) {
        $(".jiang1").css({"top": "-200px", "opacity": "0"})
    }
    if (over == 2) {
        $(".jiang1").css({"top": "-200px", "opacity": "0"})
    }
    if (over == 1) {
        $(".jiang1 .p1").show()
    }
    if (over == 2) {
        $(".jiang1 .p2").show()
    }
    if (over == 3) {
        $(".jiang1 .p3").show();
        $(".p3").show().delay(1200).animate({"font-size": "2rem"}, 1000)
    }
    $(".jiang1").show().delay(300).animate({"top": "0px", "left": "0px", "opacity": "1"}, 1000);
    window.setTimeout(function () {
        flyAudio()
    }, 500)
});