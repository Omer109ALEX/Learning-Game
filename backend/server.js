const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../learning-game/build')));

// Route to handle GET requests to the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Learning App!');
});

// API endpoint for generating content
app.post('/generate', async (req, res) => {
  const { subject } = req.body;

  // Use the Groq API to generate content (mockup API call)
  // Replace this with actual API call and handling
  const generatedParagraph = `This is a short paragraph about ${subject}. [Generated content goes here.]`;

  const question = `What is a key concept in ${subject}?`;
  const answers = [
    'Answer 1',
    'Answer 2', // Correct answer
    'Answer 3',
    'Answer 4'
  ];

  // Mocking a selection of the correct answer (index 1 in this case)
  res.json({
    paragraph: generatedParagraph,
    question,
    answers,
    correctAnswerIndex: 1
  });
});

// All other GET requests should return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../learning-game/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
