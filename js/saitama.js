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
    .on('mouseenter touchstart', function(){
      alert("on");
       $(this).addClass('hover');
    }).on('mouseleave touchend', function(){
      alert("off");
       $(this).removeClass('hover');
  });
});