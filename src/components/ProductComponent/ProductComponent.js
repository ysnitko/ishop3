import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ProductComponent.css";

class ProductComponent extends Component {
  static propTypes = {
    cbSelectedProductId: PropTypes.func.isRequired,
    selectedId: PropTypes.number,
    cbDeleteProduct: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    cbEditProductClick: PropTypes.func.isRequired,
    isButtonsBlock: PropTypes.bool,
    showAddProduct: PropTypes.bool,
  };

  cbSelectedProductId = () => {
    this.props.cbSelectedProductId(this.props.id);
  };

  cbDeleteProduct = () => {
    this.props.cbDeleteProduct(this.props.id);
  };

  cbEditProductClick = () => {
    this.props.cbEditProductClick(this.props.id);
  };

  render() {
    return (
      <div
        className="ProductComponent"
        style={
          this.props.showAddProduct
            ? {}
            : {
                backgroundColor:
                  this.props.id === this.props.selectedId
                    ? "#ccc"
                    : "transparent",
              }
        }
        onClick={this.cbSelectedProductId}
      >
        <span className="Title">{this.props.title}</span>
        <span className="Url">{this.props.src}</span>
        <span className="Price">{this.props.price}</span>
        <span className="Quantity">{this.props.quantity}</span>
        <div className="Buttons_block">
          <button
            className="Edit_item"
            onClick={this.cbEditProductClick}
            disabled={this.props.isButtonsBlock}
          >
            Edit
          </button>
          <button
            className="Delete_item"
            onClick={this.cbDeleteProduct}
            disabled={this.props.isButtonsBlock}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default ProductComponent;
