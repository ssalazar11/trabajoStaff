import { Toaster } from "react-hot-toast";
import { MerchProvider } from "./context/merchContext";
import {
  ProductsForm,
  ProductsPage,
  NotFoundPage,
  ProductsPageList,
  PurchasesPage,
  // ProductsPageV2,
  HomeVentas,
  IncomesPage,
  IncomesForm,
} from "./pages";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import { Sidebar } from "./components/Sidebar";
// import logo from "./assets/Logo_Morado.png";
//import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="flex bg-neutral-800">
        <header className="bg-orange-400 h-3 w-full fixed top-0 z-10"></header>{" "}
        <MerchProvider>
          <div className="container mx-auto flex-1 px-10">
            <Routes>
              <Route path="/merch/products" element={<ProductsPage />} />
              <Route path="/merch/newproduct" element={<ProductsForm />} />
              <Route path="/merch/products/:id" element={<ProductsForm />} />
              <Route
                path="/merch/productslist"
                element={<ProductsPageList />}
              />
              <Route path="/merch/purchases" element={<PurchasesPage />} />
              <Route path="/" element={<HomeVentas />} />
              <Route path="/merch/incomes" element={<IncomesPage />} />
              <Route path="/merch/incomes/:id" element={<IncomesForm />} />
              <Route path="*" element={<NotFoundPage />} />
              {/* <Route path="/merch/ventas" element={<HomeVentas />} /> */}
              {/* <Route path="/merch/productsV2" element={<ProductsPageV2 />} /> */}
            </Routes>
          </div>
          <Sidebar />
        </MerchProvider>
      </div>
      {/* <Footer /> */}
      <Toaster />
    </>
  );
}

export default App;
