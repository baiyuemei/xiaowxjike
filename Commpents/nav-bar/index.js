// Commpents/nav-bar/index.js
Component({
  //  开启运行外部样式
  externalClasses:['title-class','msg-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    back:Boolean,
    delta:{
      type:Number,
      value:1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    height:'', //高度
  
  },
  // 钩子函数
  lifetimes:{
    attached(){
      const navheighr=wx.getSystemInfoSync()
       console.log(navheighr);
       this.setData({
         height:navheighr.statusBarHeight
       })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
 //返回上一页
 goBack(){
   console.log('11');
   wx.navigateBack({ delta: this.data.delta })
 },
  }
})