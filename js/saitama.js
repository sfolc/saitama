
//範囲バリデーション
function validRangeInt(val, vmin, vmax, def=null) {
    val = parseInt(val);
    if (def === null) def = vmin;
    if (isNaN(val)) return def;
    if (val < vmin) return vmin;
    if (val > vmax) return vmax;
    return val;
}

//リサイズ
function fillDiv(div, proportional) {
  var currentWidth = div.outerWidth();
  var currentHeight = div.outerHeight();

  var availableHeight = $(window).height();
  var availableWidth = $(window).width();

  var scaleX = availableWidth / currentWidth;
  var scaleY = availableHeight / currentHeight;

  if (proportional) {
    scaleX = Math.min(scaleX, scaleY);
    scaleY = scaleX;
  }

  var translationX = Math.round((availableWidth - (currentWidth * scaleX)) / 2);
  var translationY = Math.round((availableHeight - (currentHeight * scaleY)) / 2);
  div.css({
    "position": "fixed",
    "left": "0px",
    "top": "0px",
    "transform": "translate(" + translationX + "px, "
                                      + translationY + "px) scale3d("
                                      + scaleX + ", " + scaleY + ", 1)",
    "transform-origin": "0 0"
  });
}

//初期化
$(() => {

  var saitama_main = $("#saitama-main");
  var clickprotector = $("#saitama-clickprotector");

  //自動リサイズ
  fillDiv(saitama_main, true);
  if ("onorientationchange" in window) {
    $(window).on("orientationchange", () => { setTimeout(() => { fillDiv(saitama_main, true); }, 500); });
  } else if ("ondeviceorientation" in window) {
    $(window).on("deviceorientation", () => { setTimeout(() => { fillDiv(saitama_main, true); }, 500); });
  }
  $(window).on("resize", () => { fillDiv(saitama_main, true); });;

  //右クリック（ロングタップ）メニュー抑制
  saitama_main.on("contextmenu", () => false);

  //ホバーエミュレート
  var leaves = {};
  $(".hover")
    .on("touchstart", (event) => {
      for (i=0; i<event.changedTouches.length; i++) {
        leaves[event.changedTouches[i].identifier] = false;
      }
      $(event.target).addClass('_hover');
    })
    .on("touchend touchcancel touchmove", (event) => {
      var leaveall = true;
      for (i=0; i<event.targetTouches.length; i++) {
        let touch = event.targetTouches[i];
        if (!leaves[touch.identifier] && document.elementFromPoint(touch.pageX, touch.pageY) === event.target) {
          leaveall = false;
        } else {
          leaves[touch.identifier] = true;
        }
      }
      if (leaveall)
        $(event.target).removeClass("_hover");
    });

  
  //タイトルメニュー動作定義
  //はじめから
  $("#saitama-title-menu-start").on("click", () => {
  })

  //つづきから
  $("#saitama-title-menu-continue").on("click", () => {
    clickprotector.show();
    $("#saitama-loaddata").show(500, ()=>{clickprotector.hide()});
})

  //オプション
  $("#saitama-title-menu-options").on("click", () => {
    clickprotector.show();
    $("#saitama-optinos-soundvolume").val(validRangeInt(localStorage.soundvolume, 0, 100, 50));
    $("#saitama-optinos-textspeed").val(validRangeInt(localStorage.textspeed, 0, 100, 50));
    $("#saitama-optinos-soundvolume2").val(validRangeInt(localStorage.soundvolume2, 0, 100, 50));
    $("#saitama-options").show(500, ()=>{clickprotector.hide()});
  })

  //オプションウィンドウ動作定義
  $("#saitama-options-ok").on("click", () => {
    clickprotector.show();
    localStorage.soundvolume = validRangeInt($("#saitama-optinos-soundvolume").val(), 0, 100, 50);
    localStorage.textspeed = validRangeInt($("#saitama-optinos-textspeed").val(), 0, 100, 50);
    localStorage.soundvolume2 = validRangeInt($("#saitama-optinos-soundvolume2").val(), 0, 100, 50);
    $("#saitama-options").hide(500, ()=>{clickprotector.hide()});
  })
});

//リソースロード終了
$(window).on("load", () => {
  if (document.styleSheets[0].cssRules.length > 0) {
    $("#saitama-title").show(0, ()=>{
      setTimeout(()=>{
        $("#saitama-loading").hide();
        $("#saitama-clickprotector").hide();
      }, 500);
    });
  }
});
