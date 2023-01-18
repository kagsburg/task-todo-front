import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Register.vue'
import store from '../store/store'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: Dashboard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
  },
  {
      path: '/signup',
      name: 'Signup',
      component: Signup
  },
  ]
})
// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })
router.beforeEach((to, from, next) => {
  console.log (store.state.user.token)
  if (to.meta.requiresAuth && !store.state.user.token ) {
      next({ name: 'Login' });
  } else if ((to.name === 'Login' || to.name === 'Signup') && store.state.user.token) {
      next({ name: 'Home' });
  }
  else {
      next();
  }
})

export default router
