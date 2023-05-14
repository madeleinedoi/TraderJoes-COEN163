import React from "react";
import "./Items.css";
import ItemCard from "./ItemCard";
import getItems from "../../helpers/getItems";

export default function Items() {
  const items = getItems();
  console.log(items);
  return items.map((item) => <ItemCard item={item} />);
}
