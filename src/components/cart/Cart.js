import React, { useContext } from "react";
import "./Cart.css";
import { CartContext } from "../../App";
import getItemById from "../../helpers/getItemByID";
import CartRow from "./CartRow";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const updateItemQuantity = (id, quantity) => {
    setCart([
      ...cart.filter((item) => item.id !== id),
      { id: id, quantity: quantity },
    ]);
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div>
      {cart.map((cartItem) => {
        return (
          <CartRow
            item={getItemById(cartItem.id)}
            quantity={cartItem.quantity}
            updateItemQuantity={(value) =>
              updateItemQuantity(cartItem.id, value)
            }
            removeItem={() =>
                removeItem(cartItem.id)
            }
          />
        );
      })}
    </div>
  );
}
