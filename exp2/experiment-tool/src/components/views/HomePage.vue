<template>
    <div class="home-page">
        <h1><u>Welcome to the "kebab-case vs. camelCase" experiment!</u></h1>

        <img src="../../assets/logo.png" alt="logo" width="250px">
        <div class="instructions">
            <p class="instruction">
                Thank you for participating in our experiment! In this study, we aim to investigate whether people read
                composed identifiers faster when using camelCase or kebab-case in source code.
                Previous studies in natural language reading suggest that using explicit separators between words improves
                reading speed. Now, we want to explore if this applies to code as well. Your task is to identify whether
                identifiers are written in camelCase or kebab-case.
            </p>
            <p class="instruction">
                Please read each identifier carefully and select the correct style. Take your time, and don't hesitate to
                ask
                if you have any questions.
            </p>
            <p class="instruction">
                Once ready, click on the button below to start the experiment. Your participation is greatly appreciated!
            </p>
        </div>

        <div class="consent-container">
            <div class="checkbox">
                <input type="checkbox" id="consentCheckbox" v-model="consentGiven" />
            </div>
            <div class="consent-checkbox">
                <label for="consentCheckbox">
                    By checking this checkbox, you acknowledge that you have read and understood the instructions and
                    willingly
                    consent to participate in the experiment.
                </label>
            </div>
        </div>


        <div class="start-button-container" v-if="consentGiven">
            <router-link to="/form" @click="startExperiment" class="start-button">Click here to start the
                experiment</router-link>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            consentGiven: false,
        };
    },
    methods: {
        startExperiment() {
            this.$store.dispatch('generateParticipantID');
            console.log('Participant ID:', this.$store.state.participantID);
        },
    }
};
</script>
  
<style scoped>
.consent-checkbox {
    margin-left: 10px;
}

.checkbox {
    margin-right: 10px;
}

img {
    padding: 0;
    margin: -20px;
    margin-bottom: -30px;
}

.start-button-container {
    height: 40px;
    margin-top: 30px;
}

.instructions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 15vw;
    padding-right: 15vw;
    font-size: 1.2em;
}

input[type="checkbox"] {
    margin-top: 10px;
}

label {
    display: block;
    margin-top: 10px;
}

.home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Fira Sans', sans-serif;
    color: #333;
    text-align: center;
    padding: 20px;
    padding-left: 100px;
    padding-right: 100px;
    font-size: 1.2em;
}

h1 {
    margin-top: 2em;
    font-size: 2em;
    margin-bottom: 20px;
}

.instruction {
    margin-bottom: 20px;
}

.consent-container {
    text-align: left;
    display: inline-flex;
    align-items: center;
    /* Optional: vertically align the items */

}

.start-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007BFF;
    color: #fff;
    font-weight: bold;
    font-size: 1.2em;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    align-content: center;
}

.start-button:hover {
    background-color: #0056b3;
}
</style>
  