var items = [
  {"name":"1","url":"product_data/images/1.jpg","color":"Yellow","brand":"BRAND A","sold_out":"1"},
  {"name":"2","url":"product_data/images/2.jpg","color":"Red","brand":"BRAND B","sold_out":"0"},
  {"name":"3","url":"product_data/images/3.jpg","color":"Green","brand":"BRAND D","sold_out":"0"},
  {"name":"4","url":"product_data/images/4.jpg","color":"Red","brand":"BRAND A","sold_out":"1"},
  {"name":"5","url":"product_data/images/5.jpg","color":"Blue","brand":"BRAND B","sold_out":"0"},
  {"name":"6","url":"product_data/images/6.jpg","color":"Green","brand":"BRAND C","sold_out":"0"},
  {"name":"7","url":"product_data/images/7.jpg","color":"Red","brand":"BRAND C","sold_out":"1"},
  {"name":"8","url":"product_data/images/8.jpg","color":"Blue","brand":"BRAND D","sold_out":"0"},
  {"name":"9","url":"product_data/images/9.jpg","color":"Yellow","brand":"BRAND A","sold_out":"0"},
  {"name":"10","url":"product_data/images/10.jpg","color":"Yellow","brand":"BRAND B","sold_out":"1"},
  {"name":"11","url":"product_data/images/11.jpg","color":"Green","brand":"BRAND D","sold_out":"0"},
  {"name":"12","url":"product_data/images/12.jpg","color":"Yellow","brand":"BRAND D","sold_out":"0"},
  {"name":"13","url":"product_data/images/13.jpg","color":"Blue","brand":"BRAND A","sold_out":"0"},
  {"name":"14","url":"product_data/images/14.jpg","color":"Blue","brand":"BRAND D","sold_out":"0"},
  {"name":"15","url":"product_data/images/15.jpg","color":"Green","brand":"BRAND B","sold_out":"0"},
  {"name":"16","url":"product_data/images/16.jpg","color":"Yellow","brand":"BRAND B","sold_out":"1"},
  {"name":"17","url":"product_data/images/17.jpg","color":"Green","brand":"BRAND A","sold_out":"1"},
  {"name":"18","url":"product_data/images/18.jpg","color":"Blue","brand":"BRAND D","sold_out":"1"},
  {"name":"19","url":"product_data/images/19.jpg","color":"Green","brand":"BRAND C","sold_out":"0"},
  {"name":"20","url":"product_data/images/20.jpg","color":"Yellow","brand":"BRAND A","sold_out":"0"}
];
var filtered_array = items, key, value, temp_array = []; 

var getCheckedItems = function() {

  $('#filter_container .filters').each(function() {
    var checked_item = $(this).find(':checked');
    if (checked_item.length) {
      temp_array = [];
      checked_item.each(function() {
        value = $(this).attr('value');
        key = $(this).attr('key');
        $.each(filtered_array, function(index, item) {
          if (item[key] == value) {
            temp_array.push(item);
          }
        });
      });
      filtered_array = temp_array;
    }
  });
  displayProducts();
  filtered_array = items;
}

var displayProducts = function() {
  $('#products_display').html('');
  $.each(filtered_array, function(index, item) {
    $('<img/>').attr('src', item.url).appendTo($('#products_display'));
  });
}

$("#filter_container").delegate("input[type=checkbox]", "click", function() {	
  getCheckedItems($(this));
});

displayProducts();