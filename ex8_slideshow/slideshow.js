$(document).ready(function() {
  var i = 0;
  $("#slideshow li").hide();
  function slider() {
    if(i == 3) {
      i = 0;
    }
    $("#pageNo").addClass("showNo").text(i+1);
    $("#slideshow li").eq(i).fadeIn(1000).delay(1000).fadeOut(1000,function() { slider()});
    i++;
  }
  slider();
});