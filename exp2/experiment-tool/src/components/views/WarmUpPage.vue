<!-- WarmupPage.vue -->
<template>
  <div class="submit-warmup">
    <h1>Welcome to the Warm-up</h1>
    <p>Let's warm up with a set of questions designed to test your familiarity with different naming conventions in
      programming. In this session, we'll cover both camelCase and kebab-case</p>
    <p>For each question, you'll see four options. Pick the one that adheres to the specified naming convention.</p>
    <QuestionComponent v-if="currentQuestionIndex < warmUpQuestions.length" :key="currentQuestionIndex"
      :question="warmUpQuestions[currentQuestionIndex]" :shuffledOptions="shuffledOptions[currentQuestionIndex]"
      :questionIndex="currentQuestionIndex" :warmupQuestions="warmUpQuestions"
      :allQuestionsAnswered="allQuestionsAnswered" :currentQuestionIndex="currentQuestionIndex"
      :isWarmup="true"
      @answer-checked="handleAnswerChecked" @option-clicked="handleOptionClicked" @next-question="moveToNextQuestion" />

      <div v-if="allQuestionsAnswered && isWarmup && question.submitted">
        <p>Now you are going to start the actual experiment. Remember that you can only click once to choose the correct answer.</p>
      </div>
  </div>

</template>

<script>
import QuestionComponent from "@/components/views/QuestionComponent.vue";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      currentQuestionIndex: 0,
      shuffledOptions: [], // Store shuffled options for each question
    };
  },
  computed: {
    ...mapState(['warmUpQuestions']),
    allQuestionsAnswered() {
      return this.warmUpQuestions.every((question) => question.submitted);
    },
  },
  created() {
    // Shuffle options for all questions when the component is created
    this.warmUpQuestions.forEach((_, index) => {
      this.shuffleWarmUpQuestionOptions(index);
    });
    console.log('warmUpQuestions:', this.warmUpQuestions);
  },
  methods: {
    ...mapActions(['shuffleWarmUpQuestionOptions']),
    submitForm() {
      console.log('allQuestionsAnswered:', this.allQuestionsAnswered);
      console.log('currentQuestionIndex:', this.currentQuestionIndex);
      if (this.allQuestionsAnswered && this.currentQuestionIndex === this.warmUpQuestions.length) {
        // Navigate to the "/experiment" page
        this.$router.push('/experiment');
      } else {
        // Move to the next question and shuffle options
        this.currentQuestionIndex++;
        this.shuffledOptions[this.currentQuestionIndex] = this.shuffleArray(this.warmUpQuestions[this.currentQuestionIndex].options.slice());
      }
    },
    handleOptionClicked(option) {
      // Update the current question using reactivity
      this.warmUpQuestions[this.currentQuestionIndex].selectedOption = option;
    },
    handleAnswerChecked(index, isCorrect) {
      if (index >= 0 && index < this.warmUpQuestions.length) {
        this.warmUpQuestions[index] = {
          ...this.warmUpQuestions[index],
          correct: isCorrect,
          submitted: true,
        };
      } else {
        console.error(`Invalid question index: ${index}`);
      }
    },
    moveToNextQuestion() {
      // Move to the next question and shuffle options
      this.currentQuestionIndex++;
      this.shuffledOptions[this.currentQuestionIndex] = this.shuffleArray(this.warmUpQuestions[this.currentQuestionIndex].options.slice());
      if (this.allQuestionsAnswered) {
        // Navigate to the "/experiment" page or show a "Start the Experiment" button
        this.$router.push('/experiment');
      }
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
h1 {
  text-align: center;
  margin: 1cm;
  padding-top: 2em;
}

 p {
  text-align: center;
  font-size: 1em;
  padding: 10px;
 }
</style>
