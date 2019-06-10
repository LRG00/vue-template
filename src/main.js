import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/index.scss'
import './theme'
import './registerServiceWorker'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(ElementUI)

console.log(process.env.NODE_ENV)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
