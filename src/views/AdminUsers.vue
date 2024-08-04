<template>
<div class="container my-5">
    <h2 class="text-center mb-4">Manage Users</h2>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user._id">
                <td>{{ user.email }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.role }}</td>
                <td>
                    <router-link :to="`/update-user/${user._id}`" class="btn btn-outline-secondary me-1">Edit</router-link>
                    <button class="btn btn-outline-danger" @click="deleteUser(user._id)">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import { api } from '../api';

export default {
    name: 'AdminUsers',
    data() {
        return {
            users: []
        };
    },
    async created() {
        this.users = await api.get_all_users();
    },
    methods: {
        async deleteUser(id) {
            try {
                await api.delete_user_by_id(id);
                this.users = this.users.filter(user => user._id !== id);
                this.flash('User deleted');
            } catch (error) {
                console.error('Failed to delete user:', error);
                alert('Failed to delete user.');
            }
        }
    }
};
</script>
