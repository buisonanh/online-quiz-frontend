<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
                <div class="card border shadow p-4">
                    <h2 class="text-center mb-2">{{ quizTitle }}</h2>
                    <p class="text-center mb-4">Leaderboard</p>
                    <table class="table table-striped">
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
            return this.attempts.sort((a, b) => b.score - a.score);
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
