import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import VueQuillEditor from 'vue-quill-editor'
import * as Quill from 'quill'
import resizeImage from 'quill-image-resize-module'
Quill.register('modules/resizeImage ', resizeImage)
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import vMessage from './components/message/message'
Vue.use(vMessage)

Vue.use(VueQuillEditor)

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
