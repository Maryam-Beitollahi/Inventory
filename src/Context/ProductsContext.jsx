import { createContext, useContext, useReducer } from "react";

const ProductsContext = createContext();
const ProductsDispatchContext = createContext();

function productsReducer(products, action) {
  switch (action.type) {
    case "add": {
      return [...products, action.payload];
    }
    case "delete": {
      return products.filter((product) => product.id !== action.payload.id);
    }
    default:
      throw new Error("Unknown action: " + action.type);
  }
}


export function ProductsProvider({ children }) {
  const [products, dispatch] = useReducer(productsReducer, []);
  return (
    <ProductsContext.Provider value={products}>
      <ProductsDispatchContext.Provider value={dispatch}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}

export function useProductsDispatch() {
  return useContext(ProductsDispatchContext);
}
