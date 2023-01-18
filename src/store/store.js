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
            token: 123
        }
    },
    // mutations: {},
    // actions: {},
    // modules: {},
    // getters: {}
    // options
})

export default store