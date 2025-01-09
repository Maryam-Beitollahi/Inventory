import { useState, useEffect } from "react";
import { useCategoriesDispatch } from "../Context/CategoriesContext";

function AddNewCategory() {
  const [open, setOpen] = useState(false);
  const [title, setTtile] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useCategoriesDispatch();

  const saveCategories = (categories) => {
    localStorage.setItem("categories", JSON.stringify(categories));
  };

  const loadCategories = () => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      return JSON.parse(savedCategories);
    }
    return [];
  };
  useEffect(() => {
    const initialCategories = loadCategories();
    initialCategories.forEach((category) => {
      dispatch({ type: "add", payload: category });
    });
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) return null;

    const newCategory = {
      title,
      description,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: "add", payload: newCategory });

    const currentCategories = loadCategories();
    currentCategories.push(newCategory);
    saveCategories(currentCategories);


    setTtile("");
    setDescription("");
  };

  return (
    <section>
      {open ? (
        <div className="mb-8" id="category-wrapper">
          <h2 className="text-xl text-slate-300 font-bold mb-2">
            Add new category
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-slate-700 p-4 rounded-xl flex flex-col gap-y-4"
          >
            <div>
              <label
                htmlFor="category-title"
                className="block mb-1 text-slate-400"
              >
                title
              </label>
              <input
                value={title}
                onChange={(e) => setTtile(e.target.value)}
                type="text"
                id="category-title"
                className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto"
              />
            </div>
            <div>
              <label
                htmlFor="category-description"
                className="block mb-1 text-slate-400"
              >
                description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                name="description"
                id="category-description"
                className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full"
              />
            </div>
            <div className="flex items-center justify-between gap-x-4">
              <button
                className="flex-1 border border-slate-400 text-slate-400 rounded-xl py-2"
                id="cancel-add-category"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-slate-500 text-slate-200 rounded-xl py-2"
                id="add-new-category"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={handleOpen}
          id="toggle-add-category"
          className="text-slate-600 text-lg mb-4 font-medium false"
        >
          Add new category?
        </button>
      )}
    </section>
  );
}

export default AddNewCategory;
