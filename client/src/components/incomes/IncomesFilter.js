import { useContext } from "react";
import { IncomesContext } from "../../context/incomesContext";

function IncomesFilter() {
  const {
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
  } = useContext(IncomesContext);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      {/* Búsqueda */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchText}
          onChange={handleSearchTextChange}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap p-4">
        {/* Filtro por fecha */}
        <label htmlFor="date" className="mr-4">
          Fecha:
        </label>
        <select
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border border-gray-300 rounded-md p-2"
        >
          {/* Opciones del filtro de fecha */}
        </select>

        {/* Filtro por clientes */}
        <label htmlFor="client" className="mr-4">
          Clientes:
        </label>
        <select
          id="client"
          value={selectedClient}
          onChange={handleClientChange}
          className="border border-gray-300 rounded-md p-2"
        >
          {/* Opciones del filtro de clientes */}
        </select>

        {/* Filtro por productos */}
        <label htmlFor="product" className="mr-4">
          Productos:
        </label>
        <select
          id="product"
          value={selectedProduct}
          onChange={handleProductChange}
          className="border border-gray-300 rounded-md p-2"
        >
          {/* Opciones del filtro de productos */}
        </select>

        {/* Filtro por formas de pago */}
        <label htmlFor="paymentMethod" className="mr-4">
          Formas de pago:
        </label>
        <select
          id="paymentMethod"
          value={selectedPaymentMethod}
          onChange={handlePaymentMethodChange}
          className="border border-gray-300 rounded-md p-2"
        >
          {/* Opciones del filtro de formas de pago */}
        </select>
      </div>

      {/* Contenido de la tabla */}
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        {/* Contenido de la tabla */}
      </table>
    </div>
  );
}

export default IncomesFilter;
