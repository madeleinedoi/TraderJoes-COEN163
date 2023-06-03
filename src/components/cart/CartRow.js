import React from "react";
import "./CartRow.css";

export default function CartRow(props) {
  return (
    <div id="cartRow">
      <a href={"/item/"+props.item.id}>
        <h4>{props.item.name}</h4>
        <p>amount: {props.quantity}</p>
      </a>
      <button onClick={() => props.removeItem()}>x</button>
    </div>
  );
}
