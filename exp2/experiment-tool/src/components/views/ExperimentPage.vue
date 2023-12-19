<!-- ExperimentPage.vue -->
<template>
  <div class="submit-experiment">
    <h1>Welcome to the Experiment</h1>

    <QuestionComponent v-if="currentQuestionIndex < questions.length" :key="currentQuestionIndex"
      :question="questions[currentQuestionIndex]" :shuffledOptions="shuffledOptions[currentQuestionIndex]"
      :questionIndex="currentQuestionIndex" :allQuestionsAnswered="allQuestionsAnswered"
      :currentQuestionIndex="currentQuestionIndex" @answer-checked="handleAnswerChecked"
      :isWarmup="false"
      @option-clicked="handleOptionClicked" @next-question="moveToNextQuestion" :showResultMessage="false"
      :score="score" 
      @finish-clicked="finishExperiment"/>


    <!-- Thank you message and final score -->
    <div v-if="experimentFinished">
      <p>Thank you for completing the experiment!</p>
      <p>Your final score is: {{ score }} out of {{ questions.length }}.</p>
    </div>
  </div>
</template>

<script>
import QuestionComponent from "@/components/views/QuestionComponent.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      currentQuestionIndex: 0,
      score: 0,
      experimentFinished: false,
    };
  },
  computed: {
    ...mapState(['questions']),

    shuffledOptions() {
      return this.questions.map(question => question.options.slice());

    },
    allQuestionsAnswered() {
      return this.questions.every((question) => question.submitted);
    },
  },
  created() {
    console.log('questions:', this.questions);
  },
  methods: {
    submitForm() {
      console.log('allQuestionsAnswered:', this.allQuestionsAnswered);
      console.log('currentQuestionIndex:', this.currentQuestionIndex);
      // Move to the next question
      this.currentQuestionIndex++;
    },
    handleOptionClicked(option) {
      // Update the current question using reactivity
      this.questions[this.currentQuestionIndex].selectedOption = option;
    },
    handleAnswerChecked(index, score, isCorrect) {
      if (index >= 0 && index < this.questions.length) {
        if(isCorrect) {
          this.score++;
        }
        this.questions[index] = {
          ...this.questions[index],
          submitted: true,
          isCorrect: isCorrect,
        };
      } else {
        console.error(`Invalid question index: ${index}`);
      }
    },
    handleAllQuestionsAnswered() {
      this.finishExperiment();
    },
    finishExperiment() {
      this.experimentFinished = true;
    },

    moveToNextQuestion() {
      // Move to the next question
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.finishExperiment();
      }
    },
  },
  components: {
    QuestionComponent,
  },
};
</script>

<style scoped>
/* Add your styling here */
</style>
