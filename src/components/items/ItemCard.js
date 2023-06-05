import React, { useContext } from "react";
import "./ItemCard.css";
import { CartContext } from "../../App";
import { Link } from "react-router-dom";

export default function ItemCard(props) {
  const { cart, setCart } = useContext(CartContext);

  const itemID = props.item.id;
  const itemInCart = cart.items.find((item) => item.id === itemID);

  return (
    <div>
      <Link to={"/item/" + props.item.id} key={props.item.id}>
        <div>
          <h1>{props.item.name}</h1>
          <img alt={props.item.name} src={props.item.imageURL} />
          <p>
            ${props.item.price}/{props.item.size} oz
          </p>
        </div>
      </Link>
      <Link to={"/item/" + props.item.id}>Add to cart</Link>
    </div>
  );
}
