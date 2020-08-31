import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Admin from './Admin.vue'
import VueRouter from 'vue-router'

import axios from 'axios'
Vue.prototype.$axios = axios;

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.use(VueRouter);
const routes = [
    {
        name:'adminHome',
        path: '/User/userInfo/',
        component: function (resolve) {
            require(['../../components/User/userInfo.vue'], resolve)
        }
    },
    {
        path: '/User/userOpera/',
        component: function (resolve) {
            require(['../../components/User/userOpera.vue'], resolve)
        }
    },

    {
        path: '/Book/bookInfo/',
        component: function (resolve) {
            require(['../../components/Book/bookInfo.vue'], resolve)
        }
    },
    {
        path: '/Book/bookOpera/',
        component: function (resolve) {
            require(['../../components/Book/bookOpera.vue'], resolve)
        }
    },
    {
        path: '/Admin/adminInfo/',
        component: function (resolve) {
            require(['../../components/Admin/adminInfo.vue'], resolve)
        }
    },
    {
        name:'adminChange',
        path: '/Admin/adminOpera/',
        component: function (resolve) {
            require(['../../components/Admin/adminOpera.vue'], resolve)
        }
    },
    {
        path: '/Data/BookRecord',
        component: function (resolve) {
            require(['../../components/Data/BookRecord.vue'], resolve)
        }
    },
    {
        path: '/login/',
        component: function (resolve) {
            require(['../../components/Admin/login.vue'], resolve)
        }
    },
    {
        path: '*',
        redirect: '/login/'
    }
];

const router = new VueRouter({
    base:'/Books/',//部署到tomcat必写
    routes // （缩写）相当于 routes: routes
});

new Vue({
    router,
    render: h => h(Admin)
}).$mount('#admin')