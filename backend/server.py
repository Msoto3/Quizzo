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
@app.route("/quizpage")
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

    print(new_list)

    # generate answers from questions asked and group with the questions asked 
    qna = {}

    for question in new_list:
        res = openai.Completion.create(
            engine="text-davinci-003",  # Choose an appropriate engine (check the latest options in OpenAI's documentation)
            prompt=f'{question}. Answer in 10 words or less',
            max_tokens=20,  # You can adjust the response length
        )
        original_answer = res.choices[0].text.replace('\n','').replace('?','')
        
        qna[question]=original_answer
    return qna



if __name__== "__main__":
    app.run(debug=True)