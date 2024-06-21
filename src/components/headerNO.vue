<script>
export default {
  data() {
    return {};
  },
  methods: {
    search() {
      window.location.href = '/search'
    },
    main() {
      window.location.href = '/home'
    },
    login(){
        window.location.href ='/login'
    },
    regin(){
        window.location.href ='/register'
    }

  },
};
</script>

<template>
  <div>
    <div class="header" :class="{ 'fixed-header': isFixed }">
      <img src="../assets/img/ithub.png" alt="" @click="main()" />
      <div class="buttons">
        <button @click="regin()">Регистрация</button>
        <button @click="login()">Вход</button>
      </div>
    </div>  
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px; 
  background-color: #ffffff;
  transition: all 0.3s ease; 
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

img {
  width: 90px;
  height: 70px;
  margin-right: 10px; 
}

.buttons button {
  margin-left: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: #CE00B9;
  color: white;
  cursor: pointer;
}
</style>
