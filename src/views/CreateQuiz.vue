<template>
    <div class="container d-flex justify-content-center align-items-center my-5" data-bs-theme="dark">
        <div class="card custom-card-bg shadow p-5" style="width: 50rem;">
            <h2 class="mb-3 text-center fw-bold">Create a New Quiz</h2>
            <form @submit.prevent="createQuiz">
            <div class="form-group fw-bold mb-3" >
                <label for="title">Quiz Title</label>
                <input type="text" id="title" v-model="title" class="form-control custom-input" required>
            </div>
            <div class="form-group fw-bold mb-3">
                <label for="description">Quiz Description</label>
                <textarea id="description" v-model="description" class="form-control custom-input" required></textarea>
            </div>
            <button type="submit" class="btn custom-submit-btn w-100 mb-3">Create Quiz</button>
            <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
            </form>
        </div>
    </div>
</template>

<script>
import { api } from '../api'

export default {
    name: 'CreateQuiz',
    data() {
        return {
            title: '',
            description: '',
            errorMessage: ''
        }
    },
    methods: {
        async createQuiz() {
            try {
                // Check if the quiz title already exists
                const quizzes = await api.get_all_quizzes();
                for (const quiz of quizzes) {
                    if (quiz.title === this.title) {
                        this.errorMessage = 'A quiz with this title already exists';
                        return;
                    }
                }
                const quiz = { title: this.title, description: this.description, created_by: localStorage.getItem('userId') };
                const createdQuiz = await api.create_quiz(quiz);
                console.log('Created quiz:', createdQuiz);
                this.$router.push(`/create-questions/${createdQuiz._id}`); // Ensure the correct ID format (_id)
            } catch (error) {
                console.error('Create quiz error:', error);
                this.flash('Failed to create quiz', 'danger');
            }
        }
    }
}
</script>    