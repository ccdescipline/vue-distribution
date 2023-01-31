import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 动画 animate.css
import animate from "animate.css";

import particles from 'particles.js'
Vue.use(particles)

import CTable from '@/components/Ctable/index.js'
Vue.use(CTable)

import GoodsTypeSelect from '@/views/goodstypeselect/index.js'
Vue.use(GoodsTypeSelect)

import ReceiveAddress from '@/views/ReceiveAddress/index.js'
Vue.use(ReceiveAddress)

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
//Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

import Skeleton from 'element-ui'
Vue.use(Skeleton)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
