<template>
<div class="container my-5">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="quiz in quizzes" :key="quiz._id">
            <div class="card border shadow-sm h-100">
                <div class="card-body position-relative">
                    <h5 class="card-title">{{ quiz.title }}</h5>
                    <p class="card-text text-truncate">{{ quiz.description }}</p>
                    <router-link :to="`/questions/${quiz._id}`" class="btn btn-dark me-2">Answer</router-link>
                    <router-link :to="`/leaderboard/${quiz._id}`" class="btn btn-outline-info">Leaderboard</router-link>
                    <div v-if="quiz.created_by === userId || isAdmin" class="position-absolute bottom-0 end-0 m-1 mb-4">
                        <router-link :to="`/update-quiz/${quiz._id}`" class="btn btn-outline-secondary btn-sm border-0">Change</router-link>
                        <button @click="deleteQuiz(quiz._id)" class="btn btn-outline-danger btn-sm border-0 me-1">Delete</button>
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
            userId: ''
        }
    },
    computed: {
        isAdmin() {
            return localStorage.getItem('role') === 'admin';
        }
    },
    async created() {
        try {
            this.userId = localStorage.getItem('userId');
            this.quizzes = await api.get_all_quizzes()
            console.log(this.quizzes)  // Verify the structure of the fetched data
        } catch (error) {
            console.error('Error fetching quizzes:', error)
        }
    },
    methods: {
        async deleteQuiz(quizId) {
            try {
                await api.delete_quiz(quizId);
                this.quizzes = this.quizzes.filter(quiz => quiz._id !== quizId);
                this.flash('Quiz deleted');
            } catch (error) {
                console.error('Error deleting quiz:', error);
                this.flash('Failed to delete quiz', 'danger');
            }
        }
    }
}
</script>

