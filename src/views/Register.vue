<template>
    <div class="container">
  <div class="form">
      <form action="#"
      @submit.prevent="register(form)"
      class="register-form">
      <input type="text" 
      v-model="form.username"
       placeholder="Username">
      <input type="text"
      v-model="form.email"
        placeholder="Email">
      <input type="password"
      v-model="form.password"
       name="password" placeholder="Password">
      <input type="password"
      v-model="form.password_confirmation"
       name="password" placeholder="Confirm Password">
       <div v-if="errors">
            <span class="text-sm text-red-400">{{ errors }}</span>
          </div>
      <button type="submit" class="btn">Submit</button>
      <p class="message">Already registered?<router-link
        :to="{ name: 'Login' }"
        class="font-medium text-indigo-600 hover:text-indigo-500"
      >
      SignIn
      </router-link> </p>
    </form> 
    
  </div>
</div>
</template>

<script>
  import axios from "axios";
 import store from '../store/store'
 axios.defaults.baseURL = import.meta.env.VITE_API_URL;
 export default {
  name: 'Register',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      errors: null,
    }
  },
  methods: {
    setErrors(error) {
      this.errors = error;
    },
    async register(form) {
      try {
        // validate form
        if (form.password !== form.password_confirmation) {
          this.setErrors('Password does not match');
          return;
        }
        const response =  await axios.post('register', form);
        store.commit('setToken', response.data.token);
        store.commit('setUser', response.data.user);
        localStorage.setItem('token', response.data.token);
        this.$router.push({ name: 'Home' });
      } catch (error) {
        this.setErrors(error.response.data.message);
      }
    },
  },
  mounted() {
    // ...
  }
}


</script>

<style>
</style>