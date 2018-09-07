import {fetch} from'../../utils/util.js'
const app= getApp()
Page({
 data: {
   titleId:"",
   article:{},
   title:"",
   bookId:"",
   catalog: [],
   isShow:false,
   isLoading:false,
   font:40,
   index:"",
  },
  onLoad: function (options) {
     this.setData({
    titleId:options.id,
    bookId:options.bookId,
     })
     this.getData()
     this.getCatalog()
  },
  getData(){
    this.setData({
      isLoading: true,
      isShow:false,
  })
    fetch.get(`/article/${this.data.titleId}`).then(res=>{
      this.setData({
        article:res.data.article.content,
        title:res.data.title,
        isLoading:false,
        index:res.data.article.index
    })
    }).catch(err => {
      this.setData({
        isLoading: false
     })
    })
  },

  getCatalog(){
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      console.log(res)
      this.setData({
      catalog:res.data
      })
     
    })
  },

  toggleCatalog() {
    let isShow = !this.data.isShow
    this.setData({
      isShow,
      article:""
    })
  },
handleGet(event){
  const id=event.currentTarget.dataset.id
  this.setData({
  titleId:id
})
   this.getData()
},
handleAdd(){
   this.setData({
     font:this.data.font +2
   })
},
handleSub(){
  if(this.data.font<=24){
    wx.showToast({
      title: '字体太小',
    })
    wx.showModal({
      title: '温馨提示您：',
      content: '字体已最小',
    })
  }
  else{
  this.setData({
    font: this.data.font -2
  })}
},
handleNext(){
  let catalog=this.data.catalog;
 if(catalog[this.data.index+1]){
    this.setData({
      titleId: catalog[this.data.index + 1]._id,
    })
     this.getData()

}else{wx.showToast({
  title: '没有下一章了',
}) }},
handlePrev(){
  let catalog = this.data.catalog;
  if (catalog[this.data.index -1]) {
    this.setData({
      titleId: catalog[this.data.index -1]._id
    })
    this.getData()

  } else {
    wx.showToast({
      title: '没有上一章了',
    })
  }
},
bindscrolltolower(){
  this.setData({
      scrollY:false
  })
  
},
onShareAppMessage:function(){
}
})