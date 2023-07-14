import React from "react";
import "./CardComponent.css";

const CardComponent = (props) => {
  return (
    <div className="CardComponent">
      <img className="Img" src={props.src} alt={props.title} />
      <span className="Title">{props.title}</span>
      <span className="Price">price: {props.price}$</span>
      <span className="Quantity">in stock: {props.quantity}</span>
    </div>
  );
};

export default CardComponent;
