import { createContext, useContext, useReducer } from "react";

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
  const [categories, dispatch] = useReducer(categoriesReducer, []);
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
