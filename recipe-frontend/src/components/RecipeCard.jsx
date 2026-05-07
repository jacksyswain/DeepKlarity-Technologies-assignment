import NutritionPanel from "./NutritionPanel";
import ShoppingList from "./ShoppingList";
import RelatedRecipes from "./RelatedRecipes";

export default function RecipeCard({ recipe }) {

  return (
    <div className="space-y-6">

      {/* SUMMARY */}
      <div className="bg-white rounded-2xl shadow-md p-6">

        <h1 className="text-3xl font-bold">
          {recipe.title}
        </h1>

        <p className="text-gray-500 mt-2">
          {recipe.cuisine} • {recipe.difficulty}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

          <InfoCard
            label="Prep Time"
            value={recipe.prep_time}
          />

          <InfoCard
            label="Cook Time"
            value={recipe.cook_time}
          />

          <InfoCard
            label="Total Time"
            value={recipe.total_time}
          />

          <InfoCard
            label="Servings"
            value={recipe.servings}
          />
        </div>
      </div>

      {/* INGREDIENTS */}
      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-2xl font-bold mb-4">
          Ingredients
        </h2>

        <div className="grid gap-3">

          {recipe.ingredients?.map(
            (ingredient, index) => (

              <div
                key={index}
                className="bg-gray-100 rounded-xl p-3"
              >
                {ingredient.quantity}{" "}
                {ingredient.unit}{" "}
                {ingredient.item}
              </div>
            )
          )}
        </div>
      </div>

      {/* INSTRUCTIONS */}
      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-2xl font-bold mb-4">
          Instructions
        </h2>

        <div className="space-y-4">

          {recipe.instructions?.map(
            (step, index) => (

              <div
                key={index}
                className="flex gap-4"
              >

                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  {index + 1}
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {step}
                </p>

              </div>
            )
          )}
        </div>
      </div>

      {/* NUTRITION */}
      <NutritionPanel
        nutrition={recipe.nutrition}
      />

      {/* SUBSTITUTIONS */}
      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-2xl font-bold mb-4">
          Ingredient Substitutions
        </h2>

        <div className="space-y-3">

          {recipe.substitutions?.map(
            (sub, index) => (

              <div
                key={index}
                className="bg-yellow-50 border border-yellow-200 rounded-xl p-4"
              >
                {sub}
              </div>
            )
          )}
        </div>
      </div>

      {/* SHOPPING LIST */}
      <ShoppingList
        shopping={recipe.shopping_list}
      />

      {/* RELATED RECIPES */}
      <RelatedRecipes
        recipes={recipe.related_recipes}
      />

    </div>
  );
}


function InfoCard({ label, value }) {

  return (
    <div className="bg-gray-100 rounded-xl p-4">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <h2 className="font-bold mt-1">
        {value}
      </h2>

    </div>
  );
}