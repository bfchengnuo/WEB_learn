// HTML 标签转义（< -> &lt;）
function html2Escape(sHtml) {
 return sHtml.replace(/[<>&"]/g,function(c){
   return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];
 });
}


// HTML 标签反转义（&lt; -> <）
function escape2Html(str) {
  var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){
    return arrEntities[t];
  });
}

// JQ 版本 HTML 标签转义（< -> &lt;）
function html2Escape(sHtml) {
  return $("<div/>").text(sHtml).html();
}

// JQ 版本 HTML 标签反转义（&lt; -> <）
function escape2Html(str) {
  return $("<div/>").html(str).text();
}
