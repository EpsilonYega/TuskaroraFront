
<script setup>
import api from '@/api';
import Header from '@/components/Header.vue';
</script>


<script>
export default {
  
  data() {
    return {
      visible: false,
      username: null,
      email: null,
      post: null,
    };
  },
  methods:{
    notes() {
      window.location.href = "/auth/notes"
    },
    async logOut(){
      try {
          const response = await api.post(`/authorized/logout`, {
            headers: {
              'Authorization': 'Bearer ' + jwt
            }
          });
        } catch (error) {
          console.error(error);
        }
      this.$cookies.remove('jwt');
      window.location.href="/login"
    },
    async updateInfo() {
      const teacher = {
        username:  prompt('Новое ФИО', this.username),
        email: prompt('Новая почта', this.email),
        password: prompt('Новый пароль'),
        post: prompt('Новая должность', this.post),
        role: "USER"
      };
      const jwt = this.$cookies.get('jwt')
      try {
          const response = await api.post("/authorized/teacher/updateInfo", teacher, {
            headers: {
              'Authorization': 'Bearer ' + jwt
            }
          });
          window.location.href = "/login";
        } catch (error) {
          console.log(error);
        }
    },
    async deleteAccount() {
      if (confirm("Это действие полностью удалит ваш аккаунт из системы. Вы уверены?")) {
        const jwt = this.$cookies.get('jwt')
        try {
            const response = await api.post("/authorized/teacher/deleteAccount", {
              headers: {
                'Authorization': 'Bearer ' + jwt
              }
            });
            this.logOut()
          } catch (error) {
            console.log(error);
          }
      } 
    },
  },
  mounted() {
    const token = this.$cookies.get('jwt'); 

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = JSON.parse(decodeURIComponent(escape(window.atob(base64))));

    this.username = decodedToken.username;
    this.email = decodedToken.email
    this.post = decodedToken.post
  }
  
};
</script>

<template>
  <Header />
  <div>
    <div class="accountContainer">
      <img src="../assets/img/Tipok.png" alt="" />
      <h1>ФИО: {{ username }}</h1>
      <p>Почта: {{ email }}</p>
      <p>Должность: {{ post }}</p>
      <div class="logout">
        <button class="b_logout" @click="notes()">Просмотр записей</button>
        <button class="b_logout" @click="logOut()">Выход</button>
        <button class="b_logout" @click="updateInfo()">Изменить данные</button>
        <button class="b_logout" @click="deleteAccount()">Удалить аккаунт</button>
      </div>
    </div>    
  </div>
</template>

<style scoped>
.b_logout{
  max-width: 450px;
    border-radius: 10px;
    border: none;
    margin-top: 1%;
    background-color: #CE00B9;
    color: white;
    margin-bottom: 5%;
    padding: 10px 20px;
    cursor: pointer;
    width: 200px;
}
.logout{
  margin-top: 40px;
  max-width: 25%;
  display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    justify-content: space-evenly;

}
.set_img{
  border-radius: 30px;
  border: none;
  margin-top: 1%;
  background-color: #45184c;
  color: white;
  margin-bottom: 5%;
}
.accountContainer{
  display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    justify-content: space-evenly;

}
h1 {
  color: #333;
  margin-bottom: 1%;
}

p {
  font-size: 16px;
}

img {
    max-width: 20%;
    height: auto;
    border-radius: 50%; 
    margin-bottom: 20px;
}
</style>