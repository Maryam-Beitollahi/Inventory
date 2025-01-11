import { createContext, useContext, useEffect, useReducer } from "react";

const CategoriesContext = createContext(null);
const CategoriesDispatchContext = createContext(null);

function categoriesReducer(categories, action) {
  switch (action.type) {
    case "add": {
      return [...categories, action.payload];
    }
    default:
      throw new Error("unknown action" + action.type);
  }
}

export function CategoriesProvider({ children }) {
  const initialCategories =
    JSON.parse(localStorage.getItem("categories")) || [];
  const [categories, dispatch] = useReducer(
    categoriesReducer,
    initialCategories
  );
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(categories));
  }, [categories]);
  return (
    <CategoriesContext.Provider value={categories}>
      <CategoriesDispatchContext.Provider value={dispatch}>
        {children}
      </CategoriesDispatchContext.Provider>
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoriesContext);
}

export function useCategoriesDispatch() {
  return useContext(CategoriesDispatchContext);
}
