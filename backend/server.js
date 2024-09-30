const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config(); // Load environment variables

const app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../learning-game/build')));

// Route to handle GET requests to the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Learning App!');
});

app.post('/generate', async (req, res) => {
  const { subject } = req.body;

  try {
    // Call the Flask API
    const response = await axios.post('http://localhost:5001/generate', {
      subject: subject
    });

    // Use the response from Flask
    const { paragraph, question, answers, correctAnswerIndex } = response.data;

    res.json({
      paragraph,
      question,
      answers,
      correctAnswerIndex
    });
  } catch (error) {
    console.error('Error calling Flask API:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});


// All other GET requests should return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../learning-game/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
