import Vuex from 'vuex';


export default new Vuex.Store({
  state: {
    participantID: null,
    
  },
  mutations: {
    setParticipantID(state, id) {
      state.participantID = id;
    },
  },
});
