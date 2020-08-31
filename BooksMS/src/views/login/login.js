import Vue from 'vue'

import Login from './Login.vue'
import axios from 'axios'
Vue.prototype.$axios = axios;

Vue.config.productionTip = false


new Vue({
    render: h => h(Login),
}).$mount('#login')
