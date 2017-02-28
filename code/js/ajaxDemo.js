// 发送数据
$(document).ready(function() {
    $("#save").click(function() {
        $.ajax({
            type: "post",
            url: "service.php",
            dataType: "json",
            data: {
                name: $("#staffName").val(),
                number: $("#staffNumber").val(),
                sex: $("#staffSex").val(),
                job: $("#staffJob").val()
            },
            // 必须是一个方法，成功后回调
            success: function(data) {
                if (data.success) {
                    $("#createResult").html(data.msg)
                } else {
                    $("#createResult").html("error: " + data.msg)
                }
            },
            error: function(jqXHR) {
                alert("error: "
                    jqXHR.status);
            }
        });
    });
});

// 获取数据
$.ajax({
    type: "GET",
    url: "service.php?number=" + $('#keyword').val,
    dataType: "json",
    // 必须是一个方法，成功后回调
    success: function(data) {
        if (data.success) {
            $("#createResult").html(data.msg)
        } else {
            $("#createResult").html("error: " + data.msg)
        }
    },
    error: function(jqXHR) {
        alert("error: "
            jqXHR.status);
    }
});

// 分割线----跨越请求
/*
1、处理跨域方法一   代理
	通过在同域名下的web服务器端创建一个代理：
	北京服务器(域名:www.beijing.com)
	上海服务器(域名：www.shanghai.com)
	比如在北京的web服务器的后台(www.beijing.com/proxy-shanghaiservice.php)
	来调用上海服务器(www.shanghai.com/services.php)的服务，
	然后再把访问结果返回给前端，这样前端调用北京同域名的服务就和调用上海的服务效果相同了。

2、处理跨域方式二——JSONP(只支持GET请求)：
	JSONP可用于解决主流浏览器的跨域数据访问的问题。
	在www.aaa.com页面中：

	<script>
	function jsonp(json){
	     alert(json["name"]);
	}
	</script>

	<script src="http;//www.bbb.com/jsonp.js"></script>
	

	在前端如果使用的Jquery，type选择jsonp，然后增加一个属性jsonp，值可以任意
	在bbb服务端要获取到这个名字，可以看出是在url传递了一个参数，所以也就只支持GET请求了
	PHP：$jsonp = $_GET['name']
	返回值需要用括号括起来，前面加上$jsonp，用于校验吧

3、处理跨域的方法三——XHR2：

	1、HTML5提供的XMLHttpRequest Level2已经实现了跨域访问以及其他的一些新功能
	2.IE10以下的版本都不支持
	3.在服务器端加入下面两句
	header('Access-Control-Allow-Origin:*');
	header('Access-Control-Allow-Methods:POST,GET');

*/