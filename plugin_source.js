$(function($) {
  $('.toggler').toggler = function() {
    return $(this).each(function() {
      $(this).togglee = $($(this).attr('href')).hide();
      $(this).click(onClick);
    });
    function onClick() {
      this.togglee.toggle()
      return false;
    }

  }
})