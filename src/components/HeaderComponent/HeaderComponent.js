import React from "react";
import "./HeaderComponent.css";

const HeaderComponent = () => {
  return (
    <div className="TableHeader">
      <span className="Title">Title</span>
      <span className="Url">URL</span>
      <span className="Price">Price, $</span>
      <span className="Quantity">Quantity</span>
      <span className="Controls">Controls</span>
    </div>
  );
};

export default HeaderComponent;
