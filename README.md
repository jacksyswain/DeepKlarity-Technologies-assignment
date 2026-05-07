# DeepKlarity-Technologies-assignment
#  Recipe Extractor AI & Meal Planner

AI-powered recipe extraction platform built with **FastAPI**, **React**, **PostgreSQL**, **BeautifulSoup**, and **LangChain + Gemini integration**.

The application extracts structured recipe data from recipe blog URLs, generates enhanced recipe insights, stores results in PostgreSQL, and provides a responsive frontend with recipe history and meal planning features.

---

#  Features

##  Recipe Extraction

- Extract recipe data from recipe blog URLs
- HTML scraping using BeautifulSoup
- Structured recipe parsing
- Dynamic extraction pipeline
- AI-ready architecture with Gemini + LangChain integration

---

## Recipe Data Generated

- Recipe title
- Cuisine type
- Prep time
- Cook time
- Total time
- Servings
- Difficulty level
- Structured ingredients
- Step-by-step instructions

---

## AI Enhancements

- Nutrition estimation
- Ingredient substitutions
- Shopping list generation
- Related recipe suggestions

---

## Saved Recipe History

- Stores recipe data in PostgreSQL
- Recipe history table
- Recipe detail modal
- Timestamp tracking

---

## Meal Planner

- Select multiple recipes
- Generate merged shopping list
- Category-wise grouped ingredients

---

## UI Features

- Responsive design
- Card-based layout
- Toast notifications
- Loading states
- Empty states
- Modal system
- Professional UI polish

---

#  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Tailwind CSS |
| Backend | FastAPI |
| Database | PostgreSQL |
| Scraping | BeautifulSoup |
| AI Integration | Gemini + LangChain |
| HTTP Client | Axios |
| ORM | SQLAlchemy |

---

#  Project Structure

```bash
recipe-extractor-ai/
│
├── recipe-backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── prompts/
│   │   ├── models.py
│   │   ├── database.py
│   │   ├── scraper.py
│   │   ├── llm_service.py
│   │   └── main.py
│   │
│   ├── sample_data/
│   ├── requirements.txt
│   └── README.md
│
├── recipe-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── README.md
 Frontend Setup
1 Install Dependencies
npm install
2 Start Frontend
npm run dev

Frontend runs on:

http://localhost:5173
 API Endpoints
POST /extract

Extract recipe from URL.

Request
{
  "url": "https://www.allrecipes.com/recipe/23891/grilled-cheese-sandwich/"
}
Response
{
  "title": "Grilled Cheese Sandwich",
  "ingredients": [],
  "instructions": [],
  "nutrition": {},
  "shopping_list": {}
}
GET /recipes

Get saved recipe history.

GET /recipes/{id}

Get recipe details by ID.

POST /meal-planner

Generate combined shopping list.

Request
{
  "recipe_ids": [1, 2, 3]
}
AI + LLM Architecture

The project uses:

LangChain
Gemini API
Prompt-based extraction pipeline

The application also includes a deterministic fallback extraction mechanism for reliability during:

quota exhaustion
network failures
API rate limits

This ensures uninterrupted functionality and stable demo behavior.

 sample_data

The sample_data/ folder contains:

Tested recipe URLs
Example extracted JSON responses
prompts/

Prompt templates used for:

Recipe extraction
Nutrition generation
Ingredient substitutions
Meal planning
📸 Screenshots
Extract Recipe Page

(Add screenshot)

Recipe History

(Add screenshot)

Details Modal

(Add screenshot)

Meal Planner

(Add screenshot)

 Deployment
Frontend

Deployed on Vercel:

https://your-frontend.vercel.app
Backend

Deployed on Render/Railway:

https://your-backend.onrender.com
 Screen Recording

Drive Link:

https://drive.google.com/your-recording-link
Assignment Requirements Covered
FastAPI backend
PostgreSQL integration
BeautifulSoup scraping
LangChain + Gemini integration
Structured JSON extraction
Recipe history
Details modal
Meal planner
Responsive UI
Error handling
Prompt templates
Database storage
Clean UI
Important Notes
No external recipe APIs used
Only HTML scraping via BeautifulSoup
Python backend only
Structured ingredient parsing implemented
Duplicate recipe prevention implemented
Author

Jyoti Prakash Swain

Frontend & Full Stack Developer

GitHub:
https://github.com/jacksyswain

LinkedIn:
https://www.linkedin.com/in/jyoti-prakash-swain-64154823a/