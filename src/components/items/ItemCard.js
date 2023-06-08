import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../App";
import "./ItemCard.css";
import cartIcon from "./Shopping_Cart.png";

export default function ItemCard(props) {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);

  const itemID = props.item.id;
  const itemInCart = cart.items.find((item) => item.id === itemID);

  function onItemAddToCart() {
    navigate("/item/" + props.item.id);
  }

  return (
    <div className="card">
      <div class="clearfix">
        <Link to={"/item/" + props.item.id} key={props.item.id}>
          <div>
            <img
              className="itemCardImage"
              alt={props.item.name}
              src={props.item.imageURL}
            />
            <div className="block">
              <div className="name">
                <h1>{props.item.name}</h1>
              </div>
              <div className="price">
                <p>
                  ${props.item.price}/{props.item.size} oz
                </p>
              </div>
            </div>
          </div>
        </Link>
        <button class="addto" onClick={() => onItemAddToCart()}>
          <img
            class="shoppingLogoIcon"
            src={cartIcon}
            alt="shopping cart icon"
          ></img>
          Add to cart
        </button>
      </div>
    </div>
  );
}
