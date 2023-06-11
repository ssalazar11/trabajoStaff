// import toast from "react-hot-toast";
// import useProducts from "../context/merchContext";
//import { useNavigate } from "react-router-dom";

export function ProductsList({ products }) {
  //const Navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                <tr>
                  <th scope="col" className=" px-6 py-4">
                    Producto
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Descripcion
                  </th>
                </tr>
              </thead>
              <tbody className="text-left text-white">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b dark:border-neutral-500"
                  >
                    <td className="whitespace-nowrap  px-6 py-2">
                      {product.name}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-2">
                      {product.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
