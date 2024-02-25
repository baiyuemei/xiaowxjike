// pages/login/index.js
import WxValidate from "../../utils/Wxvalidate.js"
//导入封装 http
import {get, post} from "../../utils/http"
//导入获取token
import {setToken} from "../../utils/token"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:"",
    code:"",
    showcode:false,
    time:'',
    moreList:wx.getStorageSync('tokenKey') || []
  },
  //点击返回上一页

  //点击获取验证码

  getCode(){
    //将状态改为倒计时
    this.setData({
      showcode:true
    })
  },
  //父组件接收
  getsmscode(ev){
    // console.log(ev.detail);
    this.setData({
      time:ev.detail
    })
    if(ev.detail===0){
      this.setData({
        showcode:false
      })
    }
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   this.initValidate()
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  initValidate(){
    const rules={
      mobile:{
        required:true,
        mobile:true
      },
      code:{
        required:true,
        code:true
      }
    }
    const messages={
      mobile:{
        required: '请输入手机号',
        mobile: '请输入正确的手机号',

      },
      code:{
        required: '验证码不能为空',
        code: '请输入正确的验证码',
      }
  }

  this.WxValidate = new WxValidate(rules, messages)

  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    // //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }else{
    //发送请求
 post('/v1_0/authorizations', params).then(res=>{
   console.log(res.data.token);
   const token =res.data.token
  //  将token进行存储
  setToken('moreList',token)
  wx.showToast({
    title: '登录成功',
    duration:1200,
    mask:true,
    icon:"success"
  })
  //跳转
  wx.reLaunch({  
    url: '/pages/my/index' // 目标带有tabBar的页面路径  
  });  


 }).catch((error)=>{
  wx.showToast({
    title:获取用户信息失败,
    duration:1200,
    mask:true,
    icon:"error"
  })
 })

    // .then(response => {  
    //   console.log(response);
    //   // this.setData({  
    //   //   userInfo: response  
    //   // });  
    //   this.showModal({
    //     msg: '提交成功'
    //   })
    // })  
    // .catch(error => {  
    //   console.error('获取用户信息失败:', error);  
    // });  


    }
   
   
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})