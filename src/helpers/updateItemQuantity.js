import getItemById from "./getItemByID";
import { removeItem } from "./removeItem";

export const updateItemQuantity = (id, quantity, cart, setCart) => {
  if (quantity === 0) {
    removeItem(id, cart, setCart);
    return;
  }
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
