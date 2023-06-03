import React from "react";
import "./AddonRow.css";
import addButton from "./addButton.png"

export default function AddonRow(props) {
  return (
    <div id="addOnRow">
      <div>
        <h4>{props.item.name}</h4>
        <p>${props.item.price}</p>
      </div>
      <button onClick={() => window.location.href = "/item/" + props.item.id}><img src={addButton} alt="add to cart"></img></button>
    </div>
  );
}
