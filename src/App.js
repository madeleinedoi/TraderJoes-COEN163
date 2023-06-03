import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar.js";
import Login from "./components/login/Login.js";
import Cart from "./components/cart/Cart.js";
import Item from "./components/item/Item.js";
import Items from "./components/items/Items.js";
import Signup from "./components/signup/Signup.js";
import Reset from "./components/reset/Reset.js";
import Checkout from "./components/checkout/Checkout";
import Error from "./components/error/Error.js";
import FAQ from "./components/faq/FAQ";
import About from "./components/about/About";

export const CartContext = React.createContext();
export const UserContext = React.createContext();

function App() {
  const [cart, setCart] = useState(
    localStorage["cart"]
      ? JSON.parse(localStorage.getItem("cart"))
      : {
          items: [],
          subtotal: 0,
          tax: 0,
          total: 0,
        }
  );

  const [user, setUser] = useState(
    localStorage["user"] ? JSON.parse(localStorage.getItem("user")) : null
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  
  useEffect(() => {
    if (!localStorage["accounts"]) {
      localStorage.setItem("accounts", "[]");
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <CartContext.Provider value={{ cart: cart, setCart: setCart }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<><Navbar /><Cart /></>} />
              <Route path="/item/:itemID" element={<><Navbar /><Item /></>} />
              <Route path="/items" element={<><Navbar /><Items /></>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/checkout" element={<><Navbar /><Checkout /></>} />
              <Route path="/faq" element={<><Navbar /><FAQ /></>} />
              <Route path="/about" element={<><Navbar /><About /></>} />
              <Route path="*" element={<><Navbar /><Error /></>} />
            </Routes>
          </BrowserRouter>
        </CartContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
