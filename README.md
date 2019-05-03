# firstwechat-app
微信小程序练习

请求数据/封装promise函数
module.exports=(url,data)=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url: `https://locally.uieee.com/${url}`,
      data:data,
      header: {
        'Content-Type': 'json'
      },
      success: resolve,
      fail:reject
    })
  })
}

在页面中导入函数
const fetch = require('../../untils/fetch.js')

//发送请求
 fetch('slides').then(res=>{
      this.setData({ banner: res.data })
 })
