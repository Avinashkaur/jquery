$(document).ready(function() { 
 $("div.module").css("background-color" , "red"); 
 
 //three ways to reach 3rd list item
 $("#myList li").eq(2).css("background-color" , "cyan");
 $("#main").find("#myList #myListItem").css("background-color" , "cyan");
 $("#myListItem").css("background-color" , "cyan");
//best way is the third one as it refers directly by the id of the element and there is no depenedency on DOM

 $("label[for = 'q']").css("background-color" , "yellow");
 console.log("hidden elements:" + $("*:hidden").length);
 console.log("img with alt attribute:" + $('img[alt]').length);
 $("tr:odd").css("background-color" , "green");
  } 
);