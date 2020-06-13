// import library
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import route from './router/index'
import store from './store/index'

require('@/store/subscribe')

Vue.config.productionTip = false

// import global style
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/style.css'

// configurate vue router
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: route
})

store.dispatch('auth/attempt', localStorage.getItem('token'))

router.beforeEach((to, from, next) => {
  if(to.meta.auth){
    if(store.getters['auth/authenticated']){
      next()
    } else {
      next({
        name: 'masuk'
      })
    }
  }else{
    if(store.getters['auth/authenticated']){
      next({
        name: 'home'
      })
    } else {
      next()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')