$(document).ready( function() {
  var inputText = $(".input_text");
  var labelText = $("label[for = 'q']");
  var oldLabelText = labelText;
  inputText.attr('value' , labelText.html());
  inputText.addClass("hint");
  labelText.detach();
  console.log(inputText.focus(function() {
    if (inputText.attr("value") == oldLabelText.html()) {
      inputText.attr("value" , "");
       inputText.removeClass("hint");
    }
    console.log(inputText.blur(function() {
      var text_value = inputText.attr("value").trim();
        if(text_value == "") {
          inputText.attr("value" , oldLabelText.html());
          inputText.addClass("hint");
        }
    }));
  }));
});