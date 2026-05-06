from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import json
import requests

from ..schemas import (
    RecipeRequest,
    MealPlannerRequest
)

from ..scraper import scrape_recipe
from ..llm_service import extract_recipe_data
from ..database import get_db
from ..models import Recipe

router = APIRouter()


# =========================
# EXTRACT RECIPE
# =========================

@router.post("/extract")
def extract_recipe(
    payload: RecipeRequest,
    db: Session = Depends(get_db)
):

    try:

        # scrape webpage
        raw_content = scrape_recipe(
            payload.url
        )

        # process with Gemini
        recipe_data = extract_recipe_data(
            raw_content
        )

        # save into database
        recipe = Recipe(
            url=payload.url,
            title=recipe_data.get("title"),
            cuisine=recipe_data.get("cuisine"),
            difficulty=recipe_data.get("difficulty"),
            data=recipe_data
        )

        db.add(recipe)

        db.commit()

        db.refresh(recipe)

        return recipe_data

    except requests.exceptions.RequestException:

        raise HTTPException(
            status_code=400,
            detail="Invalid or inaccessible URL"
        )

    except json.JSONDecodeError:

        raise HTTPException(
            status_code=500,
            detail="LLM returned invalid JSON"
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# =========================
# GET ALL RECIPES
# =========================

@router.get("/recipes")
def get_recipes(
    db: Session = Depends(get_db)
):

    recipes = db.query(Recipe).order_by(
        Recipe.created_at.desc()
    ).all()

    return recipes


# =========================
# GET RECIPE BY ID
# =========================

@router.get("/recipes/{recipe_id}")
def get_recipe_by_id(
    recipe_id: int,
    db: Session = Depends(get_db)
):

    recipe = db.query(Recipe).filter(
        Recipe.id == recipe_id
    ).first()

    if not recipe:

        raise HTTPException(
            status_code=404,
            detail="Recipe not found"
        )

    return recipe


# =========================
# MEAL PLANNER
# =========================

@router.post("/meal-planner")
def meal_planner(
    payload: MealPlannerRequest,
    db: Session = Depends(get_db)
):

    recipes = db.query(Recipe).filter(
        Recipe.id.in_(payload.recipe_ids)
    ).all()

    merged = {
        "produce": [],
        "dairy": [],
        "pantry": []
    }

    for recipe in recipes:

        shopping = recipe.data.get(
            "shopping_list",
            {}
        )

        for category in merged:

            merged[category].extend(
                shopping.get(category, [])
            )

    # remove duplicates
    for category in merged:

        merged[category] = list(
            set(merged[category])
        )

    return {
        "selected_recipes": len(recipes),
        "combined_shopping_list": merged
    }