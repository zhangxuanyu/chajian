var gun = function(begin,end,gap,nn,id){
		var times2 = window.setTimeout(function(){
			window.clearInterval(times);
			var times = window.setInterval(function(){
			id.innerHTML = parseInt(nn*Math.random());
		console.log(times);
		},gap);
		
		var times1 = window.setTimeout(function(){
			window.clearInterval(times);
			id.innerHTML = nn;
		},end);
		
		},begin)	
	}