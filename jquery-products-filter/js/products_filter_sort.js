var all_products = [
  {"name":"1", "url":"product_data/images/1.jpg", "color":"Yellow", "brand":"Brand A", "sold_out":"1"},
  {"name":"2", "url":"product_data/images/2.jpg", "color":"Red", "brand":"Brand B", "sold_out":"0"},
  {"name":"3", "url":"product_data/images/3.jpg", "color":"Green", "brand":"Brand D", "sold_out":"0"},
  {"name":"4", "url":"product_data/images/4.jpg", "color":"Red", "brand":"Brand A", "sold_out":"1"},
  {"name":"5", "url":"product_data/images/5.jpg", "color":"Blue", "brand":"Brand B", "sold_out":"0"},
  {"name":"6", "url":"product_data/images/6.jpg", "color":"Green", "brand":"Brand C", "sold_out":"0"},
  {"name":"7", "url":"product_data/images/7.jpg", "color":"Red", "brand":"Brand C", "sold_out":"1"},
  {"name":"8", "url":"product_data/images/8.jpg", "color":"Blue", "brand":"Brand D", "sold_out":"0"},
  {"name":"9", "url":"product_data/images/9.jpg", "color":"Yellow", "brand":"Brand A", "sold_out":"0"},
  {"name":"10", "url":"product_data/images/10.jpg", "color":"Yellow", "brand":"Brand B", "sold_out":"1"},
  {"name":"11", "url":"product_data/images/11.jpg", "color":"Green", "brand":"Brand D", "sold_out":"0"},
  {"name":"12", "url":"product_data/images/12.jpg", "color":"Yellow", "brand":"Brand D", "sold_out":"0"},
  {"name":"13", "url":"product_data/images/13.jpg", "color":"Blue", "brand":"Brand A", "sold_out":"0"},
  {"name":"14", "url":"product_data/images/14.jpg", "color":"Blue", "brand":"Brand D", "sold_out":"0"},
  {"name":"15", "url":"product_data/images/15.jpg", "color":"Green", "brand":"Brand B", "sold_out":"0"},
  {"name":"16", "url":"product_data/images/16.jpg", "color":"Yellow", "brand":"Brand B", "sold_out":"1"},
  {"name":"17", "url":"product_data/images/17.jpg", "color":"Green", "brand":"Brand A", "sold_out":"1"},
  {"name":"18", "url":"product_data/images/18.jpg", "color":"Blue", "brand":"Brand D", "sold_out":"1"},
  {"name":"19", "url":"product_data/images/19.jpg", "color":"Green", "brand":"Brand C", "sold_out":"0"},
  {"name":"20", "url":"product_data/images/20.jpg", "color":"Yellow", "brand":"Brand A", "sold_out":"0"}
];


var ProductsStore = function() {
  this.init();
}

ProductsStore.prototype = {

  FILTERS: ['brand', 'color', 'sold_out'],
  
  init: function() {
    // invoke methods
    this.loadProducts();
    this.bindEvents();
  },

  loadProducts: function() {
    for (var key in all_products) {
      var item_list = $('<li/>').attr({"data-brand": all_products[key].brand, "data-color": all_products[key].color, "data-sold_out": all_products[key].sold_out });
      $("#products-display ul").append(item_list.append($("<img/>").attr('src', all_products[key].url)));
    }
  },

  bindEvents: function() {
    var this_object = this;

    $('#filters-container').on('change', '.brand, .color, .sold_out', function() {
      this_object.displayFilteredItems();
    });

    $('#sort-products').on('change', 'select', function() {
      this_object.sortAndDisplayElements($(this).find('option:selected').val());
    });
    
    // by default the products come in sorted order of brand
    $('#sort-products select').trigger('change');
  },

  displayFilteredItems: function() {
    var list_items = $('#products-display ul li');

    list_items.hide();
    for (var key in this.FILTERS){
      list_items = this.getFilteredProducts(list_items, this.FILTERS[key]);
    }
    list_items.show();
  },

  getFilteredProducts: function(blocks, filter_type) {
    var selector_array = [],
        checked_item = $('.' + filter_type + ':checked');

    if (checked_item.length != 0) {
      checked_item.each(function(){
        selector_array.push('li[data-' + filter_type + '="' + $(this).val() + '"]');
      });
      blocks = blocks.filter(selector_array.join(','));
    }
    return blocks;
  },

  sortAndDisplayElements: function(filter_type) {
    var display_container = $('#products-display ul'),
        sorted_elements = this.sortItems(display_container.find('li'), filter_type);

    display_container.empty().append(sorted_elements);
  },

  sortItems: function(blocks, filter_type) {

    var compare = function(current, next) {
      var first_attribute = $(current).data(filter_type),
          second_attribute = $(next).data(filter_type);

      if (first_attribute < second_attribute)
        return -1;
      if (first_attribute > second_attribute)
        return 1;
      return 0;
    }
    return blocks.sort(compare);
  }

}

$(document).ready(function() {
  new ProductsStore();
});