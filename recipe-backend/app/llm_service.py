import os
import json
import re

from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    google_api_key=GEMINI_API_KEY,
    temperature=0.2
)


def load_prompt():

    with open(
        "app/prompts/extraction.txt",
        "r",
        encoding="utf-8"
    ) as file:

        return file.read()


def extract_json(text):

    # remove markdown wrappers
    text = text.replace("```json", "")
    text = text.replace("```", "")

    # find first json object
    match = re.search(r"\{.*\}", text, re.DOTALL)

    if not match:
        raise ValueError(
            "No valid JSON found in LLM response"
        )

    return match.group(0)


def extract_recipe_data(content):

    prompt_template = load_prompt()

    final_prompt = prompt_template.replace(
        "{content}",
        content
    )

    response = llm.invoke(final_prompt)

    cleaned_json = extract_json(
        response.content
    )

    return json.loads(cleaned_json)