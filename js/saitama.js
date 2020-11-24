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
});