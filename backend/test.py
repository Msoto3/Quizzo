from dotenv import load_dotenv
import openai, os

load_dotenv()


key = os.getenv("API_KEY")

# Set your API key
openai.api_key = key

# Define a prompt for ChatGPT
# prompt = "Translate the following English text to French: 'Hello, how are you?'"

# # Call the OpenAI API to generate a response
# response = openai.Completion.create(
#     engine="text-davinci-003",  # Choose an appropriate engine (check the latest options in OpenAI's documentation)
#     prompt=prompt,
#     max_tokens=60,  # You can adjust the response length
# )

# # Extract and print the generated response
# #print(response.choices[0].text.strip())
