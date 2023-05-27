import React from "react";
import "./Reset.css";
import { UserContext } from "../../App";

export default function Reset() {
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
      window.location.href = "/";
      setUser(newAccount);
    }, 2000);
  }

  return (
    <div>
      <h1>Reset Password Page</h1>
      <div>
        {error && <h2>{errorMessage}</h2>}
        {success && <h2>Success</h2>}
      </div>
      <form>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button onClick={handleSignUp} type="submit">
          Submit
        </button>
      </form>
      <div>
        <a href="/signup">Sign Up</a>
        <a href="/login">Login</a>
        <a href="/">Continue as Guest</a>
      </div>
    </div>
  );
}
