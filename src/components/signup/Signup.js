import React from "react";
import "./Signup.css";
import { UserContext } from "../../App";
import bagDesign from "./bagDesign.png";
import Navbar from "../navbar/Navbar";

export default function Signup() {
  const { setUser } = React.useContext(UserContext);

  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);

  function handleSignUp(e) {
    e.preventDefault();
    if (email === "" || name === "" || password === "") {
      setError(true);
      setErrorMessage("Please enter all fields");
      return;
    }
    const accounts = JSON.parse(localStorage.getItem("accounts") || []);
    const newAccount = { email: email, name: name, password: password };
    const foundAccount = accounts.filter(
      (account) => account.email === newAccount.email
    );
    if (foundAccount.length > 0) {
      setError(true);
      setErrorMessage("That email is already in use");
      return;
    }
    setSuccess(true);
    setError(false);
    localStorage.setItem("accounts", JSON.stringify([...accounts, newAccount]));
    setTimeout(() => {
      window.location.href = "/items";
      setUser(newAccount);
    }, 2000);
  }

  return (
    <div class="signupBody">
      <Navbar></Navbar>
      <img class="signupImg" src={bagDesign} alt="a bag"></img>
      <section class="signupContent">
        <h1>Signup Page</h1>
        <form>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button onClick={handleSignUp} type="submit">
            Submit &gt;
          </button>
        </form>
          <div class="loginErrorMessage">
            {error && <h2>{errorMessage}</h2>}
            {success && <h2>Success</h2>}
          </div>
          <div class="continueOther">
            <a href="/login">Login</a>
            <a href="/items">Continue as Guest</a>
          </div>
      </section>
    </div>
  );
}
