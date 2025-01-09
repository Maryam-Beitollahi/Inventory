import { useState } from "react";
import { useCategories } from "../Context/CategoriesContext";
import { useProductsDispatch } from "../Context/ProductsContext";

function AddNewProduct() {
  const categories = useCategories();
  const dispatch = useProductsDispatch();

  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [categoryId, setCategoryId] = useState("");

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!title) {
      alert("Please enter the title.");
      return;
    }
    if (!categoryId) {
      alert("Please select a category.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      title,
      quantity,
      categoryId,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: "add", payload: newProduct });

    setTitle("");
    setQuantity(0);
    setCategoryId("");
  };

  return (
    <div className="mb-10">
      <h2 className="text-xl text-slate-300 font-bold mb-2">Add new product</h2>
      <form
        onSubmit={handleAddProduct}
        className="bg-slate-700 p-4 rounded-xl flex flex-col gap-y-4"
      >
        <div>
          <label htmlFor="product-title" className="block mb-1 text-slate-400">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="product-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto"
          />
        </div>
        <div>
          <label
            htmlFor="product-quantity"
            className="block mb-1 text-slate-400"
          >
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="product-quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto"
          />
        </div>
        <div>
          <label
            htmlFor="product-category"
            className="block mb-1 text-slate-400"
          >
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            name="categoryId"
            id="product-category"
            className="bg-transparent text-slate-400 rounded-xl w-full"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <button
            type="submit"
            id="add-new-product"
            className="flex-1 bg-slate-500 text-slate-200 rounded-xl py-2"
          >
            Add new product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewProduct;
