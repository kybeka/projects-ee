<template>
  <div class="main-form">
    <h2>Demographics Form</h2>
    <form @submit.prevent="submitForm">
      <div class="form-row">
        <label for="age">Age:</label>
        <input type="number" id="age" min="0" max="100" v-model="formData.age" required>
      </div>

      <div class="form-row">
        <label for="gender">Gender:</label>
        <select id="gender" v-model="formData.gender" required>
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-row">
        <label for="experience">Coding experience:</label>
        <select id="experience" v-model="formData.experience" required>
          <option value="" disabled>Select Experience</option>
          <option value="no-experience">No experience</option>
          <option value="bachelor-inf">Bachelor INF student</option>
          <option value="more-three">3+ years</option>
        </select>
      </div>

      <div class="form-row">
        <label for="englishlevel">English knowledge:</label>
        <select id="englishlevel" v-model="formData.englishLevel" required>
          <option value="" disabled>Select English Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="mother-tongue">Mother tongue</option>
        </select>
      </div>

      <div class="submit-but">
        <button type="submit" class="submit-button" :disabled="!isFormValid">Next</button>
      </div>
     
    </form>

    <div v-if="submitted">
      <h2>Submitted Data:</h2>
      <p><strong>Age:</strong> {{ formData.age }}</p>
      <p><strong>Gender:</strong> {{ formData.gender }}</p>
      <p><strong>Experience:</strong> {{ formData.experience }}</p>
      <p><strong>English Level:</strong> {{ formData.englishLevel }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        age: 0,
        gender: '',
        experience: '',
        englishLevel: '',
      },
      submitted: false,
    };
  },
  computed: {
    isFormValid() {
      // Check if all required fields are filled out
      return (
        this.formData.age > 0 &&
        this.formData.gender &&
        this.formData.experience &&
        this.formData.englishLevel
      );
    },
  },
  methods: {
    submitForm() {
      // Handle form submission
      if (this.isFormValid) {
        this.submitted = true;
        // Proceed to the next page
        this.$router.push('/experiment');
      }
    },
  },
};
</script>

<style scoped>
.main-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10vh;
  padding-left: 100px;
  padding-right: 100px;
  font-size: 1.2em;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

label {
  flex: 1;
  margin-right: 15px;
}

input,
select {
  flex: 2;
}

.submit-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007BFF;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

div .submit-but {
  display: flex;
  justify-content: center;
}
</style>
