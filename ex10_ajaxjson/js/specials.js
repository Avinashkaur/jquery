$(document).ready(function(){
    var $div = $("<div></div>").insertAfter($("#specials").find('form'));
    var $days = $("#specials").find('form ul li select');
    var cached_JSON = {};
    $days.one('change' , function(){
        var $value = $(this).val();
        $(".input_submit").remove();
        var $img = $("<img />");
        $.getJSON('data/specials.json' , function(data) {
            cached_JSON = data;
            
            $div.html(cached_JSON[$value].title + "<br />" + cached_JSON[$value].text);
            $div.css("background-color" , cached_JSON[$value].color);
            $img.attr("src" , cached_JSON[$value].image);
            $img.appendTo($div);
        });
        $(this).change(function(){
            $value = $(this).val();
            $div.html(cached_JSON[$value].title + "<br />" + cached_JSON[$value].text);
            $div.css("background-color" , cached_JSON[$value].color);
            $img.attr("src" , cached_JSON[$value].image);
            $img.appendTo($div);
        });
    });
});