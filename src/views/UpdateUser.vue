<template>
<div class="container d-flex flex-column align-items-center my-5">
    <div class="card border shadow p-4" style="width: 40rem;">
    <h2 class="mb-4 text-center">Update User</h2>
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
        <label for="userRole">Role:</label>
        <select id="userRole" class="form-control" v-model="user.role" required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
        </div>
        <button type="submit" class="btn btn-dark w-100 mt-3">Update User</button>
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
        this.$router.push('/admin/users');
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
