// Products data
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
  this.bindEvents();
  this.displayProducts();
  this.disableLink($(".pagination a[name='prev']"));
  this.disableLink($("#show-indexes a:first"));
}

Store.prototype = {

  DEFAULT_ITEM_NO_PER_PAGE: 6,

  bindEvents: function() {
    var this_object = this;

    $("#filter_container").delegate("input[type=checkbox]", "click", function() { 
      this_object.getAndDisplayCheckedItems();
    });

    $("#filter_container").delegate("#sort_by_filter", "change", function() {
      this_object.sortAndDisplayProducts($(this).find('option:selected').val());
    });

    $(".pagination").delegate("a", "click", function() {
      if ($(this).attr('name') == 'next') {
        this_object.nextPage($(this));
      }
      else if ($(this).attr('name') == 'prev') {
        this_object.prevPage($(this));
      }
    });

    $("#control-display").change(function() {
      this_object.item_per_page = Number($(this).find("option:selected").val());
      this_object.getAndDisplayCheckedItems();
      this_object.sortAndDisplayProducts($("#sort_by_filter option:selected").val());
    });

    $("#show-indexes").delegate('a', 'click', function() {
      var value = Number($(this).text());
      console.log(value);
      console.log(this_object.current_page);

      // if (value < this_object.current_page) {
      //   this_object.current_page = value;
      //   this_object.prevPage();
      // }
      if (value > this_object.current_page) {
        this_object.current_page = value;
        this_object.nextPage();
      }

    });
  },
  
  // for filtering items
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
  
  // for displaying items
  displayProducts: function() {
    $("#products_display ul").empty();
    $.each(this.filtered_array, function(index, item) {
      var list_item = $('<li/>').appendTo('#products_display ul');
      $('<img/>').attr('src', item.url).appendTo(list_item);
    });
    this.paginateItems();
  },
  
  // sorting and displaying items
  sortAndDisplayProducts: function(property) {

    var compare = function(current, next) {
      if (current[property] < next[property])
        return -1;
      if (current[property] > next[property])
        return 1;
      return 0;
    }
    // if the user selects sort by before any filtering function
    if (this.array_to_sort.length == 0) {
      this.filtered_array = Products.DETAILS.sort(compare);
    }
    else {
      this.filtered_array = this.array_to_sort.sort(compare);
    }
    this.displayProducts();
  },

  paginateItems: function() {
    this.initialisePagination();
    this.showIndexes();
  },

  initialisePagination: function() {
    this.list_items = $("#products_display ul li");
    var list_length = this.list_items.length;
    this.item_per_page = this.item_per_page || this.DEFAULT_ITEM_NO_PER_PAGE;
    this.total_pages = 0;

    if (list_length > this.item_per_page) {
      this.showNextSlot(0, this.item_per_page);
      this.total_pages = Math.ceil(list_length / this.item_per_page);
      this.current_page = 1;
    }
    this.enableLink($(".pagination").find("span[name='next']"));
    this.disableLink($(".pagination").find("span[name='prev']"));
  },

  showIndexes: function() {
    var pages_info = $("#show-indexes");
    pages_info.empty();

    for (var i = 1; i <= this.total_pages; i++) {
      var page_link = $("<a/>");
      page_link.attr({'href': 'javascript:void(0)', 'id': 'p' + i, 'class': 'page-index'});
      page_link.text(i);
      pages_info.append(page_link);
    }
  },

  highlightCurrentPageIndex: function() {
    this.disableLink($("#p" + this.current_page));
  },

  enableOtherPagesIndex: function() {
    var unselected_pages = $("#show-indexes :not(#p" + this.current_page + ")"),
        this_object = this;

    $.each(unselected_pages, function(key, value) {
      this_object.enableLink($(value)) ;
      $(value).removeClass('selected');
    })

  },

  enableLink: function(element) {
    if (element.length) {
      var new_element = this.replaceElement(element, $('<a/>'));
      new_element.removeClass('disable');
      console.log(new_element.removeClass('selected'));
    }
  },

  disableLink: function(element) {
    if (element.length) {
      var new_element = this.replaceElement(element, $('<span/>'));
      new_element.addClass('disable');
      console.log(new_element.addClass('selected'));
    }
  },

  prevPage: function(element) {
    if (this.current_page > 1) {
      this.enableLink($(".pagination").find("span[name='next']"));
      var end_item = (this.item_per_page * this.current_page) - this.item_per_page;
      var start_item = end_item - this.item_per_page;
      this.showNextSlot(start_item, end_item);
      this.current_page--;
    }

    if (this.current_page == 1) {
      this.disableLink(element);
    }

    this.highlightCurrentPageIndex();
    this.enableOtherPagesIndex();
  },

  nextPage: function(element) {

    if (this.current_page < this.total_pages) {
      this.enableLink($(".pagination").find("span[name='prev']"));
      var start_item = this.item_per_page * this.current_page;
      var end_item = start_item + this.item_per_page;
      this.showNextSlot(start_item, end_item);
      this.current_page++;
    }

    if (this.current_page == this.total_pages) {
      this.disableLink(element);
    }

    this.highlightCurrentPageIndex();
    this.enableOtherPagesIndex();
  },

  showNextSlot: function(start_item, end_item) {
    this.list_items.hide();
    this.list_items.slice(start_item, end_item).show();
  },

  replaceElement: function(element_to_replace, new_element) {
    var attributes = element_to_replace.prop('attributes');

    $.each(attributes, function() {
      new_element.attr(this.name, this.value);
      new_element.text(element_to_replace.text());
    });
    element_to_replace.replaceWith(new_element);
    return new_element;
  }

}

$(document).ready(function() {
  new Store();
});
