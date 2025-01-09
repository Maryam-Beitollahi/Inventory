import { useState } from "react";
import Filters from "./components/Filters";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import { CategoriesProvider } from "./Context/CategoriesContext";
import { ProductsProvider } from "./Context/ProductsContext";
import AddNewCategory from "./components/AddNewCategory";
import AddNewProduct from "./components/AddNewProduct";
import { DarkModeProvider } from "./Context/DarkModeContext";

function App() {
  const [categoryId, setCategoryId] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  const handleChangeCategory = (e) => {
    setCategoryId(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const deleteProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <DarkModeProvider>
      <CategoriesProvider>
        <ProductsProvider>
          <div id="root">
            <div className="bg-secondary-800 min-h-screen">
              <Header />
              <div className="container mx-auto p-4 md:flex-row flex-col flex md:justify-between lg:max-w-screen-xl md:gap-x-12">
                <section className="w-full">
                  <AddNewCategory />
                  <AddNewProduct />
                </section>
                <section className="w-full">
                  <Filters
                    onChangeCategory={handleChangeCategory}
                    categoryId={categoryId}
                    onSortChange={handleSortChange}
                    onSearchChange={handleSearchChange}
                  />
                  <ProductList
                    categoryId={categoryId}
                    sortType={sortType}
                    searchTerm={searchTerm}
                    deleteProduct={deleteProduct}
                    products={products}
                  />
                </section>
              </div>
            </div>
          </div>
        </ProductsProvider>
      </CategoriesProvider>
    </DarkModeProvider>
  );
}

export default App;
