export default function Navbar({
  tab,
  setTab,
}) {

  return (
    <div className="bg-white shadow-sm border-b">

      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h1 className="text-2xl font-bold">
            Recipe Extractor AI
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            AI-powered recipe extraction & meal planning
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() =>
              setTab("extract")
            }
            className={`px-5 py-2 rounded-xl font-medium ${
              tab === "extract"
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            Extract Recipe
          </button>

          <button
            onClick={() =>
              setTab("history")
            }
            className={`px-5 py-2 rounded-xl font-medium ${
              tab === "history"
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            Saved Recipes
          </button>

        </div>
      </div>
    </div>
  );
}