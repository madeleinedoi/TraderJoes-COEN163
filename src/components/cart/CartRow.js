import React from "react";
import { Link } from "react-router-dom";
import "./CartRow.css";

export default function CartRow(props) {
  return (
    <div id="cartRow">
      <Link to={"/item/" + props.item.id}>
        <h4>{props.item.name}</h4>
        <p>amount: {props.quantity}</p>
      </Link>
      <button onClick={() => props.removeItem()}>x</button>
    </div>
  );
}
