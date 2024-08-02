<template>
    <div class="d-flex flex-column align-items-center my-5">
        <div class="card border shadow" v-for="quiz in quizzes" :key="quiz._id" style="width: 30rem; margin: 1rem;">
            <div class="card-body position-relative">
                <h5 class="card-title">{{ quiz.title }}</h5>
                <p class="card-text">{{ quiz.description }}</p>
                <router-link :to="`/questions/${quiz._id}`" class="btn btn-dark">Answer</router-link>
                <div v-if="quiz.created_by === userId" class="position-absolute top-0 end-0 m-2">
                    <button @click="deleteQuiz(quiz._id)" class="btn btn-outline-danger border-0 me-1">Delete</button>
                    <router-link :to="`/update-quiz/${quiz._id}`" class="btn btn-outline-secondary border-0 ">Change</router-link>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api } from '../api'

export default {
    name: 'Quizzes',
    data() {
        return {
            quizzes: [],
            userId: ''
        }
    },
    async created() {
        try {
            this.userId = localStorage.getItem('userId');
            this.quizzes = await api.get_all_quizzes()
            console.log(this.quizzes)  // Verify the structure of the fetched data
        } catch (error) {
            console.error('Error fetching quizzes:', error)
        }
    },
    methods: {
        async deleteQuiz(quizId) {
            try {
                await api.delete_quiz(quizId);
                this.quizzes = this.quizzes.filter(quiz => quiz._id !== quizId);
                this.flash('Quiz deleted');
            } catch (error) {
                console.error('Error deleting quiz:', error);
                this.flash('Failed to delete quiz', 'danger');
            }
        }
    }
}
</script>
