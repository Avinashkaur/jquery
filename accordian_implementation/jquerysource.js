$(document).ready(function() {
  var $listItem = $('li:not(:has(ul))');
  var number = 0;
  $listItem.each(function(index){
    $(this).attr("id",number);
    $(this).find("a").attr("href","allornone.html?"+number);
    number++;
  });
});
