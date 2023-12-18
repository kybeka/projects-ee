<!-- WarmupPage.vue -->
<template>
  <div class="submit-warmup">
    <h1>Welcome to the Warm-up</h1>
    <p>... <!-- (Your introductory text) --></p>

    <QuestionComponent 
      v-if="currentQuestionIndex < warmupQuestions.length" 
      :key="currentQuestionIndex"
      :question="warmupQuestions[currentQuestionIndex]" 
      :shuffledOptions="getShuffledOptions(currentQuestionIndex)"
      :questionIndex="currentQuestionIndex" 
      :warmupQuestions="warmupQuestions"
      :allQuestionsAnswered="allQuestionsAnswered" 
      :currentQuestionIndex="currentQuestionIndex"
      @answer-checked="handleAnswerChecked" 
      @option-clicked="handleOptionClicked" 
      @next-question="submitForm" />

      <button
      type="button"
      @click="submitForm"
      :disabled="!allQuestionsAnswered"
      v-else-if="questionIndex == warmupQuestions.length"
    >
      {{ questionIndex === warmupQuestions.length ? 'Start the Experiment!' : 'Next Question' }}
    </button>

  </div>
</template>

<script>
import QuestionComponent from "@/components/views/QuestionComponent.vue";

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
      shuffledOptionsOnce:true,
    };
  },
  computed: {
    allQuestionsAnswered() {
      return this.warmupQuestions.every((question) => question.submitted);
    },
  },
  methods: {
    getShuffledOptions(questionIndex) {
      if (this.shuffleOptionsOnce) {
        this.shuffleOptionsOnce = false;
        return this.shuffleArray([...new Set(this.warmupQuestions[questionIndex].options.slice())]);
      }
      return this.warmupQuestions[questionIndex].options.slice();
    },
    submitForm() {
      console.log('allQuestionsAnswered:', this.allQuestionsAnswered);
      console.log('currentQuestionIndex:', this.currentQuestionIndex);
      if (this.allQuestionsAnswered && this.currentQuestionIndex === this.warmupQuestions.length) {
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
