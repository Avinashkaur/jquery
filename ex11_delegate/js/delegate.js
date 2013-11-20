$(function() {
  var count = 0;
  $('#addButton').click(function() {
    var $div = $("<div></div>");
    $div.addClass('stackDiv').attr('id' , ++count).html('Stack item: ' + $div.attr('id')).insertAfter($(this));
  });
  $('body').delegate('div' , 'click' , function(){
    if(count == $(this).attr('id')) {
      $(this).remove();
      count--;
    }
    $(this).css('backgroundColor' , 'yellow');
  });
});