import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./Reset.css";
import bagDesign from "./bagDesign.png";

export default function Reset() {
  const navigate = useNavigate();
  const { setUser } = React.useContext(UserContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);

  function handleSignUp(e) {
    e.preventDefault();
    if (email === "" || password === "") {
      setError(true);
      setErrorMessage("Please enter all fields");
      return;
    }
    const accounts = JSON.parse(localStorage.getItem("accounts") || []);
    const newAccount = { email: email, password: password };
    const foundAccount = accounts.filter(
      (account) => account.email === newAccount.email
    );
    if (foundAccount.length === 0) {
      setError(true);
      setErrorMessage("Cannot find user with that email");
      return;
    }
    newAccount.name = foundAccount[0].name;
    setSuccess(true);
    setError(false);
    localStorage.setItem(
      "accounts",
      JSON.stringify([
        ...accounts.filter((account) => account.email !== newAccount.email),
        newAccount,
      ])
    );
    setTimeout(() => {
      navigate("/items");
      setUser(newAccount);
    }, 2000);
  }

  return (
    <div class="signupBody">
      <img src={bagDesign} alt="a bag" class="signupImg"></img>
      <section class="signupContent">
        <h1>Reset Password Page</h1>
        <form>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="new password"
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
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
          <Link to="/items">Continue as Guest</Link>
        </div>
      </section>
    </div>
  );
}
