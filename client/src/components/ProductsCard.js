import toast from "react-hot-toast";
import { useProducts } from "../context/merchContext";
import { useNavigate } from "react-router-dom";
export function ProductsCard({ product }) {
  const { deleteProduct } = useProducts();
  const Navigate = useNavigate();

  const handleDelete = (id, name) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">
            Quiere borrar este producto?
            <strong> {id} </strong>
          </p>
          <div>
            <button
              className="mx-2 rounded-sm bg-red-500 px-3 py-2 text-white hover:bg-red-400  "
              onClick={() => {
                deleteProduct(id);
                toast.dismiss(t.id);
              }}
            >
              Borrar
            </button>
            <button
              className="mx-2 rounded-sm bg-slate-400 px-3 py-2 text-white hover:bg-slate-500 "
              onClick={() => toast.dismiss(t.id)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };

  return (
    <div
      className="shadows-black rounded-sm bg-zinc-800 text-white shadow-md hover:cursor-pointer hover:bg-zinc-700"
      onClick={() => Navigate(`/merch/products/${product._id}`)}
    >
      <div className="px-4 py-7 ">
        <div className="flex justify-between">
          <h3>{product.name}</h3>
          <button
            className="rounded-sm bg-red-600 px-2 py-1 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(product._id, product.name);
            }}
          >
            Borrar
          </button>
        </div>
        <p>{product.description}</p>
        {product.image && <img src={product.image.url} alt={product.name} />}
        <h4 className="text-center">
          ${" "}
          {Number(product.sellingPrice)
            .toLocaleString("es-ES", { maximumFractionDigits: 0 })
            .replace(",", ".")}
        </h4>
      </div>
    </div>
  );
}
