import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './config/rem'
import './registerServiceWorker'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/scss/index.scss'

Vue.config.productionTip = false
Vue.use(iView)

console.log(process.env.NODE_ENV)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
