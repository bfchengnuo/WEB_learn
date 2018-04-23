## 将彻底屏蔽鼠标右键

`oncontextmenu="window.event.returnValue=false"`

可用于 Table：

`<table border oncontextmenu=return(false)><td>no</table>`

## 取消选取、防止复制

`<body onselectstart="return false">`

## JS不允许粘贴

`onpaste="return false"`

## JS防止复制

`oncopy="return false;" oncut="return false;"`

## IE 地址栏前换成自己的图标

`<link rel="Shortcut Icon" href="favicon.ico">`

在文件的根目录放进去这个图片，后缀修改成ico就可以了

## 可以在收藏夹中显示出你的图标

`<link rel="Bookmark" href="favicon.ico">`

## 关闭输入法

`<input style="ime-mode:disabled">`

## 永远都会带着框架

``` javascript
<script language="JavaScript"><!--
if (window == top)top.location.href = "frames.htm"; //frames.htm 为框架网页
// –-></script>
```

## 防止被人 frame

``` javascript
<SCRIPT LANGUAGE=JAVASCRIPT><!--
if (top.location != self.location)top.location=self.location;
// –-></SCRIPT>
```

## 网页将不能被另存为

`<noscript><iframe src=*.html></iframe></noscript>`

`<input type=button value="查看网页源代码" onclick="window.location = 'view-source:'+ 'http://www.pconline.com.cn'">`

## 删除时确认

`<a href="javascript:if(confirm('确 实 要 删 除 吗 ?')) location='boos.asp?&areyou=删除&page=1'">删除</a>`

## 取得控件的绝对位置

``` javascript
//Javascript
function getIE(e){
  var t=e.offsetTop;
  var l=e.offsetLeft;

  while(e=e.offsetParent){
    t+=e.offsetTop;
    l+=e.offsetLeft;
  }

  alert("top=" + t + "/nleft=" + l);
}
```

## 光标是停在文本框文字的最后

``` javascript
function cc(){
  var e = event.srcElement;
  var r =e.createTextRange();
  r.moveStart("character",e.value.length);
  r.collapse(true);
  r.select();
}

<input type=text name=text1 value="123″ onfocus="cc()">
```

## 判断上一页的来源

document.referrer
## 屏蔽功能键 Shift,Alt,Ctrl

``` javascript
function look(){
  if(event.shiftKey)
    alert("禁止按 Shift 键!"); //可以换成 ALT CTRL
}
document.onkeydown=look;
```

## 网页不会被缓存

``` html
<META HTTP-EQUIV="pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">

或者
<META HTTP-EQUIV="expires" CONTENT="0">
```

## 怎样让表单没有凹凸感？

``` html
<input type=text style="border:1px solid #000000">
或
<input type=text style="border-left:none; border-right:none; border-top:none; border-bottom:
1px solid #000000">
```

## div、span、layer的区别？

DIV (division) 用来定义大段的页面元素，会产生转行.

Span 用来定义同一行内的元素，跟 div 的唯一区别是不产生转行.

layer 是 ns 的标记，ie 不支持，相当于 div

## 让弹出窗口总是在最上面:

`<body onblur="this.focus();">`

## 不要滚动条?

让竖条没有:

`<body style="overflow:scroll;overflow-y:hidden">`

让横条没有:

`<body style="overflow:scroll;overflow-x:hidden">`

两个都去掉？更简单了

`<body scroll="no">`

## 怎样去掉图片链接点击后，图片周围的虚线？

`<a href="#" onFocus="this.blur()"><img src="logo.jpg" border=0></a>`

## 电子邮件处理提交表单

``` html
<form name="form1" method="post" action="mailto:@***.com" enctype="text/plain">
	<input type=submit>
</form>
```

## 在打开的子窗口刷新父窗口的代码里如何写？

window.opener.location.reload()

## 如何设定打开页面的大小

`<body onload="top.resizeTo(300,200);">`

打开页面的位置 `<body onload="top.moveBy(300,200);">`

## 在页面中如何加入不是满铺的背景图片,拉动页面时背景图不动

``` css
body{
  background-image:none;
  background-repeat:no-repeat;
	background-position:center;
  background-attachment: fixed;
}
```

## 检查一段字符串是否全由数字组成

``` javascript
function checkNum(str){
  return str.match("//D/") == null;
}
```

## 获得一个窗口的大小

document.body.clientWidth; 

document.body.clientHeight

## 怎么判断是否是字符

``` javascript
// if (/[^\u4e00-\u9fa5]/g.test(s))
if(/[^\x00-\xff]/g.test(s))
  alert("含有汉字");
else
  alert("全是字符");

// 匹配双字节字符(包括汉字在内)：[^\x00-\xff]
// 匹配中文字符的正则表达式： [\u4e00-\u9fa5]
```

## TEXTAREA 自适应文字行数的多少

`<textarea rows=1 name=s1 cols=27 onpropertychange="this.style.posHeight=this.scrollHeight"></textarea>`

## 日期减去天数

``` javascript
function cc(dd,dadd){
  //可以加上错误处理
  var a = new Date(dd)
  a = a.valueOf()
  a = a – dadd * 24 * 60 * 60 * 1000
  a = new Date(a)
  alert(a.getFullYear() + "年" + (a.getMonth() + 1) + "月" + a.getDate() + "日")
}
```

## ENTER 键可以让光标移到下一个输入框

`<input onkeydown="if(event.keyCode==13) event.keyCode=9″>`

## 检测某个网站的链接速度：

把如下代码加入 body 区域中的 script 标签:

``` javascript
tim=1
setInterval("tim++",100)
b=1
var autourl=new Array()
autourl[1]="www.njcatv.net"
autourl[2]="javacool.3322.net"
autourl[3]="www.sina.com.cn"
autourl[4]="www.nuaa.edu.cn"
autourl[5]="www.cctv.com"

function butt(){
  document.write("<form name=autof>")
  for(var i=1;i< autourl.length;i++)
    document.write("<input type=text name=txt"+i+" size=10 value=测试中……> =》<input type=text name=url" + i + "size=40> =》<input type=button value=GO onclick=window.open(this.form.url" + i + ".value)>")
  document.write("<input type=submit value=刷新></form>")
}

butt()

function auto(url){
  document.forms0.value=url
  if(tim>200){
    document.forms0.value="链接超时"
  } else{
    document.forms0.value="时间"+tim/10+"秒"
  }
  b++
}

function run(){
  for(var i=1;i< autourl.length;i++)
    document.write("<img src=http://" + autourl + "/" + Math.random() + " width=1 height=1 onerror=auto('http://'+autourl+"")>")
}

run()
```

## 页面进入和退出的特效

进入页面 : `<meta http-equiv="Page-Enter" content="revealTrans(duration=x, transition=y)">`

推出页面: `<meta http-equiv="Page-Exit" content="revealTrans(duration=x, transition=y)">`

这个是页面被载入和调出时的一些特效。duration 表示特效的持续时间，以秒为单位。

transition 表示使用哪种特效，取值为 1-23 :

> 0 矩形缩小
>
> 1 矩形扩大
>
> 2 圆形缩小
>
> 3 圆形扩大
>
> 4 下到上刷新
>
> 5 上到下刷新
>
> 6 左到右刷新
>
> 7 右到左刷新
>
> 8 竖百叶窗
>
> 9 横百叶窗
>
> 10 错位横百叶窗
>
> 11 错位竖百叶窗
>
> 12 点扩散
>
> 13 左右到中间刷新
>
> 14 中间到左右刷新
>
> 15 中间到上下
>
> 16 上下到中间
>
> 17 右下到左上
>
> 18 右上到左下
>
> 19 左上到右下
>
> 20 左下到右上
>
> 21 横条
>
> 22 竖条
>
> 23 以上 22 种随机选择一种

## 在规定时间内跳转

`<META http-equiv=V="REFRESH" content="5;URL=http://www.51js.com">`

## 网页是否被检索

`<meta name="ROBOTS" content="属性值">`

其中属性值有以下一些:

属性值为"all": 文件将被检索，且页上链接可被查询；

属性值为"none": 文件不被检索，而且不查询页上的链接；

属性值为"index": 文件将被检索；

属性值为"follow": 查询页上的链接；

属性值为"noindex": 文件不检索，但可被查询链接；

属性值为"nofollow": 文件不被检索，但可查询页上的链接。