import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './modules/userModule';
Vue.use(Vuex)
const store = new Vuex.Store({ 
    // modules: {
    //     userModule: userModule
    //   },
    state: {
        user: {
            data: { name: 'timo' },
            token: localStorage.getItem('token') || null
        }
    },
    mutations: {
        setToken(state, token) {
            state.user.token = token
        },
        setUser(state, user) {
            state.user.data = user
        }
    },
    // actions: {},
    // modules: {},
    // getters: {}
    // options
})

export default store