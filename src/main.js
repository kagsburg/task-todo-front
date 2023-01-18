import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store/store'
import { OhVueIcon, addIcons } from "oh-vue-icons";

import { FaFlag, RiZhihuFill, HiX } from "oh-vue-icons/icons";



addIcons(FaFlag, RiZhihuFill,HiX);

Vue.component("v-icon", OhVueIcon);


new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
