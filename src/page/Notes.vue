<script setup>
import api from '@/api.js';
import Header from '@/components/Header.vue';
</script>

<template>
    <Header/>
    <h1 class=noteHeading>Ваши заметки</h1>
    <div class="note-container">
      <div class="note" v-for="note in notes" :key="note.id">
        <div class="note-body">
          <div class="items-left">
            <h5 class="note-title">{{ note.student.fullName }}</h5>
            <p class="note-text">Тип замечания: {{ note.weight }}</p>
            <p class="note-text">Причина: {{ note.feedbackText }}</p>
          </div>
          <div class="items-right">
            <a @click="updateNote(note.id, note.student)" class="btn btn-primary">Изменить</a>
            <a @click="deleteNote(note.id)" class="btn btn-primary">Удалить</a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      notes: [],
    };
  },
  mounted() {
    this.getNotes()
  },
  methods: {
    async getNotes() {
      const jwt = this.$cookies.get('jwt');
      if (jwt === null) window.location.href ='/login'
      else {
        try {
          const response = await api.get('/authorized/findAllNotesByTeacher', {
            headers: {
              'Authorization': 'Bearer ' + jwt
            }
          });
          this.notes = response.data;
        } 
        catch (error) {
          console.error(error);
        }
      }
    },
    async updateNote(id, student) {
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
                const response = await api.post(`/authorized/note/update/${id}`, newNote, {
                    headers: {
                    'Authorization': 'Bearer ' + jwt
                    }
                });
                location.reload();
            } 
            catch (error) {
                console.error(error);
            }
        }
    },
    async deleteNote(id) {
        const jwt = this.$cookies.get('jwt')
        if (jwt === null) window.location.href ='/login'
        else {
            try {
                const response = await api.post(`/authorized/note/delete/${id}`, {
                    headers: {
                    'Authorization': 'Bearer ' + jwt
                    }
                });
                location.reload();
            } 
            catch (error) {
                console.error(error);
            }
        }
    },
  },
};
</script>

<style scoped>
  .noteHeading{
    margin-right: 15%;
    margin-left: 15%;
    padding-top: 5%;
    padding-bottom: 2%;
    text-align:center;
  }
  .note-container {
    margin-right: 10%;
    margin-left: 10%;
  }
  .note {
      margin-right: 50px;
  }
  .note-body {
    display: flex;
    justify-content: space-between;
    border: 1px solid black;
    padding: 15px;
    margin-bottom: 10px;
  }
  .note-img, .note-img-top, .note-img-bottom {
      width: 100%;
  }

  .items-right {
    display: flex;
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
</style>