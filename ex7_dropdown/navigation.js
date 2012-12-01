$(document).ready(function() {
  $('#nav li').each(function() {
    $(this).hover(function() {
      $(this).addClass("hover").find('ul').show();
    },
    function(){
      $(this).removeClass("hover").find('ul').hide();
    });
  });
});