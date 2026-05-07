import { useState } from "react";

import API from "../services/api";

import Loader from "../components/Loader";
import RecipeCard from "../components/RecipeCard";

export default function ExtractPage() {

  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [recipe, setRecipe] = useState(null);

  const [error, setError] = useState("");

  const extractRecipe = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await API.post(
        "/extract",
        {
          url,
        }
      );

      if (response.data.recipe) {
        setRecipe(response.data.recipe);
      } else {
        setRecipe(response.data);
      }

    } catch (err) {

      setError(
        err.response?.data?.detail ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h1 className="text-3xl font-bold mb-4">
          Recipe Extractor
        </h1>

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Paste recipe blog URL..."
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
            className="flex-1 border rounded-xl px-4 py-3 outline-none"
          />

          <button
            onClick={extractRecipe}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Extract
          </button>
        </div>

        {error && (
          <p className="text-red-500 mt-4">
            {error}
          </p>
        )}
      </div>

      {loading && <Loader />}

      {recipe && (
        <RecipeCard recipe={recipe} />
      )}
    </div>
  );
}