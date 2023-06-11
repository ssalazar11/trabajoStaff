import React from "react";
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-neutral-900 py-4 fixed bottom-0 left-0 right-0">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="logo-img" />
          <Link
            to="/merch/products"
            className="transition-colors duration-300 hover:text-neutral-600 text-white"
          >
            Home
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
