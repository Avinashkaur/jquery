$.noConflict();
jQuery(document).ready(function($){
  $(".empName").each(function(){
    $(this).draggable({helper : "clone"});
  });
  $("#rolesTable .ror,.android,.js").droppable({
          drop: function(event, ui) {
                  var $li = $("<li></li>");
                  var $imgButton = $("<input/>");
                  $imgButton.addClass("cancelButton").attr('type' , 'image').attr('src' , 'images/button.jpg').attr('width' , '20').attr('height' , '20').css("float" , "left").hide();
                  var $value = $(ui.draggable).text();
                  var $role = $(this).text().split(/\n/);
                  var $className = $(this).find('ul').attr("class");
                  $imgButton.attr("role", $className).attr("value" , $value);
                      if (!($(ui.draggable).hasClass($className))) {
                        $(ui.draggable).addClass($className);
                        $li.attr("name" , $className).text($value).addClass("newRow").appendTo($(this).find('ul'));
                        $imgButton.appendTo($li);
                        updateToDo($role[0], $value, $className);
                      }
                  $(this).find("ul li").mouseenter(function() {
                    $(this).find(".cancelButton").show();
                  });
                  $(this).find("ul li").mouseleave(function() {
                    $(this).find(".cancelButton").hide();
                  });
          }
  });
  $("#rolesTable").delegate('.cancelButton' , 'click' , function() {
    var $role = $(this).attr("role");
    var $name = $(this).attr("value");
    if(confirm("Are You sure you want to delete " + $name)) {
      $("#empNameTable li[emp=" + $name + "]").removeClass($role);
      $("#toDosTable .innerList li[name=" + $role + "][empname=" + $name + "]").remove();
      $(this).closest('li').remove();
    }
  });
  function updateToDo(roleHeader, memberName, newClassName) {
    var $li = $("<li></li>");
    var $labelName = $("<label></label>");
    var $divToDo = $("<div></div>");
    var $imgButton = $("<input/>");
    $imgButton.addClass("plusButton").attr('type' , 'image').attr('src' , 'images/4.jpg').attr('width' , '20').attr('height' , '20').css("float" , "left");
    $divToDo.addClass("toDoDiv").text("Add todos for " + memberName);
    $("#toDosTable").find('ul li').each(function(){
      var list = $(this).find('ul');
      var header = $(this).find('.toDo').text();
      if(header == roleHeader) {
        $labelName.addClass("nameLabel").text(memberName).appendTo($li);        
        $divToDo.appendTo($li);
        $imgButton.appendTo($divToDo);
        $li.attr("name" , newClassName).attr("empname" , memberName).addClass("newRowToDo").appendTo(list);
      }
      $(this).find(".headerButton").toggle(
        function() {
          list.hide();
          $(this).attr("src" , "images/5.jpg");
        } ,
        function() {
          list.show();
          $(this).attr("src" , "images/1.jpg");
      });
    });
  }
});