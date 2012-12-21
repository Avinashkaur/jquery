$(document).ready( function() {

  function addText(i) {
    // return function() {
      var $text = "List Item: " + i;
      return $text;
    // }
  }
// Add five new list items to the end of the unordered list #myList 
for ( var i = 0; i < 5; i++) {
  console.log($('<li></li>').appendTo('#myList').html(addText(i)));
}
//Remove the odd list items
// console.log($('#myList li:nth-child(odd)').remove());
// Add another h2 and another paragraph to the last div.module 
console.log($('<h2>This is H2</h2><p>This is new p</p>').appendTo('div .module:last'));
// Add another option to the select element; give the option the value "Wednesday" 
console.log($('<option value="Wednesday">Wednesday</option>').appendTo('select'))
// Add a new div.module to the page after the last one; put a copy of one of the existing images inside of it.
console.log($('<div class = "module">This is the new div with module class</div>').insertAfter($('div .module:last')));
console.log($('img[alt = "fruit"]').clone().appendTo('div .module:last'));
}
  );