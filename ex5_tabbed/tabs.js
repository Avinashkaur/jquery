$(document).ready( function () {
  console.log($("div .module").hide());
  $("div .module:first").show();
  var new_list = $("<ul></ul>");
  new_list.css("list-style-type" , "none");
  new_list.insertBefore("div .module:first");
  $(".module").each(function() {
    var h2_label = $(this).find("h2").html();
    var list_item = $("<li></li>");
    list_item.css("display" , "inline");
    list_item.css("padding" , "10px");
    list_item.html(h2_label);
    list_item.data('associatedDiv',$(this));
    list_item.appendTo(new_list);
    });
    new_list.find('li').each(function() {
      $(this).click(function() {
        $(this).siblings().each(function(){
          $(this).data('associatedDiv').hide();
        });
        var $itemToHide = $(this).parent().find('.current');
        $itemToHide.each(function() {
          $(this).data('associatedDiv').hide();
          $(this).removeClass('current');
        })
        $(this).data('associatedDiv').css("display" , "block");
        $(this).addClass("current");
      });
    });
  }
)