<template>
<div>
    <div class="form-group">
    <label for="questionText">Question Text:</label>
    <input type="text" id="questionText" class="form-control" v-model="question.question_text">
    </div>
    <div v-for="(option, index) in question.options" :key="index" class="form-group">
    <label :for="'option' + index">Option {{ index + 1 }}:</label>
    <input type="text" :id="'option' + index" class="form-control" v-model="option.option_text">
    <div class="form-check">
        <input class="form-check-input" type="radio" :name="'correctOption' + question.question_text" :id="'correct' + index" v-model="question.correctIndex" :value="index">
        <label class="form-check-label" :for="'correct' + index">
        Correct
        </label>
    </div>
    </div>
    <button class="btn btn-outline-secondary" @click="addOption">Add Option</button>
</div>
</template>

<script>
export default {
props: {
    question: Object
},
methods: {
    addOption() {
    this.question.options.push({ option_text: '', is_correct: false });
    }
},
watch: {
    'question.correctIndex'(newIndex) {
    this.question.options.forEach((option, index) => {
        option.is_correct = index === newIndex;
    });
    }
}
}
</script>
