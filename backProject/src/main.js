// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入reset文件
import './assets/css/reset.css'

// 引入element-ui
import ElementUI from 'element-ui'
// 引入element-ui的css文件
import '../node_modules/element-ui/lib/theme-chalk/index.css'

// 引入store vuex状态管理
import store from './store'

// 使用element-ui
Vue.use(ElementUI)
Vue.prototype.$imgUrl = 'http://localhost:3000'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
