import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../../enums/categories";
import getItems from "../../helpers/getItems";
import ItemCard from "./ItemCard";
import "./Items.css";

export default function Items() {
  const items = getItems();

  const [category, setCategory] = React.useState(CATEGORIES[0]);
  const [subcategory, setSubcategory] = React.useState(null);
  const [filteredItems, setFilteredItems] = React.useState(items);

  React.useEffect(() => {
    category
      ? setFilteredItems(
          items.filter((item) => item.categories.includes(category.name))
        )
      : setFilteredItems(items);
  }, [items, category, subcategory]);

  return (
    <div id="Body">
      <div id="heading">
        <h1>Check out our items</h1>
      </div>

      <div className="mainFlex">
        <div className="sideNav">
          <ul class="no-bullets">
            {CATEGORIES.map((category, index) => (
              <li>
                <Link
                  key={index}
                  onClick={() => {
                    setCategory(category);
                    setSubcategory(null);
                  }}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>

          <div>
            {category &&
              category.subcategories.map((subcategory, index) => (
                <Link key={index} onClick={() => setSubcategory(subcategory)}>
                  {subcategory}
                </Link>
              ))}
          </div>
        </div>
        <div className="grid">
          {filteredItems.map((item, index) => (
            <div className="item">
              <ItemCard key={index} item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
