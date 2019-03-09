//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bannerList: [
        {id: 1, url: 'https://ws1.sinaimg.cn/mw1024/0072Lfvtly1g0v8qoyzidj30u00dmgmn.jpg'},
        {id: 2, url: 'https://ws1.sinaimg.cn/mw1024/0072Lfvtly1g0v9jnpz4sj30u00dmwf5.jpg'}
    ],
    navList: [],
  },
  onLoad: function () {
      wx.request({
          url: 'https://locally.uieee.com/categories',
          success: (res) => {
              this.setData({
                  navList: res.data
              })
          }
      })
  }
 
})
