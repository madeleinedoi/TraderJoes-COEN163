import { items } from "../data/items.js";

export default function getItemById(id) {
  // TODO: Pull item from DB
  return items.filter((item) => item.id === id)[0];
}
