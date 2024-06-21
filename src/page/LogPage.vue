<script>
import api from '../api.js';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';


export default {
  

  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      users: [],
      userEmail: '',
      errorMessage: '',
      responseData: null,
      userPassword: '',
      jwt: null,
    };
  },
  validations () {
    return {
      userEmail: { required }, 
      userPassword: { required }, 
      
      
    } 
  },
  methods: {

    setPage(){
      window.location.href="/register";
    },



    async signupUser() {
      const User = {
        email: this.userEmail,
        password: this.userPassword,
      };
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect){
        try {
          const response = await api
            .post('/login', User)
            .then((response) => {
              this.responseData = response.data;
              this.errorMessage = response.data.message;
              this.jwt = response.data;
              this.$cookies.remove('jwt');
              this.$cookies.set('jwt', this.jwt, '1d');
              console.log(this.jwt);
              console.log('авторизован:', User);
              if (User.email === "admin@rostov-don.ithub.ru") window.location.href = '/admin';
              else window.location.href = '/auth/main';
            })
            .catch((error) => {
              console.error(error);
              this.errorMessage = error.response.status;
            });
          
        } catch (error) {}
      }
    },
  },
};
</script>

<template>
  <div class="container">
     <div class="image">
     </div>
     <div class="form">
       <h2 class="heading">Авторизация</h2> 
       <div class="form-group">
         <label for="email">Логин:</label>
         <input class="input" type="email" id="email" v-model.trim="userEmail" placeholder="Почта">
       </div>
       <div class="form-group">
         <label for="password">Пароль:</label>
         <input class="input" type="password" id="password" v-model.trim="userPassword" placeholder="Пароль">
       </div>
       <button class="button" @click="signupUser()">Отправить</button>
       <button class="forgot" @click="setPage()">Нет аккаунта?</button>
     </div>
   </div>
</template>

<style scoped>
.heading{
   text-align: center;
   padding-bottom: 10%;
 }
.container {
 display: flex;
 justify-content: center;
 align-items: center;
 height: 100vh;
 
}



.form {
 max-width: 400px;
 padding: 50px;
 border: 1px solid #ccc;
 border-radius: 20px;
 background-color: #f9f9f9;
 
}



.form-group {
 margin-bottom: 15px;
}

.input {
 width: 100%;
 padding: 10px;
 border: 1px solid #CE00B9;
 border-radius: 50px;
}

.button {
 display: block;
 width: 100%;
 margin-top: 10px;
 padding: 10px;
 border: none;
 border-radius: 10px;
 background-color: #CE00B9;
 color: white;
 cursor: pointer;
}

.forgot {
 display: block;
 width: 100%;
 margin-top: 10px;
 padding: 10px;
 border: none;
 border-radius: 5px;
 color: black;
 cursor: pointer;
 text-decoration: underline;
}
</style>
