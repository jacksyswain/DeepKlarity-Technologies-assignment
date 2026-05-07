import { useEffect, useState } from "react";

import API from "../services/api";

import RecipeModal from "../components/RecipeModal";
import MealPlanner from "../components/MealPlanner";

export default function HistoryPage() {

  const [recipes, setRecipes] = useState([]);

  const [selectedRecipe, setSelectedRecipe] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchRecipes();

  }, []);

  const fetchRecipes = async () => {

    try {

      setLoading(true);

      const response = await API.get(
        "/recipes"
      );

      setRecipes(response.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* HEADER */}
      <div>

        <h1 className="text-3xl font-bold">
          Saved Recipes
        </h1>

        <p className="text-gray-500 mt-2">
          View previously extracted recipes
          and generate meal plans.
        </p>

      </div>

      {/* EMPTY STATE */}
      {!loading && recipes.length === 0 && (

        <div className="bg-white rounded-2xl shadow-md p-10 text-center">

          <h2 className="text-2xl font-bold">
            No Recipes Found
          </h2>

          <p className="text-gray-500 mt-3">
            Extract recipes from the Extract
            Recipe tab to see them here.
          </p>

        </div>
      )}

      {/* TABLE */}
      {recipes.length > 0 && (

        <div className="bg-white rounded-2xl shadow-md overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead className="bg-black text-white">

              <tr>

                <th className="p-4 text-left">
                  Title
                </th>

                <th className="p-4 text-left">
                  Cuisine
                </th>

                <th className="p-4 text-left">
                  Difficulty
                </th>

                <th className="p-4 text-left">
                  Date
                </th>

                <th className="p-4 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {recipes.map((recipe) => (

                <tr
                  key={recipe.id}
                  className="border-b hover:bg-gray-50 transition-all"
                >

                  <td className="p-4 font-medium">
                    {recipe.title}
                  </td>

                  <td className="p-4">
                    {recipe.cuisine}
                  </td>

                  <td className="p-4">

                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {recipe.difficulty}
                    </span>

                  </td>

                  <td className="p-4">
                    {new Date(
                      recipe.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        setSelectedRecipe(recipe)
                      }
                      className="bg-black text-white px-4 py-2 rounded-xl hover:opacity-90"
                    >
                      Details
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      )}

      {/* MEAL PLANNER */}
      {recipes.length > 0 && (
        <MealPlanner recipes={recipes} />
      )}

      {/* MODAL */}
      <RecipeModal
        recipe={selectedRecipe}
        onClose={() =>
          setSelectedRecipe(null)
        }
      />
    </div>
  );
}