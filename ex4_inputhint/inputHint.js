$(document).ready( function() {
  var labelText = $("label[for = 'q']");
  $(".input_text").attr('value' , labelText.html());
  $(".input_text").addClass("hint");
  labelText.detach();
  
  $(".input_text").each(function() {
    var $value = this.value;
    
    $(this).focus(function() {
      if (this.value == $value) {
        $(this).attr("value" , "");
        $(this).removeClass("hint");
      }
    });

    $(this).blur(function() {
    console.log(this.value);
      var text_value = this.value.trim();
        if(text_value == "") {
          this.value = $value;
          $(this).addClass("hint");
        }
    });
  });
});