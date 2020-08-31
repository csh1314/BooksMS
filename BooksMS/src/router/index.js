/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home.vue'
import Research from '../components/Research.vue'
import Return from '../components/Return.vue'
import BookDetail from "../components/BookDetail";
// 声明使用vue-router插件
/*
内部定义并注册了2个组件标签(router-link/router-view),
给组件对象添加了2个属性:
  1. $router: 路由器
  2. $route: 当前路由
 */
Vue.use(VueRouter)

export default new VueRouter({
	base:'/Books/',//部署到tomcat必写
	// 注册应用中所有的路由
	routes: [{
			path: '/home',
			component: Home
		},
		{
			path: '/research',
			component: Research
		},
		{
			path: '/return',
			component: Return
		},
		{
			name:'bookDetail',
			path: '/bookDetail',
			component: BookDetail,
		},
		{
			path: '/',
			redirect: '/home'
		}
	]
})
