/* eslint-disable no-empty */
import Vue from 'vue'
import App from './App.vue'
//引入elementUI
import ElementUI from 'element-ui';
import router from './router/index'
import store from './store'
import { token } from './api/api'
Vue.config.productionTip = false




//引入echarts
let echarts = require('echarts/lib/echarts')
// 引入折线图等组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/radar')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll')//图例翻译滚动

Vue.prototype.$echarts = echarts


//引入全局样式
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css'
import './assets/style/reset.css'


Vue.use(ElementUI)


router.beforeEach((to, from, next) => {
  //要前往的页面不是登录页面
  if (to.path !== '/') {
    token(localStorage.token).then((res) => {
      if (res.data == 'ok') {
        //还在有效期内   放行
        next()
      } else {
        //不在有效期跳转到登录页面
        next('/')
      }
    })
  }
  //前往登录页面
  else {
    next()
  }

});



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
