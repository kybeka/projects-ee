import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';



export default createStore({
  state: {
    participantID: null,
    demographicsAnswers: [], // Store demographics answers
  },
  mutations: {
    setParticipantID(state, id) {
      state.participantID = id;
    },
    saveDemographicsAnswers(state, answers) {
      state.demographicsAnswers.push(answers);
    },
  },
  actions: {
    
    generateParticipantID({ commit }) {
      const newID = uuidv4();
      localStorage.setItem('participantID', newID);
      commit('setParticipantID', newID);
      console.log('Generated Participant ID:', newID);
    },

    loadParticipantID({ commit }) {
      const storedID = localStorage.getItem('participantID');
      if (storedID) {
        commit('setParticipantID', storedID);
      }
    },
    // exportDataToJSON({ state }) {
    //   const jsonData = {
    //     participantID: state.participantID,
    //     // Include other state properties as needed
    //   };

    //   const jsonString = JSON.stringify(jsonData, null, 2);

    //   // Save the JSON string to a file
    //   const blob = new Blob([jsonString], { type: 'application/json' });
    //   const a = document.createElement('a');
    //   a.href = URL.createObjectURL(blob);
    //   a.download = 'exported_data.json';
    //   a.click();
    // },
  },
  getters: {
    participantID: state => state.participantID,
    demographicsAnswers: state => state.demographicsAnswers,
  },
});