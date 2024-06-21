<script setup>
    import api from '@/api';
</script>

<template>
    <div class="adminContainer">
        <div class="buttons">
            <button class="b_admin" @click="createPage()">Новый пользователь</button>
            <button class="b_admin" @click="updatePage()">Обновить данные</button>
            <button class="b_admin" @click="deleteUser()">Удалить</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userId: null,
        };
    },
    methods: {
        createPage() {
            window.location.href = "/admin/create";
        },
        updatePage() {
            window.location.href = "/admin/update";
        },
        async deleteUser() {
            const jwt = this.$cookies.get('jwt')
            this.userId = prompt("id пользователя")
            try {
                const response = await api.post(`/authorized/student/delete/${this.userId}`, {
                headers: {
                    'Authorization': 'Bearer ' + jwt
                }
                });
            } 
            catch (error) {
                console.log(error);
            }
        },
    },
}
</script>

<style scoped>
.adminContainer {
    background-color: #1A1A2E;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    
}

.buttons {
    text-align: center;
}

.b_admin {
    background-color: #3E7CB1;
    color: white;
    border-radius: 10px;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
}

.b_admin:hover {
    background-color: #25578C;
}
</style>