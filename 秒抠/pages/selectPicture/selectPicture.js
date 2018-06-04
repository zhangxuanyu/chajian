//logs.js
const util = require('../../utils/util.js')
//声明全局变量记录返回的左上角右下角坐标
var arrPicture;
var jso;
Page({
  data: {
    src:"../../image/1111.jpg",
    screenWidth:0,
    screenHeight:0,
    rectanglesBeginx:0,
    rectanglesBeginy:0,
    rectanglesWidth:0,
    rectanglesHeight:0,
    theHeight:0,
    theWidth:0,
    thex:0,//记录开始点击时点的坐标
    they:0,
    centerx:0,//记录中心点坐标
    centery:0,
    // originalWidth:0,
    // originalHeight:0,
    x:0,
    y:0,
    top:false,
    left:false,
    right:false,
    bottom:false,
    leftTop:false,
    rightTop:false,
    leftBottom:false,
    rightBottom:false,
    center:false
  },
  onLoad: function (options) {
    var temp = options.tempFilePaths;
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          screenWidth: res.screenWidth,
          screenHeight: res.screenHeight,
          src:temp,
        })
      }
    })
    //绘制图片和矩形
    util.drawImg(that.data.src, that.data.screenWidth, that.data.screenHeight, function (array) {
      console.log(array);
      arrPicture = array;
      that.setData({
        rectanglesBeginx: (arrPicture[2] + arrPicture[0]) / 4,
        rectanglesBeginy: (arrPicture[3] + arrPicture[1]) / 4,
        rectanglesWidth: (arrPicture[2] - arrPicture[0]) / 2,
        rectanglesHeight: (arrPicture[3] - arrPicture[1]) / 2,
      })
    });
   
   setTimeout(function(){
     util.redraw(that.data.rectanglesBeginx, that.data.rectanglesBeginy, that.data.rectanglesWidth, that.data.rectanglesHeight)
   },200)
     
     
     //canvas画的图片进行保存
    //  setTimeout(function(){
    //    wx.canvasToTempFilePath({
    //      canvasId: 'myCanvasPic',
    //      quality: 1,
    //      fileType: 'png',
    //      success: function (res) {
    //        that.setData({
    //          src: res.tempFilePath
    //        })
    //        console.log(res);
    //        wx.saveImageToPhotosAlbum({
    //          filePath: res.tempFilePath,
    //          success(res) {
    //            console.log("保存成功")
    //          }
    //        })
    //      }
    //    })
    //  },1000)


    //用chooseImage原生的方式
    //  wx.saveImageToPhotosAlbum({
    //    filePath: that.data.src,
    //    success(res) {
    //      console.log("保存成功")
    //    }
    //  })
     console.log(that.data.src)
  },
  changePicture:function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          src: tempFilePaths[0]
        })
        util.drawImg(that.data.src, that.data.screenWidth, that.data.screenHeight, function (array) {
      console.log(array);
      arrPicture = array;
    });
        // util.redraw(that.data.src, that.data.screenWidth, that.data.screenHeight, that.data.rectanglesBeginx, that.data.rectanglesBeginy, that.data.rectanglesWidth, that.data.rectanglesHeight, function (array) {
        //   console.log(array);
        //   arrPicture = array;
        // })
        //上传图片
        // wx.uploadFile({
        //   url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     'user': 'test'
        //   },
        //   success: function (res) {
        //     var data = res.data          
        //   }
        // })
      }
    })
  },
  start:function(e){
    //判断点击的点是否在线上面
    
    var that = this;
    console.log(that.data.rectanglesBeginx + that.data.rectanglesWidth + 10)
    //上线
    if (e.touches[0].x > that.data.rectanglesBeginx+25 && e.touches[0].x < (that.data.rectanglesBeginx + that.data.rectanglesWidth-25) && e.touches[0].y >= (that.data.rectanglesBeginy-25) && e.touches[0].y <= (that.data.rectanglesBeginy+25) ){
      //记录开始点击时的信息theWidth记录点击时矩形的宽度，x用来记录矩形开始点的x坐标
      that.setData({
        top:true,
        theHeight: that.data.rectanglesHeight,
        y: that.data.rectanglesBeginy
      })
      console.log("top");
      console.log(that.data);
      //右上角
    } else if (e.touches[0].x >= (that.data.rectanglesBeginx + that.data.rectanglesWidth - 25) && e.touches[0].x <= (that.data.rectanglesBeginx + that.data.rectanglesWidth + 25) && e.touches[0].y >= that.data.rectanglesBeginy - 25 && e.touches[0].y <= that.data.rectanglesBeginy + 25){
      that.setData({
        rightTop:true,
        theHeight: that.data.rectanglesHeight,
        theWidth: that.data.rectanglesWidth,
        x: that.data.rectanglesBeginx + that.data.rectanglesWidth,
        y: that.data.rectanglesBeginy
      })
      console.log("rightTop");

    //右线
    } else if (e.touches[0].x <= (that.data.rectanglesBeginx + that.data.rectanglesWidth + 25) && e.touches[0].x >= (that.data.rectanglesBeginx + that.data.rectanglesWidth - 25) && e.touches[0].y > that.data.rectanglesBeginy + 25 && e.touches[0].y < (that.data.rectanglesBeginy + that.data.rectanglesHeight - 25) ){
      that.setData({
        right:true,
        theWidth: that.data.rectanglesWidth,
        x: that.data.rectanglesBeginx + that.data.rectanglesWidth
      })
      console.log("right");

      //右下角
    } else if (e.touches[0].x >= (that.data.rectanglesBeginx + that.data.rectanglesWidth - 25) && e.touches[0].x <= (that.data.rectanglesBeginx + that.data.rectanglesWidth + 25) && e.touches[0].y >= (that.data.rectanglesBeginy + that.data.rectanglesHeight - 25) && e.touches[0].y <= (that.data.rectanglesBeginy + that.data.rectanglesHeight + 25)){
      that.setData({
        rightBottom:true,
        theHeight: that.data.rectanglesHeight,
        theWidth: that.data.rectanglesWidth,
        x: that.data.rectanglesBeginx + that.data.rectanglesWidth,
        y: that.data.rectanglesBeginy + that.data.rectanglesHeight
      })
      console.log("rightBottom")
      //下线
    } else if (e.touches[0].x > that.data.rectanglesBeginx + 25 && e.touches[0].x < (that.data.rectanglesBeginx + that.data.rectanglesWidth - 25) && e.touches[0].y <= (that.data.rectanglesBeginy + that.data.rectanglesHeight+25) && e.touches[0].y >= (that.data.rectanglesBeginy + that.data.rectanglesHeight-25) ){
      that.setData({
        bottom:true,
        theHeight: that.data.rectanglesHeight,
        y: that.data.rectanglesBeginy + that.data.rectanglesHeight
      })
      console.log("bottom")
      //左下角
    } else if (e.touches[0].x >= that.data.rectanglesBeginx - 25 && e.touches[0].x <= that.data.rectanglesBeginx + 25 && e.touches[0].y >= that.data.rectanglesBeginy + that.data.rectanglesHeight - 25 && e.touches[0].y <= that.data.rectanglesBeginy + that.data.rectanglesHeight + 25 ){
      that.setData({
        leftBottom: true,
        theHeight: that.data.rectanglesHeight,
        theWidth: that.data.rectanglesWidth,
        x: that.data.rectanglesBeginx,
        y: that.data.rectanglesBeginy + that.data.rectanglesHeight
      })
      console.log("左下角")
      //左线
    } else if (e.touches[0].x >= (that.data.rectanglesBeginx - 25) && e.touches[0].x <= (that.data.rectanglesBeginx + 30) && e.touches[0].y > that.data.rectanglesBeginy + 20 && e.touches[0].y < (that.data.rectanglesBeginy + that.data.rectanglesHeight - 25)){
      that.setData({
        left:true,
        theWidth: that.data.rectanglesWidth,
        x: that.data.rectanglesBeginx
      })
      console.log("left");
      //左上角
    } else if (e.touches[0].x >= that.data.rectanglesBeginx - 25 && e.touches[0].x <= that.data.rectanglesBeginx + 25 && e.touches[0].y >= that.data.rectanglesBeginy - 25 && e.touches[0].y <= that.data.rectanglesBeginy + 25){
      that.setData({
        leftTop:true,
        theHeight: that.data.rectanglesHeight,
        theWidth: that.data.rectanglesWidth,
        x: that.data.rectanglesBeginx,
        y: that.data.rectanglesBeginy
      })
      console.log("左上角")
      //中点
    } else if (e.touches[0].x >= that.data.rectanglesBeginx + 30  && e.touches[0].x < that.data.rectanglesBeginx + that.data.rectanglesWidth - 30 && e.touches[0].y > that.data.rectanglesBeginy + 30 && e.touches[0].y < that.data.rectanglesBeginy + that.data.rectanglesHeight - 30 ){
      that.setData({
        center:true,
        y: that.data.rectanglesBeginy,
        x: that.data.rectanglesBeginx,
        thex: e.touches[0].x,
        they: e.touches[0].y,
        centerx: that.data.rectanglesBeginx + that.data.rectanglesWidth / 2,
        centery: that.data.rectanglesBeginy + that.data.rectanglesHeight / 2,
      })
      // console.log(that.data.rectanglesBeginy + that.data.rectanglesHeight - 30);
      console.log("中点");
    }
  },
  move:function(e){
    //在线上面则进行相应操作，先赋值，后canvas渲染
    var that = this;
    if(that.data.top==true){
      //上线
      if (e.touches[0].y < arrPicture[1]){
        e.touches[0].y = arrPicture[1]
      }
      if (e.touches[0].y > (that.data.rectanglesBeginy + that.data.rectanglesHeight - 20)){
        e.touches[0].y = that.data.rectanglesBeginy + that.data.rectanglesHeight - 20
      }
      that.setData({
        rectanglesBeginy: e.touches[0].y,
        rectanglesHeight: that.data.theHeight - (e.touches[0].y-that.data.y)
      })
    } else if (that.data.rightTop==true){
      //右上角
      if (e.touches[0].y < arrPicture[1]) {
        e.touches[0].y = arrPicture[1]
      }
      if (e.touches[0].y > (that.data.rectanglesBeginy + that.data.rectanglesHeight - 20)) {
        e.touches[0].y = that.data.rectanglesBeginy + that.data.rectanglesHeight - 20
      }
      if (e.touches[0].x > arrPicture[2]){
        e.touches[0].x = arrPicture[2]
      }
      if (e.touches[0].x < (that.data.rectanglesBeginx + 20)){
        e.touches[0].x = that.data.rectanglesBeginx + 20
      }
      that.setData({
        rectanglesBeginy: e.touches[0].y ,
        rectanglesHeight: that.data.theHeight - (e.touches[0].y - that.data.y),
        rectanglesWidth: that.data.theWidth + (e.touches[0].x - that.data.x)
      })

    
      //右线
    }else if(that.data.right == true){
      if (e.touches[0].x > arrPicture[2] ) {
        e.touches[0].x = arrPicture[2]
      }
      if (e.touches[0].x < (that.data.rectanglesBeginx + 20)) {
        e.touches[0].x = that.data.rectanglesBeginx + 20
      }
      that.setData({
        rectanglesWidth: that.data.theWidth + (e.touches[0].x - that.data.x)
      })
      //右下角
    } else if (that.data.rightBottom==true){
      if (e.touches[0].x > arrPicture[2]) {
        e.touches[0].x = arrPicture[2]
      }
      if (e.touches[0].x < (that.data.rectanglesBeginx + 20)) {
        e.touches[0].x = that.data.rectanglesBeginx + 20
      }
      if (e.touches[0].y < (that.data.rectanglesBeginy + 20)) {
        e.touches[0].y = that.data.rectanglesBeginy + 20
      }
      if (e.touches[0].y > arrPicture[3]) {
        e.touches[0].y = arrPicture[3]
      }
      that.setData({
        rectanglesWidth: that.data.theWidth + (e.touches[0].x - that.data.x),
        rectanglesHeight: that.data.theHeight + (e.touches[0].y - that.data.y)
      })

      
      //下线
    }else if(that.data.bottom == true){
      if (e.touches[0].y < (that.data.rectanglesBeginy+20) ) {
        e.touches[0].y = that.data.rectanglesBeginy + 20
      }
      if (e.touches[0].y > arrPicture[3]) {
        e.touches[0].y = arrPicture[3]
      }
      that.setData({
        rectanglesHeight: that.data.theHeight + (e.touches[0].y - that.data.y)
      })
      //左下角
    } else if (that.data.leftBottom == true){
      if (e.touches[0].y < (that.data.rectanglesBeginy + 20)) {
        e.touches[0].y = that.data.rectanglesBeginy + 20
      }
      if (e.touches[0].y > arrPicture[3]) {
        e.touches[0].y = arrPicture[3]
      }
      if (e.touches[0].x > (that.data.rectanglesBeginx + that.data.rectanglesWidth - 20)) {
        e.touches[0].x = that.data.rectanglesBeginx + that.data.rectanglesWidth - 20
      }
      if (e.touches[0].x < arrPicture[0]) {
        e.touches[0].x = arrPicture[0]
      }
      that.setData({
        rectanglesBeginx: e.touches[0].x,
        rectanglesWidth: that.data.theWidth - (e.touches[0].x - that.data.x),
        rectanglesHeight: that.data.theHeight + (e.touches[0].y - that.data.y)
      })
      //左线
    }else if(that.data.left == true){
      console.log(1111111111111)
      if (e.touches[0].x > (that.data.rectanglesBeginx + that.data.rectanglesWidth-20) ) {
        e.touches[0].x = that.data.rectanglesBeginx + that.data.rectanglesWidth - 20
      }
      if (e.touches[0].x < arrPicture[0]) {
        e.touches[0].x = arrPicture[0]
      }
      that.setData({
        rectanglesBeginx: e.touches[0].x,
        rectanglesWidth: that.data.theWidth - (e.touches[0].x - that.data.x)
       
      })
      //左上角
    } else if (that.data.leftTop == true){
      if (e.touches[0].x > (that.data.rectanglesBeginx + that.data.rectanglesWidth - 20)) {
        e.touches[0].x = that.data.rectanglesBeginx + that.data.rectanglesWidth - 20
      }
      if (e.touches[0].x < arrPicture[0]) {
        e.touches[0].x = arrPicture[0]
      }
      if (e.touches[0].y < arrPicture[1]) {
        e.touches[0].y = arrPicture[1]
      }
      if (e.touches[0].y > (that.data.rectanglesBeginy + that.data.rectanglesHeight - 20)) {
        e.touches[0].y = that.data.rectanglesBeginy + that.data.rectanglesHeight - 20
      }
      that.setData({
        rectanglesBeginx: e.touches[0].x,
        rectanglesWidth: that.data.theWidth - (e.touches[0].x - that.data.x),
        rectanglesBeginy: e.touches[0].y,
        rectanglesHeight: that.data.theHeight - (e.touches[0].y - that.data.y)
      })

      //中点
    }else if(that.data.center == true){
      if (e.touches[0].x <= arrPicture[0] + that.data.rectanglesWidth / 2 + 2 + (that.data.thex - that.data.centerx) ){
        e.touches[0].x = that.data.rectanglesWidth / 2 + 2 + (that.data.thex - that.data.centerx)
      }
      if (e.touches[0].x >= arrPicture[0] + arrPicture[2] - that.data.rectanglesWidth / 2 - 2 + (that.data.thex - that.data.centerx)){
        e.touches[0].x = arrPicture[2] - that.data.rectanglesWidth / 2 - 2 + (that.data.thex - that.data.centerx)
      }
      if (e.touches[0].y <= arrPicture[1] + (that.data.rectanglesHeight / 2) + (that.data.they - that.data.centery)){
        e.touches[0].y = arrPicture[1] + (that.data.rectanglesHeight / 2) + (that.data.they - that.data.centery)
      }
      if (e.touches[0].y >= (arrPicture[3] - that.data.rectanglesHeight / 2) + (that.data.they - that.data.centery)){
        e.touches[0].y = (arrPicture[3] - that.data.rectanglesHeight / 2) + (that.data.they - that.data.centery)
      }
      that.setData({
        rectanglesBeginx: that.data.x + (e.touches[0].x - that.data.thex),
        rectanglesBeginy: that.data.y + (e.touches[0].y - that.data.they)
      })
    }

    util.redraw(that.data.rectanglesBeginx, that.data.rectanglesBeginy, that.data.rectanglesWidth, that.data.rectanglesHeight)

    
  },
  end:function(){
    var that = this;
    that.setData({
      top: false,
      left: false,
      right: false,
      bottom: false,
      leftTop: false,
      rightTop: false,
      leftBottom: false,
      rightBottom: false,
      center:false
    })
    console.log(that.data);
  },
  selected:function(){
    var that = this;
    jso = {
      "topleft": [Math.floor((that.data.rectanglesBeginx - arrPicture[0]) * arrPicture[4]), Math.floor((that.data.rectanglesBeginy - arrPicture[1]) * arrPicture[4])],
      "lowerright": [Math.ceil((that.data.rectanglesBeginx + that.data.rectanglesWidth - arrPicture[0]) * arrPicture[4]), Math.ceil((that.data.rectanglesBeginy + that.data.rectanglesHeight - arrPicture[1]) * arrPicture[4])],
      "ground": { "BG": [], "FG": [] }
    }
    wx.showLoading({
      title: '正在上传图片',
    })
    console.log(JSON.stringify(jso));
    wx.uploadFile({
      url: 'https://charmface.dolphin.com/koutu/koutu.json',
      filePath: that.data.src,
      name: 'pic_files',
      header: {
        "content-type": "multipart/form-data",
      }, // 设置请求的 header
      formData: {
        'json_data': JSON.stringify(jso)
      }, // HTTP 请求中其他额外的 form data
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        var aa =  JSON.parse(res.data).pic_url;
        console.log(aa);
        var width = that.data.rectanglesWidth;
        var height = that.data.rectanglesHeight;
        
        wx.navigateTo({
          url: '../modification/modification' + '?img=' + aa + '&&width=' + width + '&&height=' + height + '&&beginx=' + that.data.rectanglesBeginx + '&&beginy=' + that.data.rectanglesBeginy + '&&proportion=' + arrPicture + '&&imgSrc=' + that.data.src + '&&topleft=' + jso.topleft + '&&lowerright=' + jso.lowerright 
        })
      } 
    })
  },
  
})
