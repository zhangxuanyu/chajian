var count_point = {
	countpoint:function (arr,x1,x2,y1,y2){
	var count =0;
	for (var i=0,j=0;i<arr.length;i++) {
		if(arr[i][j]<=x2&&arr[i][j]>=x1&&arr[i][j+1]<=y2&&arr[i][j+1]>=y1){
				count=count+1;
		}
	}
	return count;
  },
    circle:function ( num ){
		var width1 = num*2;
		var height1 = num*2;
		var green ;
		var aa;
		if(num>=200){
			green = 50;
		}else if(num>=100){
			green = 200;
		}else{
			green = 250;
		}
		aa= '<div style="width:'+width1+'px;height: '+height1+'px;background-color:rgba(255,'+green+',80,0.2) ;border-radius: 50%;"></div>';	
   		return aa
   		//后面调用annotation画圆使用，annotation中坐标用countpoint传入值的中间值即可
  },
   getHeight:function(){
   	var c = bt_Util.executeScript("Render\\Camera\\GetParam;");
	var height  = c[0].split(" ")[11];
	console.log(height);
	return height;
   }
}

	