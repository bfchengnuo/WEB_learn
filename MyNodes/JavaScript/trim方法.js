//删除字符串左边的空格 
function ltrim(str) { 
  if(str.length==0) 
    return(str); 
  else {
    var idx=0; 
    //在索引处找到空格
    while(str.charAt(idx).search("\s")==0) 
      idx++; 
    return(str.substr(idx)); 
  } 
} 

//删除字符串右边的空格 
function rtrim(str) { 
  if(str.length==0) 
    return(str);
  else { 
    var idx=str.length-1; 
    while(str.charAt(idx).search(/\s/)==0) 
      idx--; 
    return(str.substring(0,idx+1)); 
  } 
}

/*
  \s 匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。 
  \S 匹配任何非空白字符。等价于 [^ \f\n\r\t\v]。 

  search()方法用于从字符串中寻找指定值的位置
  返回与正则表达式查找内容匹配的第一个子字符串的位置,没有匹配返回-1
  ltrim(rtrim(str))
*/