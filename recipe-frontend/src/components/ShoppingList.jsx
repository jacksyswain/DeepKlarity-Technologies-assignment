export default function ShoppingList({
  shopping,
}) {

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">
        Shopping List
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <CategoryCard
          title="Produce"
          items={shopping?.produce}
        />

        <CategoryCard
          title="Dairy"
          items={shopping?.dairy}
        />

        <CategoryCard
          title="Pantry"
          items={shopping?.pantry}
        />

      </div>
    </div>
  );
}


function CategoryCard({
  title,
  items,
}) {

  return (
    <div className="bg-gray-100 rounded-2xl p-4">

      <h3 className="font-bold text-lg mb-3">
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