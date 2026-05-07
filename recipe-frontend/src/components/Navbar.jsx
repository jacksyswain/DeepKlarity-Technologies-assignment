export default function Navbar({ tab, setTab }) {
  return (
    <div className="bg-white shadow-md px-8 py-4 flex gap-4">
      <button
        onClick={() => setTab("extract")}
        className={`px-4 py-2 rounded-lg font-medium ${
          tab === "extract"
            ? "bg-black text-white"
            : "bg-gray-200"
        }`}
      >
        Extract Recipe
      </button>

      <button
        onClick={() => setTab("history")}
        className={`px-4 py-2 rounded-lg font-medium ${
          tab === "history"
            ? "bg-black text-white"
            : "bg-gray-200"
        }`}
      >
        Saved Recipes
      </button>
    </div>
  );
}