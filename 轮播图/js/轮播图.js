window.addEventListener('load',function(){
	var arrowl=document.querySelector('.arrow-l');
	var arrowr=document.querySelector('.arrow-r');
	var focus=document.querySelector('.focus');
	var foucusWidth=focus.offsetWidth;  //图片宽度
		//声明一个变量num，点击一次，自增1，让这个变量乘以图片宽度，就是ul的滚动距离
	var num = 0;
	focus.addEventListener('mouseenter',function(){
		arrowl.style.display='block';
		arrowr.style.display='block';
		//鼠标经过停止自动播放
		clearInterval(timer);
	
	})
	focus.addEventListener('mouseleave',function(){
		arrowl.style.display='none';
		arrowr.style.display='none';
		timer = setInterval(function(){
			//手动调用事件
			arrowr.click();
		},2000)
	})
	var ul=focus.querySelector('ul');
	var circle=document.querySelector('.circle');
	
	for(var i=0;i < ul.children.length;i++){
		var li=document.createElement('li');
		circle.appendChild(li);
		li.setAttribute('data-index',i);
		circle.children[i].addEventListener('mouseenter',function(){
			for(var i=0;i < ul.children.length-1;i++){
			circle.children[i].className='';
			}
			//当点击某个小圆圈，得到该圆圈的索引号
			var index=this.getAttribute('data-index');
			this.className='current';
			ul.children[index].querySelector('img').style.opacity="1";
			//点击小圆圈移动图片，ul移动
			num=parseInt(index);
			translate(ul,-index * foucusWidth);
		})
	}
	circle.children[0].className='current';
	var firstPic=ul.children[0].cloneNode(true);
	ul.appendChild(firstPic);
	var circleNum=0;
	var flag=true;   //节流阀
	//右箭头
		arrowr.addEventListener('click',function(){
			if(flag){
				flag = false;
				if(num == ul.children.length - 1){
					ul.style.left=0;
					num=0;
				}
				ul.children[num].querySelector('img').style.opacity="0.5";
				ul.children[num + 1].querySelector('img').style.opacity="1";
				num++;
				translate(ul,-num * foucusWidth,function(){
					flag = true;
				});
				circleChange(circleNum);
			}
		})
		
		
	//左箭头
	arrowl.addEventListener('click',function(){
		if(flag){
			flag=false;
			if(num == 0){
				num = ul.children.length - 1;
				ul.style.left= -num * foucusWidth + "px";
			}
			ul.children[num].querySelector('img').style.opacity="0.5";
			ul.children[num - 1].querySelector('img').style.opacity="1";
			num--;
			translate(ul,-num * foucusWidth,function(){
				flag = true;
			});
			circleChange(circleNum);
		}
	})
	
	function circleChange(circleNum){
		circleNum=num;
		if(circleNum==ul.children.length-1){
			circleNum=0;
		}
		for(var i=0;i<ul.children.length-1;i++){
			circle.children[i].className='';
			}
			circle.children[circleNum].className='current';
	}
	
	//自动播放功能
	var timer = setInterval(function(){
		//手动调用事件
		arrowr.click();
	},2000)
})