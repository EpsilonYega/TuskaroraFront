<script>
export default {
  data() {
    return {};
  },
  methods: {
    main() {
      window.location.href = '/auth/main'
    },
    account(){
        window.location.href ='/auth/account'
    }

  },
};
</script>

<template>
  <div class="header" :class="{ 'fixed-header': isFixed }">
      <img src="../assets/img/ithub.png" alt="" @click="main()" />
      <div class="buttons">
        <button @click="account()">Аккаунт</button>
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
