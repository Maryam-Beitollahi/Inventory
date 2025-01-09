import { useCategories } from "../Context/CategoriesContext";

function Filters({
  categoryId,
  onChangeCategory,
  onSortChange,
  onSearchChange,
  searchTerm,
}) {
  const categories = useCategories();

  return (
    <div className="mb-6">
      <h2 className="text-slate-500 font-bold mb-5 border-b-slate-500 border-b">
        Filters
      </h2>
      <div className="flex items-center justify-between mb-6">
        <label htmlFor="search-input" className="text-slate-500 text-lg">
          search
        </label>
        <input
          type="text"
          name="search-input"
          id="search-input"
          className="bg-transparent rounded-xl border border-slate-500 text-slate-400"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <div className="flex items-center justify-between mb-6">
        <label htmlFor="sort-products" className="text-slate-500 text-lg">
          Sort by
        </label>
        <select
          name="sort-products"
          id="sort-products"
          className="bg-transparent text-slate-400 rounded-xl"
          onChange={onSortChange}
        >
          <option value="latest" className="bg-slate-500 text-slate-300">
            Latest
          </option>
          <option value="earliest" className="bg-slate-500 text-slate-300">
            Earliest
          </option>
        </select>
      </div>
      <div className="flex items-center justify-between mb-6">
        <label htmlFor="category-select" className="text-slate-500 text-lg">
          Category
        </label>
        <select
          name="categoryId"
          value={categoryId}
          onChange={onChangeCategory}
          id="category-select"
          className="bg-transparent text-slate-400 rounded-xl"
        >
          <option value="" className="bg-slate-500 text-slate-300">
            All
          </option>
          {categories.map((category, index) => (
            <option key={`${category.id}-${index}`} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filters;
