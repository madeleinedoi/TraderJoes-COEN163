import React from "react";
import "./AddonRow.css";
import addButton from "./addButton.png"
import { Link } from "react-router-dom";

export default function AddonRow(props) {
  return (
    <div id="addOnRow">
      <Link to={"/item/"+props.item.id}>
        <h4>{props.item.name}</h4>
        <p>${props.item.price}</p>
      </Link>
      <Link to={"/item/"+props.item.id}><img src={addButton} alt="add to cart"></img></Link>
    </div>
  );
}
