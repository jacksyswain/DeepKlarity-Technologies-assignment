export default function Loader({
  text = "Loading...",
}) {

  return (
    <div className="flex flex-col items-center justify-center py-16">

      <div className="w-14 h-14 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-5 text-gray-500 font-medium">
        {text}
      </p>

    </div>
  );
}