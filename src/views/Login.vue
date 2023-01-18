
<template>
    
    <div class="container">
  <div class="form">
    <form action="#" 
    @submit.prevent="login(form)"
    class="login-form">
      <input type="text"
      v-model="form.username"
       name="username" placeholder="Username">
      <input type="password"
      v-model="form.password"
       name="password" placeholder="Password">
      <button type="submit" class="btn">Login</button>
      <div v-if="errors">
            <span class="text-sm text-red-400">{{ errors }}</span>
          </div>
      <p class="message">New User?<router-link
        :to="{ name: 'Signup' }"
        class="font-medium text-indigo-600 hover:text-indigo-500"
      >
      Create an account
      </router-link></p>
  </form>
   
  </div>
</div>
</template>

<script >
 import axios from "axios";
 import store from '../store/store'
 axios.defaults.baseURL = import.meta.env.VITE_API_URL;
 
 export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      errors: null,
      // ...
    }
  },
  methods: {
    // ...
    // setErrors
    setErrors(error) {
      this.errors = error;
    },
    async login(form) {
      try {
        const response =  await axios.post('login', form);
        console.log(response.data);
        if (response.data.statusCode === 401){
          this.setErrors(response.data.message);
          return;
        }
        store.commit('setToken', response.data.token);
        store.commit('setUser', response.data.user);
        localStorage.setItem('token', response.data.token);
        this.$router.push({ name: 'Home' });
      } catch (error) {
        console.log(error);
        this.setErrors(error);
      }
    },
  },
  mounted() {
    // ...
  }
}


</script>

<style lang="scss">
$background-color:  hsl(213deg 85% 97%);
$font-family: 'Poppins', sans-serif;

@mixin btn($fontcolor: #FAFAFA){
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  outline: 0;
  border: 0;
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  background: #FF5722;
  color: $fontcolor;
  text-transform: uppercase;
}

@mixin message($fontcolor: #90A4AE){
  color: $fontcolor;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
}

@mixin input($bkgnd: #F5F5F5){
  font-family: $font-family;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  outline: 0;
  font-size: 15px;
  text-align: center;
  box-sizing: border-box;
  background: $bkgnd;
}
body{
  font-family: $font-family;
  background: $background-color;
  margin: 0;
  padding: 0;

}
.container{
  padding: 8% 0 0;
  width: 365px;
  margin: auto;
}
.text-red-400 {
  color: #e53e3e;
}
.text-sm {
  font-size: 0.875rem;
}
.form{
  position: relative;
  z-index: 1;
  max-width: 350px;
  margin: 0 auto 100px;
  padding: 45px;
  background: #FFFFFF;
}

.form {
  input{
    @include input; 
    
    ::placeholder {
      color: #90A4AE;
    }
  }
  
  .btn{
    @include btn;
  }
  
  .message {
    @include message;
    a {
      text-decoration: none;
      color: #00BFA5;
    }
  }
}

// .form .register-form{
//   display: none;
// }



</style>