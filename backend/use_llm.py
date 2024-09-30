import os
import json
from typing import Dict, List
from groq import Groq
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Fetch the API key from environment variables
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

DEFAULT_MODEL = "llama3-8b-8192"

# Initialize Groq client with the API key
client = Groq(api_key=GROQ_API_KEY)

def chat_completion(
        messages: List[Dict],  # A list of messages in the conversation
        model: str = DEFAULT_MODEL,  # The language model to use
        temperature: float = 0.2,  # Controls randomness of responses
        max_tokens: int = 8192,  # Max number of tokens in the response
        top_p: float = 0.9,  # Nucleus sampling for token selection
        stream: bool = False,  # Stream responses in real-time
        stop: List[str] = None,  # Stop sequences to end the response
        seed: int = None,  # Seed for reproducibility
        response_format: Dict[str, str] = None  # Format of the response, for example: {"type": "json_object"}
) -> str:
    try:
        response = client.chat.completions.create(
            messages=messages,
            model=model,
            temperature=temperature,
            max_tokens=max_tokens,
            top_p=top_p,
            stream=stream,
            stop=stop,
            seed=seed,
            response_format=response_format
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"An error occurred during chat completion: {e}")
        return json.dumps({"error": "An error occurred during chat completion."})

def create_sub_subjects(subject: str, num: int = 10) -> List[str]:
    """
    Generate sub-subjects based on the given subject and number.

    :param subject: The main subject to split.
    :param num: The number of sub-subjects to generate.
    :return: A list of sub-subjects.
    """
    # Formulate the prompt for the LLM
    prompt = f'Please split the subject: "{subject}" into {num} sub-topics or sub-subjects. the sub-subjects should be as short as possible and will help the user learn the  main subject. please keep the original language of the subject in your response'
    response_format = '{"subject":["sub1","sub2",..."subnum"]}, #make sure not to change the subject at all. it need to be same string as "{subject}"'

    # Create the message payload for the LLM
    messages = [
        {"role": "system", "content": "You are a helpful assistant. Answer with JSON"},
        {"role": "user", "content": prompt},
        {"role": "system", "content": f"Response only the titles of the sub subjects, in this format: {response_format}"},
    ]

    # Get the completion from the LLM
    response = chat_completion(messages, response_format={"type": "json_object"})
    return json.loads(response)



def generate_content(subject, main_subject):
    # Formulate the prompt for the LLM
    prompt = f"""
    Please provide the following for the subject: '{subject}' in context of the main subject: '{main_subject}':
    
    1. Explanation: A detailed and comprehensive paragraph that explains the subject thoroughly. This should help the user understand and learn about the subject in depth.
    
    2. Question: A question that tests the user's understanding of the explanation provided.
    
    3. Answers: A list of four possible answers to the question, with only one correct answer and three incorrect answers.
    
    4. Correct Answer Index: The index (0-3) of the correct answer in the list of answers.
    
    Please keep the original language of the subject in your response
    """
    response_format = '{"explanation": "..." , "question": "...", "answers" : ["ans1","ans2","ans3","ans4"],"correct_answer_index": 0-3}'

    # Create the message payload for the LLM
    messages = [
        {"role": "system", "content": "You are a helpful assistant. Answer with JSON"},
        {"role": "user", "content": prompt},
        {"role": "system",
         "content": f"Response only in this format: {response_format} do not add any \\n char"},
    ]

    # Get the completion from the LLM
    response = chat_completion(messages, response_format={"type": "json_object"})
    return json.loads(response)


