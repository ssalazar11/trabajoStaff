import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo_Morado.png";
import "./Navbar.css"; // Importa el archivo de estilos CSS personalizado

function Navbar({ filterText, onFilterTextChange }) {
  return (
    <nav className="bg-neutral-800 py-4" style={{ height: "80px" }}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="logo-img" />
          <Link to="/"className=" transition-colors duration-300 hover:text-neutral-600 text-white">
            Home
          </Link>
        </div>

        <input
          type="text"
          placeholder="buscar..."
          value={filterText}
          className="p-2"
          onChange={(e) => onFilterTextChange(e.target.value)}
        />

        <ul className="flex items-center space-x-4">
          <li>
            <Link
              to="/merch/products"
              className=" transition-colors duration-300 hover:text-neutral-600 text-white"
            >
              Productos
            </Link>
          </li>

          <li>
            <Link
              // to="/merch/ventas"
              to="/merch/ventas" className=" transition-colors duration-300 hover:text-neutral-600 text-white">
              Ventas
            </Link>
          </li>

          <li>
            <Link to="/merch/purchases" className=" transition-colors duration-300 hover:text-neutral-600 text-white">
              Compras
            </Link>
          </li>
          <li>
            <Link to="/" className=" transition-colors duration-300 hover:text-neutral-600 text-white">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
