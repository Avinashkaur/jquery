$(document).ready( function() {
  var labelText = $("label[for = 'q']").html();
  $(".input_text").val(labelText);
  $(".input_text").addClass("hint");
  $("label[for = 'q']").detach();
  
 
    
    $(".input_text").focus(function() {
      if ($(this).val() == labelText) {
        $(this).attr("value" , "");
        $(this).removeClass("hint");
      }
    });

    $(".input_text").blur(function() {
      var text_value = $(this).val().trim();
      if(text_value == "") {
        $(this).val(labelText).addClass("hint");
      }
    });
  
});
