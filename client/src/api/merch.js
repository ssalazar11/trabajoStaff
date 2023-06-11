import axios from "axios";

//Solicitudes a la api de productos

export const getProductsRequest = async () => axios.get("/products"); //products es la url en el servidor

export const createProductsRequest = async (product) => {
  const form = new FormData();
  for (let key in product) {
    form.append(key, product[key]);
  }
  return await axios.post("/products", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProductsRequest = async (id) =>
  await axios.delete(`/products/${id}`);

export const getProductRequest = async (id) =>
  await axios.get(`/products/${id}`);

export const updateProductRequest = async (id, product) =>
  await axios.put(`/products/${id}`, product);

//solicitudes a la api de compras
export const getPurchasesRequest = async () => axios.get("/expenses"); //products es la url en el servidor
export const createPurchasesRequest = async (purchase) => {
  await axios.post("/expenses", purchase);
};

export const deletePurchaseRequest = async (id) =>
  await axios.delete(`/expenses/${id}`);

export const getPurchaseRequest = async (id) =>
  await axios.get(`/expenses/${id}`);

export const updatePurchaseRequest = async (id, purchase) =>
  await axios.put(`/expenses/${id}`, purchase);

//solicitudes a la api de ventas
export const getIncomesRequest = async () => axios.get("/incomes"); //products es la url en el servidor
export const createIncomesRequest = async (income) => {
  return await axios.post("/incomes", income);
};

export const deleteIncomeRequest = async (id) =>
  await axios.delete(`/incomes/${id}`);

export const getIncomeRequest = async (id) => await axios.get(`/incomes/${id}`);

export const updateIncomeRequest = async (id, income) => {
  return await axios.put(`/incomes/${id}`, income);
};
