import React from "react";
import "./Checkout.css";
import { CartContext, UserContext } from "../../App";

export default function Checkout() {
  const { cart, setCart } = React.useContext(CartContext);
  const { user } = React.useContext(UserContext);

  const [email, setEmail] = React.useState(user ? user.email : "");
  const [name, setName] = React.useState(user ? user.name : "");
  const [address, setAddress] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [expiryDate, setExpiryDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (
      (email === "") |
      (name === "") |
      (address === "") |
      (cardNumber === "") |
      (expiryDate === "") |
      (cvv === "")
    ) {
      setError(true);
      setErrorMessage("Please enter all fields");
      return;
    }
    if (cardNumber.length !== 16) {
      setError(true);
      setErrorMessage("Please enter a valid card number");
      return;
    }
    if (cvv.length !== 3) {
      setError(true);
      setErrorMessage("Please enter a valid cvv");
      return;
    }
    if (expiryDate.length !== 5) {
      setError(true);
      setErrorMessage("Please enter a valid expiry date");
      return;
    }
    setSuccess(true);
    setError(false);
    setTimeout(() => {
      window.location.href = "/items";
      setCart({
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0,
      });
    }, 2000);
  }

  return (
    <div>
      <h1>Checkout Page</h1>
      <div>
        {error && <h2>{errorMessage}</h2>}
        {success && <h2>Success</h2>}
      </div>
      <div>
        <p>{cart.subtotal.toFixed(2)}</p>
        <p>{cart.tax.toFixed(2)}</p>
        <p>{cart.total.toFixed(2)}</p>
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
        <label>Address</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
        />
        <label>Card Number</label>
        <input
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          type="text"
        />
        <label>Expiry Date</label>
        <input
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          type="text"
        />
        <label>CVV</label>
        <input
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          type="text"
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}
