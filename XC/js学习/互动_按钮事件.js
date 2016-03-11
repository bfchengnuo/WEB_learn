<!DOCTYPE html>
<html>
 <head>
  <title> new document </title>  
  <meta http-equiv="Content-Type" content="text/html; charset=gbk"/>   
  <script type="text/javascript">  
    
    // 新窗口打开时弹出确认框，是否打开

    // 通过输入对话框，确定打开的网址，默认为 http：//www.imooc.com/

    //打开的窗口要求，宽400像素，高500像素，无菜单栏、无工具栏。
    function openWindow(){
		if(confirm("是否打开慕课网？")){
			var url= prompt("输入你要打开的网站","http：//www.imooc.com");
			window.open(url,'_blank','width=400,height=500,menubar=no,toolbar=no');
		}
		else{
			
		}
    }
  </script> 
 </head> 
 <body> 
	  <input type="button" value="新窗口打开网站" onclick="openWindow()" /> 
 </body>
</html>