import Vue from "vue";
import App from "./app.vue";
import '@/core/index.js'
import router from '@/router/index.js'
import { VueAxios } from '@/utils/request'

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  el: "#app",
  template: "<App/>",
  render: h => h(App)
});
