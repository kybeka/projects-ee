<!-- QuestionComponent.vue -->
<template>
  <div class="question">
    <p>{{ question.text }}</p>
    <div class="options-grid">
      <OptionComponent v-for="(option, index) in shuffledOptions" :key="index" :value="option"
        :correct-answer="isCorrectOption(option)" :selected="isSelectedOption(option, question.selectedOption)"
        @option-clicked="handleOptionClicked(option)" />
    </div>
    <button type="button" @click="handleAnswerChecked" :disabled="disableCheckAnswer">Check answer</button>

    <!-- Result message -->
    <p v-if="question.submitted && showResult">
      <span :class="{ 'correct-answer': question.correct, 'incorrect-answer': !question.correct }">
        <span v-if="question.correct">&#10004;</span>
        <span v-else>&#10008;</span>
      </span>
      <span v-if="question.correct">Correct! </span>
      <span v-else>Incorrect. Please try again.</span>
    </p>

    <!-- Next Question button -->
    <button type="button" @click="moveToNextQuestion" v-if="question.submitted && showResult">
      Next Question
    </button>

    <!-- <button type="button" @click="submitForm" :disabled="!allQuestionsAnsweredCorrectly">
      Start the Experiment!
    </button> -->
  </div>
</template>



<script>
import OptionComponent from "@/components/views/OptionComponent.vue";

export default {
  props: {
    question: Object,
    shuffledOptions: Array,
    questionIndex: Number,
    warmupQuestions: Array,
    allQuestionsAnsweredCorrectly: Boolean,
    currentQuestionIndex: Number,
  },
  data() {
    return {
      showResult: false,
      disableCheckAnswer: false,
    }
  },
  methods: {
    handleOptionClicked(option) {
      if (!this.question.submitted) {
        this.$emit('option-clicked', option);
      }
    },
    isCorrectOption(option) {
      return option === this.question.correctAnswer;
    },
    isSelectedOption(option, selectedOption) {
      return option === selectedOption;
    },
    handleAnswerChecked() {
      if (!this.question.submitted && !this.disableCheckAnswer) {
        // Check if the selected option is correct
        const isCorrect = this.isCorrectOption(this.question.selectedOption);

        // Emit the result to the parent component
        this.$emit('answer-checked', this.questionIndex, isCorrect);

        // Show the result message
        this.showResult = true;
        this.disableCheckAnswer = true;
      }
    },

    moveToNextQuestion() {
      // Move to the next question
      // this.currentQuestionIndex++;
      this.$emit('next-question');

      // Hide the result message for the next question
      this.showResult = false;
      this.disableCheckAnswer = false;

      // Check if all questions are answered correctly
      if (this.allQuestionsAnsweredCorrectly && this.currentQuestionIndex + 1 === this.warmupQuestions.length) {
        // Navigate to the "/experiment" page or show a "Start the Experiment" button
        this.$router.push('/experiment');
      }
    },
  },
  components: {
    OptionComponent,
  },
};
</script>

<style scoped>
.question {
  text-align: center;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  justify-content: center;
}

.selected-option {
  /* Define your selected option styles here */
  background-color: #aaf;
}
</style>
