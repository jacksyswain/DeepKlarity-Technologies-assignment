from pydantic import BaseModel
from typing import List, Dict, Optional


class RecipeRequest(BaseModel):
    url: str


class MealPlannerRequest(BaseModel):
    recipe_ids: List[int]


class Ingredient(BaseModel):
    quantity: Optional[str] = ""
    unit: Optional[str] = ""
    item: str


class Nutrition(BaseModel):
    calories: Optional[str] = ""
    protein: Optional[str] = ""
    carbs: Optional[str] = ""
    fat: Optional[str] = ""


class ShoppingList(BaseModel):
    produce: List[str] = []
    dairy: List[str] = []
    pantry: List[str] = []


class RecipeResponse(BaseModel):
    title: str
    cuisine: str
    prep_time: str
    cook_time: str
    total_time: str
    servings: str
    difficulty: str

    ingredients: List[Ingredient]

    instructions: List[str]

    nutrition: Nutrition

    substitutions: List[str]

    shopping_list: ShoppingList

    related_recipes: List[str]