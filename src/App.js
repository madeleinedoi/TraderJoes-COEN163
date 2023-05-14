import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar.js";
import Home from "./components/home/Home.js";
import Login from "./components/login/Login.js";
import Cart from "./components/cart/Cart.js";
import Item from "./components/item/Item.js";
import Items from "./components/items/Items.js";
import Signup from "./components/signup/Signup.js";
import Error from "./components/error/Error.js";

export const CartContext = React.createContext();

function App() {
  const [cart, setCart] = useState(
    localStorage["cart"] ? JSON.parse(localStorage.getItem("cart")) : []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="App">
      <CartContext.Provider value={{ cart: cart, setCart: setCart }}>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/item/:itemID" element={<Item />} />
            <Route path="/items" element={<Items />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    </div>
  );
}

export default App;
