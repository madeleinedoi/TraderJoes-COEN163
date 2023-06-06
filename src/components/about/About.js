import React from "react";
import aboutUsImg from "./aboutUsImg.png";
import "./About.css";

export default function About() {
  return (
    <div id="aboutBody">
      <h1>About Page</h1>
      <div id="aboutContainer">
        <section>
          <p>Trader Joe’s is a national chain of neighborhood grocery stores. We are committed to providing our customers outstanding value in the form of the best quality products at the best everyday prices. Through our rewarding products and knowledgeable, friendly Crew Members, we have been transforming grocery shopping into a welcoming journey full of discovery and fun since 1967.</p>
          <p>At Trader Joe's, you won’t find a lot of branded items. Instead, you’ll discover a store full of unique and interesting products, along with everyday basics, in the Trader Joe's label.</p>
          <p>Our buyers travel the world searching for products we think are exceptional and will find a following among our customers. To earn a spot on our shelves, each product is submitted to a rigorous tasting panel process, in which every aspect of quality is investigated in context of the price we can offer. If a product is assessed as an outstanding value, it becomes an essential part of the Trader Joe's shopping adventure.</p>
        </section>
        <img src={aboutUsImg} alt="some TJ photo"></img>
      </div>
    </div>
  );
}
