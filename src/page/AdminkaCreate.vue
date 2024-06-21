<script setup>
    import api from '@/api';
</script>

<template>
    <div class="createUserContainer">
        <input type="text" class="cuinput" v-model.trim="fullName" placeholder="ФИО" />
        <input type="text" class="cuinput" v-model.trim="studentGroup" placeholder="Группа" />
        <button @click="createUser()">Создать</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fullName: null,
            studentGroup: null,
        };
    },
    methods: {
        async createUser() {
        const jwt = this.$cookies.get('jwt')
        const newStudent = {
            fullName: this.fullName,
            studentGroup: this.studentGroup
        };
        try {
          const response = await api.post("/authorized/student/new", newStudent, {
              headers: {
                'Authorization': 'Bearer ' + jwt
              }
            });
        } catch (error) {
          console.log(error);
        }
    },
    },
}
</script>

<style scoped>
    .createUserContainer {
        background-color: #1A1A2E;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .cuinput {
        background-color: #b5dcff;
        margin: 5px;
    }

    button {
        background-color: #3E7CB1;
        color: white;
        padding: 7px;
        margin: 5px;
        border-radius: 10px;
        cursor: pointer;
    }
</style>