// import library
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import route from './router/index'

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

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
