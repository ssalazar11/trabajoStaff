import { Formik, Form, Field, ErrorMessage } from "formik";
import { useProducts } from "../context/merchContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export function ProductsForm() {
  const { createProduct, getProduct, updateProduct } = useProducts();
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProducts] = useState({
    name: "",
    description: "",
    category: "",
    sellingPrice: "",
    image: null,
  });

  useEffect(() => {
    (async () => {
      if (params.id) {
        const product = await getProduct(params.id);
        setProducts(product);
      }
    })();
  }, [params.id, getProduct]);

  return (
    <div>
      <Navbar />

      <hr className="my-3 h-0.5 border-t-0 bg-neutral-100 opacity-50 dark:opacity-50" />
      <div className="flex items-center justify-center">
        <div className="bg-zinc-800 p-10 shadow-md shadow-black">
          <header className="flex items-center justify-between py-4 text-white">
            <h3 className="text-xl">Agregar/Editar Productos</h3>
            <Link
              to="/merch/products"
              className="text-sm text-gray-400 hover:text-gray-300"
            >
              Ir Atrás
            </Link>
          </header>
          <Formik
            initialValues={product}
            validationSchema={Yup.object({
              name: Yup.string().required("El nombre es obligatorio"),
              description: Yup.string().required(
                "La descripción es obligatoria"
              ),
              sellingPrice: Yup.number()
                .required("El precio de venta es obligatorio")
                .positive("El precio de venta debe ser positivo")
                .integer("El precio de venta debe ser un número entero"),
            })}
            onSubmit={async (values, actions) => {
              if (params.id) {
                await updateProduct(params.id, values);
              } else {
                await createProduct(values);
              }
              navigate("/merch/products");
            }}
            enableReinitialize
          >
            {({ handleSubmit, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="name"
                  placeholder="Nombre"
                  className="mb-4 w-full rounded bg-gray-600 px-3 py-2 text-white focus:outline-none"
                />
                <ErrorMessage
                  component="p"
                  className="-sm text-red-400"
                  name="name"
                />
                <Field
                  name="category"
                  placeholder="Categoría"
                  className="mb-4 w-full rounded bg-gray-600 px-3 py-2 text-white focus:outline-none"
                  as="select"
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Camisetas">Camisetas</option>
                  <option value="Termos">Termos</option>
                  <option value="Chompas">Chompas</option>
                  <option value="Gorras">Gorras</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="Accesorios">Accesorios</option>
                </Field>
                <ErrorMessage
                  component="p"
                  className="-sm text-red-400"
                  name="category"
                />
                <Field
                  type="number"
                  name="sellingPrice"
                  placeholder="Precio de venta"
                  className="mb-4 w-full rounded bg-gray-600 px-3 py-2 text-white focus:outline-none"
                />
                <ErrorMessage
                  component="p"
                  className="-sm text-red-400"
                  name="sellingPrice"
                />
                <Field
                  component="textarea"
                  name="description"
                  placeholder="Descripción"
                  className="mb-4 w-full rounded bg-gray-600 px-3 py-2 text-white focus:outline-none"
                  rows={3}
                />
                <ErrorMessage
                  component="p"
                  className="-sm text-red-400"
                  name="description"
                />
                <input
                  type="file"
                  name="image"
                  className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                  onChange={(e) => setFieldValue("image", e.target.files[0])}
                />
                <button
                  className="mt-2 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 focus:outline-none disabled:bg-indigo-400"
                  type="submit"
                >
                  Guardar
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
