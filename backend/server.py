import os
from openai import OpenAI
import re
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

load_dotenv()
apikey = os.getenv('API_KEY')
app = Flask(__name__)
CORS(app)
openai = OpenAI(api_key=apikey)

MAX_VALIDATION_TRIES = 3  # Maximum attempts to validate the right answer

@app.route("/<genre>/<numberofquestions>")
def quiz(genre, numberofquestions):
    openai.api_key = apikey
    
    prompt = f"give me {numberofquestions} simple questions about \"{genre}\""
    response = openai.completions.create(
        model="text-davinci-003",
        prompt=prompt,
        max_tokens=80,
    )

    pattern = r'\d+[\.\)]\s+'
    original_list = response.choices[0].text.replace('\n', '').split("?")


    new_list = [re.sub(pattern, '', string) for string in original_list if string]

    qna = {}

    for question in new_list:
        right_answer = ''
        wrong_answers = []
        hint = ''
        wrong_answers_container = []

        # Fetch right answer and validate
        validation_tries = 0
        while validation_tries < MAX_VALIDATION_TRIES:
            res = openai.completions.create(
                model="text-davinci-003",
                prompt=f'{question}. Give only 1 answer, make it simple and short (not longer than 20 tokens), and do not describe the answer.',
                max_tokens=20,
            )
            right_answer = res.choices[0].text.replace('\n', '').replace('?', '')

            # Validate the right answer
            validate_res = openai.completions.create(
                model="text-davinci-003",
                prompt=f"Is '{right_answer}' a correct answer for '{question}'?",
                max_tokens=10,
            )
            if "Yes" in validate_res.choices[0].text:
                break  # Break the loop if the answer is validated as correct
            validation_tries += 1

        

         # Fetch wrong answers
        while len(wrong_answers) < 3:
            if not wrong_answers_container: 
                res = openai.completions.create(
                model="text-davinci-003",
                prompt=f'{question}. give me 1 wrong answer (not longer than 30 tokens) and cannot be the same as {right_answer}.',
                max_tokens=30,
                )
            else:
                res = openai.completions.create(
                model="text-davinci-003",
                prompt=f'{question}. give me 1 wrong answer (not longer than 30 tokens) and cannot be the same as {right_answer} and cannot be the same as the following in the list \"{wrong_answers_container}\".',
                max_tokens=30,
                )
            wrong_answer = res.choices[0].text.replace('\n', '').replace('?', '').strip()
            wrong_answers_container.append(wrong_answer)

            if wrong_answer != right_answer and wrong_answer not in wrong_answers and wrong_answer:
                wrong_answers.append(wrong_answer)

        # Fetch hint
        res = openai.completions.create(
            model="text-davinci-003",
            prompt=f'Generate a hint for {question}. Make it subtle and short to guide the quiz (not longer than 30 tokens), and it cannot be the same as this right answer: {right_answer}.',
            max_tokens=30,
        )
        hint = res.choices[0].text.replace('\n', '').replace('?', '')

        qna[question] = {"correct": right_answer, "incorrect": wrong_answers, "hint": hint}

    return qna

if __name__ == "__main__":
    app.run(debug=True)
