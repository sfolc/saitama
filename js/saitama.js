$(function(){

  //右クリック（ロングタップ）メニュー抑制
  $("#saitama-main").on("contextmenu",
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
      locker("landscape");
    }
  );
});