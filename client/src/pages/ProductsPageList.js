//import {Link } from 'react-router-dom' 
import { useProducts } from "../context/merchContext";
import { GiGuitarHead } from "react-icons/gi";
import { ProductsList } from "../components/ProductsList";

export function ProductsPageList() {
  const { products } = useProducts();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-white">
        <GiGuitarHead className="h-48 w-48" />
        <h1>No hay productos...</h1>
      </div>
    );
  }

  return (
    <ProductsList products={products} />
  )
}
