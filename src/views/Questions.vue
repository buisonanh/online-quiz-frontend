<template>
    <div class="d-flex flex-column align-items-center">
        <div class="card border shadow p-3 mb-3" v-for="question in questions" :key="question._id" style="width:30rem; margin:2rem;">
            <div class="card-body">
                <h5 class="card-title" style="text-align:center;">{{ question.question_text }}</h5>
                <div v-for="(option, index) in question.options" :key="index">
                    <input type="radio" class="btn-check" :name="'option' + question._id" :id="option._id" :value="option.option_text" v-model="answers[question._id]" autocomplete="off">
                    <label class="btn btn-outline-dark" :for="option._id" style="width:25rem; margin:0.5rem;">{{ option.option_text }}</label>
                </div>
            </div>
        </div>
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <button class="btn btn-dark" @click="submitAttempt" style="width:25rem; margin:3rem;">Submit</button>
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
