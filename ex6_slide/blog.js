$(document).ready(function() {
  var blog_headlines = $('#blog ul li');
  blog_headlines.each(function(){
    var list_item = $(this);

    list_item.find('h3').find('a').each(function() {
      var heading = $(this);
      heading.click(function(link_object) {
        link_object.preventDefault();
        blog_headlines.find('p').each(function() {
          $(this).slideUp("fast");
        });
        list_item.find('p').slideDown();
      });
    });
  });
});