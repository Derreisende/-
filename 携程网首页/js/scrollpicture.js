window.addEventListener('load',function(){
	//获取焦点图模块
	 var focus = document.getElementsByClassName('focus')[0];
	 var ul = focus.children[0];
	 // 获得focus 的宽度
	 var w = focus.offsetWidth; 
	 var ol = focus.children[1];
	 // 2. 利用定时器自动轮播图图片
	 var index = 0;
	 var translatex;
	 var timer = setInterval(function() {
	     index++;
		 translatex = -index * w;
	     ul.style.transition = 'all .3s';
	     ul.style.transform = 'translateX(' + translatex + 'px)';
	 }, 2000);
	 
	 //过渡完成
	 ul.addEventListener('transitionend',function(){
		 //无缝滚动
		 if(index >= 3){
			 index = 0;
			 // console.log(index);
			 // 去掉过渡效果 这样让我们的ul 快速的跳到目标位置
			 ul.style.transition = 'none';
			 //利用最新的索引号乘以宽度去滚动图片
			 translatex = -index * w;
			 ul.style.transform = "translateX(" + translatex + "px)";
		 }else if(index < 0){
			 index = 2;
			 ul.style.transition = 'none';
			 translatex = -index * w;
			 ul.style.transform = "translateX(" + translatex + "px)";
		 }
		 //小圆点跟随变化
		 ol.querySelector('.current').classList.remove('current');
		 ol.children[index].classList.add('current');
	 });
	 
	 //手指滑动轮播图
	 //获取手指初始坐标
	 var startX = 0;
	 //移动距离
	 var moveX = 0;
	 var flag = false;
	 ul.addEventListener('touchstart',function(e){
		 starX = e.targetTouches[0].pageX;
		 // 手指触摸的时候就停止定时器
		 clearInterval(timer);
	 });
	 // 移动手指 touchmove： 计算手指的滑动距离， 并且移动盒子
	 ul.addEventListener('touchmove',function(e){
		 // 计算移动距离
		 moveX = e.targetTouches[0].pageX - startX;
		 // 移动盒子：  盒子原来的位置 + 手指移动的距离 
		 translatex = -index * w + moveX;
		 // 手指拖动的时候，不需要动画效果所以要取消过渡效果
		 ul.style.transition = 'none';
		 ul.style.transform = 'translateX(' + translatex + 'px)';
		 flag = true; // 如果用户手指移动过我们再去判断否则不做判断效果
		 e.preventDefault(); // 阻止滚动屏幕的行为
	 });
	 // 手指离开 根据移动距离去判断是回弹还是播放上一张下一张
	 ul.addEventListener('touchend',function(e){
		 // 用户手指移动过
		 if(flag){
			 //如果移动距离大于50像素就播放上一张或下一张
			 if(Math.abs(moveX) > 50){
				 //如果是右滑，播放上一张moveX是正值
				 if(moveX>0){
					 index--;
				 }else{
					 //左滑,播放下一张是正值
					 index++;
				 }
				 translatex = -index * w;
				 ul.style.transition = "all .3s";
				 ul.style.transform = 'translateX('+translatex+')';
			 }
		 } 
		 // 手指离开的时候就重新开启定时器
		 clearInterval(timer);
		 timer = setInterval(function() {
		     index++;
		     var translatex = -index * w;
		     ul.style.transition = 'all .3s';
		     ul.style.transform = 'translateX(' + translatex + 'px)';
		 }, 2000);
	 });
	 var goBack = document.querySelector('.goBack');
	 var nav = document.querySelector('nav');
	 window.addEventListener('scroll', function() {
	     if (window.pageYOffset >= nav.offsetTop) {
	         goBack.style.display = 'block';
	     } else {
	         goBack.style.display = 'none';
	     }
	 });
	 goBack.addEventListener('click', function() {
	     window.scroll(0, 0);
	 })
	 
})