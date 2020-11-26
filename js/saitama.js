function getDef(obj, key, def=null) {
  return key in obj ? obj.getItem(key) : def;
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
    .on("touchstart", function(event){
      for (i=0; i<event.changedTouches.length; i++) {
        leaves[event.changedTouches[i].identifier] = false;
      }
      $(this).addClass('_hover');
    })
    .on("touchend touchcancel touchmove", function(event){
      var leaveall = true;
      for (i=0; i<event.targetTouches.length; i++) {
        let touch = event.targetTouches[i];
        if (!leaves[touch.identifier] && document.elementFromPoint(touch.pageX, touch.pageY) === this) {
          leaveall = false;
        } else {
          leaves[touch.identifier] = true;
        }
      }
      if (leaveall)
        $(this).removeClass("_hover");
    });

    
  $("#saitama-optinos-soundvolume").val(getDef(localStorage, "soundvolume", 50));
  $("#saitama-optinos-textspeed").val(getDef(localStorage, "textspeed", 50));
  $("#saitama-optinos-soundvolume2").val(getDef(localStorage, "soundvolume2", 50));

  $("#saitama-title-menu-options").on("click", () => {
    $("#saitama-options").show(500);
  })

  $("#saitama-options-ok").on("click", () => {
    localStorage.soundvolume = $("#saitama-optinos-soundvolume").val();
    localStorage.textspeed = $("#saitama-optinos-textspeed").val();
    localStorage.soundvolume2 = $("#saitama-optinos-soundvolume2").val();
    $("#saitama-options").hide(500);
  })
  
  $("#saitama-options-cancel").on("click", () => {
    $("#saitama-optinos-soundvolume").val(getDef(localStorage, "soundvolume", 50));
    $("#saitama-optinos-textspeed").val(getDef(localStorage, "textspeed", 50));
    $("#saitama-optinos-soundvolume2").val(getDef(localStorage, "soundvolume2", 50));
    $("#saitama-options").hide(500);
  })

});

//リソースロード終了
$(window).on("load", function(){

});

