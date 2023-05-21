import React from "react";
import "./Signup.css";
import { UserContext } from "../../App";

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
    const accounts = JSON.parse(localStorage.getItem("accounts"));
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
      window.location.href = "/";
      setUser(newAccount);
    }, 2000);
  }

  return (
    <div>
      <h1>Signup Page</h1>
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
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
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
    </div>
  );
}
