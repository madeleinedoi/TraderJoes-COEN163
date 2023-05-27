import React from "react";
import { useContext } from "react";
import "./Item.css";
import { useParams } from "react-router-dom";
import getItemById from "../../helpers/getItemByID";
import Error from "../error/Error";
import { CartContext } from "../../App";
import NumericInput from "react-numeric-input";
import { updateItemQuantity } from "../../helpers/updateItemQuantity";

export default function Item() {
  const { cart, setCart } = useContext(CartContext);
  const { itemID } = useParams();
  const itemInCart = cart.items.find((item) => item.id === itemID);
  const item = getItemById(itemID);

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
      {item ? (
        <div>
          <h1>{item.name}</h1>
          <img alt={item.name} src={item.imageURL} />
          {item.tags.map((tag) => (
            <p>{tag}</p>
          ))}
          <p>
            ${item.price}/{item.size} oz
          </p>
          <p>{item.description}</p>
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
      ) : (
        <Error />
      )}
    </div>
  );
}
