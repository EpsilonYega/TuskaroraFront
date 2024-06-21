<template>
    <Header />
    <div class="foodBlock">
    <h1 class="foodHeading">Корзина</h1>
    <div class="card-container">
      <div class="card" v-for="item in basket" :key="item.id">
        <div class="card-body">
          <h5 class="card-title">{{ item.food.title }}</h5>
          <p class="card-text">{{ item.user.username }}</p>
          <a @click="removeItem(item.id)" class="btn btn-primary">Удалить</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    import api from '@/api.js';
    import Header from '../components/Header.vue';
</script>
<script>
    export default {
  data() {
    return {
      basket: [],
    };
  },
  async created() {
    try {
      const response = await api.get('/bucket'); 
      this.basket = response.data; 
      console.log(this.basket)
    } catch (error) {
      console.error('Ошибка при получении списка еды:', error);
    }
  },
  methods: {
    async removeItem(id) {
      const jwt = this.$cookies.get('jwt')
      if (jwt === null) window.location.href ='/login'
      else {
        try {
          const response = await api.post(`/bucket/delete/${id}`, {
            headers: {
              'Authorization': 'Bearer ' + jwt
            }
          });
          console.log(response.data);
          
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
};
</script>

<style scoped>
.First {
  margin-top: 7%;
}
.btn{
    color: black;
    background-color: #E1CC60;
    border: none;
}
.foodHeading{
  margin-right: 15%;
  margin-left: 15%;
  padding-top: 5%;
  padding-bottom: 5%;
  text-align:center;
}
</style>
