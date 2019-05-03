const fetch= require('../../untils/fetch.js')

// pages/shopList/shopList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前加载的分类
    category:{},
    //此分类下的全部店铺
    shops:[],
    pageIndex:0,
    pageLimit:19,
    hasmore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  loadMoreHandle:function(){
    if(!this.data.hasmore) return
    var {pageIndex,pageLimit} = this.data
    var params = {
      _page: ++pageIndex, _limit: pageLimit
    }
    return fetch(`categories/${this.data.category.id}/shops`,params)
      .then(res => {
        console.log(res)
        const total = res.header['X-Total-Count']
        const page = Math.ceil(total/pageLimit)
        
        let shop=this.data.shops;
        shop.push(...res.data)
        let hasmore = pageIndex < page 
        this.setData({ shops:shop , pageIndex ,hasmore})
        
      })
  },
  onLoad: function (options) {
    //console.log(options)
    fetch(`categories/${options.id}`).then(res=>{
      //console.log(res)
      this.setData({category:res.data})
      //console.log(this.data.category)
      wx.setNavigationBarTitle({
        title: res.data.name
      })

      //加载完分类信息过后再去加载商铺信息
    //  return fetch(`categories/${this.data.category.id}/shops`,{
    //     _page:1,_limit:20
    //   })
    //   .then(res => {
    //     console.log(res)
    //     this.setData({shops:res.data})
    //   })
     this.loadMoreHandle()
    })
   
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.category.name){
      wx.setNavigationBarTitle({
        title: this.data.category.name
      })
    }
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
    this.setData({shops:[],pageIndex:0,hasmore:true})
    this.loadMoreHandle().then(()=> wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //console.log("到底了")
    //需要判断是否正在加载，否则会有多次触发问题
    this.loadMoreHandle()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})