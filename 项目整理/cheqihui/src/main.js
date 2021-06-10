import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import i18n from './lang'

//全局时间过滤器
Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(originVal)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')

    return `${y}-${m}-${d}`
})

Vue.filter('dayFormat', function(originVal) {
    const dt = new Date(originVal)
    const d = (dt.getDate() + '')

    return `${d}`
})

import api from './api'
Vue.prototype.$api = api

import dayjs from 'dayjs'
Vue.prototype.$dayjs = dayjs

import auth from './util/auth'
Vue.use(auth)

import tabbar from './util/tabbar'
Vue.use(tabbar)

import cookies from 'vue-cookies'
Vue.use(cookies)

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$ELEMENT = ElementUI
Vue.use(ElementUI, {
    size: store.state.settings.elementSize,
    i18n: (key, value) => i18n.t(key, value)
})

import hotkeys from 'hotkeys-js'
Vue.prototype.$hotkeys = hotkeys

import Contextmenu from 'vue-contextmenujs'
Vue.use(Contextmenu)

// 全局组件自动注册
import './components/autoRegister'

// 自动加载 svg 图标
const req = require.context('./assets/icons', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

import 'remixicon/fonts/remixicon.css'

import './assets/styles/reset.scss'

// 错误日志
import './util/error.log'

import './mock'

Vue.config.productionTip = false

Vue.prototype.$eventBus = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')