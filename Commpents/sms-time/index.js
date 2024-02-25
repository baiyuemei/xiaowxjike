// Commpents/sms-time/index.js
Component({
    //开启
    externalClasses:['msg-t'],
  /**
   * 组件的属性列表
   */
  properties: {
    time: {
      type: Number,
      value: 10,
    },
    useSlot: Boolean,
  },
  lifetimes: {
    attached() {
      // 开始倒计时
      this.countStart()
    },
  },
  methods: {
    countStart() {
      let timer = null
      // 停止定时器
      if (this.data.time === 0) return clearTimeout(timer)
      // 更新渲染
      this.setData({
        time: (this.data.time -= 1),
      })
      // 定时器
      timer = setTimeout(this.countStart.bind(this), 1000)
      // 传递数据到组件外部
      this.triggerEvent('change', this.data.time)
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
  
  },

  /**
   * 组件的方法列表
   */

})