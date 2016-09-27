// 集合函数，试用更改多个属性【透明度、宽度、高度】,fn执行完后继续执行fn函数
// 使用类似json的map格式(目前不知道叫啥) 同步运动
function startMove(obj,json,fn) {
	//动画是否完成
	var flag = false;
	clearInterval(obj.timer);
	//循环执行的主体部分
	obj.timer = setInterval(function(){
		for(var key in json){
			// 定义一个临时变量来统一当前的值(可能是宽度、透明度)以便后面计算速度用
			var Temp = 0;
			if (key == "opacity") {
				//四舍五入
				Temp = Math.round(parseFloat(getStyle(obj,key)) * 100);
			}else{
				Temp = parseInt(getStyle(obj,key));
			}
			//计算速度
			var speed = (json[key] - Temp)/10;
			speed = speed > 0 ?Math.ceil(speed):Math.floor(speed);
			if (key == "opacity") {
				Temp += speed;
				obj.style.opacity = Temp/100;
				obj.style.filter = 'alpha(opacity:'+ Temp +')';
			}else if (key == "height") {
				obj.style.height = Temp + speed + "px";
			}else{
				obj.style.width = Temp + speed + "px";
			}
			//判断动画是否完成,必须要写else，否则同步动画会有问题
			// if (json[key] == Temp) {
			// 	flag = true;
			// }else{
			// 	flag = false;
			// }
			flag = (json[key] == Temp)?true:false;
		}
		if (flag) {
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		}
	},20);
}

// 获取样式的函数，第二个为样式名(也许)，返回的是字符串
function getStyle(obj,attr) {
	//判断是否支持IE，否则是firefox
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}