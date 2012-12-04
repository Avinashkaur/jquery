$(function() {
  var count = 0;
  $('#addButton').click(function() {
    var $div = $("<div></div>");
    $div.addClass('stackDiv');
    $div.attr('id' , count);
    $div.html('Stack item: ' + $div.attr('id'));
    $div.insertAfter("#startingDiv");
    count++;
  });
  $('#container').delegate('div' , 'click' , function(){
    var stackTop = $(".stackDiv").length;
    var currentItem = parseInt($(this).attr('id')) + 1;
    if (stackTop == currentItem) {
      count--;
      $(this).remove();
      $('#displayMessage').html('Stack top is now:' + (count-1));
    }
    $(this).css('backgroundColor' , 'yellow').siblings().each(function() {
      $(this).css('backgroundColor' , 'white');
    });
  });
$('#startingDiv').appendTo('#container');
});