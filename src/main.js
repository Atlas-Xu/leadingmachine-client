import Vue from 'vue'
import 'normalize.css/normalize.css'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import  axios from 'axios'
import userdata from "@/store/modules/Userdata";


import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
Vue.prototype.$axios = axios
Vue.prototype.$userdata = userdata


axios.defaults.timeout = 5000

Vue.use(ElementUI)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
