import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element'
import './plugins/avue'

// import EleForm from 'vue-ele-form'
// Vue.use('EleForm')

Vue.config.productionTip = false

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})
Vue.prototype.$httpajax = http
Vue.prototype.$http = http

// Vue.prototype.$http = axios.create({
//   baseURL: 'http://localhost:3000'
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
