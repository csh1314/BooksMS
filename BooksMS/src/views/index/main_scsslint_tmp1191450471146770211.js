import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from '../../router'

import { getRequest, postRequest} from './libs/api';//导入
Vue.prototype.getRequest = getRequest;//注入到vue对象
Vue.prototype.postRequest = postRequest;//注入到vue对象

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
