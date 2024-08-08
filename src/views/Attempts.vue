<template>
    <div class="container my-5" data-bs-theme="dark">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
                <div class="card bg-dark border shadow-lg p-4">
                    <h2 class="mb-4 text-center fw-bold">User Attempts</h2>
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>Quiz Title</th>
                                <th>Score (%)</th>
                                <th>Name</th>
                                <th>Completed At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="attempt in attempts" :key="attempt._id">
                                <td>{{ getQuizTitle(attempt.quiz_id) }}</td>
                                <td>{{ attempt.score.toFixed(2) }}</td>
                                <td>{{ getUserName(attempt.user_id) }}</td>
                                <td>{{ new Date(attempt.completed_at).toLocaleString() }}</td>
                                <td>
                                    <router-link :to="`/result/${attempt._id}`" class="btn me-1">
                                        <i class="bi-eye"></i>
                                    </router-link>
                                    <button @click="deleteAttempt(attempt._id)" class="btn btn-outline-danger">
                                        <i class="bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api } from '../api'

export default {
    name: 'Attempts',
    data() {
        return {
            attempts: [],
            quizzes: [],
            users: [],
            errorMessage: ''
        }
    },
    async created() {
        try {
            if (localStorage.getItem('role') === 'admin') {
                this.attempts = await api.get_all_attempts();
            } else {
                this.attempts = await api.get_attempts_by_user_id();
            }
            this.quizzes = await api.get_all_quizzes();
            this.users = await api.get_all_users();
        } catch (error) {
            console.error('Error fetching data:', error);
            this.errorMessage = 'Failed to load attempts, quizzes, or users.';
        }
    },
    methods: {
        getQuizTitle(quizId) {
            const quiz = this.quizzes.find(q => q._id === quizId);
            return quiz ? quiz.title : 'Unknown Quiz';
        },
        getUserName(userId) {
            const user = this.users.find(u => u._id === userId);
            return user ? user.name : 'Unknown User';
        },
        async deleteAttempt(attemptId) {
            try {
                await api.delete_attempt_by_id(attemptId);
                this.attempts = this.attempts.filter(attempt => attempt._id !== attemptId);
                this.flash("Attempt deleted");
            } catch (error) {
                console.error('Error deleting attempt:', error);
                this.flash("Failed to delete attempt.", "danger");
            }
        }
    }
}
</script>


