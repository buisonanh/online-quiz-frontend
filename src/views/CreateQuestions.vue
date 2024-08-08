<template>
<div class="container my-5" data-bs-theme="dark">
    <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
            <div class="card border shadow-lg p-4">
                <h2 class="mb-4 text-center fw-bold">Create Questions</h2>
                <div v-for="(question, index) in questions" :key="index" class="card mb-3">
                    <div class="card-body">
                        <question-form :question="question"></question-form>
                        <button class="btn btn-outline-danger mt-2" @click="removeQuestion(index)">Remove Question</button>
                    </div>
                </div>
                <button class="btn btn-secondary w-50 mb-2" @click="addQuestion">Add Question</button>
                <button class="btn btn-light w-100" @click="submitQuestions">Submit Questions</button>
                <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import QuestionForm from '../components/QuestionForm.vue';
import { api } from '../api';

export default {
    components: {
        QuestionForm
    },
    data() {
        return {
            questions: [
                { question_text: '', options: [{ option_text: '', is_correct: false }], correctIndex: null }
            ],
            errorMessage: ''
        };
    },
    methods: {
        addQuestion() {
            this.questions.push({ question_text: '', options: [{ option_text: '', is_correct: false }], correctIndex: null });
        },
        removeQuestion(index) {
            this.questions.splice(index, 1);
        },
        validateQuestion(question) {
            if (!question.question_text.trim()) {
                this.errorMessage = 'Each question must have a text.';
                return false;
            }
            for (const option of question.options) {
                if (!option.option_text.trim()) {
                    this.errorMessage = 'Each option must have a text.';
                    return false;
                }
            }
            if (question.correctIndex === null) {
                this.errorMessage = 'Each question must have one correct answer.';
                return false;
            }
            return true;
        },
        async submitQuestions() {
            try {
                const quizId = this.$route.params.quizId;
                for (const question of this.questions) {
                    if (!this.validateQuestion(question)) {
                        return;
                    }
                    question.quiz_id = quizId;
                    await api.create_question(question);
                }
                this.flash("Quiz create successfully!", "success");
                this.$router.push(`/quizzes`);
            } catch (error) {
                console.error('Error submitting questions:', error);
                this.flash("Failed to create quiz.", "danger");
            }
        }
    }
};
</script>
