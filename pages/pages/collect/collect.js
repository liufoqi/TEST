// pages/collect/collect.js
import { fetch} from '../../utils/util.js'
const app = getApp()
Page({
  data: {
    books:[],

  },
onLoad() {
 this.getData()},
  getData() {
  this.setData({
       })
    fetch.get('/collection').then(res => {
        console.log(res)
        this.setData({
         books:res.data,
      
        })
      })
  },
  delete(event){
    const id= event.currentTarget.dataset.id
    const book=event.currentTarget.book
    wx.showToast({
      title: '取消收藏成功',
      durationd: 1000,
      success: () => {
        fetch.del('/collection/delete/$id', book)
      }
    })

    },
jumpBook(event) {
    const id = event.currentTarget.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  }

})