import React, { useContext } from "react";
import "./ItemCard.css";
import { CartContext } from "../../App";

export default function ItemCard(props) {
  const { cart, setCart } = useContext(CartContext);

  const itemID = props.item.id;
  const itemInCart = cart.items.find((item) => item.id === itemID);

  function onItemAddToCart() {
    window.location.href="/item/" + props.item.id
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
      <button onClick={() => onItemAddToCart()}>Add to cart</button>
    </div>
  );
}
