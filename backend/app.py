from flask import Flask, request, jsonify
import use_llm
from flask_cors import CORS
import json
import os

# Initialize Flask application
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

PORT = os.environ.get('PORT', '5000')  # Defaults to '5000' if 'PORT' is not set

@app.route('/')
def index():
    return f'Server is running on port {PORT}'


@app.route('/initialize_subject', methods=['POST', 'OPTIONS'])
def initialize_subject():
    if request.method == 'OPTIONS':
        # Handling OPTIONS request for CORS preflight
        return '', 204
    
    data = request.json
    subject = data.get('subject')

    
    if not subject:
        return jsonify({'error': 'Subject is required'}), 400

    # Create sub-subjects
    sub_subjects_dict = use_llm.create_sub_subjects(subject)
    
    # Extract the list of sub-subjects
    sub_subjects = sub_subjects_dict[subject]
    # Generate content for each sub-subject
    content = []
    for sub_subject in sub_subjects:
        responses = use_llm.generate_content(sub_subject, subject)

        # Validate the generated content
        validation_response = validate_content(responses)
        if validation_response['status'] == 'error':
            print(f"Validation error for {sub_subject}:")
            print(json.dumps(validation_response, indent=2))
            return jsonify(validation_response), 400

        content.append({
            'subSubject': sub_subject,
            'paragraph': responses["explanation"],
            'question': responses["question"],
            'answers': responses["answers"],
            'correctAnswerIndex': responses["correct_answer_index"]
        })
    
        
    return jsonify({
        'subject': subject,
        'subSubjects': sub_subjects,
        'content': content
    })

def validate_content(data):
    try:
        # Assuming the expected format is a dictionary with specific keys
        if not isinstance(data, dict) or 'explanation' not in data or 'question' not in data or 'answers' not in data or 'correct_answer_index' not in data:
            raise ValueError("Invalid response format")

        # Process the data (example)
        explanation = data['explanation']
        question = data['question']
        answers = data['answers']
        correct_answer_index = data['correct_answer_index']

        # Return a success response
        return {
            'status': 'success',
            'data': {
                'explanation': explanation,
                'question': question,
                'answers': answers,
                'correct_answer_index': correct_answer_index
            }
        }

    except (ValueError, KeyError, TypeError) as e:
        # Return an error response if the format is invalid
        return {
            'status': 'error',
            'message': str(e)
        }

"""    
# Run the Flask application
if __name__ == '__main__':
    app.run(port=5001, debug=True)
"""