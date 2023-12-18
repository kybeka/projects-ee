<!-- WarmupPage.vue -->
<template>
  <div class="submit-warmup">
    <h1>Welcome to the Warm-up</h1>
    <p>... <!-- (Your introductory text) --></p>

    <!-- Iterate through each question -->
    <!-- <QuestionComponent v-if="currentQuestionIndex < warmupQuestions.length" :key="currentQuestionIndex"
      :question="warmupQuestions[currentQuestionIndex]" :shuffledOptions="shuffledOptions[currentQuestionIndex]"
      :questionIndex="currentQuestionIndex" :warmupQuestions="warmupQuestions" @answer-checked="handleAnswerChecked" @option-clicked="handleOptionClicked"
      @next-question="moveToNextQuestion" /> -->
    <QuestionComponent v-if="currentQuestionIndex < warmupQuestions.length" :key="currentQuestionIndex"
      :question="warmupQuestions[currentQuestionIndex]" :shuffledOptions="shuffledOptions[currentQuestionIndex]"
      :questionIndex="currentQuestionIndex" :warmupQuestions="warmupQuestions"
      :allQuestionsAnsweredCorrectly="allQuestionsAnsweredCorrectly" :currentQuestionIndex="currentQuestionIndex"
      @answer-checked="handleAnswerChecked" @option-clicked="handleOptionClicked" @next-question="moveToNextQuestion" />


    <button type="button" @click="submitForm" :disabled="!allQuestionsAnsweredCorrectly">Start the Experiment!</button>
  </div>
</template>

<script>
import QuestionComponent from "@/components/views/QuestionComponent.vue"; // Update the path accordingly

export default {
  data() {
    return {
      warmupQuestions: [
        {
          text: "Choose the correct option in kebab-case for 'user name'",
          options: ["user-name", "user-nane", "usor-name", "user-nace"],
          correctAnswer: "user-name",
          selectedOption: null,
          correct: false,
          submitted: false,
        },
        {
          text: "total cases",
          options: ["totalCases", "totalCasas", "totatCases", "totalCaser"],
          correctAnswer: "totalCases",
          selectedOption: null,
          correct: false,
          submitted: false,
        },
        {
          text: "floor number",
          options: ["floorNumber", "florNumber", "floorNuber", "floorNumder"],
          correctAnswer: "floorNumber",
          selectedOption: null,
          correct: false,
          submitted: false,
        },
        {
          text: "points scored",
          options: ["points-scored", "points-stored", "poinst-scored", "point-scored"],
          correctAnswer: "points-scored",
          selectedOption: null,
          correct: false,
          submitted: false,
        },
        {
          text: "dice number",
          options: ["diceNumber", "diceNumder", "diseNumber", "diceNunber"],
          correctAnswer: "diceNumber",
          selectedOption: null,
          correct: false,
          submitted: false,
        },
      ],
      currentQuestionIndex: 0,
    };
  },
  computed: {
    shuffledOptions() {
      return this.warmupQuestions.map((question) => this.shuffleArray(question.options.slice()));
    },
    allQuestionsAnsweredCorrectly() {
      return this.warmupQuestions.every((question) => question.correct);
    },
  },
  methods: {
    submitForm() {
      console.log('allQuestionsAnsweredCorrectly:', this.allQuestionsAnsweredCorrectly);
      console.log('currentQuestionIndex:', this.currentQuestionIndex);
      if (this.allQuestionsAnsweredCorrectly && this.currentQuestionIndex === this.warmupQuestions.length) {
        // Navigate to the "/experiment" page
        this.$router.push('/experiment');
      } else {
        // Move to the next question
        this.currentQuestionIndex++;
      }
    },
    handleOptionClicked(option) {
      // Update the current question using reactivity
      this.warmupQuestions[this.currentQuestionIndex].selectedOption = option;
    },
    handleAnswerChecked(index, isCorrect) {
      if (index >= 0 && index < this.warmupQuestions.length) {
        this.warmupQuestions[index] = {
          ...this.warmupQuestions[index],
          correct: isCorrect,
          submitted: true,
        };
      } else {
        console.error(`Invalid question index: ${index}`);
      }
    },
    moveToNextQuestion() {
      // Move to the next question
      this.currentQuestionIndex++;

      // Check if all questions are answered correctly
      if (this.allQuestionsAnsweredCorrectly && this.currentQuestionIndex === this.warmupQuestions.length) {
        // Navigate to the "/experiment" page
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
/* Add your styling here */
</style>
