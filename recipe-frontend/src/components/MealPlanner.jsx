import { useState } from "react";

import API from "../services/api";

export default function MealPlanner({
  recipes,
}) {

  const [selected, setSelected] =
    useState([]);

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const toggleRecipe = (id) => {

    if (selected.includes(id)) {

      setSelected(
        selected.filter((item) => item !== id)
      );

    } else {

      setSelected([...selected, id]);
    }
  };

  const generateMealPlan = async () => {

    try {

      setLoading(true);

      const response = await API.post(
        "/meal-planner",
        {
          recipe_ids: selected,
        }
      );

      setResult(response.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Meal Planner
      </h2>

      {/* RECIPE SELECTION */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {recipes.map((recipe) => (

          <div
            key={recipe.id}
            onClick={() =>
              toggleRecipe(recipe.id)
            }
            className={`border rounded-2xl p-4 cursor-pointer transition-all ${
              selected.includes(recipe.id)
                ? "bg-black text-white"
                : "bg-gray-50"
            }`}
          >

            <h3 className="font-bold">
              {recipe.title}
            </h3>

            <p className="text-sm mt-2 opacity-80">
              {recipe.cuisine}
            </p>

          </div>
        ))}

      </div>

      {/* BUTTON */}
      <div className="mt-6">

        <button
          onClick={generateMealPlan}
          disabled={selected.length === 0}
          className="bg-black text-white px-6 py-3 rounded-xl disabled:opacity-50"
        >
          {loading
            ? "Generating..."
            : "Generate Combined Shopping List"}
        </button>

      </div>

      {/* RESULT */}
      {result && (

        <div className="mt-8 space-y-6">

          <h3 className="text-2xl font-bold">
            Combined Shopping List
          </h3>

          <div className="grid md:grid-cols-3 gap-6">

            <CategoryCard
              title="Produce"
              items={
                result.combined_shopping_list
                  .produce
              }
            />

            <CategoryCard
              title="Dairy"
              items={
                result.combined_shopping_list
                  .dairy
              }
            />

            <CategoryCard
              title="Pantry"
              items={
                result.combined_shopping_list
                  .pantry
              }
            />

          </div>

        </div>
      )}
    </div>
  );
}


function CategoryCard({
  title,
  items,
}) {

  return (
    <div className="bg-gray-100 rounded-2xl p-4">

      <h3 className="font-bold text-lg mb-4">
        {title}
      </h3>

      <div className="space-y-2">

        {items?.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-lg px-3 py-2"
          >
            {item}
          </div>
        ))}

      </div>
    </div>
  );
}