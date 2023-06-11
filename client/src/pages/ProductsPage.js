import { Link } from "react-router-dom";
import { useProducts } from "../context/merchContext";
import { GiGuitarHead } from "react-icons/gi";
import { ProductsCard } from "../components/ProductsCard";
import { ProductsList } from "../components/ProductsList";
import Navbar from "../components/Navbar.js";

export function ProductsPage() {
  const { products } = useProducts();

  if (products.length === 0) {
    return (
      <div>
        <Navbar />

        <hr className="my-3 h-0.5 border-t-0 bg-neutral-100 opacity-50 dark:opacity-50" />

        <div className="flex flex-col items-center justify-center text-white">
          <GiGuitarHead className="h-48 w-48" />
          <h1>No hay productos...</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col text-white">
      <Navbar />
      <hr className="my-3 h-0.5 border-t-0 bg-neutral-100 opacity-50 dark:opacity-50" />
      <div className="flex justify-end">
        <Link to="/merch/newproduct">
          <button className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            Crear nuevo producto
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {products.map((product) => (
          //Imprime los productos en pantalla
          <ProductsCard product={product} key={product._id} />
        ))}
      </div>
      <div>
        <ProductsList products={products} />
      </div>
    </div>
  );
}
