Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:"none",
    finalSrc:" ",
    width:0,
    height:0,
    saveflag:true,
    saveHidden:"none",
    showWidth:0,
    showHeight:0,
    showLeft:0,
    showtop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    wx.getImageInfo({
      src: options.img,
      success: function (res) {
        if(res.height > res.width ){
          var h = 580;
          var w = h*res.width/res.height;
          var left = (580 - w)/2;
          var top = 0
        } else {
          var w = 580;
          var h = w*res.height/res.width;
          var left = 0;
          var top = (580 - h)/2
        }
        that.setData({
          finalSrc: options.img,
          width: parseInt(options.originalWidth),
          height: parseInt(options.originalHeight),
          hidden: "block",
          showWidth:w,
          showHeight:h,
          showLeft:85+left,
          showTop:70+top
        })
      }
    })
    
    // if (that.data.height / that.data.width > 1.46) {
    //   var w = 290 * that.data.width / that.data.height;
    //   var beginx = (290 - w) / 2;
    //   var h = 290;
    //   var beginy = 0;
    //   if (beginx < 0) {
    //     beginx = 0;
    //   }
    //   //短图
    // } else {
    //   var h = 290 * that.data.height / that.data.width;
    //   var beginy = (290 - h) / 2;
    //   var w = 290;
    //   var beginx = 0;
    //   if (beginy < 0) {
    //     beginy = 0;
    //   }
    // }
    // console.log(w+'==============='+h)
    // wx.downloadFile({
    //   url: that.data.finalSrc, //仅为示例，并非真实的资源
    //   success: function (res) {
    //     // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
    //     if (res.statusCode === 200) {
    //         const ctx = wx.createCanvasContext('myCanvasPic');
    //         ctx.drawImage(res.tempFilePath, beginx, beginy, w, h);
    //         ctx.stroke();
    //         ctx.draw();
    //     }
    //   }
    // })
    
  },
  saveForPNG:function(){
    var that = this;
    if(that.data.saveflag){
      // wx.canvasToTempFilePath({
      //   canvasId: 'myCanvasPic',
      //   quality: 1,
      //   fileType: 'png',
      //   success: function (res) {
      //     console.log(res.tempFilePath)
      //     that.setData({
      //       src: res.tempFilePath
      //     })
      //     console.log(res);
      //     wx.saveImageToPhotosAlbum({
      //       filePath: res.tempFilePath,
      //       success(res) {

      //         console.log("保存成功")
      //         that.setData({
      //           hidden: "none"
      //         });
      //       }
      //     })
      //   }
      // })


      wx.downloadFile({
        url: that.data.finalSrc, //仅为示例，并非真实的资源
        success: function (res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res) {
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000
                })
                console.log("保存成功")
                that.setData({
                  saveflag:false
                });
              }
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '已经保存过啦！',
        icon: 'success',
        duration: 2000
      })
    }
    
  },
  discard:function(){
    wx.navigateBack({
      delta: 2,
    })
  },
  preview: function () {
    var that = this
    wx.previewImage({
      urls: [that.data.finalSrc] // 需要预览的图片http链接列表
    })
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