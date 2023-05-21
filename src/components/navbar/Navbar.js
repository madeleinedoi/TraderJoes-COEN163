import React from "react";
import "./Navbar.css";
import { UserContext } from "../../App";

export default function Navbar() {
  const { user, setUser } = React.useContext(UserContext);

  function logout() {
    setUser(null);
  }

  return (
    <div>
      <a href="/">Home</a>
      <a href="/items">Items</a>
      <a href="/cart">Cart</a>
      {user ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={logout}> Logout </a>
      ) : (
        <>
          <a href="/signup">Signup</a>
          <a href="/login">Login</a>
        </>
      )}
    </div>
  );
}
