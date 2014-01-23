var Products = {

  DETAILS:  [
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
  ]
};

var Store = function() {
  this.filtered_array = Products.DETAILS;
  this.array_to_sort = [];
  
  // invoke methods
  this.displayProducts();
  this.bindEvents();
}

Store.prototype = {

  bindEvents: function() {
    var this_object = this;

    $("#filter_container").delegate("input[type=checkbox]", "click", function() { 
      this_object.getAndDisplayCheckedItems();
    });

    $("#filter_container").delegate("#sort_by_filter", "change", function() {
      this_object.sortAndDisplayProducts($(this).find('option:selected').val());
    });
  },
  
  getAndDisplayCheckedItems: function() {
    var this_object = this,
        temp_array = [];

    $("#filter_container").find('.filters').each(function() {
      var value, 
          key,
          checked_item = $(this).find(':checked');

      if (checked_item.length) {
        temp_array = [];
        checked_item.each(function() {
          value = $(this).attr('value');
          key = $(this).attr('key');
          
          $.each(this_object.filtered_array, function(index, item) {
            if (item[key] == value) {
              temp_array.push(item);
            }
          });
        });
        this_object.filtered_array = temp_array;
      }
    });
    
    this.array_to_sort = this.filtered_array;
    this.displayProducts();
    this.filtered_array = Products.DETAILS;
  },

  displayProducts: function() {
    $("#products_display").empty();
    $.each(this.filtered_array, function(index, item) {
      $('<img/>').attr('src', item.url).appendTo($("#products_display"));
    });
  },

  sortAndDisplayProducts: function(property) {

    var compare = function(current, next) {
      if (current[property] < next[property])
        return -1;
      if (current[property] > next[property])
        return 1;
      return 0;
    }
    // if the user selects sory by before any filtering function
    if (this.array_to_sort.length == 0) {
      this.filtered_array = Products.DETAILS.sort(compare);
    }
    else {
      this.filtered_array = this.array_to_sort.sort(compare);
    }
    this.displayProducts();
  }

}

$(document).ready(function() {
  new Store();
});
