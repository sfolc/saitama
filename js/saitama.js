//リサイズ
function fillDiv(div, proportional) {
  var currentWidth = div.outerWidth();
  var currentHeight = div.outerHeight();

  var availableHeight = window.innerHeight;
  var availableWidth = window.innerWidth;

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
    "-webkit-transform": "translate(" + translationX + "px, "
                                      + translationY + "px) scale3d("
                                      + scaleX + ", " + scaleY + ", 1)",
    "-webkit-transform-origin": "0 0",
    "transform": "translate(" + translationX + "px, "
                                      + translationY + "px) scale3d("
                                      + scaleX + ", " + scaleY + ", 1)",
    "transform-origin": "0 0"
  });
}

//初期化
$(function(){

  var saitama_main = $("#saitama-main");

  //自動リサイズ
  /*
  fillDiv(saitama_main, true);
  if ("onorientationchange" in window) {
    $(window).on("orientationchange", function() { setTimeout(function() { fillDiv(saitama_main, true); }, 500) });
  } else if ("ondeviceorientation" in window) {
    $(window).on("deviceorientation", function() { setTimeout(function() { fillDiv(saitama_main, true); }, 500) });
  }
  $(window).on("resize", function() { fillDiv(saitama_main, true); });;
  */
 
  //右クリック（ロングタップ）メニュー抑制
  saitama_main.on("contextmenu",
    function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  );

  //ホバーエミュレート
  $("html").on("touchstart", function(event){return false});
  var leaves = {};
  $(".hover")
    .on("touchstart", function(event){
      event.stopPropagation();
      for (i=0; i<event.changedTouches.length; i++) {
        touch = event.changedTouches[i];
        leaves[touch.identifier] = false;
      }
      $(this).addClass('_hover');
    })
    .on("touchend touchcancel touchmove", function(event){
      event.stopPropagation();
      leaveall = true;
      for (i=0; i<event.targetTouches.length; i++) {
        touch = event.targetTouches[i];
        if (!leaves[touch.identifier] && document.elementFromPoint(touch.pageX, touch.pageY) === this) {
          leaveall = false;
        } else {
          leaves[touch.identifier] = true;
        }
      }
      if (leaveall)
        $(this).removeClass("_hover");
    });

});

$(window).on("load", function(){

});