<template>
    <div>
      <h2>Demographics Form</h2>
      <form @submit.prevent="submitForm">
        <!-- Add your demographics input fields here -->
        <button type="submit">Next</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {

    methods: {
      submitForm() {
        // Handle form submission
        this.$router.push("/experiment");
      },
    },
  };
  </script>
  