import { createContext, useState, useContext, useEffect } from "react";
import {
  getIncomesRequest,
  deleteIncomeRequest,
  // createIncomesRequest,
  // getIncomeRequest,
  // updateIncomeRequest,
} from "../api/merch";

const IncomesContext = createContext();

export const useIncomes = () => {
  const context = useContext(IncomesContext);
  return context;
};

function IncomesProvider({ children }) {
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [incomes, setIncomes] = useState([]);

  const getIncomes = async () => {
    const res = await getIncomesRequest();
    setIncomes(res.data);
  };

  const deleteIncome = async (id) => {
    const res = await deleteIncomeRequest(id);
    if (res.status === 204) {
      setIncomes(incomes.filter((p) => p._id !== id));
    }
  };

  useEffect(() => {
    getIncomes();
  }, []);
  const incomesValue = {
    searchText,
    setSearchText,
    selectedDate,
    setSelectedDate,
    selectedClient,
    setSelectedClient,
    selectedProduct,
    setSelectedProduct,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    incomes,
    getIncomes,
    deleteIncome,
  };

  return (
    <IncomesContext.Provider value={incomesValue}>
      {children}
    </IncomesContext.Provider>
  );
}

export { IncomesContext, IncomesProvider };
