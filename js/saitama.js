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
    .on('mouseenter', function(ev){
       alert($("html").css("cursor"));
    }).on('mouseleave', function(){
      alert("leave");
  });
});