<!-- QuestionComponent.vue -->
<template>
  <div class="question">
    <p class="question-text">{{ questionText }}</p>
    <div class="options-container">
      <div class="options-grid">
        <OptionComponent v-for="(option, index) in shuffledOptions" :key="index" :value="option"
          :correct-answer="isCorrectOption(option)" :selected="isSelectedOption(option, question.selectedOption)"
          @option-clicked="handleOptionClicked(option)" />
      </div>
    </div>

    <!-- Result message -->
    <p v-if="question.submitted && showResult && showResultMessage">
      <span :class="{ 'correct-answer': question.correct, 'incorrect-answer': !question.correct }">
        <span v-if="question.correct">&#10004;</span>
        <span v-else>&#10008;</span>
      </span>
      <span v-if="question.correct">Correct! </span>
      <!-- put the correct answer later -->
      <span v-else>Incorrect, the correct answer is {{ correctAnswerText }}.</span>
    </p>

    <!-- Next Question button -->
    <div class="next-button">
      <button type="button" class="next-start" v-if="question.submitted && showResult" @click="moveToNextQuestion"
        :disabled="!allQuestionsAnswered && !question.submitted">
        {{ allQuestionsAnswered ? 'Start the Experiment!' : 'Next Question' }}
      </button>
    </div>

    <!-- Next Question button -->
    <!-- <div class="next-button">
      <button type="button" class="next-start" v-if="question.submitted && showResult && !allQuestionsAnswered"
        @click="moveToNextQuestion" :disabled="!allQuestionsAnswered && !question.submitted">
        {{ isWarmUpPage ? 'Start the Experiment!' : 'Next Question' }}
      </button>
    </div> -->

  </div>
</template>

<script>
import OptionComponent from "@/components/views/OptionComponent.vue";
import { mapState } from 'vuex';

export default {
  props: {
    question: Object,
    shuffledOptions: Array,
    questionIndex: Number,
    warmUpQuestions: Array,
    allQuestionsAnswered: Boolean,
    currentQuestionIndex: Number,
    showResultMessage: {
      type: Boolean,
      default: true,
    },
    score:{
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState(['questions', 'warmUpQuestions']),
    questionText() {
      return this.question.questionText;
    },
    correctAnswerText() {
      // Assuming correctAnswerIndex is the index of the correct answer
      return this.question.options[this.question.correctAnswerIndex];
    },
  },
  created() {
    console.log('QuestionComponent - question:', this.question);
    console.log('QuestionComponent - shuffledOptions:', this.shuffledOptions);
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
        this.handleCurrentAnswerChecked();
      }
    },
    isCorrectOption(option) {
      return option === this.question.options[this.question.correctAnswerIndex];
    },
    isSelectedOption(option, selectedOption) {
      return option === selectedOption;
    },
    handleCurrentAnswerChecked() {
      if (!this.question.submitted) {
        // Check if the selected option is correct

        const isCorrect = this.isCorrectOption(this.question.selectedOption);

        if (isCorrect) {
          this.$emit('answer-checked', this.questionIndex, 1);
        } else {
          this.$emit('answer-checked', this.questionIndex, 0);
        }

        // Emit the result to the parent component
        this.$emit('answer-checked', this.questionIndex, isCorrect);

        this.showResult = true;
      }
    },


    moveToNextQuestion() {
      this.$emit('next-question');
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

.question-text {
  font-size: 26px;
  font-weight: bold;
  color: darkred;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  gap: 10px;
  justify-content: center;
}

.options-container {
  max-width: 600px;
  margin: 0 auto;
}

.selected-option {
  background-color: #aaf;
}

.option:hover {
  background-color: #e0e0e0;
  /* Change the color as needed */
}

.next-start {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007BFF;
  color: #fff;
  font-size: large;
  font-weight: bold;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

div .next-button {
  display: flex;
  justify-content: center;
}
</style>
