<!-- ExperimentPage.vue -->
<template>
  <div class="submit-experiment">
    <h1>Welcome to the Experiment</h1>

    <QuestionComponent
      v-if="currentQuestionIndex < questions.length"
      :key="currentQuestionIndex"
      :question="questions[currentQuestionIndex]"
      :shuffledOptions="shuffledOptions[currentQuestionIndex]"
      :questionIndex="currentQuestionIndex"
      :allQuestionsAnswered="allQuestionsAnswered"
      :currentQuestionIndex="currentQuestionIndex"
      @answer-checked="handleAnswerChecked"
      @option-clicked="handleOptionClicked"
      @next-question="moveToNextQuestion"
      :showResultMessage="false"
      :score="score"
    />

    <!-- Thank you message and final score -->
    <div v-if="allQuestionsAnswered">
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
    };
  },
  computed: {
    ...mapState(['questions']),
    
    shuffledOptions() {
      return this.questions.map((question) =>
        this.shuffleArray(question.options.slice())
      );
      
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
    handleAnswerChecked(index) {
      if (index >= 0 && index < this.questions.length) {
        this.questions[index] = {
          ...this.questions[index],
          submitted: true,
        };
      } else {
        console.error(`Invalid question index: ${index}`);
      }
    },
    handleAllQuestionsAnswered(userCorrectCount) {
    // Handle the final score and thank you message
    this.score += userCorrectCount;
    this.allQuestionsAnswered = true;
  },

    moveToNextQuestion() {
      // Move to the next question
      this.currentQuestionIndex++;
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
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
