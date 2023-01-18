import { createRouter, createWebHistory } from 'vue-router'
import store from '../src/store/store'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Register.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
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

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router