import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useProducts } from "../context/merchContext";
// import { merchContext } from "../context/merchContext";
import { IncomesResume } from "../components/IncomesResume";
import ProductGrid from "../components/incomes/ProductGrid";
import { CategoryCard } from "../components/incomes/CategoryCard";
import { Link } from "react-router-dom";

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const handleFilterCategory = (category) => {
    if (category === filterCategory) {
      setFilterCategory("");
    } else {
      setFilterCategory(category);
    }
  };
  return (
    <div>
      <header className="bg-orange-400 h-3 w-full fixed top-0 z-10"></header>{" "}
      <Navbar filterText={filterText} onFilterTextChange={setFilterText} />
      <hr className="my-3 h-0.5 border-t-0 bg-neutral-100 opacity-50 dark:opacity-50" />
      <VentasHeader />
      <ProductFilter
        products={products}
        filterText={filterText}
        onFilterCategory={handleFilterCategory}
        selectedCategory={filterCategory}
      />
      <ProductGrid
        products={products}
        filterText={filterText}
        filterCategory={filterCategory}
      />
    </div>
  );
}

export function VentasHeader() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h1 className="text-white text-8xl mr-4">VENTAS</h1>
        <div className="flex justify-between mr-40">
          <Link to="/">
            <button className="custom-button mr-4">PRODUCTOS</button>
          </Link>
          <Link to="/merch/incomes">
            <button className="custom-button mr-4">HISTORIAL</button>
          </Link>

          <button className="custom-button mr-4">PEDIR</button>
        </div>
        <div>
          <p className="text-white whitespace-normal max-w-[20rem] mt-3 ">
            Somos una marca llena de creatividad que le habla a los amantes de
            la música y el buen gusto!!!
          </p>
        </div>
      </div>

      <div>
        <IncomesResume />
      </div>
    </div>
  );
}

function ProductFilter({ products, filterText, onFilterCategory }) {
  const categories = products.reduce((categories, product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
    return categories;
  }, []);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFilterCategory = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }

    onFilterCategory(category);
  };
  return (
    <div className="grid grid-cols-3 gap-2 justify-center">
      {categories.map((category) => (
        <CategoryCard
          key={category}
          category={category}
          onFilterCategory={handleFilterCategory}
          isSelected={category === selectedCategory}
        />
      ))}
    </div>
  );
}

export function HomeVentas() {
  const { products, selectedProducts } = useProducts();
  return (
    <FilterableProductTable
      products={products}
      selectedProducts={selectedProducts}
    />
  );
}
