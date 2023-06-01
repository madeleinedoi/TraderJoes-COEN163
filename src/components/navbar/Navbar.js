import React from "react";
import "./Navbar.css";
import { UserContext } from "../../App";
import tjLogo from "./wordsTJLogo.png"

export default function Navbar() {
  const { user, setUser } = React.useContext(UserContext);

  function logout() {
    setUser(null);
  }

  return (
    <div id="navBar">
      <img src={tjLogo} alt="the trader joes logo"/>
      <section>
        <a href="/items">Items</a>
        <a href="/about">About</a>
        <a href="/faq">FAQ</a>
      {user ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={logout}> Logout </a>
      ) : (
        <>
          <a href="/signup">Signup</a>
          <a href="/login">Login</a>
        </>
      )}
      <a id="heavyButton" href="/cart">Cart</a>
      </section>
    </div>
  );
}
