<!-- ExperimentPage.vue -->
<template>
  <div class="submit-experiment">
    <div v-if="!experimentFinished">
      <h1>Welcome to the Experiment</h1>
      <QuestionComponent v-if="currentQuestionIndex < questions.length" :key="currentQuestionIndex"
        :question="questions[currentQuestionIndex]" :shuffledOptions="shuffledOptions[currentQuestionIndex]"
        :isCorrect="isCorrect" :optionsGiven="optionsGiven" :questionIndex="currentQuestionIndex"
        :allQuestionsAnswered="allQuestionsAnswered" :currentQuestionIndex="currentQuestionIndex"
        @answer-checked="handleAnswerChecked" :isWarmup="false" @option-clicked="handleOptionClicked"
        @next-question="moveToNextQuestion" :showResultMessage="false" :score="score"
        @finish-clicked="finishExperiment" />
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
      shuffledOptions: [],
      startTime: 0,
      endTime: 0,
      lastQuestionProcessed: false,
    };
  },
  computed: {
    ...mapState(["questions"]),
    allQuestionsAnswered() {
      return this.questions.every((question) => question.submitted);
    },
  },
  created() {
    this.shuffleArray(this.questions);
    this.questions.forEach((_, index) => {
      this.shuffleQuestionOptions(index);
    });
  },
  methods: {
    ...mapActions(["shuffleQuestionOptions", "recordQuestionData", "exportDataToJSON"]),

    handleOptionClicked(option) {
      this.questions[this.currentQuestionIndex].selectedOption = option;
      this.endTime = performance.now();
    },

    handleAnswerChecked(index, score, isCorrect) {
      if (index >= 0 && index < this.questions.length) {
        if (isCorrect) {
          this.score++;
        }

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

        this.$emit("answer-checked", index, this.score, isCorrect, questionData);
      } else {
        console.error(`Invalid question index: ${index}`);
      }
    },

    finishExperiment() {
      if (!this.lastQuestionProcessed) {
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
        };

        this.recordQuestionData(questionData);
        this.lastQuestionProcessed = true;

        this.$store.dispatch('updateScore', this.score);
        this.$nextTick(async () => {
          // this.updateScore(this.score);
          await this.exportDataToJSON();

          this.experimentFinished = true;
        });
      }
    },

    moveToNextQuestion() {
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
      };

      this.recordQuestionData(questionData);

      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.finishExperiment();
      }

      this.startTime = performance.now();
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

.finished {
  text-align: center;
  margin: 1cm;
  padding-top: 2em;
}
</style>
