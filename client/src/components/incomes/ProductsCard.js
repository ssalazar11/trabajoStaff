import React, { useContext } from "react";
import { merchContext } from "../../context/merchContext";

function ProductCard({ product }) {
  const { addProductToSidebar } = useContext(merchContext);
  const handleAddToSidebar = () => {
    addProductToSidebar(product);
  };
  return (
    <div className="shadows-black rounded-sm bg-zinc-800 text-white shadow-md hover:cursor-pointer hover:bg-zinc-700  flex flex-col">
      <div className=" px-4 py-3">
        <div className="flex justify-between" onClick={handleAddToSidebar}>
          <div>
            <div className="text-center">{product.name}</div>
            <div className="flex justify-center items-center flex-grow">
              {product.image && (
                <div className="w-full">
                  <img src={product.image.url} alt={product.name} />
                </div>
              )}
            </div>
            <h4 className="text-center">{product.category}</h4>
            <h4 className="text-center">
              ${" "}
              {Number(product.sellingPrice)
                .toLocaleString("es-ES", { maximumFractionDigits: 0 })
                .replace(",", ".")}
            </h4>
            <div className="flex justify-center mt-4">
              <button className="text-purple-600 bg-orange-400 w-28 h-7 rounded-sm">
                Vender
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
