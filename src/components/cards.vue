<template>
  <div class="cardBlock">
    <h1 class="cardHeading">Список студентов</h1>
    <div class="search-bar">
      <input type="text" v-model.trim="studentName" placeholder="Найти студента" />
      <button type="submit" @click="findByName()">Найти</button>
    </div>
    <div class="card-container">
      <div class="card" v-for="student in studentList" :key="student.id">
        <div class="card-body">
          <div class="items-left">
            <h5 class="card-title">{{ student.fullName }}</h5>
            <p class="card-text">{{ student.studentGroup }}</p>
          </div>

          <div class="items-right">
            <h1 class="greenCount">{{ student.greenCount }}</h1>
            <h1 class="yellowCount">{{ student.yellowCount }}</h1>
            <h1 class="redCount">{{ student.redCount }}</h1>
            <a @click="newNote(student)" class="btn"><h4>+</h4></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/api.js';</script>
<script>


export default {
  data() {
    return {
      studentList: [],
      notesList: [],
      studentName: null,
    };
  },
  mounted() {
    this.getStudents()
  },
  methods: {
    async getStudents() {
      const jwt = this.$cookies.get('jwt')
      if (jwt === null) window.location.href ='/login'
      else {
        try {
          const response = await api.get('/authorized/findAllStudents', {
            headers: {
              'Authorization': 'Bearer ' + jwt
            }
          });
          this.studentList = response.data;
        } 
        catch (error) {
          console.error(error);
        }
      }
    },
    async newNote(student) {
      const newNote = {
        weight: prompt('Тяжесть нарушения', 'Замечание'),
        feedbackText: prompt('Причина нарушения', 'Взял без спроса ноутбук'),
        teacher: null,
        student: student
      };
      const jwt = this.$cookies.get('jwt')
      if (jwt === null) window.location.href ='/login'
      else {
        try {
          const response = await api.post(`/authorized/note/new`, newNote, {
            headers: {
              'Authorization': 'Bearer ' + jwt
            }
          });
          console.log(response.data);
          location.reload();
        } catch (error) {
          console.error(error);
        }
      }
    },
    async findByName() {
      let matchesList = []
      this.studentList.forEach((student) => {
        if (student.fullName.includes(this.studentName)) {
          matchesList.push(student)
        } 
      })
      this.studentList = matchesList;
    }
  },
};
</script>

<style scoped>
.First {
  margin-top: 7%;
}
.c1 {
  background: rgb(255, 255, 255);
  background-size: 400%;
}
.btn{
    margin-top: 10px;
    padding-top: 0;
    color: black;
    height: 32px;
    background-color: white;
    border: 1px solid black;
    margin-right: 10px;
}
.cardHeading{
  margin-right: 15%;
  margin-left: 15%;
  padding-top: 5%;
  padding-bottom: 2%;
  text-align:center;
}
.search-bar {
  margin-right: 15%;
  margin-left: 15%;
  padding-top: 1%;
  padding-bottom: 5%;
  text-align:center;
}
.card-container {
    margin-right: 10%;
    margin-left: 10%;
}
.card {
    margin-right: 50px;
}
.card-body {
  display: flex;
  justify-content: space-between;
}
.card-img, .card-img-top, .card-img-bottom {
    width: 100%;
}

.items-right {
  display: flex;
}

.greenCount {
  color: green;
  padding-right: 5%;
  text-shadow: -1px -1px 0 #000,  
                1px -1px 0 #000,
                -1px 1px 0 #000,
                1px 1px 0 #000; 
}

.yellowCount {
  color: yellow;
  padding-right: 5%;
  text-shadow: -1px -1px 0 #000,  
                1px -1px 0 #000,
                -1px 1px 0 #000,
                1px 1px 0 #000; 
}

.redCount {
  color: red;
  padding-right: 5%;
  text-shadow: -1px -1px 0 #000,  
                1px -1px 0 #000,
                -1px 1px 0 #000,
                1px 1px 0 #000; 
}

@media (max-width: 768px) {
  .search-bar input {
    width: 150px;
  }
}

@media (max-width: 480px) {
  .First {
    flex-direction: column;
    padding: 10px;
  }

  .c1 {
    width: 100%;
    margin-bottom: 7%;
  }

  .buttons {
    margin-top: 10px;
  }

  .buttons button {
    margin-left: 0;
    display: block;
    width: 100%;
    margin-top: 7px;
  }
}
</style>
