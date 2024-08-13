<template>
    <div class="container my-5" data-bs-theme="dark">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
                <div class="card custom-card-bg shadow p-4">
                    <h2 class="text-center mb-2 fw-bold">{{ quizTitle }}</h2>
                    <p class="text-center mb-4">Leaderboard</p>
                    <table class="table table-light table-striped">
                        <thead>
                            <tr>
                                <th>Top</th>
                                <th>User</th>
                                <th>Score (%)</th>
                                <th>Completed At</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="attempt in sortedAttempts" :key="attempt._id">
                                <td>{{ sortedAttempts.indexOf(attempt) + 1 }}</td>
                                <td>{{ getUserName(attempt.user_id) }}</td>
                                <td>{{ attempt.score.toFixed(2) }}</td>
                                <td>{{ new Date(attempt.completed_at).toLocaleString() }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api } from '../api'

export default {
    name: 'QuizLeaderBoard',
    data() {
        return {
            attempts: [],
            users: [],
            quizTitle: ''
        }
    },
    computed: {
        sortedAttempts() {
            // If user has 2 or more attetmpts, only take the highest score
            const attempts = this.attempts.sort((a, b) => b.score - a.score);
            const uniqueUsers = [];
            attempts.forEach(attempt => {
                if (!uniqueUsers.includes(attempt.user_id)) {
                    uniqueUsers.push(attempt.user_id);
                }
            });
            // Get the highest score for each user
            return uniqueUsers.map(userId => {
                return attempts.find(attempt => attempt.user_id === userId);
            });
        }
    },
    async created() {
        try {
            const quizId = this.$route.params.id;
            const quiz = await api.get_quiz_by_id(quizId);
            this.quizTitle = quiz.title;
            this.attempts = await api.get_attempts_by_quiz_id(quizId);
            this.users = await api.get_all_users();
        } catch (error) {
            console.error('Error fetching leaderboard data:', error)
        }
    },
    methods: {
        getUserName(userId) {
            const user = this.users.find(u => u._id === userId);
            return user ? user.name : 'Unknown User';
        }
    }
}
</script>


<style>
.custom-card-bg {
    background-color: #27187E !important;
    color: #ffffff !important;
}
</style>