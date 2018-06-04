const util = require('../../utils/util.js')
var fgmodifyarray=[];//前景数组
var bgmodifyarray = [];//背景数组
var picmodifyarray = [];//图片坐标
var fgTemporaryArr = [];//临时数组用来接收前进后退数据
var bgTemporaryArr = [];//临时数组用来接收前进后退数据
var fgdrawArr = [];//前景背景划线数组
var bgdrawArr = [];
var fgdur = [];//声明during数组把每个阶段的动作存进去
var bgdur = [];
var fgtempdur = [];
var bgtempdur = [];
var n = 0;//声明全局变量n来计数前景是第几步
var m = 0;//声明全局变量m来计数背景是第几步
var a = 0;//声明全局变量a来计数前景前进后退
var b = 0;//声明全局变量b来计数背景前进后退
var k = 0;
var l = 0;
var fdr = 0;//声明全局变量计数划线数组
var bdr = 0;
var fd = 0;//声明全局变量方便during数组传值
var bd = 0
var jso;
var imgArr = [];//声明图片数组
var im = 0;//声明图片数组的序号
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: " ",
    imgSrc:' ',
    screenWidth: 0,
    screenHeight: 0,
    rectanglesBeginx: 0,
    rectanglesBeginy: 0,
    rectanglesWidth: 375,
    rectanglesHeight: 375,
    theHeight: 0,
    theWidth: 0,
    optionBeginx: 0,
    optionBeginy: 0,
    optionArray: 0,
    optionWidth: 0,
    optionHeight: 0,
    topleft:[],
    lowerright:[],
    x: 0,
    y: 0,
    fgFlag:false,
    bgFlag:true,
    fgSrc:"../../image/fgEreaseUnbt.png",
    bgSrc:"../../image/bgEreasebt.png",
    reviewFlag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    fgmodifyarray = [];
    bgmodifyarray = [];
    picmodifyarray = [];
    fgTemporaryArr = [];
    bgTemporaryArr = [];
    fgdrawArr = [];
    bgdrawArr = [];
    imgArr = [];
    fgdur = [];
    bgdur = [];
    n = 0;
    m = 0;
    a = 0;
    b = 0;
    k = 0;
    l = 0;
    fdr = 0;
    bdr = 0;
    im = 0;
    fd = 0;
    bd = 0
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenWidth: res.screenWidth,
          screenHeight: res.screenHeight,
          rectanglesWidth: res.screenWidth,
          rectanglesHeight: res.screenWidth,
          src:options.img,
          imgSrc: options.imgSrc,
          optionBeginx: parseInt(options.beginx),
          optionBeginy: parseInt(options.beginy),
          optionArray: options.proportion.split(','),
          optionWidth: parseInt(options.width),
          optionHeight: parseInt(options.height),
          topleft:options.topleft.split(','),
          lowerright: options.lowerright.split(',')
        })
        wx.downloadFile({
          url: that.data.src, //仅为示例，并非真实的资源
          success: function (res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              
                // filePath: res.tempFilePath,
              util.drawModificationPic(res.tempFilePath, that.data.screenWidth, that.data.screenHeight, that.data.optionWidth, that.data.optionHeight, that.data.optionBeginx, that.data.optionBeginy, parseInt(that.data.optionArray[4]), 1, 'myCanvasPic1',function (array) {
                  picmodifyarray = array;
                  console.log(array);
                  imgArr.push(that.data.src)
                })
             
            }
          }
        })
        util.drawModificationPicBG(that.data.imgSrc, that.data.screenWidth, that.data.screenHeight,  0.4, 'myCanvasPic2')

        // const ctx = wx.createCanvasContext('myCanvas')

        
          
        //     ctx.drawImage(that.data.src, 0, 0, 150, 100)
        //     ctx.draw()
          
      
       
      },
    })
    
   
    },

  start:function(e){
    //根据开启的橡皮擦，选择增加的数组
    var that = this;
    if (that.data.fgFlag) {//前景橡皮擦开启
      fgmodifyarray.push([]);
      fgdrawArr.push([]);
      fgmodifyarray[n].push([e.touches[0].x, e.touches[0].y])
      fgdrawArr[fdr].push([e.touches[0].x, e.touches[0].y])
    } else if (that.data.bgFlag) {//背景橡皮檫开启
      bgmodifyarray.push([]);
      bgdrawArr.push([]);
      bgmodifyarray[m].push([e.touches[0].x, e.touches[0].y])
      bgdrawArr[bdr].push([e.touches[0].x, e.touches[0].y])
    }
    util.drawModification(bgdrawArr, fgdrawArr) 
  },
  move: function (e) {
    var that = this;
    if (that.data.fgFlag) {
      fgmodifyarray[n].push([e.touches[0].x, e.touches[0].y])
      fgdrawArr[fdr].push([e.touches[0].x, e.touches[0].y])
    } else if (that.data.bgFlag) {
      bgmodifyarray[m].push([e.touches[0].x, e.touches[0].y])
      bgdrawArr[bdr].push([e.touches[0].x, e.touches[0].y])
    }
    util.drawModification(bgdrawArr, fgdrawArr) 
  },
  end: function (e) {
    var that = this;
    if (that.data.fgFlag) {
      n++;
      fdr++;
    } else if (that.data.bgFlag) {
      m++;
      bdr++;
    }
    console.log(fgmodifyarray);
    console.log(bgmodifyarray);
    console.log(fgdrawArr);
    console.log(bgdrawArr);
  },
  increaseFg:function(){
    var that = this;
    that.setData({
      fgFlag:true,
      bgFlag: false,
      fgSrc:"../../image/fgEreasebt.png",
      bgSrc:"../../image/bgEreaseUnbt.png"
    })
  },
  increaseBg:function(){
    var that = this;
    that.setData({
      bgFlag: true,
      fgFlag: false,
      bgSrc:"../../image/bgEreasebt.png",
      fgSrc:"../../image/fgEreaseUnbt.png"
    })
  },
  productPicture:function(){
    var that = this;
    console.log(that.data);  
    wx.showLoading({
      title: '正在上传图片',
    })
    console.log(JSON.stringify(jso));  
        wx.navigateTo({
          url: '../savePicture/savePicture' + '?img=' + imgArr[imgArr.length - 1] + '&&originalWidth=' + that.data.optionArray[5] + '&&originalHeight=' + that.data.optionArray[6]
        })
        wx.hideLoading() 
   
  },
  go:function(){
    var that = this;
    console.log(bgdur);
    console.log(fgdur);
    console.log(fgTemporaryArr);
    console.log(bgTemporaryArr);
    if (a >= 1 || b>=1){
      if (fgTemporaryArr[a - 1] == false && bgTemporaryArr[b - 1] == false){
        console.log(1111111111111111111111)
        fgmodifyarray.push(fgTemporaryArr.pop());
        n++;
        a--;
        bgmodifyarray.push(bgTemporaryArr.pop());
        m++;
        b--;
        wx.downloadFile({
          url: imgArr[im + 1], //仅为示例，并非真实的资源
          success: function (res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
             
                filePath: res.tempFilePath
                util.drawModificationPic(res.tempFilePath, that.data.screenWidth, that.data.screenHeight, that.data.optionWidth, that.data.optionHeight, that.data.optionBeginx, that.data.optionBeginy, parseInt(that.data.optionArray[4]), 1, 'myCanvasPic1', function (array) {
                  picmodifyarray = array;
                  console.log(array);
                  im++;
                })
                bd++;
                fd++;
                util.drawModification([], [])
            }
          }
        })
        
      } else if (((fgTemporaryArr[a - 1] == false) || (fgTemporaryArr[a - 1] == undefined)) && bgTemporaryArr[b - 1] != null){
       
          
            var bglast = bgTemporaryArr.pop()
            b--;
            bgmodifyarray.push(bglast);
            m++;
            // bgdrawArr.push(bglast)
            bgdur[bd - 1].push(bglast);
            util.drawModification(bgdur[bd - 1], [])
          
        

      } else if (fgTemporaryArr[a - 1] != null && ((bgTemporaryArr[b - 1] == undefined) || (bgTemporaryArr[b - 1] == false))){
        
        
            var fglast = fgTemporaryArr.pop();
            a--;

            fgmodifyarray.push(fglast);
            n++;
            // fgdrawArr.push(fglast)
            fgdur[fd - 1].push(fglast);
            util.drawModification([], fgdur[fd - 1])

          
        
      } else if (fgTemporaryArr[a - 1] != null && bgTemporaryArr[b - 1] != null){
        
        
          console.log("for")
          
            var fglast = fgTemporaryArr.pop();
            a--;

            fgmodifyarray.push(fglast);
            n++;
            // fgdrawArr.push(fglast)
            fgdur[fd - 1].push(bglast);
          
        

        
          console.log("for")
         
            var bglast = bgTemporaryArr.pop()
            b--;
            bgmodifyarray.push(bglast);
            m++;
            // bgdrawArr.push(bglast)
            bgdur[bd - 1].push(bglast);
        
        util.drawModification(bgdur[bd - 1], fgdur[fd - 1])
        
      }   
    }
  },
  back:function(){
    var that = this;
    if (fgdrawArr.length >= 1){
      fgdur.push(fgdrawArr);
      fd++;
      console.log('-------------------------------'+123456789123456789)
    }
    if (bgdrawArr.length >= 1){
      bgdur.push(bgdrawArr);
      bd++;
    }
    // fgdur.push(fgdrawArr);
    // fd++;
    // bgdur.push(bgdrawArr);
    // bd++;
    bgdrawArr = [];
    fgdrawArr = [];
    fdr = 0;
    bdr = 0;
    // console.log('bgbgbgbgbgbggbgbgbgbgbgbgbgbgbgbgbgbgbgb'+bgdur);
    console.log(bgdur);
    if(n>=1 || m>=1){
      console.log(1000000000000000)
      console.log('++++++',fgmodifyarray)
      console.log(bgmodifyarray )
      if (fgmodifyarray[n - 1] == false && bgmodifyarray[m - 1] == false){
        console.log(1111111111111111111111111)
        fgTemporaryArr.push(fgmodifyarray.pop());
        n--;
        a++;
        bgTemporaryArr.push(bgmodifyarray.pop());
        m--;
        b++;
        wx.downloadFile({
          url: imgArr[im - 1], //仅为示例，并非真实的资源
          success: function (res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
             
              util.drawModificationPic(res.tempFilePath, that.data.screenWidth, that.data.screenHeight, that.data.optionWidth, that.data.optionHeight, that.data.optionBeginx, that.data.optionBeginy, parseInt(that.data.optionArray[4]), 1, 'myCanvasPic1', function (array) {
                  picmodifyarray = array;
                  console.log(array);
                  im--;
                })
                console.log('---------------', fgmodifyarray)
                console.log(bgmodifyarray)
                bd--;
                fd--;
                util.drawModification(bgdur[bd - 1], fgdur[fd - 1])
                
                // console.log(fgdur);
                // console.log(fd);
                // console.log(fgdur[fd]);
                // fgdrawArr.push(fgdur[fd]);
                // bgdrawArr.push(bgdur[bd]);
                // fdr++;
                // bdr++;

                // fgdrawArr = [];
                // bgdrawArr = [];
                // fdr = 0;
                // bdr = 0;
            }
          }
        })
        // util.drawModificationPic(imgArr[im-1], that.data.screenWidth, that.data.screenHeight, that.data.optionWidth, that.data.optionHeight, that.data.optionBeginx, that.data.optionBeginy, parseInt(that.data.optionArray[4]), function (array) {
        //   picmodifyarray = array;
        //   console.log(array);
        //   im--;
        // })
        // console.log('---------------', fgmodifyarray)
        // console.log(bgmodifyarray)
        // util.drawModification(bgdur[bd-1], fgdur[fd-1])
        // bd--;
        // fd--;
        
      } else if (((fgmodifyarray[n - 1] == false) || (fgmodifyarray[n - 1] == undefined))&& bgmodifyarray[m - 1] != null){
        // bgdrawArr = [];
        // fgdrawArr = [];
        console.log(2222222222222222222222)
        
          console.log("for")
          var bglast = bgmodifyarray.pop()
            m--;
            bgTemporaryArr.push(bglast);
            b++;
            // bgdrawArr.push(bglast)
            bgtempdur.push(bgdur[bd - 1].pop())
            util.drawModification(bgdur[bd - 1], [])
        console.log('---------------', fgmodifyarray)
        console.log(bgdur)
        
      } else if (fgmodifyarray[n - 1] != null && ((bgmodifyarray[m - 1] == undefined) || (bgmodifyarray[m - 1] == false) )){
        // fgdrawArr = [];
        // bgdrawArr = [];
        console.log(333333333333333333333)
         var fglast = fgmodifyarray.pop();
            n--;
            
            fgTemporaryArr.push(fglast);
            a++;
            // fgdrawArr.push(fglast)
           fgtempdur.push( fgdur[fd - 1].pop())
            util.drawModification([], fgdur[fd - 1])
      } else if (fgmodifyarray[n - 1] != null && bgmodifyarray[m - 1] != null){
        // fgdrawArr = [];
        // bgdrawArr = [];
        console.log(4444444444444444444444)
         var fglast = fgmodifyarray.pop();
            n--;
           
            fgTemporaryArr.push(fglast);
            a++;
            // fgdrawArr.push(fglast)
            
          
        

        
          console.log("for")
          
            var bglast = bgmodifyarray.pop()
            m--;
            bgTemporaryArr.push(bglast);
            b++;
            // bgdrawArr.push(bglast)
            bgtempdur.push(bgdur[bd - 1].pop())
            fgtempdur.push(fgdur[fd - 1].pop())
            util.drawModification(bgdur[bd - 1], fgdur[fd - 1])
      }

    }
    // fgdrawArr = [];
    // bgdrawArr = [];
    // fdr = 0;
    // bdr = 0;
  },


  review:function(){
    var that = this;
    if(that.data.reviewFlag){
    that.setData({
      reviewFlag:false
    })
    
    var fgArr = [];
    var bgArr = [];
    fgdur.push(fgdrawArr);
    fd++;
    bgdur.push(bgdrawArr);
    bd++;
    bgdrawArr = [];
    fgdrawArr = [];
    fdr = 0;
    bdr = 0;
    console.log(that.data);
    fgmodifyarray.forEach(function (e) {
      e.forEach(function (aa) {
        fgArr.push([])
        aa.forEach(function (event) {
          fgArr[k].push(event * parseInt(that.data.optionArray[4]))
        })
        k++
      })
    })
    bgmodifyarray.forEach(function (e) {
      e.forEach(function (aa) {
        bgArr.push([])
        aa.forEach(function (event) {
          bgArr[l].push(event * parseInt(that.data.optionArray[4]))
        })
        l++
      })
    })
    jso = {
      "topleft": [parseInt(that.data.topleft[0]), parseInt(that.data.topleft[1])],
      "lowerright": [parseInt(that.data.lowerright[0]), parseInt(that.data.lowerright[1])],
      "ground": { "BG": bgArr, "FG": fgArr }
    }
    wx.showLoading({
      title: '正在上传图片',
    })
    console.log(JSON.stringify(jso));
    var ppc
    wx.uploadFile({
      url: 'https://charmface.dolphin.com/koutu/koutu.json',
      filePath: that.data.imgSrc,
      name: 'pic_files',
      header: {
        "content-type": "multipart/form-data",
      }, // 设置请求的 header
      formData: {
        'json_data': JSON.stringify(jso)
      }, // HTTP 请求中其他额外的 form data
      success: function (res) {
        l = 0;
        k = 0;
        wx.hideLoading()
        console.log(res)
        ppc =JSON.parse(res.data).pic_url  
        // console.log(ppc);
        wx.downloadFile({
          url: ppc, //仅为示例，并非真实的资源
          success: function (res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              util.drawModificationPic(res.tempFilePath, that.data.screenWidth, that.data.screenHeight, that.data.optionWidth, that.data.optionHeight, that.data.optionBeginx, that.data.optionBeginy, parseInt(that.data.optionArray[4]), 1, 'myCanvasPic1', function (array) {
                  picmodifyarray = array;
                  console.log(array);
                  //图片数组序号加1
                  imgArr.push(ppc)
                  im++
                  //加入空数组的时候给序号加1
                  fgmodifyarray.push([])
                  n++
                  bgmodifyarray.push([])
                  m++
                })
                that.setData({
                  reviewFlag:true
                })
                util.drawModification([], [])
            }
          }
        })
        // util.drawModificationPic(ppc, that.data.screenWidth, that.data.screenHeight, that.data.optionWidth, that.data.optionHeight, that.data.optionBeginx, that.data.optionBeginy, parseInt(that.data.optionArray[4]), function (array) {
        //   picmodifyarray = array;
        //   console.log(array);
        //   //图片数组序号加1
        //   imgArr.push(JSON.parse(res.data).pic_url)
        //   im++
        //  //加入空数组的时候给序号加1
        //   fgmodifyarray.push([])
        //   n++
        //   bgmodifyarray.push([])
        //   m++
        // })
        // util.drawModification([], [])
      }
    })
    
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})

