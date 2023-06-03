import React from "react";
import "./CartRow.css";

export default function CartRow(props) {
  return (
    <div id="cartRow">
      <section>
        <h4>{props.item.name}</h4>
        <p>amount: {props.quantity}</p>
      </section>
      <button onClick={() => props.removeItem()}>x</button>
    </div>
  );
}
