export default function RelatedRecipes({
  recipes,
}) {

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-4">
        Related Recipes
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        {recipes?.map((recipe, index) => (

          <div
            key={index}
            className="bg-purple-50 border border-purple-200 rounded-2xl p-5"
          >

            <h3 className="font-semibold">
              {recipe}
            </h3>

          </div>
        ))}

      </div>
    </div>
  );
}