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
    "-webkit-transform-origin": "0 0"
  });
}

$(function(){

  var saitama_main = $("#saitama-main");

  //自動リサイズ
  fillDiv(saitama_main, true);
  if ("onorientationchange" in window) {
    $(window).on("orientationchange", function() { setTimeout(function() { fillDiv(saitama_main, true); }, 500) });
  } else if ("ondeviceorientation" in window) {
    $(window).on("deviceorientation", function() { setTimeout(function() { fillDiv(saitama_main, true); }, 500) });
  }
  $(window).on("resize", function() { fillDiv(saitama_main, true); });;

  //右クリック（ロングタップ）メニュー抑制
  saitama_main.on("contextmenu",
    function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  );

  //ホバーエミュレート
  $("._hover")
    .on('touchstart', function(){
       $(this).addClass('hover');
    }).on('touchend', function(){
       $(this).removeClass('hover');
  });

  //フルスクリーン
  $("#fullscreen").on("click",
    function(event) {
      $("body")[0].requestFullscreen();
      locker = screen.orientation.lock || screen.mozLockOrientation || screen.msLockOrientation || screen.lockOrientation;
      locker.call(screen.orientation.lock ? screen.orientation : screen, "landscape");
    }
  );
});