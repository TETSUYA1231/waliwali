import Message from './Message.vue'
import Vue from 'vue'

const MESSAGE = {
  duration: 3000,
  install() {
    const VueMessage = Vue.extend(Message)
    function messageAlert(msgTxt) {
      msgTxt.visible = true
      const newMessage = new VueMessage({
        data: msgTxt
      })
      let vm = newMessage.$mount()
      document.body.appendChild(vm.$el)
      const timer = setTimeout(() => {
        clearTimeout(timer)
        vm.visible = false
        document.body.removeChild(vm.$el)
        vm.$destroy() //销毁
        vm = null // 回收
        msgTxt.calback &&
          typeof msgTxt.calback === 'function' &&
          msgTxt.calback()
      }, MESSAGE.duration)
    }
    // 挂载到vue原型上，暴露方法
    const messageTypeArr = ['info', 'success', 'error', 'warning']
    Vue.prototype.$message = messageAlert
    messageTypeArr.forEach(type => {
      Vue.prototype.$message[type] = content => {
        const msgTxt =
          typeof content === 'string'
            ? { type: type, message: content }
            : content
        return Vue.prototype.$message(msgTxt)
      }
    })
  }
}
export default MESSAGE
