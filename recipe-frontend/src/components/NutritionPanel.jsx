export default function NutritionPanel({
  nutrition,
}) {

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-4">
        Nutrition
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <NutritionCard
          label="Calories"
          value={nutrition?.calories}
        />

        <NutritionCard
          label="Protein"
          value={nutrition?.protein}
        />

        <NutritionCard
          label="Carbs"
          value={nutrition?.carbs}
        />

        <NutritionCard
          label="Fat"
          value={nutrition?.fat}
        />

      </div>
    </div>
  );
}


function NutritionCard({
  label,
  value,
}) {

  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-4">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <h2 className="text-xl font-bold mt-1">
        {value}
      </h2>

    </div>
  );
}