<template>
    <div class="container my-5">
        <div class="card border shadow p-4">
            <h2 class="mb-4 text-center">User Attempts</h2>
            <table class="table table-striped">
            <thead>
                <tr>
                <th>Quiz Title</th>
                <th>Score (%)</th>
                <th>Completed At</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="attempt in attempts" :key="attempt._id">
                <td>{{ getQuizTitle(attempt.quiz_id) }}</td>
                <td>{{ attempt.score.toFixed(2) }}</td>
                <td>{{ new Date(attempt.completed_at).toLocaleString() }}</td>
                <td>
                    <router-link :to="`/result/${attempt._id}`" class="btn btn-outline-secondary me-1">View</router-link>
                    <button @click="deleteAttempt(attempt._id)" class="btn btn-outline-danger">Delete</button>
                </td>
                </tr>
            </tbody>
            </table>
            <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
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
            quizzes: []
        }
    },
    async created() {
        this.attempts = await api.get_attempts_by_user_id()
        this.quizzes = await api.get_all_quizzes()
    },
    methods: {
        getQuizTitle(quizId) {
            const quiz = this.quizzes.find(q => q._id === quizId)
            return quiz ? quiz.title : 'Unknown Quiz'
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
