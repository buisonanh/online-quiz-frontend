<template>
    <div class="container d-flex justify-content-center my-5" data-bs-theme="dark">
        <div class="card shadow p-4" style="width: 40rem;">
            <h2 class="text-center mb-4 fw-bold">Quiz Results</h2>
            <div class="alert alert-info text-center" role="alert">
                Your Score: {{ score.toFixed(2) }}%
            </div>
            <div v-for="question in questions" :key="question._id" class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">{{ question.question_text }}</h5>
                    <div v-for="(option, index) in question.options" :key="index" class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            :id="'option' + question._id + index"
                            :name="'option' + question._id"
                            :value="option.option_text"
                            :checked="answers[question._id] === option.option_text"
                            disabled
                        >
                        <label
                            class="form-check-label"
                            :for="'option' + question._id + index"
                            :class="{
                                'bg-success text-white': option.is_correct,
                                'bg-danger text-white': answers[question._id] === option.option_text && !option.is_correct
                            }"
                            style="padding: 0.3rem; border-radius: 5px; display: inline-block; width: 100%;"
                        >
                            {{ option.option_text }}
                        </label>
                    </div>
                </div>
            </div>
            <router-link :to="`/leaderboard/${quiz._id}`" class="btn btn-light w-100 fw-bold">To Leaderboard</router-link>
            <router-link to="/quizzes" class="btn btn-outline-light w-100 mt-2">Back to Quizzes</router-link>
        </div>    
    </div>
</template>

<script>
import { api } from '../api';

export default {
    name: 'DisplayResult',
    data() {
        return {
            questions: [],
            answers: {},
            score: 0,
            quiz: {}
        };
    },
    async created() {
        const attemptId = this.$route.params.id;
        const attempt = await api.get_attempt_by_id(attemptId);
        this.answers = attempt.answers.reduce((acc, answer) => {
            acc[answer.question_id] = answer.selected_option;
            return acc;
        }, {});
        this.quiz = await api.get_quiz_by_id(attempt.quiz_id);
        this.questions = await api.get_all_questions_by_quiz_id(attempt.quiz_id);

        // Calculate the score
        const totalQuestions = this.questions.length;
        const correctAnswers = this.questions.filter(
            question => question.options.some(
                option => option.is_correct && option.option_text === this.answers[question._id]
            )
        ).length;
        this.score = (correctAnswers / totalQuestions) * 100;
    }
};
</script>
