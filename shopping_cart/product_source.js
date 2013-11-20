var productsJSON = [], cartJSON = [];
var counter = 0;
$("#totalprice").attr("disabled",true)
function loadProducts() {
  $.getJSON("products.json",function(data) {
    $.each(data, function(key, value) {
      productsJSON[key] = {
        "url" : value.imageurl ,
        "caption" : value.Caption,
        "category" : value.category,
        "quantity" : value.quantity,
        "desc" : value.Description,
        "price" : value.price,
        "subtotal" : value.subtotal,
        "state" : value.state
      }
    });
    for (var i = 0; i < productsJSON.length; i++) {
      var $newli = $("<li></li>");
      var cell1 = insert_div($("<div></div>"), "imagecell", $newli);
      var cell2 = insert_div($("<div></div>"), "infocell", $newli);
      var cell3 = insert_div($("<div></div>"), "quantitycell", $newli);
      var cell4 = insert_div($("<div></div>"), "addToCartCell", $newli);
      insert_element($("<img/>"), "src", productsJSON[i].url, "prod_image", cell1);
      insert_element($("<label></label>"), "text", productsJSON[i].caption, "caption_label", cell2);
      insert_element($("<label></label>"), "text", productsJSON[i].category, "categorylabel", cell2);
      insert_element($("<p></p>"), "text", productsJSON[i].desc, "describe", cell2);
      insert_element($("<label></label>"), "text", "Price:", "pricelabel", cell2);
      insert_element($("<label></label>"), "text", productsJSON[i].price, "itemprice", cell2);
      insert_element($("<label></label>"), "text", "Quantity:" , "", cell3);
      insert_element($("<input/>").attr("type","text"), "value", productsJSON[i].quantity, "quantitybox", cell3);
      insert_element($("<input/>").attr("type","button"), "value", "Add To Cart", "addToCartButton", cell4);
      $newli.appendTo($("#items #itemslist"));
    }
  });
}
function insert_div($element, $class, $appendToElement) {
  $element.addClass($class).appendTo($appendToElement);
  return $element;
}
function insert_element($tag, $attr, $attrName, $class, $appendToElement) {
  if ($attr == "text") {
    $tag.addClass($class).text($attrName).appendTo($appendToElement);
  }
  else {
     $tag.attr($attr, $attrName).addClass($class).appendTo($appendToElement);
  }
}
$("#itemslist").delegate("input[type=button]", "click", function() {
  if (cartJSON.length == 0) {
    counter = 0;
    cartJSON[counter] = {
      "url" : $(this).closest('li').find("img").attr("src"),
      "caption" : $(this).closest('li').find("label[class=caption_label]").text(),
      "category" : $(this).closest('li').find("label[class=categorylabel").text(),
      "desc" : $(this).closest('li').find("p").text(),
      "price" : $(this).closest('li').find('label[class=itemprice]').text(),
      "quantity" : $(this).closest('li').find('input[type=text]').val(),
      "subtotal" : ""
    }
  }
  else {
    for (var i = 0; i < cartJSON.length; i++) {
      if (cartJSON[i].url == $(this).closest('li').find("img").attr("src")) {
        cartJSON[i].quantity = $(this).closest('li').find("input[type=text]").val();
        counter--;
      }
    }
    cartJSON[counter] = {
      "url" : $(this).closest('li').find("img").attr("src"),
      "caption" : $(this).closest('li').find("label[class=caption_label]").text(),
      "category" : $(this).closest('li').find("label[class=categorylabel").text(),
      "desc" : $(this).closest('li').find("p").text(),
      "price" : $(this).closest('li').find('label[class=itemprice]').text(),
      "quantity" : $(this).closest('li').find('input[type=text]').val(),
      "subtotal" : ""
    }
  }
  cartJSON[counter].subtotal = ($(this).closest('li').find('input[type=text]').val()) * (cartJSON[counter].price);
  getTotalPrice();
  getTotalItems();
  counter++;
});
function showCart() {
  $("#cartheadings").html("");
  if (cartJSON.length != 0) {
    var $headingRow = $("<li></li>");
    $("#cartheadings").append($headingRow.append($("<div></div>").addClass("showProductCell").append($("<label></label>").text("Product"))));
    $("#cartheadings").append($headingRow.append($("<div></div>").addClass("showPriceCell").append($("<label></label>").text("Price"))));
    $("#cartheadings").append($headingRow.append($("<div></div>").addClass("showQuantityCell").append($("<label></label>").text("Quantity"))));
    $("#cartheadings").append($headingRow.append($("<div></div>").addClass("showSubtotalCell").append($("<label></label>").text("Subtotal"))));
    for (var i = 0; i < cartJSON.length; i++) {
      var $newli = $("<li></li>");
      var cell1 = insert_div($("<div></div>"), "showProductCell", $newli);
      var cell2 = insert_div($("<div></div>"), "showPriceCell", $newli);
      var cell3 = insert_div($("<div></div>"), "showQuantityCell", $newli);
      var cell4 = insert_div($("<div></div>"), "showSubtotalCell", $newli);
      var cell5 = insert_div($("<div></div>"), "removeButtonCell", $newli);
      insert_element($("<img/>"), "src", cartJSON[i].url, "showImage", cell1);
      insert_element($("<label></label>"), "text", cartJSON[i].caption, "showCaption", cell1);
      insert_element($("<label></label>"), "text", cartJSON[i].price, "", cell2);
      insert_element($("<input/>").attr("type","text"), "value", cartJSON[i].quantity, "showQuantity", cell3);
      insert_element($("<label></label>"), "text", cartJSON[i].subtotal, "", cell4);
      insert_element($("<input/>").attr("type","button"), "value", "Remove", "", cell5);
      $newli.appendTo("#cartheadings");
    }
  }
}
$("#product_link").click(function(eventObject) {
  eventObject.preventDefault();
  $("#cartheadings").html("");
  $("#itemslist").html("");
  loadProducts();
});
$("#cart_link").click(function(eventObject) {
  eventObject.preventDefault();
  $("#itemslist").html("");
  $("#cartheadings").html("");
  showCart();

});
function getTotalPrice() {
  var $sum = 0;
  for(var i = 0; i < cartJSON.length; i++) {
    $sum += cartJSON[i].subtotal;
  }
  $("#totalprice").val($sum.toFixed(2));
}
$("#cartheadings").delegate("input[type=text]","change",function() {
  for (var i =0; i < cartJSON.length; i++) {
    if ($(this).closest('li').find("label[class=showCaption]").text() == cartJSON[i].caption) {
      cartJSON[i].quantity = $(this).closest('li').find("input[type=text]").val();
      cartJSON[i].subtotal = cartJSON[i].price * cartJSON[i].quantity;
    }
  }
  showCart();
  getTotalPrice();
});
$("#cartheadings").delegate("input[type=button]" , "click" , function() {
  var $index = $(this).closest('li').find("div label[class=showCaption]").text();
  for (var i = 0; i < cartJSON.length; i++) {
    if (cartJSON[i].caption == $index) {
      cartJSON.splice(i,1);
      counter--;
    }
  }
  showCart();
  getTotalPrice();
  getTotalItems();
})
function getTotalItems() {
  var number = 0;
  for (var i = 0; i < cartJSON.length; i++) {
    number++;
  }
  $("#numberofitems").text(number);
}
loadProducts();