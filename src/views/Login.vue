<template>
    
    <div class="container">
  <div class="form">
    <form action="#" class="login-form">
      <input type="text" name="username" placeholder="Username">
      <input type="text" name="password" placeholder="Password">
      <button type="submit" class="btn">Login</button>
      <p class="message">Already registered?<router-link
        :to="{ name: 'Signup' }"
        class="font-medium text-indigo-600 hover:text-indigo-500"
      >
      Create an account
      </router-link></p>
  </form>
    <form action="#" class="register-form">
      <input type="text" name="email" placeholder="Email">
      <input type="text" name="password" placeholder="Password">
      <button type="submit" class="btn">Submit</button>
      <p class="message">New User? <a href="#">Create an account</a></p>
    </form> 
  </div>
</div>
</template>

<script>
 
 export default {
  name: 'Login',
  data() {
    return {
      // ...
    }
  },
  methods: {
    // ...
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

.form .register-form{
  display: none;
}



</style>