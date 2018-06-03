			//
			//斜角45度
			//
var count_point = {
	getPointInfo:function(arr,x1,x2,y1,y2){
		var gpx ,gpy,gpz;
		if(x1>x2){
        var a;
        a = x1;
        x1 = x2;
        x2 = a;
      }
      if(y1>y2){
        var a;
        a = y1;
        y1 = y2;
        y2 = a;
      }
      var i = 0,len = arr.length;
      for(;i<len;i++){
      	if(arr[i].x<=x2&&arr[i].x>=x1&&arr[i].y<=y2&&arr[i].y>=y1){
        	gpx = arr[i].x;
        	gpy = arr[i].y;
        	gpz = arr[i].z;
        	gpmk = arr[i].the_mark;
    	}
      }
      return [{x:gpx,y:gpy,z:gpz,mk:gpmk}];
	},
	countpoint:function (arr,x1,x2,y1,y2){
    //arr要求是数组[ [1,2,3,],[4,5,6] ],每次查询数都是完整的后台传输的数据
      var count =0;
      if(x1>x2){
        var a;
        a = x1;
        x1 = x2;
        x2 = a;
      }
      if(y1>y2){
        var a;
        a = y1;
        y1 = y2;
        y2 = a;
      }
      var i = 0,len = arr.length;
  for (;i<len;i++) {
    if(arr[i].x<=x2&&arr[i].x>=x1&&arr[i].y<=y2&&arr[i].y>=y1){
        count=count+1;
    }
  }
  
  return count;
  },
    circle:function ( num,x,y,z ){
      //高度的角度
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
    aa= '<div onclick="jpto(event)" style="width: '+width1+'px;height: '+height1+'px;background-color:rgba(255,'+green+',100,0.2) ;border-radius: 50%;text-align:center;"><input type="hidden" name="" id="" value="['+x+','+y+','+z+']"/>'+num+'</div>';  
      return aa
      //后面调用annotation画圆使用，annotation中坐标用countpoint传入值的中间值即可
  },
   getHeight:function(x1,x2,y1,y2){
    //要换成其他判定
    var camera_height ;
    var c = bt_Util.executeScript("Render\\Camera\\GetParam;");
    
    var wx = c[0].split(" ")[0];
    var wy = c[0].split(" ")[1];
    var wz = c[0].split(" ")[2];
    var mx = (x1+x2)/2;
    var my = (y1+y2)/2;
    var ml = Math.abs(x1-mx);
    //var xsml = ml/10
    var mz = bt_Util.executeScript("Render\\CameraControl\\LineIntersect mx my 9000 mx my -9000;")[0].split(" ")[3];
    var angle = Math.atan( Math.sqrt(ml/Math.pow(wx-mx,2)+Math.pow(wy-my,2)+Math.pow(wz-mz,2))/ml );
    angle = angle*ml/8;
    if(angle<=1){
    	angle = 1.5;
    }
    //angle全是正，在判断进行时会出现问题
    return angle;
   },
   getZ:function(sx,sy,sz,ex,ey,ez){
    var z = bt_Util.executeScript("Render\\CameraControl\\LineIntersect sx sy sz ex ey ez;");
    var getz = z[0].split(" ")[3];
    return getz;
   }
}
//打印出的就是高度
//  var c = bt_Util.executeScript("Render\\Camera\\GetParam;");
//  var height  = c[0].split(" ")[11];
//  console.log(height);
//加载即执行一次聚合渲染
//聚合渲染步骤：  首先从后台获取点1获取相机高度
//      2根据高度对聚合最大值进行设定,包括各个层次的最大值,建议以0.7为准
//      3开始统计聚合的数量,聚合的数量与设定最大值进行比较,高于最大值即继续分裂
//      4统计值完毕则对页面进行渲染
//  基本步骤流程走完一遍，在分裂时出现问题，需要对分裂过程进行递归处理，否则无效
var arr_root,arr,arr1,arrt = [];
var bepic;
var ct,mt;
var x0 = 325,y0 = 310,x1 = -330,y1 = 330,x2 = -350,y2 = -320,x3 = 305,y3 = -335,x=0,y=0;
var n=0,endn,n1 = 0,endn1;
 window.onload=function(){
  //获取点
//$.ajax({
//  type:"get",
//  url:"",
//  async:true,
//  success:function(data){
//     arr = data.arr;
//  }
//});
	 
	 arr =[
{num:1,x:-28.09, y:27.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-38.09, y:32.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-28.09, y:127.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-228.09, y:127.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-110.09, y:117.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-118.09, y:137.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-148.09, y:167.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-128.09, y:127.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-228.09, y:227.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-228.09, y:37.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-38.09, y:227.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-39.09, y:127.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-218.09, y:257.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-148.09, y:167.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:128.09, y:127.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:228.09, y:227.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:228.09, y:37.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:38.09, y:227.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:39.09, y:127.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:218.09, y:257.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:148.09, y:167.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:28.09, y:27.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:38.09, y:32.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:28.09, y:127.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:228.09, y:127.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:110.09, y:117.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:118.09, y:137.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:148.09, y:167.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:148.09, y:167.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-28.09, y:-27.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-38.09, y:-32.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-28.09, y:-127.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-228.09, y:-127.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-110.09, y:-117.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-118.09, y:-137.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-148.09, y:-167.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-228.09, y:-137.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-58.09, y:-257.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-68.09, y:-57.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-118.09, y:-97.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-128.09, y:-117.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-218.09, y:-97.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-98.09, y:-127.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-78.09, y:-157.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:-88.09, y:-207.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:148.09, y:-167.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:28.09, y:-27.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:38.09, y:-32.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:28.09, y:-127.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:228.09, y:-127.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:110.09, y:-117.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:118.09, y:-137.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:148.09, y:-167.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:128.09, y:-37.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:18.09, y:-97.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:28.09, y:-87.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:38.09, y:-117.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:88.09, y:-137.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:98.09, y:-39.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:142.09, y:-38.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:125.09, y:-83.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"},
{num:1,x:77.09, y:-94.32, z:85.98,the_mark:"<div style='background:url(image/DefaultIcon.png); background-position:center left; background-repeat: no-repeat; height:16px;line-height:10px;'><span style='margin-left:16px; font-size:9px; white-space: nowrap;'>" + "端点1" + "</span></div>"}
]

//渲染标记点
//render(arr);
////统计四个象限的点
arr_root = [ 
                {
                num:count_point.countpoint(arr,x,x0,y,y0),
                beginx:x,
                endx:x0,
                beginy:y,
                endy:y0,
                getUpc:count_point.getHeight(x,x0,y,y0)
                          },
               {
                num:count_point.countpoint(arr,x,x1,y,y1),
                beginx:x,
                endx:x1,
                beginy:y,
                endy:y1,
                getUpc:count_point.getHeight(x,x1,y,y1)
                          },
               {
                num:count_point.countpoint(arr,x,x2,y,y2),
                beginx:x,
                endx:x2,
                beginy:y,
                endy:y2,
                getUpc:count_point.getHeight(x,x2,y,y2)
                          },
               {
                num:count_point.countpoint(arr,x,x3,y,y3),
                beginx:x,
                endx:x3,
                beginy:y,
                endy:y3,
                getUpc:count_point.getHeight(x,x3,y,y3)
                          } 
                          ]
arr1 = arr_root;
bepic = f(arr1);
render(bepic);
n=0;
n1 = 0;
arr_root = [ 
                {
                num:count_point.countpoint(arr,x,x0,y,y0),
                beginx:x,
                endx:x0,
                beginy:y,
                endy:y0,
                getUpc:count_point.getHeight(x,x0,y,y0)
                          },
               {
                num:count_point.countpoint(arr,x,x1,y,y1),
                beginx:x,
                endx:x1,
                beginy:y,
                endy:y1,
                getUpc:count_point.getHeight(x,x1,y,y1)
                          },
               {
                num:count_point.countpoint(arr,x,x2,y,y2),
                beginx:x,
                endx:x2,
                beginy:y,
                endy:y2,
                getUpc:count_point.getHeight(x,x2,y,y2)
                          },
               {
                num:count_point.countpoint(arr,x,x3,y,y3),
                beginx:x,
                endx:x3,
                beginy:y,
                endy:y3,
                getUpc:count_point.getHeight(x,x3,y,y3)
                          } 
                          ]
arr1 = arr_root;
}


//控制渲染，后面需要加上事件，根据滚轴，右键带来的事件来获取高度然后进行事件的调用和渲染
    
    function gunzhou(){
    	console.log("滚轴");
    	console.log(arr_root);
    	//var to_upcount= count_point.getHeight();//获取高度
    	arr_root = [ 
                {
                num:count_point.countpoint(arr,x,x0,y,y0),
                beginx:x,
                endx:x0,
                beginy:y,
                endy:y0,
                getUpc:count_point.getHeight(x,x0,y,y0)
                          },
               {
                num:count_point.countpoint(arr,x,x1,y,y1),
                beginx:x,
                endx:x1,
                beginy:y,
                endy:y1,
                getUpc:count_point.getHeight(x,x1,y,y1)
                          },
               {
                num:count_point.countpoint(arr,x,x2,y,y2),
                beginx:x,
                endx:x2,
                beginy:y,
                endy:y2,
                getUpc:count_point.getHeight(x,x2,y,y2)
                          },
               {
                num:count_point.countpoint(arr,x,x3,y,y3),
                beginx:x,
                endx:x3,
                beginy:y,
                endy:y3,
                getUpc:count_point.getHeight(x,x3,y,y3)
                          } 
                          ]
arr1 = arr_root;
    		
    	//清除之前的渲染
    	console.log("endn:"+endn);
    	//要出现聚合，去掉标记点
    	removeRenderPoint(endn1);
    	removeRender(endn);
  		//最大值在数组中
        bepic = f(arr1);
        render(bepic);
        n = 0;
      	n1 = 0;
     	
    
    console.log(arr_root);
    }

    //右键事件
    function youjian(event){
               
               	   console.log("右键");                   
                   	//清除之前的渲染
                   	arr_root = [ 
                {
                num:count_point.countpoint(arr,x,x0,y,y0),
                beginx:x,
                endx:x0,
                beginy:y,
                endy:y0,
                getUpc:count_point.getHeight(x,x0,y,y0)
                          },
               {
                num:count_point.countpoint(arr,x,x1,y,y1),
                beginx:x,
                endx:x1,
                beginy:y,
                endy:y1,
                getUpc:count_point.getHeight(x,x1,y,y1)
                          },
               {
                num:count_point.countpoint(arr,x,x2,y,y2),
                beginx:x,
                endx:x2,
                beginy:y,
                endy:y2,
                getUpc:count_point.getHeight(x,x2,y,y2)
                          },
               {
                num:count_point.countpoint(arr,x,x3,y,y3),
                beginx:x,
                endx:x3,
                beginy:y,
                endy:y3,
                getUpc:count_point.getHeight(x,x3,y,y3)
                          } 
                          ]
arr1 = arr_root;
                   	removeRenderPoint(endn1)
    				removeRender(endn);
        				bepic = f(arr1);
        				render(bepic);
        				n = 0;
        				n1 = 0;
                   
                  
               
               
           }

  
 
  //传入的数组
  //有个问题，就是参数endx = 0，endy = 0，其他为非零，这样判断会出现都不符合条情况
  //这样还会出现一个问题，第一象限和第三象限包括了为零的情况,用中点
  function arrfn(coun,i){
        if( ((coun[i].endx+coun[i].beginx)/2)>0 &&((coun[i].endy+coun[i].beginy)/2)>0  ){
          //第一象限
          return  coun = [
                          {
                            num: count_point.countpoint(
                                 arr,
                                 (coun[i].endx+coun[i].beginx)/2,
                                 coun[i].endx,
                                 (coun[i].endy+coun[i].beginy)/2,
                                 coun[i].endy
                                                        ),
                            beginx:(coun[i].endx+coun[i].beginx)/2,
                            endx:coun[i].endx,
                            beginy:(coun[i].endy+coun[i].beginy)/2,
                            endy:coun[i].endy,
                            getUpc:count_point.getHeight((coun[i].endx+coun[i].beginx)/2,coun[i].endx,(coun[i].endy+coun[i].beginy)/2,coun[i].endy)
                                                      } ,
                          {
                            num: count_point.countpoint(
                                 arr,
                                 coun[i].beginx,
                                 (coun[i].endx+coun[i].beginx)/2,
                                 (coun[i].endy+coun[i].beginy)/2,
                                 coun[i].endy
                                                        ),
                            beginx:coun[i].beginx,
                            endx:(coun[i].endx+coun[i].beginx)/2,
                            beginy:(coun[i].endy+coun[i].beginy)/2,
                            endy:coun[i].endy,
                            getUpc:count_point.getHeight(coun[i].beginx,(coun[i].endx+coun[i].beginx)/2,(coun[i].endy+coun[i].beginy)/2,coun[i].endy)
                                                       } ,
                          {
                            num: count_point.countpoint(
                                 arr,
                                 coun[i].beginx,
                                 (coun[i].endx+coun[i].beginx)/2,
                                 coun[i].beginy,
                                 (coun[i].endy+coun[i].beginy)/2
                                                        ),
                            beginx:coun[i].beginx,
                            endx:(coun[i].endx+coun[i].beginx)/2,
                            beginy:coun[i].beginy,
                            endy:(coun[i].endy+coun[i].beginy)/2,
                            getUpc:count_point.getHeight(coun[i].beginx,(coun[i].endx+coun[i].beginx)/2,coun[i].beginy,(coun[i].endy+coun[i].beginy)/2)
                                                        } ,
                          {
                            num: count_point.countpoint(
                                 arr,
                                 (coun[i].endx+coun[i].beginx)/2,
                                 coun[i].endx,
                                 coun[i].beginy,
                                 (coun[i].endy+coun[i].beginy)/2
                                                        ),
                            beginx:(coun[i].endx+coun[i].beginx)/2,
                            endx:coun[i].endx,
                            beginy:coun[i].beginy,
                            endy:(coun[i].endy+coun[i].beginy)/2,
                             getUpc:count_point.getHeight((coun[i].endx+coun[i].beginx)/2,coun[i].endx,coun[i].beginy,(coun[i].endy+coun[i].beginy)/2)
                                                        } 
                                                            ];
        }else if(((coun[i].endx+coun[i].beginx)/2)<0&&((coun[i].endy+coun[i].beginy)/2)>0){
          //第二象限
          return  coun = [
                          {
                            num: count_point.countpoint(
                                 arr,
                                 (coun[i].endx+coun[i].beginx)/2,
                                 coun[i].beginx,
                                 (coun[i].endy+coun[i].beginy)/2,
                                 coun[i].endy
                                                        ),
                            beginx:(coun[i].endx+coun[i].beginx)/2,
                            endx:coun[i].beginx,
                            beginy:(coun[i].endy+coun[i].beginy)/2,
                            endy:coun[i].endy,
                            getUpc:count_point.getHeight((coun[i].endx+coun[i].beginx)/2,coun[i].beginx,(coun[i].endy+coun[i].beginy)/2,coun[i].endy)
                                                      } ,
                          {
                            num: count_point.countpoint(
                                 arr,
                                 (coun[i].endx+coun[i].beginx)/2,
                                 coun[i].endx,
                                 (coun[i].endy+coun[i].beginy)/2,
                                 coun[i].endy
                                                        ),
                            beginx:(coun[i].endx+coun[i].beginx)/2,
                            endx:coun[i].endx,
                            beginy:(coun[i].endy+coun[i].beginy)/2,
                            endy:coun[i].endy,
                            getUpc:count_point.getHeight((coun[i].endx+coun[i].beginx)/2,coun[i].endx,(coun[i].endy+coun[i].beginy)/2,coun[i].endy)
                                                       } ,
                          {
                            num: count_point.countpoint(
                                 arr,
                                 (coun[i].endx+coun[i].beginx)/2,
                                 coun[i].endx,
                                 coun[i].beginy,
                                 (coun[i].endy+coun[i].beginy)/2
                                                        ),
                            beginx:(coun[i].endx+coun[i].beginx)/2,
                            endx:coun[i].endx,
                            beginy:coun[i].beginy,
                            endy:(coun[i].endy+coun[i].beginy)/2,
                            getUpc:count_point.getHeight((coun[i].endx+coun[i].beginx)/2,coun[i].endx,coun[i].beginy,(coun[i].endy+coun[i].beginy)/2)
                                                        } ,
                          {
                            num: count_point.countpoint(
                                 arr,
                                 coun[i].beginx,
                                 (coun[i].endx+coun[i].beginx)/2,
                                 coun[i].beginy,
                                 (coun[i].endy+coun[i].beginy)/2
                                                        ),
                            beginx:coun[i].beginx,
                            endx:(coun[i].endx+coun[i].beginx)/2,
                            beginy:coun[i].beginy,
                            endy:(coun[i].endy+coun[i].beginy)/2,
                            getUpc:count_point.getHeight(coun[i].beginx,(coun[i].endx+coun[i].beginx)/2,coun[i].beginy,(coun[i].endy+coun[i].beginy)/2)
                                                        } 
                                                            ];
        }else if(((coun[i].endx+coun[i].beginx)/2)<0&&((coun[i].endy+coun[i].beginy)/2)<0){
          //第三象限
          return  coun = [
                          {
                            num: count_point.countpoint(
                                 arr,
                                 coun[i].beginx,
                                 (coun[i].endx+coun[i].beginx)/2,
                                 coun[i].beginy,
                                 (coun[i].endy+coun[i].beginy)/2
                                                        ),
                            beginx:coun[i].beginx,
                            endx:(coun[i].endx+coun[i].beginx)/2,
                            beginy:coun[i].beginy,
                            endy:(coun[i].endy+coun[i].beginy)/2,
                            getUpc:count_point.getHeight(coun[i].beginx,(coun[i].endx+coun[i].beginx)/2,coun[i].beginy,(coun[i].endy+coun[i].beginy)/2)
                                                      } ,
                          {
                            num: count_point.countpoint(
                                 arr,
                                 (coun[i].endx+coun[i].beginx)/2,
                                 coun[i].endx,
                                 coun[i].beginy,
                                 (coun[i].endy+coun[i].beginy)/2
                                                        ),
                            beginx:(coun[i].endx+coun[i].beginx)/2,
                            endx:coun[i].endx,
                            beginy:coun[i].beginy,
                            endy:(coun[i].endy+coun[i].beginy)/2,
                            getUpc:count_point.getHeight((coun[i].endx+coun[i].beginx)/2,coun[i].endx,coun[i].beginy,(coun[i].endy+coun[i].beginy)/2)
                                                       } ,
                          {
                            num: count_point.countpoint(
                                 arr,
                                 (coun[i].endx+coun[i].beginx)/2,
                                 coun[i].endx,
                                 (coun[i].endy+coun[i].beginy)/2,
                                 coun[i].endy
                                                        ),
                            beginx:(coun[i].endx+coun[i].beginx)/2,
                            endx:coun[i].endx,
                            beginy:(coun[i].endy+coun[i].beginy)/2,
                            endy:coun[i].endy,
                            getUpc:count_point.getHeight((coun[i].endx+coun[i].beginx)/2,coun[i].endx,(coun[i].endy+coun[i].beginy)/2,coun[i].endy)
                                                        } ,
                          {
                            num: count_point.countpoint(
                                 arr,
                                 coun[i].beginx,
                                 (coun[i].endx+coun[i].beginx)/2,
                                 (coun[i].endy+coun[i].beginy)/2,
                                 coun[i].endy
                                                        ),
                            beginx:coun[i].beginx,
                            endx:(coun[i].endx+coun[i].beginx)/2,
                            beginy:(coun[i].endy+coun[i].beginy)/2,
                            endy:coun[i].endy,
                            getUpc:count_point.getHeight(coun[i].beginx,(coun[i].endx+coun[i].beginx)/2,(coun[i].endy+coun[i].beginy)/2,coun[i].endy)
                                                        } 
                                                            ];
        }else if(((coun[i].endx+coun[i].beginx)/2)>0&&((coun[i].endy+coun[i].beginy)/2)<0){
          //第四象限
          return  coun = [
                          {
                            num: count_point.countpoint(
                                 arr,
                                 (coun[i].endx+coun[i].beginx)/2,
                                 coun[i].endx,
                                 coun[i].beginy,
                                 (coun[i].endy+coun[i].beginy)/2
                                                        ),
                            beginx:(coun[i].endx+coun[i].beginx)/2,
                            endx:coun[i].endx,
                            beginy:coun[i].beginy,
                            endy:(coun[i].endy+coun[i].beginy)/2,
                            getUpc:count_point.getHeight((coun[i].endx+coun[i].beginx)/2,coun[i].endx,coun[i].beginy,(coun[i].endy+coun[i].beginy)/2)
                                                      } ,
                          {
                            num: count_point.countpoint(
                                 arr,
                                 coun[i].beginx,
                                 (coun[i].endx+coun[i].beginx)/2,
                                 coun[i].beginy,
                                 (coun[i].endy+coun[i].beginy)/2
                                                        ),
                            beginx:coun[i].beginx,
                            endx:(coun[i].endx+coun[i].beginx)/2,
                            beginy:coun[i].beginy,
                            endy:(coun[i].endy+coun[i].beginy)/2,
                            getUpc:count_point.getHeight(coun[i].beginx,(coun[i].endx+coun[i].beginx)/2,coun[i].beginy,(coun[i].endy+coun[i].beginy)/2)
                                                       } ,
                          {
                            num: count_point.countpoint(
                                 arr,
                                 coun[i].beginx,
                                 (coun[i].endx+coun[i].beginx)/2,
                                 (coun[i].endy+coun[i].beginy)/2,
                                 coun[i].endy
                                                        ),
                            beginx:coun[i].beginx,
                            endx:(coun[i].endx+coun[i].beginx)/2,
                            beginy:(coun[i].endy+coun[i].beginy)/2,
                            endy:coun[i].endy,
                            getUpc:count_point.getHeight(coun[i].beginx,(coun[i].endx+coun[i].beginx)/2,(coun[i].endy+coun[i].beginy)/2,coun[i].endy)
                                                        } ,
                          {
                            num: count_point.countpoint(
                                 arr,
                                 (coun[i].endx+coun[i].beginx)/2,
                                 coun[i].endx,
                                 (coun[i].endy+coun[i].beginy)/2,
                                 coun[i].endy
                                                        ),
                            beginx:(coun[i].endx+coun[i].beginx)/2,
                            endx:coun[i].endx,
                            beginy:(coun[i].endy+coun[i].beginy)/2,
                            endy:coun[i].endy,
                            getUpc:count_point.getHeight((coun[i].endx+coun[i].beginx)/2,coun[i].endx,(coun[i].endy+coun[i].beginy)/2,coun[i].endy)
                                                        } 
                                                            ];
        }
     }

//递归函数
//如果是用距离划分最大值那么要做一个最大值的函数   和    对各个区域里面的数进行划分
  function f(count){
    // 原始的 if 改成函数
    function isAllSatified(count){
        var i;
        for(i=0;i<4;i++){
            if(!(count[i].getUpc>=count[i].num[i])) {
                return false;
            }
        }
        return count.slice(0,4);
    }
    var allSat = isAllSatified(count);
    if(allSat) { return allSat; }
    
    // else 没有必要写   
    var i,lifo = [];
    var len = count.length; 
    // count 中不满足的放入 lifo
    // 逆序是为了和原始的处理顺序相同，其实我觉得没有必要
    for(i=len-1;i>=0;i--) {
        if(count[i].getUpc<count[i].num){
            lifo.push(count[i]);
        }
    }
    
    while(lifo.length > 0) {
        var reg = lifo.pop();      
        // 分割 reg
        var splitRegs = arrfn([reg],0);
        // 判断并生成新的数组
        var allSat = isAllSatified(splitRegs);
        if(allSat) {
            reg.num = allSat; // 分割结果放入(.num)
            continue;
        }
        len = splitRegs.length; 
        for(i=len-1;i>=0;i--) {
            if(splitRegs[i].getUpc<splitRegs[i].num){
                lifo.push(splitRegs[i]);
            }
        }
        reg.num = splitRegs;
    } 
    return count;
}
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	

        
       


    
    
//剩下的就是对数组进行遍历和渲染
    //遍历
    //还有一个显示与隐藏的问题，现在是无法对他进行任何操作，只能获取到id，x，y，z，div，这些
    function render(arrr){
    	var i = 0,len = arrr.length;
      for(;i<len;i++){
        if(arrr[i].num || arrr[i].num.length>0){
          if(typeof(arrr[i].num)=="number"){
          	//渲染标记点
          	if(arrr[i].num==1){
          		//判断是否是arr，自带x，y，z坐标，是则直接进行渲染，否，则找出点坐标进行渲染
          		if(arrr[i].x&&arrr[i].y&&arrr[i].z){
          			//用角度判断，就没有了直接全部变成标记的可能，就是arr渲染没有了
          		mt = "mt"+n1;
          		bt_Plug_Annotation.setAnnotation(mt,arrr[i].x,arrr[i].y, arrr[i].z, 0, 0, arrr[i].the_mark, true);
          		endn1 = n1;
          		n1++;
          		}else{
          			var gparr = count_point.getPointInfo(arr,arrr[i].beginx,arrr[i].endx,arrr[i].beginy,arrr[i].endy);
          			mt = "mt"+n1;
          			bt_Plug_Annotation.setAnnotation(mt,gparr[0].x,gparr[0].y, gparr[0].z, 0, 0, gparr[0].mk, true);
          			endn1 = n1;
          			n1++;
          		}
          		
          	}
            //渲染
            //数量大于等于2再渲染
            if(arrr[i].num>=2){
            	
            //查询中心点的z坐标
            var center_x = (arrr[i].endx+arrr[i].beginx)/2;
            var center_y = (arrr[i].endy+arrr[i].beginy)/2;
            var center_z = count_point.getZ(center_x,center_y,-9000,center_x,center_y,9000);
//          bt_Plug_Annotation.setAnnotation("ct",center_x,center_y, center_z, 0, 0, marks, true);
			var marks = count_point.circle(arrr[i].num,center_x,center_y,90);
            ct = "ct"+n;//赋值唯一id
 			bt_Plug_Annotation.setAnnotation(ct,center_x,center_y, 90, 0, 0, marks, true);
            endn = n;
            n++;
            }
            
          }
          render(arrr[i].num);
        }
      }
      return
    }
	
//移除渲染
	function removeRender(endn){	
            //移除渲染
            for (var i = 0;i<=endn;i++) {
            	 ct = "ct"+i
            	 bt_Plug_Annotation.removeAnnotation(ct);
            }     
           
	}

//移除标记点的渲染
	function removeRenderPoint(endn1){
		//移除渲染
            for (var i = 0;i<=endn1;i++) {
            	 mt = "mt"+i
            	 bt_Plug_Annotation.removeAnnotation(mt);
            }   
	}

	function jpto(event){
		var jpt = event.target.childNodes[0].value;
		console.log(jpt);
		bt_Util.executeScript("Render\\Camera\\JumpTo jpt[0] jpt[1] jpt[2];");
		//重新渲染
		removeRenderPoint(endn1);
    	removeRender(endn);
  		//最大值在数组中
        bepic = f(arr1);
        render(bepic);
        n = 0;
      	n1 = 0;
     	
    arr_root = [ 
                {
                num:count_point.countpoint(arr,x,x0,y,y0),
                beginx:x,
                endx:x0,
                beginy:y,
                endy:y0,
                getUpc:count_point.getHeight(x,x0,y,y0)
                          },
               {
                num:count_point.countpoint(arr,x,x1,y,y1),
                beginx:x,
                endx:x1,
                beginy:y,
                endy:y1,
                getUpc:count_point.getHeight(x,x1,y,y1)
                          },
               {
                num:count_point.countpoint(arr,x,x2,y,y2),
                beginx:x,
                endx:x2,
                beginy:y,
                endy:y2,
                getUpc:count_point.getHeight(x,x2,y,y2)
                          },
               {
                num:count_point.countpoint(arr,x,x3,y,y3),
                beginx:x,
                endx:x3,
                beginy:y,
                endy:y3,
                getUpc:count_point.getHeight(x,x3,y,y3)
                          } 
                          ]
    arr1 = arr_root;
	}
