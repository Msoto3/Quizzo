import os, openai, re
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

# setup
load_dotenv()
apikey = os.getenv('API_KEY')
app = Flask(__name__)
CORS(app)


# Set your API key
@app.route("/<genre>")
def quiz(genre):
    
    openai.api_key = apikey
    
    # Define a prompt for ChatGPT
    prompt = f"give me 4 simple questions about {genre}, it has to be 4 questions"
    # Call the OpenAI API to generate a response
    response = openai.Completion.create(
        model="text-davinci-003",  # Choose an appropriate engine (check the latest options in OpenAI's documentation)
        prompt=prompt,
        max_tokens=80,  # You can adjust the response length
    )

    # Extract and print the generated response
    pattern = r'\d+[\.\)]\s+'
    original_list = response.choices[0].text.replace('\n','').split('?')
   

    new_list = [re.sub(pattern, '', string) for string in original_list if string]



    # generate answers from questions asked and group with the questions asked 
    qna = {}

    for question in new_list:
        # gets the right answer
        res = openai.Completion.create(
            model="text-davinci-003",  # Choose an appropriate engine (check the latest options in OpenAI's documentation)
            prompt=f'{question}. Give only 1 answer, make it simple meaning make it short and do not make it longer than 20 tokens, and do not describe the answer.',
            max_tokens=20,  # You can adjust the response length
        )
        right_answer = res.choices[0].text.replace('\n','').replace('?','')

        #gets the wrong answers
        res = openai.Completion.create(
            model="text-davinci-003",  # Choose an appropriate engine (check the latest options in OpenAI's documentation)
            prompt=f'{question}. give 3 wrong answers only, also please seperate them by a comma, do not specify that they are wrong answer, do not number them, do not make them longer than 30 tokens and they cannot be the same as {right_answer}.',
            max_tokens=30,  # You can adjust the response length
        )
        wrong_answers = res.choices[0].text.replace('\n','').replace('?','').split(",")
        wrong_answers = [x.strip() for x in wrong_answers if x]

        res = openai.Completion.create(
            model="text-davinci-003",  # Choose an appropriate engine (check the latest options in OpenAI's documentation)
            prompt=f'Based off this question: {question}, give 1 answer, make it simple, do not describe the answer and it cannot be the same as these wrong asnwers: {wrong_answers}',
            max_tokens=20,  # You can adjust the response length
        )
        right_answer = res.choices[0].text.replace('\n','').replace('?','')



        res = openai.Completion.create(
            model="text-davinci-003",  # Choose an appropriate engine (check the latest options in OpenAI's documentation)
            prompt=f'Generate a hint for {question}. Make it subtle and short to quide the quiz and keep it no longer than 30 tokens, and  cannot be the same as this right answer: {right_answer}.',
            max_tokens=30,  # You can adjust the response length
        )
        hint = res.choices[0].text.replace('\n','').replace('?','')
        qna[question]={"correct":right_answer,"incorrect":wrong_answers,"hint" : hint}
     
    return(qna)

if __name__== "__main__":
    app.run(debug=True)