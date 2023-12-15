<template>
  <div class="submit-warmup">
    <h1>Welcome to the Warm-up</h1>
    <p>Let's warm up with a set of questions designed to test your familiarity with different naming conventions in programming. In this session, we'll cover both camelCase and kebab-case.</p>
    <p>For each question, you'll see four options. Pick the one that adheres to the specified naming convention. Once you've made your selection, click "Check answer" to check your answer!</p>
    <div v-for="(question, index) in warmupQuestions" :key="index" class="question">
      <p>{{ question.text }}</p>
      <div v-for="(option, optionIndex) in shuffledOptions[index]" :key="optionIndex" class="option">
        <input type="radio" :id="`q${index}o${optionIndex}`" :name="`question${index}`" v-model="question.selectedOption"
          :value="option" />
        <label :for="`q${index}o${optionIndex}`">{{ option }}</label>
      </div>
      <button type="button" @click="checkAnswer(question)">Check answer</button>
      <p v-if="question.submitted">
        <span :class="{ 'correct-answer': question.correct, 'incorrect-answer': !question.correct }">
        <span v-if="question.correct">&#10004;</span>
        <span v-else>&#10008;</span>
      </span>
        <span v-if="question.correct">Correct! Move on to the next question.</span>
        <span v-else>Incorrect. Please try again.</span>
      </p>
    </div>

    <button type="button" @click="submitForm" :disabled="!allQuestionsAnsweredCorrectly">Start the Experiment!</button>
  </div>
</template>


<script>
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
        },
        {
          text: "total cases",
          options: ["totalCases", "totalCasas", "totatCases", "totalCaser"],
          correctAnswer: "totalCases",
          selectedOption: null,
          correct: false,
        },
        {
          text: "floor number",
          options: ["floorNumber", "florNumber", "floorNuber", "floorNumder"],
          correctAnswer: "floorNumber",
          selectedOption: null,
          correct: false,
        },
        {
          text: "points scored",
          options: ["points-scored", "points-stored", "poinst-scored", "point-scored"],
          correctAnswer: "points-scored",
          selectedOption: null,
          correct: false,
        },
        {
          text: "dice number",
          options: ["diceNumber", "diceNumder", "diseNumber", "diceNunber"],
          correctAnswer: "diceNumber",
          selectedOption: null,
          correct: false,
        },

      ],
      submitted: false,
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
      if (this.allQuestionsAnsweredCorrectly) {
        // Navigate to the "/experiment" page
        this.$router.push('/experiment');
      }
    },
    checkAnswer(question) {
      question.correct = question.selectedOption === question.correctAnswer;
      question.submitted = true;
    },
    // Helper method to shuffle an array using the Fisher-Yates algorithm
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  },
};
</script>

<style scoped>


.question {
  margin-bottom: 20px;
}

.option {
  margin-bottom: 10px;
}

.correct-answer {
  color: green;
  font-size: 1.5em;
  margin-right: 5px;
}

.incorrect-answer {
  color: red;
  font-size: 1.5em;
  margin-right: 5px;
}
</style>
