export function CategoryCard({ category, onFilterCategory, isSelected }) {
  const handleClick = () => {
    onFilterCategory(category);
  };
  return (
    <button
      className={`bg-gray-700 rounded-sm shadow-lg hover:bg-slate-500 ${
        isSelected ? "bg-orange-400" : ""
      }`}
      onClick={handleClick}
    >
      <h2 className="text-white text-xl font-bold text-center">{category}</h2>
    </button>
  );
}
