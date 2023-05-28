import React from "react";
import "./AddonRow.css";

export default function AddonRow(props) {
  return (
    <div>
      <p>{props.item.name}</p>
      <button onClick={() => window.location.href = "/item/" + props.item.id}>Add to Cart</button>
    </div>
  );
}
