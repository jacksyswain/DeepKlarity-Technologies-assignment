import google.generativeai as genai

genai.configure(
    api_key="PASTE_YOUR_NEW_API_KEY"
)

models = genai.list_models()

for model in models:
    print(model.name)