var count_point = {
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
  for (var i=0,j=0;i<arr.length;i++) {
    if(arr[i][j]<=x2&&arr[i][j]>=x1&&arr[i][j+1]<=y2&&arr[i][j+1]>=y1){
        count=count+1;
    }
  }
  return count;
  },
    circle:function ( num ){
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
    aa= '<div style="width: '+width1+'px;height: '+height1+'px;background-color:rgba(255,'+green+',100,0.2) ;border-radius: 50%;text-align:center;">'+num+'</div>';  
      return aa

      //按照距离来确定最大值
  //     var width1;
  //     var height1;
  //     if(num>=1000){
  //         width1 = 25;
  //         height1 = 25;
  //     }else if(num<1000&&num>=100){
  //         width1 = 20;
  //         height1 = 20;
  //     }else if(num<100&&num>2){
  //         width1 = 16;
  //         height1 = 16;
  //     }else if(num<=1){
  //         width1 = 0;
  //         height1 = 0;
  //     }
    
    // var aa;
    // aa= '<span style="display:block;height:16px;line-height:16px;width:'+width1+'px;text-align:center">'+num+'</span>
  //   <div style="background-image: url(image/DefaultIcon.png);width:'+width1+'px;height:'+height1+'px;background-size: cover;"></div>'; 
  //      return aa
      //后面调用annotation画圆使用，annotation中坐标用countpoint传入值的中间值即可
  },
   getHeight:function(){
    //要换成其他判定
    var camera_height ;
    var c = bt_Util.executeScript("Render\\Camera\\GetParam;");
    
    var wx = c[0].split(" ")[6];
    var wy = c[0].split(" ")[7];
    var wz = c[0].split(" ")[8];
    var angle = Math.atan( Math.sqrt(Math.pow(wx,2)+Math.pow(wy,2))/wz );
    if(angle<(PI/4)&&angle>(-PI/4)){
      camera_height = 0;
    }else{
      camera_height  = c[0].split(" ")[11];
    }
    console.log(camera_height);
    return camera_height;
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
var arr,arr1;
var x0 = 325,y0 = 310,x1 = -330,y1 = 330,x2 = -350,y2 = -320,x3 = 305,y3 = -335,x=0,y=0;
var n=0;
 window.onload=function(){
  //获取点
  $.ajax({
    type:"get",
    url:"",
    async:true,
    success:function(data){
       arr = data.arr;
    }
  });

  var to_upcount = count_point.getHeight();//获取高度

  var upcountt;//设定最大值
  if(to_upcount<100){
    upcountt = 1;
  }else{
    upcountt = to_upcount*2;
  }
  //统计四个象限的点
  arr1 = [ 
                {
                num:count_point.countpoint(arr,x,x0,y,y0),
                beginx:x,
                endx:x0,
                beginy:y,
                endy:y0
                          },
               {
                num:count_point.countpoint(arr,x,x1,y,y1),
                beginx:x,
                endx:x1,
                beginy:y,
                endy:y1
                          },
               {
                num:count_point.countpoint(arr,x,x2,y,y2),
                beginx:x,
                endx:x2,
                beginy:y,
                endy:y2
                          },
               {
                num:count_point.countpoint(arr,x,x3,y,y3),
                beginx:x,
                endx:x3,
                beginy:y,
                endy:y3
                          } 
                          ]
  var bepic = f(upcountt,arr1);
  render(bepic);
}


//控制渲染，后面需要加上事件，根据滚轴，右键带来的事件来获取高度然后进行事件的调用和渲染
    //鼠标滚动时对数组进行统计
    window.onwheel = function(){
    var to_upcount= count_point.getHeight();//获取高度

      var upcountt;//设定最大值
      if(to_upcount<100){
        upcountt = 1;
      }else{
        upcountt = to_upcount*2;
      }
      var bepic = f(upcountt,arr1);
      render(bepic);
    }

    //右键事件
    window.onmouseup = function(e){
               if(e.button ==2){
                   var to_upcount = count_point.getHeight();//获取高度
                    var upcountt;//设定最大值
                    if(to_upcount<100){
                      upcountt = 1;
                    }else{
                      upcountt = to_upcount*2;
                    }
                    var bepic = f(upcountt,arr1);
                    render(bepic);
               }
           }

  //处理递归函数中传入的值
  //上限值
  function zhi(upcoun){
    upcoun = 0.7*upcoun;
    return upcoun;
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
                            endy:coun[i].endy
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
                            endy:coun[i].endy
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
                            endy:(coun[i].endy+coun[i].beginy)/2
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
                            endy:coun[i].endy
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
                            endy:coun[i].endy
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
                            endy:coun[i].endy
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
                            endy:(coun[i].endy+coun[i].beginy)/2
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
                            endy:(coun[i].endy+coun[i].beginy)/2
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
                                 (coun[i].endx+coun[i].beginx)/2
                                                        ),
                            beginx:coun[i].beginx,
                            endx:(coun[i].endx+coun[i].beginx)/2,
                            beginy:coun[i].beginy,
                            endy:(coun[i].endx+coun[i].beginx)/2
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
                            endy:(coun[i].endy+coun[i].beginy)/2
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
                            endy:coun[i].endy
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
                            endy:coun[i].endy
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
                                 (coun[i].endx+coun[i].beginx)/2
                                                        ),
                            beginx:(coun[i].endx+coun[i].beginx)/2,
                            endx:coun[i].endx,
                            beginy:coun[i].beginy,
                            endy:(coun[i].endx+coun[i].beginx)/2
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
                            endy:(coun[i].endy+coun[i].beginy)/2
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
                            endy:coun[i].endy
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
                            endy:coun[i].endy
                                                        } 
                                                            ];
        }
     }

//递归函数
//如果是用距离划分最大值那么要做一个最大值的函数   和    对各个区域里面的数进行划分
  function f(upcount,count){ 
        if(upcount>=count[0].num&&upcount>=count[1].num&&upcount>=count[2].num&&upcount>=count[3].num){ 
            return [ count[0],count[1],count[2],count[3] ];
        }else{ 
          //上一层和下一层的关系怎么表示
          //不影响if判断条件，但是传值要进行修改
         for(var i = 0;i<count.length;i++){
            if(upcount<count[i].num){
              count[i].num = f(zhi(upcount),arrfn(count,i)))
            }
          }
           return count; 
        } 
      }  


    
    
//剩下的就是对数组进行遍历和渲染
    //遍历
    function render(arr){
      for(var i = 0;i<arr.length;i++){
        if(arr[i].num || arr[i].num.length>0){
          if(typeof(arr[i].num)=="number"){
            //渲染
            var marks = count_point.circle(arr[i].num);
            var ct = "ct"+n;//赋值唯一id
            //查询中心点的z坐标
            var center_x = (arr[i].endx+arr[i].beginx)/2;
            var center_y = (arr[i].endy+arr[i].beginy)/2;
            var center_z = count_point.getZ(center_x,center_y,-9000,center_x,center_y,9000);
            bt_Plug_Annotation.setAnnotation("ct",center_x,center_y, center_z, 0, 0, marks, true);
            n++;
          }
          render(arr[i].num);
        }
      }
    }
	