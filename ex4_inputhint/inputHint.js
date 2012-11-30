$(document).ready( function() {
  var inputText = $(".input_text");
  var labelText = $("label[for = 'q']");
  console.log(inputText.attr('value' , labelText.html()));
  console.log(inputText.addClass("hint"));
  console.log(labelText.detach());
  console.log(inputText.focus(function() {
    inputText.attr("value" , "");
    inputText.removeClass("hint");
    console.log(inputText.blur(function() {
      var text_value = inputText.attr("value").trim();
        if(text_value == "") {
          inputText.attr("value" , "Enter search term");
          inputText.addClass("hint");
        }
    }));
  }));
});