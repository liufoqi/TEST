const baseUrl="https://m.yaojunrong.com"

const fetch={
  http(url,method,data){
    return new Promise((resolve,reject)=>{
      let token=wx.getStorageSync('token')
      let header ={
        'content-type': 'application/json'
        }
        if(token){
          header.token=token
        }
      wx.request({
        url: baseUrl +url,
        data,
        method,
        header,
        success(res) {
          console.log(res)
          if(res.header.Token){
            wx.setStorageSync('token', res.header.Token)
          }
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }

      })
    })
  },
  get(url,data){
    return this.http(url,'GET',data)
    },
  del(url){
     return this.http(url,'POST',data)
  },
  post(url, data) {
    return this.http(url, 'POST', data)
  },

}
const login=()=>{
  wx.login({
    success(res){
      fetch.post('/login',{
        code:res.code,
        appid:"wx6eff83b5ffe826a0",
        secret:"d7340184247ea2868d72c4eb497e1ab7"
      }).then(res=>{
        console.log(res)
      })
    }
  })
}
exports.login=login;
exports.fetch=fetch;
