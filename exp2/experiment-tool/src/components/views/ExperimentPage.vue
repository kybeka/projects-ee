<!-- ExperimentPage.vue -->
<template>
  <div class="submit-experiment">
    <div v-if="!experimentFinished">

      <h1>Welcome to the Experiment</h1>

      <QuestionComponent v-if="currentQuestionIndex < questions.length" :key="currentQuestionIndex"
        :question="questions[currentQuestionIndex]" 
        :shuffledOptions="shuffledOptions[currentQuestionIndex]"
        :isCorrect="isCorrect" 
        :optionsGiven="optionsGiven" 
        :questionIndex="currentQuestionIndex" :allQuestionsAnswered="allQuestionsAnswered"
        :currentQuestionIndex="currentQuestionIndex" @answer-checked="handleAnswerChecked" :isWarmup="false"
        @option-clicked="handleOptionClicked" @next-question="moveToNextQuestion" :showResultMessage="false"
        :score="score" @finish-clicked="finishExperiment" />
    </div>

    <!-- Thank you message and final score -->
    <div class="finished" v-if="experimentFinished">
      <p>Thank you for completing the experiment!</p>
      <p>Your final score is: {{ score }} out of {{ questions.length }}.</p>
      <button @click="exportDataToJSON">Export Data</button>
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
      score: 0,
      experimentFinished: false,
      shuffledOptions: [], // Store shuffled options for each question
      startTime: 0,
      endTime: 0,
    };
  },
  computed: {
    ...mapState(['questions']),
    allQuestionsAnswered() {
      return this.questions.every((question) => question.submitted);
    },
  },
  created() {
    // Shuffle the entire array of questions when the component is created
    this.shuffleArray(this.questions);

    // Shuffle options for all questions when the component is created
    this.questions.forEach((_, index) => {
      this.shuffleQuestionOptions(index);
    });
  },
  methods: {
    ...mapActions(['shuffleQuestionOptions', 'recordQuestionData']),
    submitForm() {
      this.endTime = new Date().getTime();
      const timeTaken = this.endTime - this.startTime;

      const currentQuestion = this.questions[this.currentQuestionIndex];

      if (!currentQuestion) {
        console.error('Current question is undefined. Skipping recordQuestionData.');
        return;
      }

      const questionData = {
        questionIndex: this.currentQuestionIndex,
        questionOrder: this.currentQuestionIndex + 1,
        questionText: currentQuestion.questionText,
        optionsGiven: this.shuffledOptions[this.currentQuestionIndex],
        correctAnswerIndex: currentQuestion.correctAnswerIndex,
        selectedOption: currentQuestion.selectedOption,
        isCorrect: currentQuestion.selectedOption === currentQuestion.options[currentQuestion.correctAnswerIndex],
        timeTaken: timeTaken,
      };

      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
      console.log(questionData)
      this.recordQuestionData(questionData);

      // Move to the next question
      this.currentQuestionIndex++;

      if (this.currentQuestionIndex < this.questions.length) {
        this.shuffledOptions[this.currentQuestionIndex] = this.shuffleArray(
          this.questions[this.currentQuestionIndex].options.slice()
        );

        this.startTime = new Date().getTime();
      } else {
        this.finishExperiment();
      }
    },



    handleOptionClicked(option) {
      // Update the current question using reactivity
      this.questions[this.currentQuestionIndex].selectedOption = option;
    },
    handleAnswerChecked(index, score, isCorrect) {
      if (index >= 0 && index < this.questions.length) {
        if (isCorrect) {
          this.score++;
        }

        // Capture data before updating the question
        const questionData = {
          correctAnswerIndex: this.questions[index].correctAnswerIndex,
          optionsGiven: this.shuffledOptions[index],
          selectedOption: this.questions[index].selectedOption,
        };

        this.questions[index] = {
          ...this.questions[index],
          submitted: true,
          isCorrect: isCorrect,
        };

        // Emit the data to the parent component
        this.$emit("answer-checked", index, this.score, isCorrect, questionData);
      } else {
        console.error(`Invalid question index: ${index}`);
      }
    },

    finishExperiment() {
      this.experimentFinished = true;
    },
    moveToNextQuestion() {

      this.endTime = new Date().getTime();
      const timeTaken = this.endTime - this.startTime;

      const optionsGiven = [...this.questions[this.currentQuestionIndex].options];

      const questionData = {
        questionIndex: this.currentQuestionIndex,
        questionOrder: this.currentQuestionIndex + 1,
        questionText: this.questions[this.currentQuestionIndex].questionText,
        optionsGiven: optionsGiven,
        correctAnswerIndex: this.questions[this.currentQuestionIndex].correctAnswerIndex,
        selectedOption: this.questions[this.currentQuestionIndex].selectedOption,
        isCorrect: this.questions[this.currentQuestionIndex].isCorrect,
        timeTaken: timeTaken,
        // isCorrect: currentQuestion.selectedOption === currentQuestion.options[currentQuestion.correctAnswerIndex],
        // optionsGiven: this.shuffledOptions[this.currentQuestionIndex],
      };
      console.log(questionData)
      this.recordQuestionData(questionData);

      // Move to the next question
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.finishExperiment();
      }

      this.startTime = new Date().getTime();
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    exportDataToJSON() {
      this.$store.dispatch('exportDataToJSON');
    },
  },
  components: {
    QuestionComponent,
  },
};
</script>

<style scoped>
/* Add your styling here */

h1 {
  text-align: center;
  margin: 1cm;
  padding-top: 2em;
}

.finished {
  text-align: center;
  margin: 1cm;
  padding-top: 2em;
}
</style>
