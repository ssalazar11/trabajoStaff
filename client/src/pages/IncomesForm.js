import { Formik, Form, Field, FieldArray } from "formik";
import { useProducts } from "../context/merchContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export function IncomesForm() {
  const { createIncome, updateIncome, getIncome, products } = useProducts();
  const navigate = useNavigate();
  const params = useParams();
  const [incomes, setIncomes] = useState({
    date: "",
    items: [],
    paymentMethod: "",
    total: 0,
  });
  const [selectedProductValues, setSelectedProductValues] = useState({});

  useEffect(() => {
    (async () => {
      if (params.id) {
        const income = await getIncome(params.id);
        const formattedDate = new Date(income.date).toISOString().split("T")[0];
        setIncomes({ ...income, date: formattedDate });
      }
    })();
  }, [params.id, getIncome]);

  useEffect(() => {
    const initialValues = {};
    products.forEach((product) => {
      initialValues[product._id] = product.value;
    });
    setSelectedProductValues(initialValues);
  }, [products]);

  const handleAddItem = (push) => {
    const newItem = { productId: undefined, quantity: 0, sellingPrice: 0 };
    push(newItem);
    setIncomes((prevIncomes) => ({
      ...prevIncomes,
      items: [...prevIncomes.items, newItem],
    }));
  };

  const handleRemoveItem = (remove, index) => {
    remove(index);
    setIncomes((prevIncomes) => {
      const updatedItems = [...prevIncomes.items];
      updatedItems.splice(index, 1);
      return { ...prevIncomes, items: updatedItems };
    });
  };

  const handleProductChange = (event) => {
    const { name, value } = event.target;
    setSelectedProductValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    const updatedItems = [...incomes.items];
    const index = event.target.dataset.index;
    updatedItems[index].sellingPrice = value;
    setIncomes((prevIncomes) => ({
      ...prevIncomes,
      items: updatedItems,
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    incomes.items.forEach((item) => {
      total += item.quantity * item.sellingPrice;
    });
    setIncomes((prevIncomes) => ({
      ...prevIncomes,
      total,
    }));
  };

  return (
    <div>
      <Navbar />
      <hr className="my-3 h-0.5 border-t-0 bg-neutral-100 opacity-50 dark:opacity-50" />
      <h1>Hola Mundo</h1>
      <Formik
        initialValues={incomes}
        onSubmit={async (values, actions) => {
          if (params.id) {
            await updateIncome(params.id, values);
          } else {
            await createIncome(values);
          }
          navigate("/merch/incomes");
        }}
        enableReinitialize
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FieldArray name="items">
              {({ push, remove }) => (
                <div>
                  {incomes.items.map((item, index) => (
                    <div key={index}>
                      <Field
                        name={`items[${index}].productId`}
                        as="select"
                        className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                        onChange={handleProductChange}
                        value={item.productId || ""}
                        data-index={index}
                      >
                        <option value="">Selecciona un producto</option>
                        {products.map((product) => (
                          <option
                            key={product._id}
                            value={product._id}
                            selected={item.productId === product._id}
                          >
                            {product.name}
                          </option>
                        ))}
                      </Field>
                      <Field
                        name={`items[${index}].quantity`}
                        type="number"
                        placeholder="Cantidad"
                        className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                        onChange={calculateTotal}
                        value={item.quantity}
                      />
                      <Field
                        name={`items[${index}].sellingPrice`}
                        type="number"
                        placeholder="Valor"
                        className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                        onChange={calculateTotal}
                        value={item.sellingPrice}
                      />
                      <button
                        type="button"
                        className="custom-button"
                        onClick={() => handleRemoveItem(remove, index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="custom-button"
                    onClick={() => handleAddItem(push)}
                  >
                    Agregar Item
                  </button>
                </div>
              )}
            </FieldArray>
            <Field
              name="date"
              type="date"
              placeholder="Fecha"
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
            />
            <Field
              name="paymentMethod"
              placeholder="Metodo de pago"
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              as="select"
            >
              <option value="">Selecciona una forma de pago</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Nequi">Nequi</option>
              <option value="Crédito">Crédito</option>
            </Field>
            <Field
              name="total"
              type="number"
              placeholder="Total"
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              disabled
            />
            <button className="custom-button" type="submit">
              Actualizar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
