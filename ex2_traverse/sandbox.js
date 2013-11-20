$(document).ready( function() {
  //log alt attribute of all img tags
  $('img').each(function(i) {
    console.log(this.alt);
  });
  //search input text box and traverse up to the form and add a class to the form
  console.log($('#search').addClass('searchbox').find('.input_text'));
  //Select the list item inside #myList that has a class of "current" 
  // and remove that class from it; add a class of "current" to the next list item.
  console.log($("#myList .current").removeClass('current').next('li').addClass('current'));
  //Select the select element inside #specials; traverse your way to the submit button.
  console.log($('#specials').find('#goButton')); 
  // Select the first list item in the #slideshow element; add the class "current" to it,
  //  and then add a class of "disabled" to its sibling elements. 
  console.log($('#slideshow li:first').addClass('current').siblings().each(function(){
    $(this).addClass('disabled');
  }));
});