$(function(){

  //右クリック（ロングタップ）抑制
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
       $(this).addClass('hover');
    }).on('mouseleave touchend', function(){
       $(this).removeClass('hover');
  });
});