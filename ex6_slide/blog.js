$(document).ready(function() {
  $('#blog ul li').each(function(){
    var list_item = $(this);
    list_item.find('h3').find('a').click(function(eventObject){
      eventObject.preventDefault();
      list_item.siblings().find('p').each(function() {
        $(this).slideUp("fast");
      });
      list_item.find('p').slideDown();
    });
  });
});