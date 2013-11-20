var items = [];
function loadJSON() {
  $.getJSON('product.json', function(data) {
    $.each(data,function(key,val) {
      items[key] = {
        "name" : val.name,
        "url" : val.url,
        "color" : val.color,
        "brand" : val.brand,
        "sold_out" : val.sold_out
      }
    });
    display_all(items);
  });
}
function checked_item ($listname, $attr1, $attr2) {
  $("#products_display").html("");
  for (var i = 0; i < items.length; i++) {
    if ($listname == "list_items_brand" || $listname == "list_items_color") {
      if (($attr1 == items[i].brand || $attr1 == items[i].color) && ($attr2 == items[i].brand || $attr2 == items[i].color)) {
        $("#products_display").append($("<img/>").addClass("imageDisplay").attr("src",items[i].url));
      }
      else if ($attr2 == "" && $attr1 == items[i].brand) {
        $("#products_display").append($("<img/>").addClass("imageDisplay").attr("src",items[i].url));
      }
      else if ($attr2 == "" && $attr1 == items[i].color) {
        $("#products_display").append($("<img/>").addClass("imageDisplay").attr("src",items[i].url));
      }
    }
  }
}
function display_all($arrayToShow) {
  $("#products_display").html("");
  for (var i = 0; i < $arrayToShow.length; i++) {
    $("#products_display").append($("<img/>").addClass("imageDisplay").attr("src",$arrayToShow[i].url));
  }
}
$('body div:lt(2)').delegate('input' , "click" , function() {
  //to uncheck all other checkboxes other than the clicked one
  $(this).siblings("input[type=checkbox]").each(function() {
    $(this).attr("checked",false);
  })
  if ($(this).is(":checked")) {
    var $checkedItem = $(this);
    $(this).closest('div').siblings('div:has(input[type="checkbox"])').each(function() {
      if($(this).find("input:checked").length != 0) {
        checked_item($checkedItem.closest('div').attr('id'), $checkedItem.attr('id'), $(this).find("input:checked").attr("id"));
      }
      else if ($(this).find("input:checked").length == 0) {
        checked_item($checkedItem.closest('div').attr("id"), $checkedItem.attr("id"), "");
      }
    });
  }
  else if ($(this).not(":checked")) {
    $(this).closest('div').siblings('div:has(input[type="checkbox"])').each(function() {
      if ($(this).find("input:checked")) {
        checked_item($(this).attr('id'), $(this).find("input:checked").attr('id'), "");
      }
      if (($(this).find("input").not(":checked").length) == 4) {
        display_all(items);
      }
    });
  }
});
$("#available_products").click(function() {
  var $avail_array = [], counter = 0;
  $("#products_display").find("img").each(function() {
    for (var i = 0; i < items.length; i++) {
      if ($(this).attr("src") == items[i].url && items[i].sold_out == "0") {
        $avail_array[counter] = {"url" : items[i].url};
        counter++;
      }
    }
  });
  display_all($avail_array);
});
loadJSON();