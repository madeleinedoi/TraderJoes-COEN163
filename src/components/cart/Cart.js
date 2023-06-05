import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../App";
import { items } from "../../data/items";
import { locations } from "../../data/locations";
import getItemById from "../../helpers/getItemByID";
import { removeItem } from "../../helpers/removeItem";
import cartIcon from "../item/Shopping_Cart.png";
import AddonRow from "./AddonRow";
import "./Cart.css";
import CartRow from "./CartRow";
import addButton from "./addButton.png";
import addedButton from "./addedButton.png";
import locationSymbol from "./locationSymbol.png";
import squigglyDesign from "./squigglyDesign.png";

export default function Cart() {
  const navigate = useNavigate()
  const { cart, setCart } = React.useContext(CartContext);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null)

  const cartSize = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  let addons = []

  let possibleAddons = items.filter((item) => !cart.items.some((cartItem) => cartItem.id === item.id))
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

    navigate("/checkout")
  }

  return (
    <div id="cartBody">
      <section id="checkoutTotalSection">
        <Link class="backButtonCheckout" href="/items">&lt; Back to catalog</Link>
        <h2>Your Total:</h2>
        <p class="costReport">SUBTOTAL {cart.subtotal.toFixed(2)}</p>
        <p class="costReport">TAX {cart.tax.toFixed(2)}</p>
        <p class="costReport">ITEM COUNT: {cartSize}</p>
        <p class="costReport">TOTAL {cart.total.toFixed(2)}</p>
        <h2>Choose Pickup Location:</h2>
        {locations.map((location) => (
          <div class="locationSelection">
            <div class="locationInformation">
              <img src={locationSymbol} alt="locationSymbol"></img>
              <div>
                <h4>{location.name}</h4>
                <p>{location.distance} miles away</p>
              </div>
            </div>
            {selectedLocation === location.name ? (
              <img class="selectedLocationImg" src={addedButton} alt="added"></img>
            ) : (
              <button id="selectLocationBtn" onClick={() => setSelectedLocation(location.name)}><img src={addButton} alt="add" class="selectedLocationImg"></img></button>
            )}
          </div>
        ))}
        {errorMessage &&
          <p
            style={{ color: 'red', fontWeight: 'bold' }}
          >
            {errorMessage}</p>
        }
        <button class="mainActionBtn" onClick={checkout}><img class="shoppingLogoIcon" src={cartIcon} alt="shopping cart icon"></img>Checkout</button>
      </section>

      <section id="checkoutItemSection">
        <div id="existingItems">
          <img src={squigglyDesign} alt="decorative design"></img>
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
          <img src={squigglyDesign} alt="decorative design"></img>
        </div>

        <div id="additionalItems">
          <h2>Additional Add-On Items:</h2>
          {addons.map((addonItem) => {
            return (
              <AddonRow
                item={addonItem}
              />
            );
          })}
        </div>

      </section>

    </div>
  );
}
