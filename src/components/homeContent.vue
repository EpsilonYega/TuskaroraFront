<template>
  <div class="card-container">
    <div class="card">
      <img class="devka" src="../assets/img/devka.jpg" alt="" />
      <div class="card-content">
        <h2>Полный доступ к базе студентов</h2>
        <p>Благодаря нашему сервису Вы сможете оставлять комментарии о студентах, а Ваши коллеги смогут просматривать то, что Вы написали.</p>
      </div>
    </div>
    <div class="card" > 
      <img class="listok" src="../assets/img/listok.jpg" alt="" />
      <div class="card-content">
        <h2>Просто и доступно</h2>
        <p>Современный интерфейс и понятные инструкции.</p>
      </div>
    </div>
  </div>
  <div class="card-cont">
    <div class="card align-bottom-center">
      <img class="security" src="../assets/img/Security.jpg" alt="" />
      <div class="card-content">
        <h2>Защита от лишних глаз</h2>
        <p>Все комментарии, которые Вы оставляете будут видны только Вам, преподователям и студенту, на чьей странице вы оставили комментарий.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.card-container {
  display: flex;
  justify-content: center;
  margin: 100px;
  border-width: 3px;
  border-color: #CE00B9;
  
}

.card {
  display: flex;
  border-style: solid;
  flex: 1;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  border-width: 3px;
  border-color: #CE00B9;
  margin-left: 100px;
  align-items: center;
  text-align: center;
}

.devka {
    width: 229px;
    height: 189px;
}

.listok {
    width: 216px;
    height: 212px;
}

.security {
    width: 222px;
    height: 206px;
}

.align-bottom-center {
  align-self: flex-end;
  border-style: solid;
  border-width: 3px;
  margin:30%;
  margin-top: auto;
  height: 400px
}

.card-img {
  width: 150px;
  height: auto;
}

.card-content {
  padding: 20px;
}
</style>