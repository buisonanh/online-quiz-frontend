<template>
    <div class="container d-flex justify-content-center my-5" data-bs-theme="dark">
        <div class="card bg-black border-0 shadow p-4" style="width: 40rem;">
            <div class="card border shadow mb-4" v-for="question in questions" :key="question._id">
                <div class="card-body position-relative">
                    <h5 class="card-title text-center">{{ question.question_text }}</h5>
                    <div v-for="(option, index) in question.options" :key="index" class="w-100">
                        <input type="radio" class="btn-check" :name="'option' + question._id" :id="option._id" :value="option.option_text" v-model="answers[question._id]" autocomplete="off">
                        <label class="btn btn-outline-light w-100 my-1" :for="option._id">{{ option.option_text }}</label>
                    </div>
                </div>
            </div>
            <div v-if="errorMessage" class="alert alert-danger text-center mt-4">{{ errorMessage }}</div>
            <div class="row justify-content-center mt-3">
                <button class="btn btn-light w-50 fw-bold" @click="submitAttempt">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
import { api } from '../api'

export default {
    name: 'Questions',
    data() {
        return {
            questions: [],
            answers: {},
            showSuccessAlert: false,
            errorMessage: ''
        }
    },
    async created() {
        this.questions = await api.get_all_questions_by_quiz_id(this.$route.params.id)
    },
    methods: {
        async submitAttempt() {
            try {
                // Validate that all questions have been answered
                for (const question of this.questions) {
                    if (!this.answers[question._id]) {
                        this.errorMessage = 'Please answer all questions before submitting.';
                        return;
                    }
                }

                const attempt = {
                    user_id: localStorage.getItem('userId'), // Retrieve user_id from local storage
                    quiz_id: this.$route.params.id,
                    answers: Object.keys(this.answers).map(question_id => ({
                        question_id,
                        selected_option: this.answers[question_id]
                    }))
                }

                const createdAttempt = await api.create_attempt(attempt);
                this.flash("You submitted your answers successfully", "success");
                this.$router.push('/result/' + createdAttempt._id);
            } catch (error) {
                this.flash('Failed to submit your answer', 'danger');
            }
        }
    }
}
</script>


