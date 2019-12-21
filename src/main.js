import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission/index' // 直接引入js 可以避免使用
import ElementUI from 'element-ui'// 引入包
import 'element-ui/lib/theme-chalk/index.css'// 引入Element-ui 样式
import './styles/index.less'// 引入初始化样式
import axios from './utils/request'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)// 全局注册

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// import Vue from 'vue';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import App from './App.vue';

// Vue.use(ElementUI);

// new Vue({
//   el: '#app',
//   render: h => h(App)
// });
//  这些全是用来 引入element 的
