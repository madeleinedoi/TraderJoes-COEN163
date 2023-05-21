import React from "react";
import "./Cart.css";
import { CartContext } from "../../App";
import getItemById from "../../helpers/getItemByID";
import CartRow from "./CartRow";

export default function Cart() {
  const { cart, setCart } = React.useContext(CartContext);

  const updateItemQuantity = (id, quantity) => {
    const newItems = [
      ...cart.items.filter((item) => item.id !== id),
      { id: id, quantity: quantity },
    ];
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
  };

  const removeItem = (id) => {
    const newItems = cart.items.filter((item) => item.id !== id);
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
  };

  return (
    <div>
      {cart.items.map((cartItem) => {
        return (
          <CartRow
            item={getItemById(cartItem.id)}
            quantity={cartItem.quantity}
            updateItemQuantity={(value) =>
              updateItemQuantity(cartItem.id, value)
            }
            removeItem={() => removeItem(cartItem.id)}
          />
        );
      })}
      <p>{cart.subtotal.toFixed(2)}</p>
      <p>{cart.tax.toFixed(2)}</p>
      <p>{cart.total.toFixed(2)}</p>
      <a href="/checkout">Checkout</a>
    </div>
  );
}
