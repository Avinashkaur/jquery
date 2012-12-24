var empJSON = [];
var counter = 0,count;
//drag items from employee table to roles table.
function dragAndDropItem() {
  $(".empName").each(function(){
    $(this).draggable({helper : "clone"});
  });
    $("#rolesTable ul > li").droppable({
          drop: function(event, ui) {
                  var $className = $(this).find('ul').attr("class");
                  if (!($(ui.draggable).hasClass($className))) {
                        $(ui.draggable).addClass($className);
                        var $li = insert_element($("<li></li>").attr("emp",$(ui.draggable).text()), "newRow", $(this).find('ul'));
                        $li.text($(ui.draggable).text());
                        insert_element($("<input/>").attr("type","image").attr("src","images/button.jpg"), "cancelButton", $li);
                        updateToDo($className, $(ui.draggable).text());
                      }
                  onhoverElement($(this).find("ul li"));
                }
            });
}
function insert_element($element, $class, $appendToElement) {
  $element.addClass($class).appendTo($appendToElement);
  return $element;
}
function onhoverElement($element) {
  $element.mouseenter(function() {
    $(this).find(".cancelButton").css("visibility", "visible");
  });
  $element.mouseleave(function() {
    $(this).find(".cancelButton").css("visibility", "hidden");
  });
}
//Updation of ToDo table
function updateToDo($heading, $empname) {
    var $newli = insert_element($("<li></li>").attr("empname",$empname).attr("name",$heading), "newRowToDo", $("#toDosTable li[class=" + $heading + "] ul[class=innerList]"));
    var $employee = insert_element($("<label></label>"), "nameLabel", $newli);
    $employee.text($empname);
    var $divToDo = insert_element($("<div></div>"), "toDoDiv", $newli);
    $divToDo.html("Add todos for " + $empname);
    insert_element($("<input/>").attr("type","image").attr("src","images/4.jpg"), "plusButton", $divToDo);
    $("<div></div>").addClass("divToDoContainer").appendTo($divToDo);
}
$("#toDosTable .headerButton").toggle (function(){
  $(this).attr("src" , "images/5.jpg");
  $(this).closest('li').find('ul').show();
},
function() {
  $(this).attr("src" , "images/1.jpg");
  $(this).closest('li').find('ul').hide();
});
$("#toDosTable").delegate(".plusButton", "click", function() {
  var $newRowDiv = insert_element($("<div></div>"), "newDivToDo", $(this).closest('div').find('.divToDoContainer'));
  insert_element($("<input/>").attr("type","text").attr("taskNum",counter), "task", $newRowDiv);
  insert_element($("<input/>").attr("type","image").attr("src","images/save.jpg"), "saveButton", $newRowDiv);
  insert_element($("<input/>").attr("type","image").attr("src","images/button.jpg"), "deleteButton", $newRowDiv);
  $(this).closest('div').find("input[type=text]").last().focus();
  counter++;
});
$("#toDosTable").delegate(".saveButton", "click" , function() {
  var $index = -1;
  if (empJSON.length != 0) {
    for (var i = 0; i < empJSON.length; i++) {
        if ((empJSON[i].role == $(this).closest('li').attr("name")) && (empJSON[i].empname == $(this).closest('li').attr("empname")) && (empJSON[i].taskNum == $(this).prev("input[type=text]").attr("taskNum"))) {
          $index = i;
          count--;
        }
    }
    if ($index != -1) {
      empJSON[$index].todo = $(this).prev("input[type=text]").val();
      $(this).prev("input[type=text]").replaceWith($("<label></label>").attr("taskNum",empJSON[$index].taskNum).text(empJSON[$index].todo).addClass("emptask"));
    }
  }
  else {
    empJSON[count] = {
      "taskNum" : $(this).prev('input[type=text]').attr("taskNum"),
      "role" : $(this).closest('li').attr("name"),
      "empname" : $(this).closest('li').attr("empname"),
      "todo" : $(this).prev("input[type=text]").val()
    }
    $(this).prev("input[type=text]").replaceWith($("<label></label>").attr("taskNum",empJSON[count].taskNum).text(empJSON[count].todo).addClass("emptask"));
  }

  $(this).replaceWith($("<input/>").attr("type","image").attr("src","images/edit.jpg").addClass("editButton"));
  count++;
});
$("#toDosTable").delegate(".editButton", "click" , function() {
  $(this).prev("label[class=emptask]").replaceWith(insert_element($("<input/>").attr("type","text").attr("taskNum", $(this).prev("label[class=emptask]").attr("taskNum")).val($(this).prev("label[class=emptask]").text()), "task", $(this).closest('div')));
  $(this).replaceWith(insert_element($("<input/>").attr("type","image").attr("src","images/save.jpg"), "saveButton", $(this).closest('div')));
});
$("#toDosTable").delegate(".deleteButton", "click", function() {
  for (var i = 0; i < empJSON.length; i++) {
    if (($(this).closest('li').attr("name") == empJSON[i].role) && ($(this).closest('li').attr("empName") == empJSON[i].empname) && ($(this).closest('div').find('label').attr("taskNum") == empJSON[i].taskNum)) {
      empJSON.splice(i , 1);
    }
  }
  $(this).closest('div').remove();
  count--;
})
//employee name is deleted on click of cancel button
$("#rolesTable").delegate('.cancelButton' , 'click' , function() {
  if (confirm("Are You sure you want to delete " + $(this).closest('li').text())) {
    for (var i = 0; i < empJSON.length; i++) {
      if ($(this).closest('ul').attr("class") == empJSON[i].role && $(this).closest('li').text() == empJSON[i].empname) {
        empJSON.splice(i , 1);
      }
    }
    removeElement($("#toDosTable .innerList li[name=" + $(this).closest('ul').attr('class') + "][empname=" + $(this).closest('li').text() + "]"));
    removeElement($(this).closest('li'));
  }
});
//accepts backspaces,arrow keys,num keys,tab
$('body').delegate("#searchbox","keydown",function(eventObject){
  var key = eventObject.charCode || eventObject.keyCode || 0;
  return (key == 8 || key == 9 ||  key == 46 || (key >= 37 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
  });
//search ToDo table for corresponding number of todos
$('#searchbutton').click(function(){  
  $('.divToDoContainer').each(function() {
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
  $targetLabel.closest('ul').closest('li').siblings().each(function() {
    $(this).find('ul').hide();
  });
});
//expand/collapse whole ToDo list
$('#expandAll').toggle(function() {
  $('#toDosTable .innerList').show();
  $('#toDosTable .headerButton').attr("src" , "images/1.jpg");
} ,
function() {
   $('#toDosTable .innerList').hide();
   $('#toDosTable .headerButton').attr("src" , "images/5.jpg");
});
//cancel button on employees on empTable
$("#empNameTable").delegate("li" , "mouseenter" , function() {
  $(this).find(".cancelButton").css("visibility","visible");
});
$("#empNameTable").delegate("li" , "mouseleave" , function() {
  $(this).find(".cancelButton").css("visibility","hidden");
});
//deletion of employees from empTable
$("#empNameTable li").delegate(".cancelButton" , "click" , function() {
  if(confirm("Are You sure you want to delete " + $(this).closest('li').attr("emp"))) {
    $("#rolesTable li[employee=" + $(this).closest('li').attr("emp") + "]").fadeOut('3000',function(){
      $(this).detach();
    });
    removeElement($("#rolesTable li[emp=" + $(this).closest('li').attr("emp") + "]"));
    removeElement($("#toDosTable li[empname=" + $(this).closest('li').attr("emp") + "]"));
    removeElement($(this).closest('li'));
  }
});
function removeElement($element) {
  $element.fadeOut("2000",function(){
    $element.remove();
  });
}
dragAndDropItem();