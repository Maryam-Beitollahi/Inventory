import { useProducts, useProductsDispatch } from "../Context/ProductsContext";
import toLocalDateShort from "../utils/toLocalDateShort";

function ProductList({ categoryId, sortType, searchTerm }) {
  const products = useProducts();
  const dispatch = useProductsDispatch();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = categoryId
      ? product.categoryId === categoryId
      : true;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (sortType === "latest") {
      return dateB - dateA;
    }
    if (sortType === "earliest") {
      return dateA - dateB;
    }
    return 0;
  });

  if (sortedProducts.length === 0) {
    return <div className="text-slate-400">No products found!</div>;
  }

  return (
    <div>
      <h2 className="text-xl text-slate-400 font-bold mb-4 border-b-slate-500 border-b">
        ProductList
      </h2>
      {sortedProducts.map((product) => (
        <div className="flex justify-between items-center" key={product.id}>
          {product.title}
          <div>{toLocalDateShort(product.createdAt)}</div>
          <div className="text-white bg-gray-500 inline-block p-0.5 border-2 border-slate-500 rounded-full">
            {product.quantity}
          </div>
          <button
            onClick={() =>
              dispatch({ type: "delete", payload: { id: product.id } })
            }
            className="px-2 py-1 border-2 text-sm text-red-400 rounded-full hover:bg-red-100 hover:text-white border-red-400"
          >
            delete
          </button>
        </div>
      ))}
      <div className="overflow-x-auto"></div>
    </div>
  );
}

export default ProductList;
