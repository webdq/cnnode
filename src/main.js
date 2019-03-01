import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './filters'
import iview from 'iview'

Vue.use(iview)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
