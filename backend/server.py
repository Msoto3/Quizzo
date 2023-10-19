import os, openai, re
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
import string

# setup
load_dotenv()
apikey = os.getenv('API_KEY')
app = Flask(__name__)
CORS(app)

# Set your API key
@app.route("/science")
def quiz():
    openai.api_key = apikey

    # Define a prompt for ChatGPT
    prompt = "give me 4 simple questions about science"
    # Call the OpenAI API to generate a response
    response = openai.Completion.create(
        engine="text-davinci-003",  # Choose an appropriate engine (check the latest options in OpenAI's documentation)
        prompt=prompt,
        max_tokens=60,  # You can adjust the response length
    )

    # Extract and print the generated response
    pattern = r'\d+[\.\)]\s+'
    original_list = response.choices[0].text.replace('\n','').split('?')

    new_list = [re.sub(pattern, '', string) for string in original_list]
    new_list = new_list[0:-1]


    # generate answers from questions asked and group with the questions asked 
    qna = {}

    for question in new_list:
        # gets the right answer
        res = openai.Completion.create(
            engine="text-davinci-003",  # Choose an appropriate engine (check the latest options in OpenAI's documentation)
            prompt=f'{question}. Give only 1 answer',
            max_tokens=20,  # You can adjust the response length
        )
        right_answer = res.choices[0].text.replace('\n','').replace('?','')

        #gets the wrong answers
        res = openai.Completion.create(
            engine="text-davinci-003",  # Choose an appropriate engine (check the latest options in OpenAI's documentation)
            prompt=f'{question}. give 2 wrong answers only, also please seperate them by a comma, do not specify that they are wrong answer, and do not number them',
            max_tokens=20,  # You can adjust the response length
        )
        wrong_answers = res.choices[0].text.replace('\n','').replace('?','').split(",")
        wrong_answers = [x.strip() for x in wrong_answers if x]
          
        qna[question]={"correct":right_answer,"incorrect":wrong_answers}
    print(qna)
    return(qna)



if __name__== "__main__":
    app.run(debug=True)