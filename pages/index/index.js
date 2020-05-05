/*
☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
☆                                                                                                 ☆
☆  系 统：二维码生成器                                                                             ☆
☆  日 期：2019-07-13                                                                              ☆
☆  开 发：草札(www.caozha.com)                                                                    ☆
☆  鸣 谢：穷店(www.qiongdian.com) 品络(www.pinluo.com)                                             ☆
☆  声 明: 使用本程序源码必须保留此版权声明等相关信息！                                                ☆
☆  Copyright ©2020 www.caozha.com All Rights Reserved.                                            ☆
☆                                                                                                 ☆
☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
*/
import drawQrcode from '../../utils/weapp.qrcode.min.js'
var app = getApp()
Page({
  data:{
    qrcode_url: '',
    qrcode_Value: '',
    logo_url: '',
    is_complete:0,
    height: '100%',
    qrcode_background:"#FFFFFF",
    qrcode_foreground:"#000000",
    background_tips:false
  },
  qrcode_Value: function (res) {
    this.setData({
      qrcode_url: this.toUtf8(res.detail.value)
    })
  },
  qrcode_background: function (res) {    
    if (res.detail.value !="#FFFFFF"){
      this.setData({
        qrcode_background: res.detail.value,
        background_tips: true
      });
    }else{
      this.setData({
        qrcode_background: res.detail.value,
        background_tips: false
      });
    }
  },
  qrcode_foreground: function (res) {
    this.setData({
      qrcode_foreground: res.detail.value
    })
  },
  banquan: function () {
    
  },
 
  queryIp: function (res) {
    let that = this;
    
    var qrcode_width = 300;//二维码大小
    var qrcode_typeNumber = 7;//二维码的计算模式，默认值-1，最大27。数值越大，允许的最大字节越多
    //var qrcode_background = "#d6fac0";//二维码背景颜色，默认值白色。颜色太深容易扫不出来，不兼容。颜色越淡越好。
    //var qrcode_foreground = "#FF0000";//二维码前景色，默认值黑色

    if (that.data.qrcode_background){
      var qrcode_background = that.data.qrcode_background;
    }else{
      var qrcode_background = "#FFFFFF";
    }

    if (that.data.qrcode_foreground) {
      var qrcode_foreground = that.data.qrcode_foreground;
    } else {
      var qrcode_foreground = "#000000";
    }

    var qrcode_url_length = that.data.qrcode_url.length;
    console.log(qrcode_url_length+"字节");

    if (qrcode_url_length<64){
      qrcode_typeNumber = 7;
    } else if (qrcode_url_length >= 64 && qrcode_url_length < 119) {
      qrcode_typeNumber = 10;
    } else if (qrcode_url_length >= 119 && qrcode_url_length < 129) {
      qrcode_typeNumber = 15;
    } else if (qrcode_url_length >= 129 && qrcode_url_length < 382) {
      qrcode_typeNumber = 20;
    } else{
      qrcode_typeNumber = 27;
    }

    if (that.data.qrcode_url){
    
      //QRCodeJS.qrApi.draw(that.data.qrcode_url, "logoQRCode", 378, 378, null, that.data.logo_url);
      drawQrcode({
        width: qrcode_width,
        height: qrcode_width,
        x: 20,
        y: 20,
        canvasId: 'logoQRCode',
        // ctx: wx.createCanvasContext('myQrcode'),
        typeNumber: qrcode_typeNumber,//最大27
        text: that.data.qrcode_url,
        background: qrcode_background,//二维码背景颜色，默认值白色
        foreground: qrcode_foreground,//二维码前景色，默认值黑色
        /*image:{
          imageResource: '../../images/d.png',
          dx: 70,
          dy: 70,
          dWidth: 60,
          dHeight: 60
        },*/
        correctLevel: 2,//非必须，二维码纠错级别，默认值为高级，取值：{ L: 1, M: 0, Q: 3, H: 2 }
        callback(e) {
          console.log('e: ', e)
        }
      });

      if (that.data.logo_url) {
        this.drawImg(that.data.logo_url, qrcode_width + 75, 'logoQRCode', qrcode_background, qrcode_foreground);//打上LOGO
      }

    that.setData({
      is_complete: 1
    })
    }else{
      wx.showToast({
        title: "请输入字符串，可以是网址、文本等",
        icon: "none",
        duration: 1000
      });
    }
  },
  upload() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {       
        const tempFilePaths = res.tempFilePaths[0];
        //重置图片角度、缩放、位置
        that.setData({
          logo_url: tempFilePaths
        });
        wx.showToast({
          title: "插入完成。",
          icon: "none",
          duration: 1000
        });
      }
    })
  },
  delLogo() {

    this.setData({
      logo_url: ''
    });

    wx.showToast({
      title: "删除完成。",
      icon: "none",
      duration: 1000
    });

  },
toUtf8(str){//解决中文乱码的问题
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i<len; i++) {
  c = str.charCodeAt(i);
  if ((c >= 0x0001) && (c <= 0x007F)) {
    out += str.charAt(i);
  } else if (c > 0x07FF) {
    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
  } else {
    out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
  }
}
return out;
},
  drawImg: function (src, width, canvas, qrcode_background, qrcode_foreground) {
    var imgSize = Math.round(width / 8);
    var imgPos = Math.round(width / 9 * 4) - 38;
    var imgPosFix = Math.round(width / 120);

    const ctx2 = wx.createCanvasContext(canvas);
    //ctx2.strokeStyle = '#fff';
    //ctx2.lineWidth = 4;
    //ctx.globalAlpha = 0.8;
    ctx2.globalAlpha = 1;//透明度
    //ctx2.lineCap = "round";
    //ctx2.lineJoin = "round";
    ctx2.beginPath();
    ctx2.setStrokeStyle(qrcode_background);//'#fff'
    ctx2.setLineWidth(4);
    ctx2.setLineCap('round');
    ctx2.setLineJoin('round');
    ctx2.moveTo(imgPos - imgPosFix, imgPos - imgPosFix);
    //ctx2.moveTo(imgPos, imgPos);    
    ctx2.lineTo(imgPos + imgSize + imgPosFix, imgPos - imgPosFix);//上边
    ctx2.lineTo(imgPos + imgSize + imgPosFix, imgPos + imgSize + imgPosFix);//右边
    ctx2.lineTo(imgPos - imgPosFix, imgPos + imgSize + imgPosFix);//下边
    ctx2.lineTo(imgPos - imgPosFix, imgPos - imgPosFix);//左边    
    ctx2.stroke();
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.setStrokeStyle(qrcode_foreground);//'#000'
    ctx2.setLineWidth(1);
    ctx2.setLineCap('round');
    ctx2.setLineJoin('round');
    ctx2.moveTo(imgPos - imgPosFix, imgPos - imgPosFix);
    //ctx2.moveTo(imgPos, imgPos);    
    ctx2.lineTo(imgPos + imgSize + imgPosFix, imgPos - imgPosFix);//上边
    ctx2.lineTo(imgPos + imgSize + imgPosFix, imgPos + imgSize + imgPosFix);//右边
    ctx2.lineTo(imgPos - imgPosFix, imgPos + imgSize + imgPosFix);//下边
    ctx2.lineTo(imgPos - imgPosFix, imgPos - imgPosFix);//左边    
    ctx2.stroke();
    ctx2.closePath();

    ctx2.drawImage(src, imgPos - 1, imgPos - 1, imgSize + 2, imgSize + 2);
    //ctx2.beginPath();
    ctx2.draw(true);
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数    
    let that = this;    
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.screenHeight
        })
      }
    })   


  },

  // 预览图片
  savePic: function () {
    let that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 50,
      width: that.data.windowWidth * 2,
      height: that.data.contentHeight * 2,
      canvasId: "logoQRCode",
      success: function (res) {
        // util.savePicToAlbum(res.tempFilePath);
        wx.hideLoading();
        var tempFilePath = res.tempFilePath;
        that.setData({
          canvasUrl: tempFilePath
        });
        if (tempFilePath !== "") {
          wx.hideLoading();
          wx.previewImage({
            current: that.data.canvasUrl, // 当前显示图片的http链接
            urls: [that.data.canvasUrl], // 需要预览的图片http链接列表
            success: function (_res) {
              console.log("预览成功啦");
            }
          });
        }
      }
    });
  },
  //下载小程序码
  downloadSkuQrCode: function (url) {
    let that = this;
    wx.downloadFile({
      url: url,
      success: function (res) {
        that.setData({
          qrCode: res.tempFilePath
        });
        wx.hideLoading();
        //生成数据
        that.getData();
      },
      fail: function (err) {
        wx.showToast({
          title: "下载二维码失败,稍后重试！",
          icon: "none",
          duration: 5000
        });
      }
    });
  },
  //点击保存到相册
  saveShareImg: function () {
    var that = this;
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'logoQRCode',
        success: function (res) {
          wx.hideLoading();
          var tempFilePath = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success(res) {
              // utils.aiCardActionRecord(19);
              wx.showModal({
                content: '已成功保存到手机相册。',
                showCancel: false,
                confirmText: '好的',
                confirmColor: '#333',
                success: function (res) {
                  if (res.confirm) { }
                },
                fail: function (res) { }
              })
            },
            fail: function (res) {
              wx.showToast({
                title: res.errMsg,
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      });
    }, 1000);
  } ,
  onReady:function(){
    // 页面渲染完成    
  },
  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
    app.pages = getCurrentPages();
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  // 设置页面分享
  onShareAppMessage: function () {
    return {
      title: '二维码生成器',
      path: '/pages/index/index'
    }
  }
})