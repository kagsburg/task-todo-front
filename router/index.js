import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Register.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
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