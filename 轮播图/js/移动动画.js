//动画封装函数
			function translate(obj,target,callback){
				//先清除以前的定时器，只保留一个定时器执行
				clearInterval(obj.timer);
				obj.timer = setInterval(function(){
					//步长值写到定时器里，步长值为整数，不要出现小数的问题
					var step = (target - obj.offsetLeft) / 10; //逐渐缓慢移动效果
					step = step > 0 ? Math.ceil(step) : Math.floor(step);//正值向上取整，负值向下
					if(obj.offsetLeft == target){
						clearInterval(obj.timer);
					// 	if(callback){
					// 		callback(); //定时器结束执行回调函数
					// 	}
					// }
					callback && callback();
					}
						obj.style.left = obj.offsetLeft + step + 'px';
						
						//另一种实现思路：使用translate实现
					
				},10)
				}