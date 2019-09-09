import Vue from "vue";
import App from "./app.vue";
import '@/core/index.js'
import router from '@/router/index.js'
import api from '@/api/index'
import { VueAxios } from '@/utils/request'

// mount axios Vue.$http and this.$http
Vue.prototype.$api = api // ajax请求方法
Vue.use(VueAxios)

new Vue({
  router,
  el: "#app",
  template: "<App/>",
  render: h => h(App)
});
