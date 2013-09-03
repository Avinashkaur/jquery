var items = [];
var productArray = {};

var loadJSON = function() {
  $.getJSON('product_data/product.json', function(data) {
  	$.each(data,function(key,val) {
      items[key] = {
        "name" : val.name,
        "url" : val.url,
        "color" : val.color,
        "brand" : val.brand,
        "sold_out" : val.sold_out,
        "latest" : val.latest
      }
    });
    showAllProducts(items);
  });
}

var showAllProducts  = function(products) {
	$.each(products, function(key, val) {
		var newLi = $("<li />").attr("data-color", val.color).attr("data-brand", val.brand).attr("sold-out", val.sold_out).attr("data-latest", val.latest);
		$("<img />").attr("src", val.url).appendTo(newLi);
		newLi.appendTo("#products_display");
	});
}

var showSelectedItems = function(element) {
	var checkedId = element.attr("value"), attribute = "";
	var parentId = element.parent(".list_items").attr("id");
	if (element.is(":checked")) {
		productArray["data-" + parentId] = "'" + checkedId + "'"; 
	}
	else {
		delete productArray["data-" + parentId];
	}
	$.each(productArray, function(key, value) {
		attribute += "[" + key + "=" + value + "]";
	})	
	$("#products_display li").hide();
	$("#products_display li" + attribute).show();
}

$(".list_items").delegate("input[type='checkbox']", "click", function() {
	showSelectedItems($(this));
	$(this).siblings("input[type=checkbox]").each(function() {
    $(this).attr("checked",false);
  });
});

$("#available_products").click(function() {
	$("#products_display li[sold-out=1]").hide();
})
loadJSON();