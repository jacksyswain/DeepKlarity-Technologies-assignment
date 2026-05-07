import { useEffect, useState } from "react";

import API from "../services/api";

export default function HistoryPage() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {

    fetchRecipes();

  }, []);

  const fetchRecipes = async () => {

    try {

      const response = await API.get(
        "/recipes"
      );

      setRecipes(response.data);

    } catch (err) {

      console.log(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        <table className="w-full">

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
            </tr>

          </thead>

          <tbody>

            {recipes.map((recipe) => (

              <tr
                key={recipe.id}
                className="border-b"
              >

                <td className="p-4">
                  {recipe.title}
                </td>

                <td className="p-4">
                  {recipe.cuisine}
                </td>

                <td className="p-4">
                  {recipe.difficulty}
                </td>

                <td className="p-4">
                  {new Date(
                    recipe.created_at
                  ).toLocaleDateString()}
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}