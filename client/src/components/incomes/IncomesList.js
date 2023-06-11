/**
 * columnas
 * Fecha y hora
 * Cliente
 * ITEMS
    producto
      cantidad
      valor
  Total
  Forma de pago


  TABLA FILTRABLE DE VENTAS
    Buscardor de Ventas
    Tabla de ventas
    filas ventas
      items de ventas



*/
import toast from "react-hot-toast";
import { useIncomes } from "../../context/incomesContext";
import { useProducts } from "../../context/merchContext";
import { useNavigate } from "react-router-dom";

function IncomesList({ incomes }) {
  const { products } = useProducts();
  const { deleteIncome } = useIncomes();
  const Navigate = useNavigate();

  const handleDelete = (id, name) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">
            Quiere borrar esta venta?
            <strong> {id} </strong>
          </p>
          <div>
            <button
              className="mx-2 rounded-sm bg-red-500 px-3 py-2 text-white hover:bg-red-400  "
              onClick={() => {
                deleteIncome(id);
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
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Fecha y hora
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Productos
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Forma de pago
            </th>

            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Total
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {incomes
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((income) => (
              <tr key={income._id} className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">
                      {new Date(income.createdAt)
                        .toLocaleDateString()
                        .split("/")
                        // .reverse()
                        .join("/")}
                    </div>
                    <div className="font-medium text-gray-700">
                      {new Date(income.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </div>
                  </div>
                </th>

                <td className="px-6 py-4">
                  {income.items.map((item) => {
                    const product = products.find(
                      (product) => product._id === item._id
                    );
                    if (!product) {
                      // El producto no existe, se ha eliminado
                      return null; // O cualquier otro manejo que desees hacer en este caso
                    }
                    return (
                      <div key={item._id} className="flex justify-end">
                        <div
                          className="font-medium"
                          style={{ marginRight: "30px" }}
                        >
                          {product.name}
                        </div>
                        <div
                          className="text-gray-500"
                          style={{ marginRight: "10px" }}
                        >
                          {item.quantity}
                        </div>
                        <div
                          className="text-gray-500"
                          style={{ marginRight: "10px" }}
                        >
                          {item.sellingPrice.toLocaleString("es-ES")}
                        </div>
                      </div>
                    );
                  })}
                </td>
                <td>
                  <div className="font-semibold">{income.paymentMethod}</div>
                </td>
                <td>
                  <div className="font-semibold">
                    {income.total.toLocaleString("es-ES")}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button
                      x-data="{ tooltip: 'Delete' }"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(income._id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => Navigate(`/merch/incomes/${income._id}`)}
                      x-data="{ tooltip: 'Edite' }"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default IncomesList;

//  <td className="px-6 py-4">
// <div className="flex gap-2">
// <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
//   Design
// </span>
// <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
//   Product
// </span>
// <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
//   Develop
// </span>
// </div>
// </td>

// /* <td className="px-6 py-4">
//                 <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
//                   <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
//                   Active
//                 </span>
//               </td> */
