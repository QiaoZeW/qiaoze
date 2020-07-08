import Vue from 'vue'
import Cookie from 'vue-cookie'
import FastClick from 'fastclick'
import Routes from '@/routes'
import Views from '@/views'
import App from '@/utils/app'
import Request from '@/utils/request'
import store from '@/store'
// import '@/utils/rem'
import '@/assets/app.scss'
import 'lib-flexible/flexible'
import mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'
import '@/assets/styles.scss'
import Preservation from '@/utils/preservation'
import VeeValidate,{ Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueLazyload from 'vue-lazyload'

const Pathname = window.location.pathname
const ImportComp = Views[Routes[Pathname].view]

!window.detachFastclick && FastClick.attach(window.document.body)

Vue.use(VueLazyload, {
  preLoad: 1.3, // 预压高度的比例
  loading: require('@/assets/imgs/cartoon/preload.gif'), // 图像的加载失败时 显示的error图标
  // error: require('@/assets/imgs/holder_error.png'), // 图像正常加载时 显示的loading图标
  attempt: 2 // 图像尝试加载 次数
})
Vue.use(mandMobile)
Vue.use(Cookie)
Vue.use(App)
Vue.use(Request)
Vue.use(Preservation)
Validator.locale ==="en" ? "zh_CN" : "en";
Validator.localize(Validator.locale,{
    messages: zh_CN.messages,
    attributes:{
        loginName:'登录名',
        loginPassword:'密码'
    }
})
Vue.use(VeeValidate)
App.do()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    render: h => h(ImportComp)
})
