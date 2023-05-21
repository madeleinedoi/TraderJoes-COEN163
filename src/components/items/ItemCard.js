import React from "react";
import "./ItemCard.css";

export default function ItemCard(props) {
  return (
    <a href={"/item/" + props.item.id} key={props.item.id}>
      <div>
        <h1>{props.item.name}</h1>
        <img alt={props.item.name} src={props.item.imageURL} />
        <p>
          ${props.item.price}/{props.item.size} oz
        </p>
      </div>
    </a>
  );
}
