<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card shadow p-4" style="width: 400px;">
            <h2 class="mb-4 text-center">Login</h2>
            <form @submit.prevent="login">
            <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" class="form-control" required>
            </div>
            <div class="form-group mb-3">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-dark w-100 mb-3">Login</button>
            <button class="btn btn-link-dark w-100" @click="goToRegister">Register</button>
            </form>
            <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
        </div>
    </div>
</template>


<script>
import { api } from '../api'

export default {
name: 'Login',
data() {
    return {
    email: '',
    password: '',
    errorMessage: ''
    }
},
methods: {
    async login() {
        try {
            const credentials = { email: this.email, password: this.password };
            const response = await api.login(credentials);
            if (response && response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('userId', response.userId);
                localStorage.setItem('role', response.role);
                localStorage.setItem('name', response.name);
                //this.flash(localStorage.getItem('name'))
                this.flash('Login successful', 'success');
                this.$router.push('/quizzes');
            } else {
                this.errorMessage = 'Login failed: Invalid response from server';
            }
        } catch (error) {
            console.error('Login error:', error);
            this.errorMessage = 'Login failed: ' + (error.response && error.response.data ? error.response.data : error.message);
        }
    },
    goToRegister() {
        this.$router.push('/register');
    }
}
}
</script>
