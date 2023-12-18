<!-- OptionComponent.vue -->
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
  border: 1px solid #ccc;
  cursor: pointer;
  text-align: center;
}

/* Add your other styling as needed */
</style>
