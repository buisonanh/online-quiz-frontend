<template>
    <div class="container my-5" data-bs-theme="dark">
        <!-- Custom Confirmation Modal -->
        <confirmation-modal
        v-if="showModal"
        :visible="showModal"
        message="Are you sure you want to delete this attempt?"
        @confirm="confirmDelete"
        @close="showModal = false"
        />

        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
                <div class="card custom-card-bg border shadow-lg p-4">
                    <h2 class="mb-4 text-center fw-bold">My Attempts</h2>
                    <table class="table table-light table-hover table-striped">
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
                                    <router-link :to="`/result/${attempt._id}`" class="btn btn-outline-secondary border-0 me-1">
                                        <i class="bi-search"></i>
                                    </router-link>
                                    <button @click="prepareDelete(attempt._id)" class="btn btn-outline-danger border-0">
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
import ConfirmationModal from '../components/ConfirmationModal.vue';

export default {
    name: 'Attempts',
    components: {
        ConfirmationModal
    },
    data() {
        return {
            attempts: [],
            quizzes: [],
            users: [],
            errorMessage: '',
            showModal: false,
            attemptToDelete: null
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
        prepareDelete(attemptId) {
            this.attemptToDelete = attemptId;
            this.showModal = true;
        },
        async confirmDelete() {
            if (this.attemptToDelete) {
                try {
                    await api.delete_attempt_by_id(this.attemptToDelete); // Use this.attemptToDelete
                    this.attempts = this.attempts.filter(attempt => attempt._id !== this.attemptToDelete);
                    this.flash("Attempt deleted");
                } catch (error) {
                    console.error('Error deleting attempt:', error);
                    this.flash("Failed to delete attempt.", "danger");
                }
                this.showModal = false;
                this.attemptToDelete = null;
            }
        }
    }

}
</script>