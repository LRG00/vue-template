import Vue from "vue";
import App from "./app.vue";
import '@/core'
import router from '@/router'
import store from './store'
import api from '@/api/index'
import { VueAxios } from '@/utils/request'

// mount axios Vue.$http and this.$http
Vue.prototype.$api = api // ajax请求方法
Vue.use(VueAxios)

new Vue({
  router,
  store,
  el: "#app",
  template: "<App/>",
  render: h => h(App)
});
