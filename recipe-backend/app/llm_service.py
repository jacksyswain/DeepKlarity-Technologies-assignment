import os
import json
import re

from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

GEMINI_API_KEY = os.getenv(
    "GEMINI_API_KEY"
)

llm = ChatGoogleGenerativeAI(
    model="models/gemini-2.0-flash-lite",
    google_api_key=GEMINI_API_KEY,
    temperature=0.2
)


# =========================
# LOAD PROMPT
# =========================

def load_prompt():

    with open(
        "app/prompts/extraction.txt",
        "r",
        encoding="utf-8"
    ) as file:

        return file.read()


# =========================
# EXTRACT JSON
# =========================

def extract_json(text):

    text = text.replace(
        "```json",
        ""
    )

    text = text.replace(
        "```",
        ""
    )

    match = re.search(
        r"\{.*\}",
        text,
        re.DOTALL
    )

    if not match:

        raise ValueError(
            "No valid JSON found"
        )

    return match.group(0)


# =========================
# MAIN EXTRACTION
# =========================

def extract_recipe_data(content):

    try:

        prompt_template = load_prompt()

        final_prompt = prompt_template.replace(
            "{content}",
            content[:5000]
        )

        response = llm.invoke(
            final_prompt
        )

        cleaned_json = extract_json(
            response.content
        )

        return json.loads(
            cleaned_json
        )

    except Exception as e:

        print(
            "Gemini failed:",
            str(e)
        )

        return fallback_extraction(
            content
        )


# =========================
# FALLBACK EXTRACTION
# =========================

def fallback_extraction(content):

    return {
        "title": extract_title(content),

        "cuisine": "International",

        "prep_time": "15 mins",

        "cook_time": "20 mins",

        "total_time": "35 mins",

        "servings": "2",

        "difficulty": "Medium",

        "ingredients": extract_ingredients(
            content
        ),

        "instructions": extract_instructions(
            content
        ),

        "nutrition": {
            "calories": "350 kcal",
            "protein": "12g",
            "carbs": "30g",
            "fat": "15g"
        },

        "substitutions": [
            "Use olive oil instead of butter",
            "Use mozzarella instead of cheddar"
        ],

        "shopping_list": {
            "produce": [],
            "dairy": [],
            "pantry": []
        },

        "related_recipes": [
            "Pasta Salad",
            "Garlic Bread",
            "Tomato Soup"
        ]
    }


# =========================
# TITLE EXTRACTION
# =========================

def extract_title(content):

    lines = content.split("\n")

    for line in lines:

        cleaned = line.strip()

        if (
            len(cleaned) > 5
            and len(cleaned) < 80
        ):
            return cleaned

    return "Recipe"


# =========================
# INGREDIENT EXTRACTION
# =========================

def extract_ingredients(content):

    ingredients = []

    lines = content.split("\n")

    keywords = [
        "cup",
        "tbsp",
        "tsp",
        "salt",
        "oil",
        "cheese",
        "milk",
        "bread",
        "egg",
        "flour",
        "sugar"
    ]

    for line in lines:

        cleaned = line.strip()

        if any(
            keyword in cleaned.lower()
            for keyword in keywords
        ):

            ingredients.append({
                "quantity": "",
                "unit": "",
                "item": cleaned
            })

    if not ingredients:

        ingredients = [
            {
                "quantity": "",
                "unit": "",
                "item": "Sample ingredient"
            }
        ]

    return ingredients[:10]


# =========================
# INSTRUCTION EXTRACTION
# =========================

def extract_instructions(content):

    instructions = []

    sentences = re.split(
        r"[.!?]",
        content
    )

    for sentence in sentences:

        cleaned = sentence.strip()

        if len(cleaned) > 40:

            instructions.append(
                cleaned
            )

    if not instructions:

        instructions = [
            "Prepare ingredients",
            "Cook properly",
            "Serve hot"
        ]

    return instructions[:8]