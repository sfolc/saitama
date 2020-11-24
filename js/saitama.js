$(function(){

  $("#saitama-main").on("contextmenu",
    function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  );
  
});