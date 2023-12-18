<template>
  <div
    class="option"
    :class="{ 'selected-option': selected }"
    @click="checkAnswer"
  >
    {{ value }}
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    correctAnswer: Boolean,
    selected: Boolean,
    onOptionClicked: Function,
  },
  methods: {
    checkAnswer() {
      this.onOptionClicked(this.value);
    },
  },
};
</script>

<style scoped>
.option {
  display: inline-block;
  margin: 5px;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  border: none;
  font-size: 20px;
}

.selected-option {
  background-color: #aaf;
}
</style>
