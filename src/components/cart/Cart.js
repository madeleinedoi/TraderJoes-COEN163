import React from "react";
import "./Cart.css";
import { CartContext } from "../../App";
import getItemById from "../../helpers/getItemByID";
import CartRow from "./CartRow";
import { removeItem } from "../../helpers/removeItem";
import { locations } from "../../data/locations";

export default function Cart() {
  const { cart, setCart } = React.useContext(CartContext);
  const [selectedLocation, setSelectedLocation] = React.useState("");

  return (
    <div>
      <a href="/items">Back to catalog</a>
      {cart.items.map((cartItem) => {
        return (
          <CartRow
            item={getItemById(cartItem.id)}
            quantity={cartItem.quantity}
            removeItem={() => removeItem(cartItem.id, cart, setCart)}
          />
        );
      })}
      <p>{cart.subtotal.toFixed(2)}</p>
      <p>{cart.tax.toFixed(2)}</p>
      <p>{cart.total.toFixed(2)}</p>
      <p>{cart.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
      <a href="/checkout">Checkout</a>
      {locations.map((location) => (
        <div>
          <p>{location.name}</p>
          <p>{location.distance} miles away</p>
          {selectedLocation === location.name ? (
            <p>Selected</p>
          ) : (
            <button onClick={() => setSelectedLocation(location.name)}>Select</button>
          )}
        </div>
      ))}
    </div>
  );
}
