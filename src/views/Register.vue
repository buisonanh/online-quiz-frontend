<template>
    <div class="container d-flex justify-content-center align-items-center vh-100" data-bs-theme="dark">
        <div class="card shadow p-4" style="width: 400px;">
            <h2 class="mb-4 text-center fw-bold">Register</h2>
            <form @submit.prevent="register">
            <div class="form-group mb-3">
                <label for="password">Name</label>
                <input type="text" id="name" v-model="name" class="form-control mt-1" required>
            </div>
            <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" class="form-control mt-1" required>
            </div>
            <div class="form-group mb-3">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" class="form-control mt-1" required>
            </div>
            <button type="submit" class="btn btn-light w-100 mb-3">Register</button>
            <button class="btn btn-link-light w-100" @click="goToLogin">Back to Login</button>
            </form>
            <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
        </div>
    </div>
</template>

<script>
import { api } from '../api'

export default {
    name: 'Register',
    data() {
    return {
        email: '',
        password: '',
        name: '',
        errorMessage: ''
    }
    },
    methods: {
    async register() {
        try {
        const user = { email: this.email, password: this.password, name: this.name };
        await api.register(user);
        this.flash('Registration successful. Please login again', 'success');
        this.$router.push('/login');
        } catch (error) {
        console.error('Registration error:', error);
        this.errorMessage = 'Registration failed: ' + (error.response && error.response.data ? error.response.data : error.message);
        }
    },
    goToLogin() {
        this.$router.push('/login');
    }
    }
}
</script>
