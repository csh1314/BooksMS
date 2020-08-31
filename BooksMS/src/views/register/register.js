import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Register from './Register.vue'
import axios from 'axios'
Vue.prototype.$axios = axios;

Vue.config.productionTip = false


new Vue({
    render: h => h(Register),
}).$mount('#register')
