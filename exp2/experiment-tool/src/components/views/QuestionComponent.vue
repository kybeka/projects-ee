<!-- QuestionComponent.vue -->
<template>
  <div class="question">
    <p class="question-text">{{ questionText }}</p>
    <div class="options-container">
      <div class="options-grid">
        <OptionComponent v-for="(option, index) in question.options" :key="index" :value="option"
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
      <span v-else>Incorrect, the correct answer is {{ correctAnswerText }}.</span>
    </p>

    <div v-if="isWarmup && allQuestionsAnswered" :disabled="!allQuestionsAnswered && !question.submitted">
        <p>Now you are going to start the actual experiment. Remember that you can only click once to choose the correct
          answer.</p>
        </div>

    <!-- Next Question button -->
    <div class="next-button">

      
        <div class="spacer"></div>
      <button type="button" class="next-start" v-if="question.submitted && showResult" @click="handleFinishClicked"
        :disabled="!allQuestionsAnswered && !question.submitted">
        
        {{ isWarmup && allQuestionsAnswered ? 'Start the Experiment!' : allQuestionsAnswered && !isWarmup ? 'Finish' :
          'Next Question' }}
      </button>
    </div>

  </div>
</template>

<script>
import OptionComponent from "@/components/views/OptionComponent.vue";
import { mapState } from 'vuex';

export default {
  props: {
    question: Object,
    questionIndex: Number,
    warmUpQuestions: Array,
    allQuestionsAnswered: Boolean,
    currentQuestionIndex: Number,
    isWarmup: Boolean,
    showResultMessage: {
      type: Boolean,
      default: true,
    },
    score: {
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
    console.log('QuestionComponent - options:', this.question.options);
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
    // handleCurrentAnswerChecked() {
    //   if (!this.question.submitted) {
    //     // Check if the selected option is correct

    //     const isCorrect = this.isCorrectOption(this.question.selectedOption);

    //     if (isCorrect) {
    //       this.$emit('answer-checked', this.questionIndex, 1, isCorrect);
    //     } else {
    //       this.$emit('answer-checked', this.questionIndex, 0, isCorrect);
    //     }

    //     // Emit the result to the parent component
    //     this.$emit('answer-checked', this.questionIndex, isCorrect);

    //     this.showResult = true;
    //   }

    // },
    handleCurrentAnswerChecked() {
      if (!this.question.submitted) {
        // Check if the selected option is correct
        const isCorrect = this.isCorrectOption(this.question.selectedOption);

        // Emit the result to the parent component
        this.$emit('answer-checked', this.questionIndex, this.score, isCorrect, {
          isCorrect: isCorrect,
          optionsGiven: this.question.options,  // Update this based on your data structure
        });

        this.showResult = true;
      }
    },
    moveToNextQuestion() {
      this.$emit('next-question');
    },
    handleFinishClicked() {
      if (!this.isWarmup && this.allQuestionsAnswered) {
        this.experimentFinished = true;
        this.$emit('finish-clicked');
      } else if (this.isWarmup && this.allQuestionsAnswered) {
        this.$router.push('/experiment');

      } else {
        // If it's a warm-up button, move to the next question
        this.$emit('next-question');

      }
    }
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


.spacer {
  margin-bottom: 10px; /* Adjust the value as needed */
}
</style>
