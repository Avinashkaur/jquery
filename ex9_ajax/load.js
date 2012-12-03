$(document).ready(function() {
  var $headings = $('#blog ul li h3');
  $headings.each(function(elementNum){
    var $div = $("<div></div>").insertAfter($(this)).addClass("externalContent");
    $(this).data("loadContent" , $div);
  });
  $headings.click(function(event_object){
    event_object.preventDefault();
    var href = $(this).find('a').attr('href');
    var hrefArray = href.split('#');
    var id = '#' + hrefArray[1];
    $(this).data("loadContent").load("data/blog.html " + id);
  });
});