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

  DEFAULT_ITEM_NO_PER_PAGE: 6,

  DEFAULT_FILTER_TYPE: 'brand',

  params: {
    brand: [],
    color: [],
    sold_out: [],
    sort_by : '',
    items: 'item6'
  },
  
  init: function() {
    // invoke methods
    this.loadProducts();
    this.bindEvents();
    this.checkUrlAndLoadPage();
  },

  loadProducts: function() {
    for (var key in all_products) {
      var item_list = $('<li/>').attr({"data-brand": all_products[key].brand, "data-color": all_products[key].color, "data-sold_out": all_products[key].sold_out, "class": "show" });
      $("#products-display ul").append(item_list.append($("<img/>").attr('src', all_products[key].url)));
    }
  },

  bindEvents: function() {
    var this_object = this;
    
    // filter checkboxes
    $('#filters-container').on('change', '.brand, .color, .sold_out', function() {
      this_object.setParamsAndUpdateUrl($(this));
      this_object.displayFilteredItems();
      $('#control-display select').trigger('change');
      $('#sort-products select').trigger('change');
    });

    // sorting dropdown
    $('#sort-products').on('change', 'select', function() {
      this_object.setParamsAndUpdateUrl($('#sort-products option:selected'));
      this_object.sortAndDisplayElements($(this).find('option:selected').val());
    });

    // next and previous pagination links
    $('.pagination').on('click', 'a', function() {
      if ($(this).attr('name') == 'prev') {
        this_object.prevPage();
      }
      else if ($(this).attr('name') == 'next') {
        this_object.nextPage();
      }
    });
    
    // indexes for pagination
    $("#show-indexes").delegate('a', 'click', function() {
      var value = Number($(this).text());
      this_object.current_page = value - 1;

      if (value > this_object.current_page) {
        this_object.nextPage();
      }
      else {
        this_object.prevPage();
      }
    });

    // dropdown to control pagination
    $("#control-display").on('change', 'select', function() {
      this_object.setParamsAndUpdateUrl($('#control-display option:selected'));
      this_object.item_per_page = Number($(this).find("option:selected").val());
      this_object.paginateItems();
    });
  },
  
  // to get the parameters as fragment hash
  checkUrlAndLoadPage: function() {
    var url = window.location.href.split('#')[1];
    if (url) {
      this.showSavedPageState(url);
    }
    else {
      this.paginateItems();
    }
  },
  
  // to display the saved state of the page
  showSavedPageState: function(saved_values) {
    $.map(saved_values.split('&'), function(value) {
      var key_value_pair = value.split('='),
          key = key_value_pair[0],
          value = key_value_pair[1];
      
      $('.' + key + '#' + value).attr('checked', true);
      $('.' + key + '#' + value).attr('selected', true);
      $('#filters-container .' + key).trigger('change');
    })
  },
  
  // to update the saved object which will be passed as parameters
  setParamsAndUpdateUrl: function(element) {
    var current_array = this.params[element.attr('class')];

    if (element.hasClass('sort_by')) {
      this.params['sort_by'] = $('#sort-products option:selected').attr('id');
    }
    else if (element.hasClass('items')) {
      this.params['items'] = $('#control-display option:selected').attr('id');
    }
    else if (element.is('input:checked')) {
      current_array.push(element.attr('id'));
    }
    else {
      current_array.splice(current_array.indexOf(element.attr('id')), 1);
    }
    this.updateUrl();
  },

  updateUrl: function() {
    window.location.hash = $.param(this.params, true);
  },

  paginateItems: function() {
    this.initialisePagination();
    this.showIndexes();
    this.highlightCurrentPageIndex();
  },

  initialisePagination: function() {
    this.list_items = $("#products-display ul li.show");
    var list_length = this.list_items.length;
    this.total_pages = 0;
    this.item_per_page = this.item_per_page || this.DEFAULT_ITEM_NO_PER_PAGE;
    
    if(list_length > this.item_per_page) {
      this.showNextSlot(0, this.item_per_page);
      this.total_pages = Math.ceil(list_length / this.item_per_page);
      this.current_page = 1;
    }
  },

  showIndexes: function() {
    var pages_info = $("#show-indexes");
    pages_info.empty();

    for (var i = 1; i <= this.total_pages; i++) {
      $("<a/>").attr({'href': 'javascript:void(0)', 'id': 'p' + i, 'class': 'page-index'}).text(i).appendTo(pages_info);
    }
  },

  showNextSlot: function(start_item, end_item) {
    $('#products-display ul li').hide();

    for (var i = start_item; i < end_item; i++) {
      $(this.list_items[i]).show();
    }
  },

  prevPage: function() {
    if (this.current_page > 1) {
      var end_item = (this.item_per_page * this.current_page) - this.item_per_page;
      var start_item = end_item - this.item_per_page;
      this.showNextSlot(start_item, end_item);
      this.current_page--;
    }
    this.highlightCurrentPageIndex();
  },

  nextPage: function() {
    if (this.current_page < this.total_pages) {
      var start_item = this.item_per_page * this.current_page;
      var end_item = start_item + this.item_per_page;
      this.showNextSlot(start_item, end_item);
      this.current_page++;
    }
    this.highlightCurrentPageIndex();
  },

  highlightCurrentPageIndex: function() {
    $("#show-indexes a").removeClass('selected').filter("#p" + this.current_page).addClass('selected');
  },

  displayFilteredItems: function() {
    var list_items = $('#products-display ul li');

    list_items.removeClass('show').hide();
    for (var key in this.FILTERS){
      list_items = this.getFilteredProducts(list_items, this.FILTERS[key]);
    }
    list_items.addClass('show').show();
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
        filter_type = filter_type || DEFAULT_FILTER_TYPE,
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
  },

}

$(document).ready(function() {
  new ProductsStore();
});