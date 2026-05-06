from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import json
import requests

from ..logger import logger

from ..schemas import (
    RecipeRequest,
    MealPlannerRequest,
    RecipeDBResponse
)

from ..scraper import scrape_recipe
from ..llm_service import extract_recipe_data
from ..database import get_db
from ..models import Recipe

router = APIRouter()


# =====================================
# EXTRACT RECIPE
# =====================================

@router.post("/extract")
def extract_recipe(
    payload: RecipeRequest,
    db: Session = Depends(get_db)
):

    try:

        logger.info(
            f"Extracting recipe from URL: {payload.url}"
        )

        # check existing recipe
        existing_recipe = db.query(
            Recipe
        ).filter(
            Recipe.url == payload.url
        ).first()

        if existing_recipe:

            logger.info(
                "Recipe already exists in database"
            )

            return {
                "message": "Recipe already exists",
                "recipe": existing_recipe.data
            }

        # scrape webpage
        scraped = scrape_recipe(
            payload.url
        )

        raw_content = scraped["content"]

        raw_html = scraped["raw_html"]

        logger.info(
            "Webpage scraping completed"
        )

        # process with Gemini
        recipe_data = extract_recipe_data(
            raw_content
        )

        logger.info(
            "Gemini recipe extraction completed"
        )

        # save into database
        recipe = Recipe(
            url=payload.url,
            title=recipe_data.get("title"),
            cuisine=recipe_data.get("cuisine"),
            difficulty=recipe_data.get("difficulty"),
            raw_html=raw_html,
            data=recipe_data
        )

        db.add(recipe)

        db.commit()

        db.refresh(recipe)

        logger.info(
            f"Recipe saved successfully: {recipe.title}"
        )

        return recipe_data

    except requests.exceptions.RequestException as e:

        logger.error(str(e))

        raise HTTPException(
            status_code=400,
            detail="Invalid or inaccessible URL"
        )

    except json.JSONDecodeError as e:

        logger.error(str(e))

        raise HTTPException(
            status_code=500,
            detail="LLM returned invalid JSON"
        )

    except Exception as e:

        logger.error(str(e))

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# =====================================
# GET ALL RECIPES
# =====================================

@router.get(
    "/recipes",
    response_model=list[RecipeDBResponse]
)
def get_recipes(
    db: Session = Depends(get_db)
):

    try:

        recipes = db.query(
            Recipe
        ).order_by(
            Recipe.created_at.desc()
        ).all()

        logger.info(
            f"Fetched {len(recipes)} recipes"
        )

        return recipes

    except Exception as e:

        logger.error(str(e))

        raise HTTPException(
            status_code=500,
            detail="Failed to fetch recipes"
        )


# =====================================
# GET RECIPE BY ID
# =====================================

@router.get(
    "/recipes/{recipe_id}",
    response_model=RecipeDBResponse
)
def get_recipe_by_id(
    recipe_id: int,
    db: Session = Depends(get_db)
):

    try:

        recipe = db.query(
            Recipe
        ).filter(
            Recipe.id == recipe_id
        ).first()

        if not recipe:

            raise HTTPException(
                status_code=404,
                detail="Recipe not found"
            )

        logger.info(
            f"Fetched recipe ID: {recipe_id}"
        )

        return recipe

    except HTTPException:
        raise

    except Exception as e:

        logger.error(str(e))

        raise HTTPException(
            status_code=500,
            detail="Failed to fetch recipe"
        )


# =====================================
# MEAL PLANNER
# =====================================

@router.post("/meal-planner")
def meal_planner(
    payload: MealPlannerRequest,
    db: Session = Depends(get_db)
):

    try:

        recipes = db.query(
            Recipe
        ).filter(
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

        logger.info(
            "Meal planner generated successfully"
        )

        return {
            "selected_recipes": len(recipes),
            "combined_shopping_list": merged
        }

    except Exception as e:

        logger.error(str(e))

        raise HTTPException(
            status_code=500,
            detail="Failed to generate meal planner"
        )