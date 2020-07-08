import Vue from 'vue'
import Cookie from 'vue-cookie'
import FastClick from 'fastclick'
import Page from '../../src/views/cms/articledetail'
import App from '@/utils/app'
import Request from '@/utils/request'
import store from '@/store'
// import '@/utils/rem'
import '@/assets/app.scss'
import 'lib-flexible/flexible'
import mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'

!window.detachFastclick && FastClick.attach(window.document.body)

Vue.use(mandMobile)
Vue.use(Cookie)
Vue.use(App)
Vue.use(Request)
App.do()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    template: '<Page />',
    components: {
        Page
    }
})
