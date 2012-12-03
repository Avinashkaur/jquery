$(document).ready(function(){
    var $div = $("<div></div>").insertAfter($("#specials").find('form'));
    var $days = $("#specials").find('form ul li select');
    var cached_JSON = {};
    $(".input_submit").remove();
    $days.one('change' , function(){
        var $value = $(this).val();
        $.getJSON('data/specials.json' , function(data) {
            cached_JSON = data;
            $div.html(cached_JSON[$value].title + "<br />" + cached_JSON[$value].text);
        });
        $(this).change(function(){
            $value = $(this).val();
            $div.html(cached_JSON[$value].title + "<br />" + cached_JSON[$value].text) ;
        });
    });
});