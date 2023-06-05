import React from "react";
import "./Navbar.css";
import { UserContext } from "../../App";
import tjLogo from "./wordsTJLogo.png"
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, setUser } = React.useContext(UserContext);

  function logout() {
    setUser(null);
  }

  return (
    <div id="navBar">
      <img src={tjLogo} alt="the trader joes logo"/>
      <section>
        <Link to="/items">Items</Link>
        <Link to="/about">About</Link>
        <Link to="/faq">FAQ</Link>
      {user ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={logout}> Logout </a>
      ) : (
        <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      )}
      <Link id="heavyButton" to="/cart">Cart</Link>
      </section>
    </div>
  );
}
