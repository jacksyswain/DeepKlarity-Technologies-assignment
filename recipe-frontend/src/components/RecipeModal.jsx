import RecipeCard from "./RecipeCard";

export default function RecipeModal({
  recipe,
  onClose,
}) {

  if (!recipe) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto p-6">

      <div className="max-w-5xl mx-auto">

        <div className="flex justify-end mb-4">

          <button
            onClick={onClose}
            className="bg-white px-4 py-2 rounded-xl"
          >
            Close
          </button>

        </div>

        <RecipeCard
          recipe={recipe.data || recipe}
        />

      </div>
    </div>
  );
}