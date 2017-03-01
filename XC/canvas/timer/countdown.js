var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADRUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

//截止时间，月份从0开始
const endTime = new Date(2017,2,2,12,10,11);
var curShowTimeSeconds = 0;  //倒计时需要多少秒
// 存储小球和颜色
var balls = [];
const colors = ["#eaff56","#ff461f","#44cef6","#a3d900","#177cb0","#ff8c31","#3b2e7e","#ff4c00","#75878a"];

window.onload = function () {
	WINDOW_WIDTH = document.documentElement.clientWidth - 20;
	WINDOW_HEIGHT = document.documentElement.clientHeight - 20;

	MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
	MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
	RADRUS = Math.round(WINDOW_WIDTH *4/5/108) - 1;  //所有数字之和为108，假设占屏幕的4/5

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShowTimeSeconds = getCurShowTimeSeconds();
	setInterval(
		function () {
			render(context);
			update();
		},
		50
	);

}

function update() {
	var nextTime = getCurShowTimeSeconds();
	var nextHours = parseInt(nextTime/3600);
	var nextMinutes = parseInt((nextTime - nextHours*3600)/60);
	var nextSeconds = parseInt(nextTime%60);

	//原来的时间
	var oldHours = parseInt(curShowTimeSeconds/3600);
	var oldMinutes = parseInt((curShowTimeSeconds - oldHours*3600)/60);
	var oldSeconds = parseInt(curShowTimeSeconds%60);

	if (nextSeconds != oldSeconds) {
		// 添加相应小球
		// 这里只用了秒，其他的也都一样
		if (parseInt(nextSeconds/10) != parseInt(oldSeconds/10)) {
			addBalls(MARGIN_LEFT + 78*(RADRUS+1), MARGIN_TOP, parseInt(nextSeconds/10));
		}
		if (parseInt(nextSeconds%10) != parseInt(oldSeconds%10)) {
			addBalls(MARGIN_LEFT + 93*(RADRUS+1), MARGIN_TOP, parseInt(nextSeconds%10));
		}

		// 更新时间
		curShowTimeSeconds = nextTime;
	}

	//更新小球状态
	updateBalls();

	console.log(balls.length);
}

function updateBalls() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if (balls[i].y >= WINDOW_HEIGHT-RADRUS) {
			// 让其落地
			balls[i].y = WINDOW_HEIGHT-RADRUS;
			balls[i].vy = -balls[i].vy*0.75;
		}
	}

	// 筛选并删除滚出的小球
	var con = 0;
	for (var i = 0; i < balls.length; i++) {
		if (balls[i].x + RADRUS > 0 && balls[i].x - RADRUS < WINDOW_WIDTH) {
			balls[con++] = balls[i];  //必定是 i>=con
		}
	}
	while (balls.length > con) {
		balls.pop();  //删除末尾
	}
}

function addBalls(x,y,num) {
	for (var i = 0; i < digit[num].length; i++) {
		
		for (var j = 0; j < digit[num][i].length; j++) {
			// 判断是否绘制
			if (digit[num][i][j] == 1) {
				// color:colors[Math.random()*10%9]
				var aBall = {
					x:x+j*2*(RADRUS+1)+(RADRUS+1),
					y:y+i*2*(RADRUS+1)+(RADRUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1, Math.ceil(Math.random()*1000)) *4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				};

				balls.push(aBall);
			}
		}
	}
}

//处理时间，分解为各个数字，进行绘制
function render(cxt) {
	//刷新屏幕，对一个矩形区域进行刷新
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

	var hours = parseInt(curShowTimeSeconds/3600);
	var minutes = parseInt((curShowTimeSeconds - hours*3600)/60);
	var seconds = parseInt(curShowTimeSeconds%60);

	// 从那个位置开始绘制数字，绘制拿一个数字
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt); //绘制小时第一个数字
	// 数组中一行是7个，所以第二个数字就是14*r，多闪一点+1
	renderDigit(MARGIN_LEFT + 15*(RADRUS+1), MARGIN_TOP, parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT + 30*(RADRUS+1), MARGIN_TOP, 10, cxt); //对应冒号

	// 冒号在数组中是占4个
	// 分钟
	renderDigit(MARGIN_LEFT + 39*(RADRUS+1), MARGIN_TOP, parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT + 54*(RADRUS+1), MARGIN_TOP, parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT + 69*(RADRUS+1), MARGIN_TOP, 10, cxt); //对应冒号
	
	renderDigit(MARGIN_LEFT + 78*(RADRUS+1), MARGIN_TOP, parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT + 93*(RADRUS+1), MARGIN_TOP, parseInt(seconds%10),cxt);

	// 绘制小球
	for (var i = 0; i < balls.length; i++) {
		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, RADRUS,
			0,2*Math.PI
			);
		cxt.closePath();
		
		cxt.fillStyle = balls[i].color;
		cxt.fill();
	}
}

// 进行绘制数字
function renderDigit(x,y,num,cxt) {
	cxt.fillStyle = "rgb(0,102,153)";

	for (var i = 0; i < digit[num].length; i++) {
		
		for (var j = 0; j < digit[num][i].length; j++) {
			// 判断是否绘制
			if (digit[num][i][j] == 1) {
				cxt.beginPath();
				cxt.arc( x+j*2*(RADRUS+1)+(RADRUS+1), y+i*2*(RADRUS+1)+(RADRUS+1),RADRUS,
					0,2*Math.PI
					);
				cxt.closePath();
				
				cxt.fill();
			}
		}
	}
}

function getCurShowTimeSeconds() {
	var nowTime = new Date();
	var ret = endTime.getTime() - nowTime.getTime();
	//得到秒数
	ret = Math.round(ret/1000);
	return ret>0?ret:0;

	// 如果是时钟效果
	// var curTime = new Date();
 //    var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
 //    return ret;
}