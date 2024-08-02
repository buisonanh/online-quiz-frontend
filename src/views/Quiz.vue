<template>
    <div class="d-flex justify-content-center">
        <div class="card" style="width: 30rem; margin: 2rem;">
            <div class="card-body">
                <h5 class="card-title">{{ quiz.title }}</h5>
                <p class="card-text">{{ quiz.description }}</p>
                <a href="#" class="btn btn-primary">Answer it</a>
            </div>
        </div>
    </div>
</template>

<script>
import { api } from '../api'

export default {
    name: 'Quiz',
    data() {
        return {
            quiz: []
        }
    },
    async created() {
        this.quiz = await api.get_quiz_by_id(this.$route.params.id)
    }
}
</script>
