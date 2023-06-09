import React, { useContext } from "react";
import NumericInput from "react-numeric-input";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../App";
import getItemById from "../../helpers/getItemByID";
import { updateItemQuantity } from "../../helpers/updateItemQuantity";
import Error from "../error/Error";
import "./Item.css";
import cartIcon from "./Shopping_Cart.png";

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
        <div id="itemBody">
          <section>
            <Link id="backButton" to="/items">&lt;</Link>
            <h1>{item.name}</h1>
            <p>
              ${item.price} / {item.size} oz
            </p>
            {item.tags.map((tag) => (
              <p id="itemTag">{tag}</p>
            ))}
            <p>{item.description}</p>
            {itemInCart ? (
              <NumericInput
                min={0}
                onChange={(quantity) =>
                  updateItemQuantity(itemID, quantity, cart, setCart)
                }
                value={itemInCart.quantity}
                mobile
                style={{
                  wrap: {
                    background: '#E2E2E2',
                    fontSize: 28,
                  },
                  input: {
                    borderRadius: '12px',
                    color: 'black',
                    border: '1px solid #ccc',
                    background: 'white',
                    display: 'block',
                    fontWeight: 100,
                    width: '200px'
                  },
                  button: {
                    color: 'white'
                  }
                }}
              />
            ) : (
              <button class="mainActionBtn" onClick={() => onItemAddToCart()}><img class="shoppingLogoIcon" src={cartIcon} alt="shopping cart icon"></img>ADD TO CART</button>
            )}
          </section>
          <img id="productImage" alt={item.name} src={item.imageURL} />
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}
