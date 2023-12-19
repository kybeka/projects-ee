import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

export default createStore({
  state: {
    participantID: null,
    demographicsAnswers: [], // Store demographics answers
    score: 0,
    // Warm-up Questions
    warmUpQuestions: [
      {
        id: 'warmUpQuestion1',
        questionText: 'user name',
        options: ['user-name', 'user-nane', 'usor-name', 'user-nace'],
        correctAnswerIndex: 0,
      },
      {
        id: 'warmUpQuestion2',
        questionText: 'total cases',
        options: ['totalCases', 'totalCasas', 'totatCases', 'totalCaser'],
        correctAnswerIndex: 0,
      },
      {
        id: 'warmUpQuestion3',
        questionText: 'floor number',
        options: ['floorNumber', 'florNumber', 'floorNunber', 'floorNumder'],
        correctAnswerIndex: 0,
      },
      {
        id: 'warmUpQuestion4',
        questionText: 'points scored',
        options: ['points-scored', 'points-stored', 'poinst-scored', 'point-scored'],
        correctAnswerIndex: 0,
      },
      {
        id: 'warmUpQuestion5',
        questionText: 'dice number',
        options: ['diceNumber', 'diceNumder', 'diseNumber', 'diceNunber'],
        correctAnswerIndex: 0,
      },
    ],
    // Hardcoded Questions in the Backend
    questions: [
      {
        id: 'question1',
        questionText: 'jump left',
        options: ['jump-left', 'jump-lelt', 'junmp-left', 'junp-left'],
        correctAnswerIndex: 0,
      },
      {
        id: 'question2',
        questionText: 'jump left',
        options: ['jumpLeft', 'jumpLelt', 'jumnpLeft', 'junpLeft'],
        correctAnswerIndex: 0,
      },
      {
        id: 'question3',
        questionText: 'algorithm number',
        options: ['algorithm-number', 'algortithm-number', 'algorithm-nunber', 'algorithmn-number'],
        correctAnswerIndex: 0,
      },
      {
        id: 'question4',
        questionText: 'algorithm number',
        options: ['algorithmNumber', 'algortithmNumber', 'algorithmNunber', 'algorithmnNumber'],
        correctAnswerIndex: 0,
      },
      {
        id: 'question5',
        questionText: 'query index',
        options: ['query-index', 'query-inbex', 'quary-index', 'querry-index'],
        correctAnswerIndex: 0,
      },
      {
        id: 'question6',
        questionText: 'query index',
        options: ['queryIndex', 'queryInbex', 'quaryIndex', 'querryIndex'],
        correctAnswerIndex: 0,
      },
      {
        id: 'question7',
        questionText: 'word solved',
        options: ['word-solved', 'word-sloved', 'ward-solved', 'word-solvd'],
        correctAnswerIndex: 0,
      },
      {
        id: 'question8',
        questionText: 'word solved',
        options: ['wordSolved', 'wordSloved', 'wardSolved', 'wordSolvd'],
        correctAnswerIndex: 0,
      },
      {
        id: 'question9',
        questionText: 'cake size',
        options: ['cake-size', 'cake-side', 'cakes-size', 'cakes-side'],
        correctAnswerIndex: 0,
      },
      {
        id: 'question10',
        questionText: 'cake size',
        options: ['cakeSize', 'cakeSide', 'cakesSize', 'cakesSide'],
        correctAnswerIndex: 0,
      },
    ],

  },
  mutations: {
    setParticipantID(state, id) {
      state.participantID = id;
    },
    saveDemographicsAnswers(state, answers) {
      state.demographicsAnswers.push(answers);
    },
    // incrementScore(state) {
    //   state.score++;
    // }
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
    score: state => state.score,
  },
});