$.noConflict();
jQuery(document).ready(function($){
  $(".empName").each(function(){
    $(this).draggable({helper : "clone"});
  });
  $("#rolesTable .ror,.android,.js").droppable({
          drop: function(event, ui) {
                  var $li = $("<li></li>");
                  var $imgButton = $("<input/>");
                  $imgButton.addClass("cancelButton").attr('type' , 'image').attr('src' , 'images/button.jpg').hide();
                  var $value = $(ui.draggable).text();
                  var $role = $(this).text().split(/\n/);
                  var $className = $(this).find('ul').attr("class");
                  $imgButton.attr("role", $className).attr("value" , $value);
                      if (!($(ui.draggable).hasClass($className))) {
                        $(ui.draggable).addClass($className);
                        $li.attr("name" , $className).attr("employee",$value).text($value).addClass("newRow").appendTo($(this).find('ul'));
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
    $imgButton.addClass("plusButton").attr('type' , 'image').attr('src' , 'images/4.jpg').attr('width' , '20').attr('height' , '20').css("float" , "left").attr("name" , "addTodo");
    $divToDo.addClass("toDoDiv").text("Add todos for " + memberName).append($imgButton);
    $("<div></div>").addClass("divToDoContainer").appendTo($divToDo);
    $labelName.addClass("nameLabel").text(memberName);
    $li.attr("name" , newClassName).attr("empname" , memberName).addClass("newRowToDo").append($labelName).append($divToDo);
    $("#toDosTable ul li label[value = '" + roleHeader + "']").closest("li").find(".innerList").append($li);
  
      $("#toDosTable ul li label[value = '" + roleHeader + "']").closest("li").find(".headerButton").toggle(
        function() {
          $(this).closest('li').find('.innerList').show();
          $(this).attr("src" , "images/1.jpg");
        } ,
        function() {
          $(this).closest('li').find('.innerList').hide();
          $(this).attr("src" , "images/5.jpg");
        });

      $("#toDosTable ul li label[value = '" + roleHeader + "']").closest("li").find(".innerList li[empname=" + memberName + "]").find(".toDoDiv").delegate("input[name=addTodo]" , "click" , function(){
        var $newDivToDo = $("<div></div>");
        $newDivToDo.addClass("newDivToDo");
        $("<input/>").attr('type' , 'text').addClass("task").appendTo($newDivToDo);
        $("<input/>").attr('type','image').attr('src' , 'images/save.jpg').addClass("saveButton").appendTo($newDivToDo);
        $("<input/>").attr("type","image").attr("src","images/button.jpg").addClass("deleteButton").appendTo($newDivToDo);
        $(this).closest('div').find(".divToDoContainer");
        $newDivToDo.appendTo($(this).closest('div').find(".divToDoContainer"));
      });
    }
$("#toDosTable").delegate(".saveButton","click",function(){
  $(this).closest('div').find(".task").replaceWith($("<label></label>").addClass("emptask").text($(this).closest('div').find(".task").val()));
  $(this).replaceWith($("<input/>").attr('type','image').attr('src' , 'images/edit.jpg').addClass("editButton"));
});
$("#toDosTable").delegate(".editButton","click",function(){
  $(this).closest('div').find(".emptask").replaceWith($("<input/>").attr('type' , 'text').addClass("task").val($(this).closest('div').find(".emptask").text()));
  $(this).replaceWith($("<input/>").attr('type','image').attr('src' , 'images/save.jpg').addClass("saveButton"));
});
$("#toDosTable").delegate(".deleteButton","click",function() {
  $(this).closest('div').remove();
  
});

$('body').delegate("#searchbox","keydown",function(eventObject){
  var key = eventObject.charCode || eventObject.keyCode || 0;
  return (
    key == 8 || 
    key == 9 ||
    key == 46 ||
    (key >= 37 && key <= 40) ||
    (key >= 48 && key <= 57) ||
    (key >= 96 && key <= 105));
  });
$('#searchbutton').click(function(){
  $('#toDosTable').find(".divToDoContainer").each(function() {
    var counter = 0;
    $(this).find('.editButton').each(function(){
      counter++;
    });
    if (counter == $("#searchbox").val()) {
      var $targetLabel = $(this).closest('li').find('.nameLabel');
      $targetLabel.closest('ul').show();
      $targetLabel.closest('ul').closest('li').find('.headerButton').attr("src","images/1.jpg");
      var $start = setInterval(function() {
        $targetLabel.animate({
          opacity : 0
        } , 200 , "linear" , function() {
          $targetLabel.animate({
            opacity : 1
          } , 200)
        })
      },500);
      setTimeout(function(){ clearInterval($start)} , 3000);
    }
  });  
});
$('#expandAll').toggle(function() {
  $('#toDosTable .innerList').show();
  $('#toDosTable .headerButton').attr("src" , "images/1.jpg");
} ,
function() {
   $('#toDosTable .innerList').hide();
   $('#toDosTable .headerButton').attr("src" , "images/5.jpg");
});
$("#empNameTable").delegate("li" , "mouseenter" , function() {
  $(this).find(".cancelButton").show();
});
$("#empNameTable").delegate("li" , "mouseleave" , function() {
  $(this).find(".cancelButton").hide();
});
$("#empNameTable li").delegate(".cancelButton" , "click" , function() {
  $("#rolesTable li[employee=" + $(this).closest('li').attr("emp") + "]").detach();
  $("#toDosTable li[empname=" + $(this).closest('li').attr("emp") + "]").detach();
  $(this).closest('li').remove();
});
});