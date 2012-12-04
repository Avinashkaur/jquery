$(document).ready( function() {
  var inputText = $(".input_text");
  var labelText = $("label[for = 'q']");
  inputText.attr('value' , labelText.html());
  inputText.addClass("hint");
  labelText.detach();
  console.log(inputText.focus(function() {
    if (inputText.attr("value") == "Enter search term") {
      inputText.attr("value" , "");
       inputText.removeClass("hint");
    }
    console.log(inputText.blur(function() {
      var text_value = inputText.attr("value").trim();
        if(text_value == "") {
          inputText.attr("value" , "Enter search term");
          inputText.addClass("hint");
        }
    }));
  }));
});