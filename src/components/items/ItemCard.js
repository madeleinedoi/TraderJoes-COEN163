import React, { useContext } from "react";
import "./ItemCard.css";
import { CartContext } from "../../App";
import getItemById from "../../helpers/getItemByID";
import NumericInput from "react-numeric-input";
import { updateItemQuantity } from "../../helpers/updateItemQuantity";

export default function ItemCard(props) {
  const { cart, setCart } = useContext(CartContext);

  const itemID = props.item.id;
  const itemInCart = cart.items.find((item) => item.id === itemID);

  function onItemAddToCart() {
    const newItems = [...cart.items];
    const itemInCart = newItems.find((item) => item.id === itemID);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      newItems.push({ id: itemID, quantity: 1 });
    }
    const newSubtotal = newItems.reduce(
      (acc, item) => acc + getItemById(item.id).price * item.quantity,
      0
    );
    const newTax = newSubtotal * 0.07;
    const newTotal = newSubtotal + newTax;
    setCart({
      items: newItems,
      subtotal: newSubtotal,
      tax: newTax,
      total: newTotal,
    });
  }

  return (
    <div>
      <a href={"/item/" + props.item.id} key={props.item.id}>
        <div>
          <h1>{props.item.name}</h1>
          <img alt={props.item.name} src={props.item.imageURL} />
          <p>
            ${props.item.price}/{props.item.size} oz
          </p>
        </div>
      </a>
      {itemInCart ? (
        <NumericInput
          min={0}
          onChange={(quantity) =>
            updateItemQuantity(itemID, quantity, cart, setCart)
          }
          value={itemInCart.quantity}
        />
      ) : (
        <button onClick={() => onItemAddToCart()}>Add to cart</button>
      )}
    </div>
  );
}
