$(document).ready(function() { 
 $("div.module").css("background-color" , "red"); 
 $("#myList li").eq(2).css("background-color" , "cyan");
 $("label[for = 'q']").css("background-color" , "yellow");
 console.log("hidden elements:" + $("*:hidden").length);
 console.log("img with alt attribute:" + $('img[alt]').length);
 $("tr:odd").css("background-color" , "green");
  } 
);