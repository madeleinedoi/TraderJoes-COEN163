import React from "react";
import "./Cart.css";
import { CartContext } from "../../App";
import getItemById from "../../helpers/getItemByID";
import CartRow from "./CartRow";
import { removeItem } from "../../helpers/removeItem";
import { locations } from "../../data/locations";
import { items } from "../../data/items";
import AddonRow from "./AddonRow";

export default function Cart() {
  const { cart, setCart } = React.useContext(CartContext);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null)

  const cartSize = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  let addons = []

  let possibleAddons = items.filter((item) => !cart.items.some((cartItem) => cartItem.id == item.id))
  while (addons.length < 3 && possibleAddons.length > 0) {
    let addonIndex = Math.floor(Math.random() * possibleAddons.length)
    addons.push(possibleAddons[addonIndex])
    possibleAddons.splice(addonIndex, 1)
  }

  const checkout = () => {
    console.log("Test")
    if (cart.items.length <= 0) {
      setErrorMessage("Error: At Least One Item Needed For Checkout")
      return
    }

    if (!selectedLocation) {
      setErrorMessage("Error: Please Select A Pickup Location.")
      return
    }
    
    window.location.href = "/checkout"
  }

  return (
    <div>
      {errorMessage && 
        <p>{errorMessage}</p>
      }
      <a href="/items">Back to catalog</a>
      <h2>Your Cart ({cartSize}):</h2>
      {cart.items.map((cartItem) => {
        return (
          <CartRow
            item={getItemById(cartItem.id)}
            quantity={cartItem.quantity}
            removeItem={() => removeItem(cartItem.id, cart, setCart)}
          />
        );
      })}
      <h2>Additional Add-On Items:</h2>
      {addons.map((addonItem) => {
        return (
          <AddonRow
            item={addonItem}
          />
        );
      })}
      <h2>Your Total:</h2>
      <p>SUBTOTAL {cart.subtotal.toFixed(2)}</p>
      <p>TAX {cart.tax.toFixed(2)}</p>
      <p>TOTAL {cart.total.toFixed(2)}</p>
      <p>ITEM COUNT: {cartSize}</p>
      <h2>Choose Pickup Location:</h2>
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
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
