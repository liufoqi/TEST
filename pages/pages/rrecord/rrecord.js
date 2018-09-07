// pages/rrecord/rrecord.js
import { fetch } from '../../utils/util.js'
const app = getApp()
Page({
  data: {
    books: []
  },
  onLoad() {
    this.getData()
  },
  getData() {
    this.setData({
    })
    fetch.get('/readList').then(res => {
      console.log(res)
      this.setData({
       books:res.data
      })
    })
  }
  //,jumpBook(event) {
  //   const id = event.currentTarget.id
  //   wx.navigateTo({
  //     url: `/pages/book/book?id=${id}`
  //   })
  // }

})