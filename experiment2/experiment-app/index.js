const express = require('express');
const bodyParser = require('body-parser');
const csv = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like stylesheets)
app.use(express.static('public'));

// Set up the CSV writer
const csvWriter = csv({
  path: 'experiment_results.csv',
  header: [
    { id: 'participantId', title: 'Participant ID' },
    { id: 'taskNumber', title: 'Task Number' },
    { id: 'style', title: 'Style' },
    { id: 'sentence', title: 'Sentence' },
    { id: 'selectedIdentifier', title: 'Selected Identifier' },
    { id: 'isCorrect', title: 'Is Correct' },
    { id: 'timeTaken', title: 'Time Taken' },
  ],
});

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/instructions.html');
});

app.post('/experiment', (req, res) => {
    const participantId = req.body.participantId;
    const demographics = req.body; // Add more fields as needed
  
    // Process demographics data
  
    // Perform n tasks
    for (let taskNumber = 1; taskNumber <= n; taskNumber++) {
      const style = taskNumber % 2 === 0 ? 'camelCase' : 'kebab-case';
      const sentence = generateRandomSentence(); // Implement this function
      const identifiers = generateIdentifiers(sentence, style); // Implement this function
  
      // Render experiment.html with data
      res.render('experiment', {
        participantId,
        taskNumber,
        style,
        sentence,
        identifiers,
      });
    }
  });
  

app.get('/thank-you', (req, res) => {
  res.send('Thank you for participating!');
});





// Add these functions in your index.js file

// Generate a random sentence for each task
function generateRandomSentence() {
    const sentences = ['move south', 'jump high', 'run fast', 'think deep'];
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
  }
  
  // Generate identifiers for a given sentence and style
  function generateIdentifiers(sentence, style) {
    const words = sentence.split(' ');
    const selectedWord = words[Math.floor(Math.random() * words.length)];
  
    // Generate distractors by modifying the selected word
    const distractors = [];
    for (let i = 0; i < 3; i++) {
      const modifier = Math.random() > 0.5 ? 'more-' : 'less-';
      distractors.push(modifier + selectedWord);
    }
  
    // Include the correct identifier in the list
    const identifiers = [...distractors, style === 'camelCase' ? camelCase(selectedWord) : kebabCase(selectedWord)];
    shuffleArray(identifiers); // Shuffle the array for randomness
  
    return identifiers.map(identifier => ({ identifier }));
  }
  
  // Shuffle array elements
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Convert a string to camelCase
  function camelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }
  
  // Convert a string to kebab-case
  function kebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
  



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

