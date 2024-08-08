<template>
<div class="container d-flex flex-column align-items-center my-5" data-bs-theme="dark">
    <div class="card border shadow p-4" style="width: 40rem;">
    <h2 class="mb-4 text-center fw-bold">Edit Profile</h2>
    <form @submit.prevent="updateUser">
        <div class="form-group">
        <label for="userName">Name:</label>
        <input type="text" id="userName" class="form-control" v-model="user.name" required>
        </div>
        <div class="form-group">
        <label for="userEmail">Email:</label>
        <input type="email" id="userEmail" class="form-control" v-model="user.email" required>
        </div>
        <div class="form-group">
        <label  v-if="isAdmin" for="userRole">Role:</label>
        <select v-if="isAdmin" id="userRole" class="form-control" v-model="user.role" required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
        </div>
        <button type="submit" class="btn btn-light w-100 mt-3">Confirm</button>
        <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
    </form>
    </div>
</div>
</template>

<script>
import { api } from '../api';

export default {
name: 'UpdateUser',
data() {
    return {
    user: {
        name: '',
        email: '',
        role: 'user'
    },
    errorMessage: ''
    };
},
computed: {
    isAdmin() {
        return localStorage.getItem('role') === 'admin';
    }
},
async created() {
    const userId = this.$route.params.id;
    try {
        this.user = await api.get_user_by_id(userId);
    } catch (error) {
        this.errorMessage = 'Failed to fetch user data.';
    }
},
methods: {
    async updateUser() {
    try {
        const userId = this.$route.params.id;
        await api.update_user(userId, this.user);
        if (localStorage.getItem('role') === 'admin') {
            this.$router.push('/admin/users');
        } else {
            localStorage.setItem('name', this.user.name);
            this.$router.push('/quizzes');
            window.location.reload();
        }
    } catch (error) {
        this.errorMessage = 'Failed to update user.';
    }
    }
}
};
</script>

<style scoped>
.container {
max-width: 600px;
}
</style>
