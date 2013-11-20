//assigns unique ids to leaf node
function uniqueIDsToLeafNodes() {
  var $listItem = $('li:not(:has(ul))');
  var number = 0;
  $listItem.each(function(){
    $(this).attr("id",number);
      $(this).find("a").attr("href","allornone.html?"+number);
      number++;
    });
  } 
function check_url() {
  var url = $(location).attr('href');
  var node_id = url.split("?");
  var leafnode_parents = $('li #' + node_id[1]).parents('.accordion');
  leafnode_parents.each(function() {
    $(this).css("display" , "block")
  });
}