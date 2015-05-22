$(function(){
var intervaltime = 1000;
function init(){
	createALeaf();
}

function randomInteger(low, high){
	return low + Math.floor(Math.random() * (high - low));
}

function randomFloat(low, high){
	return low + Math.random() * (high - low);
}

//从arr数组中随机抽出一个value
function randomarr(arr){
	return Math.floor(Math.random()*arr.length+1)-1;
}

//返回val在数组arr中的键值，如果没有则返回-1
function isCon(arr, val){
	for(var i=0; i<arr.length; i++){
		if(arr[i]['img'] == val){
			return i;
		}
	}
	return -1;
}

function createALeaf(){
	var i=0;
	var speed=0.2;
	var initialSpeed=5;
	setInterval(function(){
		var manDiv = document.createElement('div');
		var image = document.createElement('img');
		var arrkey = randomarr(initial);
		manDiv.setAttribute('id','id'+i);
		image.src = initial[arrkey]['img'];
		image.setAttribute('isGame',initial[arrkey]['isGame']);
		image.setAttribute('isClick',0);
		manDiv.style.top = "-100px";
		manDiv.style.left = randomInteger(0, 260) + 'px';
		manDiv.style.webkitAnimationName = 'fade, drop';
		manDiv.style.webkitAnimationDuration = initialSpeed + 's, ' + initialSpeed + 's';
		manDiv.appendChild(image);
		
		setTimeout(function(){
			manDiv.style.display = 'none';			
			var isGame=image.getAttributeNode('isGame').nodeValue;
			var isClick=image.getAttributeNode('isClick').nodeValue;
			if (isGame==Game){
				console.log(isClick);
				if(isClick==0){
					window.location.href='results.html?Game='+Game;
				}
			}
		},initialSpeed*1000);
		
		$('#NightRunningMan').append(manDiv);
		
		
				
		//给图片绑定的tap事件
		$("#id"+ i +" img").bind('tap',function(){
			//$("#id"+ i).tap(function(){
			var oDate=new Date();
			oDate.setDate(oDate.getDate()+30);
			var isClick=isCon(initial, $(this).attr('src'));
			var winNum=parseInt($('#winNum').text());
			if(isClick>=0){
				if ($(this).attr('isGame')==Game){
					$(this).attr('src',later[isClick]['img']);
					$(this).attr('isClick',1);
					winNum=winNum+1;
					if(winNum<10){
						winNum='0' + winNum;
					}
					$('#winNum').text(winNum);
					document.cookie="winNum="+winNum+";expires="+oDate;
				}else{
					if(winNum<10){
						winNum='0' + winNum;
					}
					document.cookie="winNum="+winNum+";expires="+oDate;
					window.location.href='results.html?Game='+Game;
				}
				
			}
			$(this).off();
		});
		i=i+1;
		initialSpeed=initialSpeed-speed;
		if(initialSpeed<2){
			initialSpeed=2;
			intervaltime=500;
		}
	},intervaltime);
}
window.addEventListener('load', init, false); 
});