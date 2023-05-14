import React from "react";
import "./CartRow.css";
import NumericInput from "react-numeric-input";

export default function CartRow(props) {
  return (
    <div>
      <p>{props.item.name}</p>
      <NumericInput
        min={1}
        value={props.quantity}
        onChange={(value) => props.updateItemQuantity(value)}
      />
      <button onClick={() => props.removeItem()}>Remove</button>
    </div>
  );
}
