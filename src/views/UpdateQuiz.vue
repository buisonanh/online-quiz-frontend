<template>
<div class="container d-flex flex-column align-items-center my-5">
    <div class="card border shadow p-4 w-100" style="max-width: 40rem;">
        <h2 class="mb-4 text-center">Update Quiz</h2>
        <div class="form-group">
            <label for="quizTitle">Title:</label>
            <input type="text" id="quizTitle" class="form-control" v-model="quiz.title">
        </div>
        <div class="form-group mb-3">
            <label for="quizDescription">Description:</label>
            <input type="text" id="quizDescription" class="form-control" v-model="quiz.description">
        </div>
        
        <div v-for="(question, index) in questions" :key="index" class="card mb-3">
            <div class="card-body">
                <question-form :question="question"></question-form>
                <button class="btn btn-outline-danger mt-2" @click="removeQuestion(index)">Remove Question</button>
            </div>
        </div>
        <button class="btn btn-secondary w-50 mb-2" @click="addQuestion">Add Question</button>
        <button class="btn btn-dark w-100" @click="updateQuiz">Update Quiz</button>
        <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
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
        quiz: {
            title: '',
            description: ''
        },
        questions: [],
        errorMessage: ''
    };
},
async created() {
    const quizId = this.$route.params.id;
    this.quiz = await api.get_quiz_by_id(quizId);
    this.questions = await api.get_all_questions_by_quiz_id(quizId);

    // Set the correctIndex for each question
    this.questions.forEach(question => {
        question.correctIndex = question.options.findIndex(option => option.is_correct);
    });
},
methods: {
    addQuestion() {
        this.questions.push({ question_text: '', options: [{ option_text: '', is_correct: false }, { option_text: '', is_correct: false }], correctIndex: null });
    },
    removeQuestion(index) {
        this.questions.splice(index, 1);
    },
    async updateQuiz() {
        try {
            const quizId = this.$route.params.id;
            await api.update_quiz(quizId, this.quiz);
            for (const question of this.questions) {
                if (!this.validateQuestion(question)) {
                    return;
                }
                question.quiz_id = quizId;
                // Update the `is_correct` property of each option based on `correctIndex`
                question.options.forEach((option, index) => {
                    option.is_correct = (index === question.correctIndex);
                });
                if (question._id) {
                    await api.update_question(question._id, question);
                } else {
                    await api.create_question(question);
                }
            }
            this.flash("Quiz updated successfully!", "success");
            this.$router.push(`/quizzes`);
        } catch (error) {
            console.error('Error updating quiz:', error);
            this.flash("Failed to update quiz.", "danger");
        }
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
    }
}
};
</script>
