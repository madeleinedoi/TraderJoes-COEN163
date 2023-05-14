import React from "react";
import { useContext } from "react";
import "./Item.css";
import { useParams } from "react-router-dom";
import getItemById from "../../helpers/getItemByID";
import Error from "../error/Error";
import { CartContext } from "../../App";

export default function Item() {
  const { cart, setCart } = useContext(CartContext);

  const { itemID } = useParams();
  const item = getItemById(itemID);
  return (
    <div>
      {item ? (
        <div>
          <h1>{item.name}</h1>
          <img alt={item.name} src={item.imageURL} />
          <p>{item.price}</p>
          <p>{item.description}</p>
          <button onClick={() => setCart([...cart, {id: item.id, quantity: 1}])}>
            Add to cart
          </button>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}
