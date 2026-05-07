import { useState } from "react";

import toast from "react-hot-toast";

import API from "../services/api";

import Loader from "../components/Loader";
import RecipeCard from "../components/RecipeCard";

export default function ExtractPage() {

  const [url, setUrl] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [recipe, setRecipe] =
    useState(null);

  const [error, setError] =
    useState("");

  const extractRecipe = async () => {

    if (!url.trim()) {

      toast.error(
        "Please enter a recipe URL"
      );

      return;
    }

    try {

      setLoading(true);

      setError("");

      setRecipe(null);

      toast.loading(
        "Extracting recipe..."
      );

      const response = await API.post(
        "/extract",
        {
          url,
        }
      );

      toast.dismiss();

      if (response.data.recipe) {

        setRecipe(response.data.recipe);

      } else {

        setRecipe(response.data);
      }

      toast.success(
        "Recipe extracted successfully"
      );

    } catch (err) {

      toast.dismiss();

      const message =
        err.response?.data?.detail ||
        "Something went wrong";

      setError(message);

      toast.error(message);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* HERO */}
      <div className="bg-white rounded-3xl shadow-lg p-8 border">

        <div className="max-w-3xl">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">

            AI Recipe Extractor &
            Meal Planner

          </h1>

          <p className="text-gray-500 mt-4 text-lg">

            Paste any recipe blog URL and
            instantly generate structured
            recipe data, nutrition insights,
            shopping lists, substitutions,
            and meal plans.

          </p>

        </div>

        {/* INPUT */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Paste recipe blog URL..."
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
            className="flex-1 border rounded-2xl px-5 py-4 outline-none text-lg focus:ring-2 focus:ring-black"
          />

          <button
            onClick={extractRecipe}
            disabled={loading}
            className="bg-black text-white px-8 py-4 rounded-2xl text-lg font-medium disabled:opacity-50"
          >
            {loading
              ? "Extracting..."
              : "Extract Recipe"}
          </button>

        </div>

        {/* ERROR */}
        {error && (

          <div className="mt-5 bg-red-50 border border-red-200 rounded-2xl p-4 text-red-600">

            {error}

          </div>
        )}
      </div>

      {/* LOADING */}
      {loading && (
        <Loader text="AI is analyzing the recipe..." />
      )}

      {/* EMPTY STATE */}
      {!loading && !recipe && (

        <div className="bg-white rounded-3xl shadow-md p-12 text-center">

          <h2 className="text-2xl font-bold">
            No Recipe Extracted Yet
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">

            Start by pasting a recipe blog
            URL above. The AI will extract
            ingredients, instructions,
            nutrition, shopping lists,
            substitutions, and related
            recipes automatically.

          </p>

        </div>
      )}

      {/* RECIPE */}
      {recipe && (
        <RecipeCard recipe={recipe} />
      )}
    </div>
  );
}