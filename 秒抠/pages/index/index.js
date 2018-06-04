//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },
  //事件处理函数
  onLoad: function () {
  
  },
  UpLoad:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        wx.navigateTo({
          url: '/pages/selectPicture/selectPicture'+'?tempFilePaths=' + tempFilePaths, 
        })
        //上传图片
        // wx.uploadFile({
        //   url: ' 192.168.247.136:7888/xcx/koutu.json', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   method:'POST',
        //   formData: {
        //     'user': 'test'
        //   },
        //   success: function (res) {
        //     var data = res.data
        //     //跳转到抠图页面
        //     wx.navigateTo({
        //       url: '/pages/selectPicture/selectPicture' + '?tempFilePaths=' + tempFilePaths,
        //     })
        //   }
        // })
      }
    })
  }
})
