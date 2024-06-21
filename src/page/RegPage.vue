<script>
import api from "../api.js";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      users: [],
      userName: "",
      userEmail: "",
      userPassword: "",
      userPost: "",
      errorMessage: "",
    };
  },
  validations() {
    return {
      userName: { required }, 
      userPassword: { required }, 
      userPost: { required }, 
      userEmail: { required, email }, 
    };
  },
  methods: {
    async signupUser() {
      const newUser = {
        username: this.userName,
        email: this.userEmail,
        password: this.userPassword,
        post: this.userPost,
        role: "USER"
      };
      const isFormCorrect = await this.v$.$validate();
      if (isFormCorrect) {
        try {
          const response = await api.post("/register/teacher", newUser);
          console.log("Успешно зарегистрирован:", newUser);
          window.location.href = "/login";
        } catch (error) {
          if (response.status == 401) {
            this.errorMessage = "Ошибка на стороне сервера!!!";
          } else {
            this.errorMessage = "Ошибка авторизации! Проверьте логин и пароль";
          }
          console.log(this.userName);
        }
      }
    },
    toLogin() {
      window.location.href = "/login"
    }
  },
};
</script>

<template>
  <div class="container">
      <div class="image">  
      </div>
      <div class="form">
        <h2 class="heading">Регистрация</h2>
        <div class="form-group">
          <input class="input" type="text" id="fullName" v-model.trim="userName" placeholder="ФИО"/>
          <div v-if="v$.userName.$error">Поле "имя" не работает :с</div>
        </div>
        <div class="form-group">
          <input class="input" type="email" id="email" v-model.trim="userEmail" placeholder="Почта"/>
        </div>
        <div class="form-group">
          <input class="input" type="text" id="post" v-model.trim="userPost" placeholder="Должность"/>
        </div>
        <div class="form-group">
          <input class="input" type="password" id="password" v-model.trim="userPassword" placeholder="Пароль"/>
        </div>
        <button class="button" @click="signupUser()">Отправить</button>
        <button class="forgot" @click="toLogin()">Уже есть аккаунт?</button>
      </div>
    </div>
</template>

<style scoped>
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

.heading {
  text-align: center;
  padding-bottom: 20%;
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
