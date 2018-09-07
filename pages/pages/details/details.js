// pages/detail/detail.js
import { fetch,login } from '../../utils/util.js'
Page({
  data: {
   bookId:"",
   bookData:{},
   isLoading:false,
   updataTime:"",
   loadDoe:false
  },
  onLoad: function (options) {
    this.setData({
      bookId:options.id
    })

     this.getData()
  },
 getData(){
   this.setData({
     isLoading:true
   })
   fetch.get(`/book/${this.data.bookId}`).then(res=>{
     console.log(res)
     this.setData({   
       bookData:res,
       isLoading:false,
   })
   })
 },
collection(){
   this.setData({})
   wx.showToast({
     title: '收藏成功',
     durationd:1000,
     mask:true,
     success:()=>{
       fetch.post("/collection",{bookId:this.data.bookId}).then(Promise([this.getData()]).then(() => {
           this.setData({
           loadDoe: false
           })
           wx.stopPullDownRefresh();
         }))
        }
   })

 },
  collection() {

    wx.showToast({
      title: '取消收藏成功',
      durationd: 1000,
      mask: true,
      success: () => {
        fetch.del("/collection/$id:{this.data.bookId}").then(Promise([this.getData()]).then(() => {
          this.setData({
            loadDoe: false
          })
          wx.stopPullDownRefresh();
        }))
      }
    })

  },
  jumpCatalog() {
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookId}`,
  // success:function(res){},
  // fail:function(res){},
  // complete:function(res){},
    })
  },

 onShareAppMessage: function () { 
   return{
     title:this.data.bookData.data.title,
    path:`/pages/details/details?id=${this.data.bookId}`,
    imageUrl:this.data.bookData.data.img
   }
 }
})


// disabled = "{{bookData.isCollec t==0 ? false:true}}"