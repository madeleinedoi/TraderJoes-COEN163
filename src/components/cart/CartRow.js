import React from "react";
import "./CartRow.css";

export default function CartRow(props) {
  return (
    <div>
      <p>{props.item.name}</p>
      <p>{props.quantity}</p>
      <button onClick={() => props.removeItem()}>Remove</button>
    </div>
  );
}
