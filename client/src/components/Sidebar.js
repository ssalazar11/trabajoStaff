import { useState, useEffect } from "react";
import { useProducts } from "../context/merchContext";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { CgMusic } from "react-icons/cg";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import "../css/button.css";

function Invoice({ selectedProducts }) {
  const today = new Date().toISOString().split("T")[0]; // Obtiene la date actual en formato YYYY-MM-DD

  const { total, setSelectedProducts, createIncome } = useProducts();

  const [formData, setFormData] = useState({
    date: today,
    name: "",
    email: "",
    phone: "",
    paymentMethod: "",
    coments: "",
    total: total.toString(),
    items: selectedProducts,
  });
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      total: total.toString(),
      items: selectedProducts,
    }));
  }, [total, selectedProducts]);

  const handleChange = (e) => {
    console.log(total);

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("venta");
    e.preventDefault();

    await createIncome(formData);
    // Restablecer el formulario después de enviar los datos
    setFormData({
      date: today,
      name: "",
      email: "",
      phone: "",
      paymentMethod: "",
      coments: "",
      total: total,
      items: [],
    });
    setSelectedProducts([]);
  };

  return (
    <form className="flex flex-col text-white " onSubmit={handleSubmit}>
      <div>
        <div className="">
          <label htmlFor="date">Fecha:</label>
          <input
            className="text-black"
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            className="text-black"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className="text-black"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Teléfono:</label>
          <input
            className="text-black"
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Opciones de Pago:</p>
          <label htmlFor="Efectivo">
            <input
              type="radio"
              id="Efectivo"
              name="paymentMethod"
              value="Efectivo"
              checked={formData.paymentMethod === "Efectivo"}
              onChange={handleChange}
            />
            Efectivo
          </label>
          <label htmlFor="Nequi">
            <input
              type="radio"
              id="Nequi"
              name="paymentMethod"
              value="Nequi"
              checked={formData.paymentMethod === "Nequi"}
              onChange={handleChange}
            />
            Nequi
          </label>
          <label htmlFor="Crédito">
            <input
              type="radio"
              id="Crédito"
              name="paymentMethod"
              value="Crédito"
              checked={formData.paymentMethod === "Crédito"}
              onChange={handleChange}
            />
            Crédito
          </label>
        </div>
        <hr />
        <ProductTable selectedProducts={selectedProducts} />
        <hr />

        <div>
          <label htmlFor="coments">Comentarios:</label>
          <textarea
            className="text-black"
            id="coments"
            name="coments"
            value={formData.coments}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          className={`custom-button ${
            !selectedProducts.length || !formData.paymentMethod
              ? "disabled"
              : ""
          }`}
          type="submit"
          onClick={handleSubmit}
          disabled={!selectedProducts.length || !formData.paymentMethod}
        >
          REGISTRAR
        </button>
      </div>
    </form>
  );
}

function ProductTable({ selectedProducts }) {
  const rows = [];
  const { total } = useProducts();

  selectedProducts.forEach((product) => {
    rows.push(<ProductRow key={product._id} product={product} />);
  });
  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: "80%" }}>ITEMS</th>
          <th style={{ width: "20%" }}></th>
          <th style={{ width: "20%" }}></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
      <tfoot>
        <tr>
          <td colSpan="2" style={{ textAlign: "left" }}>
            TOTAL:
          </td>
          <td>
            {total.toLocaleString("es-ES", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
function ProductRow({ product }) {
  const { deleteProductFromSidebar, addProductToSidebar } = useProducts();
  const handleDelete = () => {
    deleteProductFromSidebar(product._id);
  };

  const handleAdd = () => {
    addProductToSidebar(product);
  };
  return (
    <tr>
      <td className="text-white">{product.name}</td>
      <td className="text-white" style={{ textAlign: "left" }}>
        {product.quantity}
      </td>

      <td className="text-white" style={{ textAlign: "right" }}>
        {" "}
        {product.sellingPrice.toLocaleString("es-ES", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </td>
      <td>
        <AiOutlinePlusCircle className="text-white" onClick={handleAdd} />
      </td>
      <td>
        <AiOutlineMinusCircle className="text-white" onClick={handleDelete} />
      </td>
    </tr>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(true);
  const { selectedProducts } = useProducts();

  return (
    <div className="flex ">
      <div
        className={`bg-verde-oscuro-musa p-3  ${
          open ? "w-72" : "w-20"
        } duration-300 relative `}
      >
        <BsFillCaretLeftFill
          className={`bg-white text-blue-light text-3xl rounded-full absolute -left-3 top-9 border border-blue-light cursor-pointer`}
          style={{ transform: `rotate(${open ? "0deg" : "180deg"})` }}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <CgMusic
            className={`bg-amarillo-musa text-4xl rounded cursor-pointer block float-left mr- duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-semibold text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            PEDIDOS
          </h1>
        </div>
        <div
          className={`  px-5 ${open ? "w-72" : "w-20"} duration-300 relative `}
        >
          <Invoice selectedProducts={selectedProducts} />
        </div>
      </div>
    </div>
  );
}
