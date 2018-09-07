//index.js
//获取应用实例
import { fetch,login} from'../../utils/util.js'
const app = getApp()
Page({
 data:{
   swiperData: [],
   mainContent:[],
   indicatorDots: true,
   autoplay: true,
   interval: 3000,
   duration: 500,
   isLoading:false,
   pn:1,
   hasMore:true,
   loadDone:false,
 },
 onLoad(){
   login()
  Promise.all([this.getData(), this.getContent()]).then(() => {
     this.setData({
       hasMore: true,
       pn: 1,
       loadDoe:true
     })
     wx.stopPullDownRefresh();
   })
 },
 getData(){
   return new Promise((resolve,reject)=>{
   this.setData({
     isLoading:true
   })
  fetch.get('/swiper').then(res=>{
    resolve()
    this.setData({
      swiperData:res.data,
      isLoading:false,
    })
  }).catch(err=>{
    reject()
    this.setData({
      isLoading:false
    })
  })
 })
 },
getContent(){
   return new Promise((resolve,reject)=>{
  fetch.get('/category/books').then(res=>{
    // console.log(res)
    resolve()
     this.setData({
       mainContent:res.data
     })
   })
   })
 },

 jumpBook(event){
  const id=event.currentTarget.id
  wx.navigateTo({
    url: `/pages/details/details?id=${id}`
  })
 },
 getMoreContent(){
   return new Promise(resolve=>{
   fetch.get('/category/books',{pn:this.data.pn}).then(res => {
      let newArr=[...this.data.mainContent, ...res.data]
        this.setData({
       mainContent: newArr
     })
     resolve(res)
   })
   })
 },
 onPullDownRefresh(){
   Promise.all([this.getData(),this.getContent()]).then(()=>{
     this.setData({
       hasMore:true,
       pn:1
     })
     wx.stopPullDownRefresh();
   })
 },
 onReachBottom(){
  if(this.data.hasMore){
    this.setData({
      pn:this.data.pn+1,
    })
  this.getMoreContent().then(res=>{
    if(res.data.length<2){
      this.setData({
        hasMore:false
      })
    }
  })
  }
 }

})