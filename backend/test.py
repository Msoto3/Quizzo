import os, openai
from dotenv import load_dotenv

load_dotenv()
apikey = os.getenv('apikey')

# Set your API key
openai.api_key = apikey

# Define a prompt for ChatGPT
prompt = "can you create some small science based questions?"

# Call the OpenAI API to generate a response
response = openai.Completion.create(
    engine="text-davinci-003",  # Choose an appropriate engine (check the latest options in OpenAI's documentation)
    prompt=prompt,
    max_tokens=60,  # You can adjust the response length
)

# Extract and print the generated response
print(response.choices[0].text.strip())