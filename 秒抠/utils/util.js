//声明全局变量获取坐标
var arr=[];
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function drawImg(imgSrc, screenWidth, screenHeight,callback){
  wx.getImageInfo({
    src: imgSrc,
    success: function (res) {
      // 判断图的长
      //长图
      if (res.height/res.width > 1.46){
        var w = (screenHeight - 119) * res.width / res.height;
        var beginx = (screenWidth - w) / 2;
        var h = (screenHeight - 119);
        var beginy = 0;
        if (beginx < 0) {
          beginx = 0;
        }
        //短图
      }else{
        var h = screenWidth * res.height / res.width;
        var beginy = (screenHeight - h - 119) / 2;
        var w = screenWidth;
        var beginx = 0;
        if (beginy < 0) {
          beginy = 0;
        }
      }
      //用canvas绘制图片
      const ctx = wx.createCanvasContext('myCanvasPic');
      ctx.drawImage(imgSrc, beginx, beginy, w, h);
      ctx.stroke();
      ctx.draw();
      var imgArr = [beginx, beginy, beginx + w, beginy + h, res.height / h, res.height, res.width];
      callback(imgArr);
    }
  })
}

function redraw(theBeginx,theBeginy,theWidth,theHeight){
      //用canvas绘制图片
      
      const ctx = wx.createCanvasContext('myCanvas');
      ctx.setGlobalAlpha(0.6);
      ctx.setLineWidth(4);
      ctx.setStrokeStyle('white');
      ctx.strokeRect(theBeginx+1, theBeginy+1, theWidth-3, theHeight-3);
      ctx.stroke();
      ctx.draw();    
}

function drawModificationPic(imgSrc, screenWidth, screenHeight, width, height, beginx, beginy, prop, transparency, canvasid,callback){
  console.log(height / width);
      wx.getImageInfo({
        src: imgSrc,
        success: function (res) {
          // 判断图的长
          //长图
          if (res.height / res.width > 1.19) {
            var w = (screenHeight - 219) * res.width / res.height;
            var beginx = (screenWidth - w) / 2;
            var h = (screenHeight - 219);
            var beginy = 0;
            if (beginx < 0) {
              beginx = 0;
            }
            //短图
          } else {
            var h = screenWidth * res.height / res.width;
            var beginy = (screenHeight - h - 219) / 2;
            var w = screenWidth;
            var beginx = 0;
            if (beginy < 0) {
              beginy = 0;
            }
          }
          //用canvas绘制图片
          const ctx = wx.createCanvasContext(canvasid);
          ctx.setGlobalAlpha(transparency)
          ctx.drawImage(imgSrc, beginx, beginy, w, h);
          ctx.stroke();
          ctx.draw();
          var picArr = [beginx, beginy];;
          callback(picArr);
        }
      })
  
}

function drawModificationPicBG(imgSrc, screenWidth, screenHeight, transparency, canvasid) {
  
  wx.getImageInfo({
    src: imgSrc,
    success: function (res) {
      // 判断图的长
      //长图
      if (res.height / res.width > 1.19) {
        var w = (screenHeight - 219) * res.width / res.height;
        var beginx = (screenWidth - w) / 2;
        var h = (screenHeight - 219);
        var beginy = 0;
        if (beginx < 0) {
          beginx = 0;
        }
        //短图
      } else {
        var h = screenWidth * res.height / res.width;
        var beginy = (screenHeight - h - 219) / 2;
        var w = screenWidth;
        var beginx = 0;
        if (beginy < 0) {
          beginy = 0;
        }
      }
      //用canvas绘制图片
      const ctx = wx.createCanvasContext(canvasid);
      ctx.setGlobalAlpha(transparency)
      ctx.drawImage(imgSrc, beginx, beginy, w, h);
      ctx.stroke();
      ctx.draw();
     
    }
  })

}

function drawModification(bgArr, fgArr) {
  console.log(bgArr);
  console.log(fgArr);
  const ctx = wx.createCanvasContext('myCanvas1');
      //画背景线
      ctx.setGlobalAlpha(0.3)
      ctx.beginPath()
      ctx.setLineWidth(4);
      ctx.setStrokeStyle('red');
      // //考虑用for循环进行
      if (bgArr !=  null){
        for (var i = 0; i < bgArr.length; i++) {
          for (var j = 0; j < bgArr[i].length; j++) {
            if (j == 0) {
              ctx.moveTo(bgArr[i][0][0], bgArr[i][0][1])
            } else {
              ctx.lineTo(bgArr[i][j][0], bgArr[i][j][1])
            }
          }
        }
      }
      
      ctx.stroke()

      //画前景线
      ctx.beginPath()
      ctx.setLineWidth(4);
      ctx.setStrokeStyle('green');
      //考虑用for循环进行
      if (fgArr !=  null){
        for (var e = 0; e < fgArr.length; e++) {
          for (var f = 0; f < fgArr[e].length; f++) {
            if (f == 0) {
              ctx.moveTo(fgArr[e][0][0], fgArr[e][0][1])
            } else {
              ctx.lineTo(fgArr[e][f][0], fgArr[e][f][1])
            }
          }
        }
      }
      // var arr = [beginx, beginy, beginx + w, beginy + h];
      ctx.stroke();
      ctx.draw();
}

function upload_file(url, filePath, name, formData, success, fail) {
  console.log('a=' + filePath)
  wx.uploadFile({
    url: 'https://charmface.dolphin.com/' + url,
    pic_files: filePath,
    name: name,
    header: {
      'content-type': 'multipart/form-data'
    }, // 设置请求的 header
    json_data: formData, // HTTP 请求中其他额外的 form data
    success: function (res) {
      console.log(res);
      if (res.statusCode == 200 && !res.data.result_code) {
        // typeof success == "function" && success(res.data);
      } else {
        // typeof fail == "function" && fail(res);
      }
    },
    fail: function (res) {
      console.log(res);
      typeof fail == "function" && fail(res);
    }
  })
}

var interfaceData = [
  {num:55}
]

module.exports = {
  formatTime: formatTime,
  drawImg:drawImg,
  redraw: redraw,
  drawModification:drawModification,
  drawModificationPic: drawModificationPic,
  interfaceData: interfaceData,
  upload_file: upload_file,
  drawModificationPicBG: drawModificationPicBG
}
