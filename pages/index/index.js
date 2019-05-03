//index.js
//获取应用实例
const fetch = require('../../untils/fetch.js')
Page({
  data: {
    banner:"",
    categories:''
  },
  onLoad:function(options){
    fetch('slides').then(res=>{
      this.setData({ banner: res.data })
    })
    // wx.request({
    //   url: 'https://locally.uieee.com/slides',
    //   header:{
    //     'Content-Type':'json'
    //   },
    //   success:(res)=>{
    //     console.log(res)
    //     this.setData({ banner: res.data })
    //    // console.log(this.data.banner)
    //   }
    // }),
    fetch('categories').then(res=>{
      this.setData({ categories: res.data })
    })
      // wx.request({
      //   url: 'https://locally.uieee.com/categories',
      //   header: {
      //     'Content-Type': 'json'
      //   },
      //   success: (res) => {
      //     console.log(res)
      //     this.setData({ categories: res.data })
          
      //   }
      // })
  }
})
