# Learning Game Application

This project is a full-stack application featuring a React frontend and a Node.js/Express backend, with a separate Flask API for content generation.

## Project Structure

- `frontend/`: React application
- `backend/`: Node.js/Express server
- `flask_api/`: Flask API for content generation

## Prerequisites

- Node.js and npm
- Python 3.x
- Flask

## Setup and Running

### Backend (Node.js/Express)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:5000`.

### Frontend (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

### Flask API

1. Navigate to the Flask API directory:
   ```bash
   cd flask_api
   ```

2. Set up a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```bash
   python app.py
   ```
   The Flask API will run on `http://localhost:5001`.

## Usage

1. Start all three components (Backend, Frontend, and Flask API).
2. Open a web browser and go to `http://localhost:3000`.
3. Use the application to generate learning content and play the game.

## API Endpoints

- `POST /generate`: Generates learning content based on a given subject.

## Contributing

[Include guidelines for contributing to your project]

## License

[Specify the license for your project]
