import React, { useContext } from "react";
import "./ItemCard.css";
import { CartContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";

export default function ItemCard(props) {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);

  const itemID = props.item.id;
  const itemInCart = cart.items.find((item) => item.id === itemID);

  function onItemAddToCart() {
    navigate("/item/" + props.item.id)
  }

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
      <button onClick={() => onItemAddToCart()}>Add to cart</button>
    </div>
  );
}
