import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
import auth from './auth'

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const token = store.state.token
  let check = auth.some(item => item === to.name)
  if(token === ''){
    if(check){
      Vue.prototype.$Notice.error({ title: '请登录' })
      next({
        name: 'login',
        replace: true,
        query: {redirect: to.fullPath}
      })
    }else{
      next()
    }
  }else{
    if(to.name === 'login'){
      next({ name: 'all' })
    }else{
      next()
    }
  }
})

export default router
