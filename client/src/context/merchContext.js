/** En merchContextx vamos a almacenr todas las funciones que requiera el merh por ejemplo todo lo relacionado con los productos, compras y ventas */
import { useState, createContext, useContext, useEffect } from "react";
import {
  getProductsRequest,
  createProductsRequest,
  deleteProductsRequest,
  getProductRequest,
  updateProductRequest,
  getPurchasesRequest,
  createPurchasesRequest,
  deletePurchaseRequest,
  getPurchaseRequest,
  updatePurchaseRequest,
  getIncomesRequest,
  createIncomesRequest,
  deleteIncomeRequest,
  getIncomeRequest,
  updateIncomeRequest,
} from "../api/merch";
// import { useIncomes } from "./incomesContext";

export const merchContext = createContext();

export const useProducts = () => {
  const context = useContext(merchContext);
  return context;
};

export const MerchProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0); // Variable de estado para almacenar el total

  const addProductToSidebar = (product) => {
    const existingProduct = selectedProducts.find((p) => p._id === product._id);

    if (existingProduct) {
      const updatedProducts = selectedProducts.map((p) =>
        p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setSelectedProducts(updatedProducts);
    } else {
      const newProduct = { ...product, quantity: 1 };
      setSelectedProducts([...selectedProducts, newProduct]);
    }
  };
  const deleteProductFromSidebar = (productId) => {
    setSelectedProducts((selectedProducts) => {
      const updatedProducts = selectedProducts.map((product) => {
        if (product._id === productId) {
          if (product.quantity > 1) {
            return { ...product, quantity: product.quantity - 1 };
          } else {
            // Si la cantidad es 1, se elimina el producto de la lista
            return null;
          }
        } else {
          return product;
        }
      });

      // Filtrar los productos nulos (los que deben ser eliminados)
      const filteredProducts = updatedProducts.filter(
        (product) => product !== null
      );

      return filteredProducts;
    });
  };

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      selectedProducts.forEach((product) => {
        total += product.sellingPrice * product.quantity;
      });
      return total;
    };
    // Calcula el total cuando haya cambios en los productos seleccionados
    const total = calculateTotal();
    // Puedes hacer lo que necesites con el total, como almacenarlo en un estado o mostrarlo en la interfaz
    setTotal(total); // Actualizar el valor de la variable de estado "total" cada vez que haya cambios en los productos seleccionados
  }, [selectedProducts]);

  // ...

  //Aqui se colocan las funciones que hacen las peticiones al backend desde merch.js
  /////productos///////
  const getProducts = async () => {
    //Permite retornar una lista del backend
    const res = await getProductsRequest();
    setProducts(res.data); //Almacena los productos en el estado
  };

  const createProduct = async (product) => {
    const res = await createProductsRequest(product);
    setProducts([...products, res.data]);
  };

  const deleteProduct = async (id) => {
    const res = await deleteProductsRequest(id);
    if (res.status === 204) {
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  const getProduct = async (id) => {
    const res = await getProductRequest(id);
    return res.data;
  };

  const updateProduct = async (id, post) => {
    const res = await updateProductRequest(id, post);
    setProducts(products.map((p) => (p._id === id ? res.data : p)));
    return res.data;
  };
  /////compras///////
  const getPurchases = async () => {
    const res = await getPurchasesRequest();
    setPurchases(res.data);
  };

  const createPurchase = async (purchase) => {
    const res = await createPurchasesRequest(purchase);
    setPurchases([...purchases, res.data]);
  };

  const deletePurchase = async (id) => {
    const res = await deletePurchaseRequest(id);
    if (res.status === 204) {
      setPurchases(purchases.filter((p) => p._id !== id));
    }
  };

  const getPurchase = async (id) => {
    const res = await getPurchaseRequest(id);
    return res.data;
  };

  const updatePurchase = async (id, purchase) => {
    const res = await updatePurchaseRequest(id, purchase);
    setPurchases(purchases.map((p) => (p._id === id ? res.data : p)));
    return res.data;
  };

  /////Ventas///////
  const getIncomes = async () => {
    const res = await getIncomesRequest();
    setIncomes(res.data);
  };

  const createIncome = async (income) => {
    console.log({ postcontext: income });
    const res = await createIncomesRequest(income);
    console.log(res);
    setIncomes([...incomes, res.data]);
  };

  const deleteIncome = async (id) => {
    const res = await deleteIncomeRequest(id);
    if (res.status === 204) {
      setIncomes(incomes.filter((income) => income._id !== id));
    }
  };

  const getIncome = async (id) => {
    const res = await getIncomeRequest(id);
    return res.data;
  };

  const updateIncome = async (id, income) => {
    const res = await updateIncomeRequest(id, income);
    setIncomes(
      incomes.map((income) => (income._id === id ? res.data : income))
    );
    return res.data;
  };

  useEffect(() => {
    getProducts();
    getPurchases();
  }, []);

  return (
    <merchContext.Provider
      value={{
        //products
        products,
        //setProducts, //en el ejemplo no estaba esta linea, verificar si se requiere
        getProducts,
        createProduct,
        deleteProduct,
        getProduct,
        updateProduct,
        purchases,
        //setPurchases, //en el ejemplo no estaba esta linea, verificar si se requiere
        getPurchases,
        createPurchase,
        deletePurchase,
        getPurchase,
        updatePurchase,
        //incomes
        getIncomes,
        createIncome,
        deleteIncome,
        getIncome,
        updateIncome,
        selectedProducts,
        setSelectedProducts,
        addProductToSidebar,
        deleteProductFromSidebar,
        total, // Pasar el valor de "total" como una prop al componente Sidebar
      }}
    >
      {children}
    </merchContext.Provider>
  );
};

// prueba
