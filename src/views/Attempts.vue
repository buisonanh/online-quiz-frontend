<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
                <div class="card border shadow p-4">
                    <h2 class="mb-4 text-center">User Attempts</h2>
                    <table class="table table-striped">
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
                                    <router-link :to="`/result/${attempt._id}`" class="btn btn-outline-secondary me-1">View</router-link>
                                    <button @click="deleteAttempt(attempt._id)" class="btn btn-outline-danger">Delete</button>
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

<style scoped>
.table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
}

.table thead th {
    background-color: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
}

.card {
    margin-bottom: 1.5rem;
}

.btn-outline-secondary {
    margin-right: 0.5rem;
}

@media (max-width: 767px) {
    .table thead {
        display: none;
    }

    .table tbody td {
        display: block;
        width: 100%;
        text-align: right;
        border: none;
        border-bottom: 1px solid #dee2e6;
        position: relative;
        padding-left: 50%;
    }

    .table tbody td::before {
        content: attr(data-label);
        position: absolute;
        left: 0;
        width: 50%;
        padding-left: 15px;
        font-weight: bold;
        text-align: left;
        background-color: #f8f9fa;
        border-right: 1px solid #dee2e6;
    }

    .table tbody tr:last-child td {
        border-bottom: 0;
    }
}
</style>
