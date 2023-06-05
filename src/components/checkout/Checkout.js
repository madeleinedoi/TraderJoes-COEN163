import React from "react";
import { useNavigate } from "react-router-dom";
import { CartContext, UserContext } from "../../App";
import getItemById from "../../helpers/getItemByID";
import { removeItem } from "../../helpers/removeItem";
import CartRow from "../cart/CartRow";
import "./Checkout.css";
import creditCardGraphic from "./creditCardGraphic.png";
import squigglyDesign from "./squigglyDesign.png";

export default function Checkout() {
  const navigate = useNavigate();
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
      navigate("/items");
      setCart({
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0,
      });
    }, 2000);
  }

  return (
    <div id="checkoutBody">
      <div id="checkoutTotalSummary">
        <article>
          <img src={squigglyDesign} alt="decorative design"></img>
          <h1>Your Total</h1>
          <p>SUBTOTAL ${cart.subtotal.toFixed(2)}</p>
          <p>TAX ${cart.tax.toFixed(2)}</p>
          <p>TOTAL ${cart.total.toFixed(2)}</p>
          <img src={squigglyDesign} alt="decorative design"></img>
        </article>
        {cart.items.map((cartItem) => {
          return (
            <CartRow
              item={getItemById(cartItem.id)}
              quantity={cartItem.quantity}
              removeItem={() => removeItem(cartItem.id, cart, setCart)}
            />
          );
        })}
      </div>

      <form>
        <h1>Checkout</h1>
        <h3>User Information</h3>
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
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="address"
        />
        <h3>Credit Card Information</h3>
        <img src={creditCardGraphic} alt="credit card graphic"></img>
        <input
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          type="text"
          placeholder="card number"
        />
        <input
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          type="text"
          placeholder="mm / yy"
        />
        <input
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          type="text"
          placeholder="cvv"
        />
        <div>
          {error && <h2 style={{ color: 'red', fontSize: '1.2em' }}>{errorMessage}</h2>}
          {success && <h2>Success</h2>}
        </div>
        <button class="mainActionBtn" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}
