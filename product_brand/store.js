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
    for (var i = 0; i < items.length; i++) {
      $("<img/>").attr("src",items[i].url).addClass("imageDisplay").appendTo("#products_display");
    }
  });
}
$('body div:lt(2)').delegate('input' , "click" , function() {
  //to uncheck all other checkboxes other than the clicked one
  $(this).siblings("input[type=checkbox]").each(function() {
    $(this).attr("checked",false);
  })
  if ($(this).is(":checked")) {
    $("#products_display").html("");
    var $checkedItem = $(this);
    $(this).closest('div').siblings('div:has(input[type="checkbox"])').each(function() {
      if($(this).find("input:checked").length != 0) {
        for (var i = 0; i < items.length; i++) {
          if ($checkedItem.closest('div').attr('id') == "list_items_brand") {
            if (($checkedItem.attr('id') == items[i].brand) && ($(this).find("input:checked").attr("id")) == items[i].color) {
              $("#products_display").append($("<img/>").addClass("imageDisplay").attr("src",items[i].url));
            }
          }
          else if ($checkedItem.closest('div').attr('id') == "list_items_color") {
            if (($checkedItem.attr('id') == items[i].color) && ($(this).find("input:checked").attr("id")) == items[i].brand) {
              $("#products_display").append($("<img/>").addClass("imageDisplay").attr("src",items[i].url));
            }
          }
        }
      }
      else if ($(this).find("input:checked").length == 0) {
        for (var i = 0; i < items.length; i++) {
          if (($checkedItem.closest('div').attr("id") == "list_items_brand") && ($checkedItem.attr("id") == items[i].brand)) {
            $("#products_display").append($("<img/>").addClass("imageDisplay").attr("src",items[i].url));
          }
          else if (($checkedItem.closest('div').attr("id") == "list_items_color") && ($checkedItem.attr("id") == items[i].color)) {
            $("#products_display").append($("<img/>").addClass("imageDisplay").attr("src",items[i].url));
          }
        }
      }
    });
  }
  else if ($(this).not(":checked")) {
    $(this).closest('div').siblings('div:has(input[type="checkbox"])').each(function() {
      for (var i = 0; i < items.length; i++) {
        if ($(this).find("input:checked")) {
          if ($(this).attr('id') == "list_items_brand" && $(this).find("input:checked").attr('id') == items[i].brand) {
           $("#products_display").append($("<img/>").addClass("imageDisplay").attr("src",items[i].url));
          }
          else if ($(this).attr('id') == "list_items_color" && $(this).find("input:checked").attr('id') == items[i].color) {
            $("#products_display").append($("<img/>").addClass("imageDisplay").attr("src",items[i].url));
          }
        }
        if (($(this).find("input").not(":checked").length) == 4) {
          $("#products_display").html("");
          for (var i = 0; i < items.length; i++) {
            $("#products_display").append($("<img/>").addClass("imageDisplay").attr("src",items[i].url));
          }
        }
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
  $("#products_display").html("");
  for (var i = 0; i < $avail_array.length; i++) {
    $("#products_display").append($("<img/>").addClass("imageDisplay").attr("src",$avail_array[i].url));
  }
});
loadJSON();