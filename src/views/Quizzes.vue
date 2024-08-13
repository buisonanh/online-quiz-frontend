<template>
<div class="container my-5" data-bs-theme="dark">
    <!-- Search Bar -->
    <div class="row justify-content-center mb-4">
        <div class="col-12 col-md-8 col-lg-6.5">
            <input 
                type="text" 
                class="form-control custom-search-bar" 
                v-model="searchKeyword" 
                placeholder="Search quizzes..." 
                @input="searchQuizzes"
            />
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6.5 mb-4" v-for="quiz in quizzes" :key="quiz._id">
            <div class="card custom-card-bg shadow">
                <div class="card-body position-relative">
                    <h5 class="card-title fw-bold">{{ quiz.title }}</h5>
                    <p class="card-text fw-light">{{ quiz.description }}</p>
                    <p class="card-text text-secondary">
                        <small class="text-muted">Created by: {{ getUserName(quiz.created_by) }}</small>
                    </p>
                    <router-link :to="`/questions/${quiz._id}`" class="btn custom-answer-btn">Answer</router-link>
                    <br>
                    <router-link :to="`/leaderboard/${quiz._id}`" class="btn custom-leaderboard-btn">
                        Leaderboard
                        <i class="bi-bar-chart-fill"></i>
                    </router-link>
                    <div v-if="quiz.created_by === userId || isAdmin" class="position-absolute bottom-0 end-0 m-1 mb-3 me-2">
                        <router-link :to="`/update-quiz/${quiz._id}`" class="btn btn-light border-0 me-1">
                            <i class="bi-pencil"></i>
                        </router-link>
                        <button @click="deleteQuiz(quiz._id)" class="btn btn-danger border-0 me-1">
                            <i class="bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { api } from '../api'

export default {
name: 'Quizzes',
data() {
return {
    quizzes: [],
    users: [],
    userId: '',
    searchKeyword: '' // Add a data property to hold the search keyword
}
},
computed: {
isAdmin() {
    return localStorage.getItem('role') === 'admin';
},
filteredQuizzes() {
    if (this.searchKeyword) {
    return this.quizzes.filter(quiz => 
        quiz.title.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        quiz.description.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
    }
    return this.quizzes;
}
},
async created() {
try {
    this.userId = localStorage.getItem('userId');
    this.quizzes = await api.get_all_quizzes();
    this.users = await api.get_all_users(); // Fetch all users to get their names
    console.log(this.quizzes); // Verify the structure of the fetched data
} catch (error) {
    console.error('Error fetching quizzes or users:', error);
}
},
methods: {
getUserName(userId) {
    const user = this.users.find(u => u._id === userId);
    return user ? user.name : 'Unknown User';
},
async deleteQuiz(quizId) {
    try {
    await api.delete_quiz(quizId);
    this.quizzes = this.quizzes.filter(quiz => quiz._id !== quizId);
    this.flash('Quiz deleted');
    } catch (error) {
    console.error('Error deleting quiz:', error);
    this.flash('Failed to delete quiz', 'danger');
    }
},
async searchQuizzes() {
    try {
    this.quizzes = await api.search_quiz(this.searchKeyword);
    } catch (error) {
    console.error('Error searching quizzes:', error);
    }
}
}
}
</script>