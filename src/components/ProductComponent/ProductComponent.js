import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProductComponent.css';

class ProductComponent extends Component {
  static propTypes = {
    cbSelectedProductId: PropTypes.func.isRequired,
    selectedId: PropTypes.number,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    isEditing: PropTypes.bool,
    showAddProduct: PropTypes.bool,
  };

  render() {
    return (
      <div
        className="ProductComponent"
        style={
          this.props.showAddProduct || this.props.isEditing
            ? {}
            : {
                backgroundColor:
                  this.props.id === this.props.selectedId
                    ? '#ccc'
                    : 'transparent',
              }
        }
        onClick={() => this.props.cbSelectedProductId(this.props.id)}
      >
        <span className="Title">{this.props.title}</span>
        <span className="Url">{this.props.src}</span>
        <span className="Price">{this.props.price}</span>
        <span className="Quantity">{this.props.quantity}</span>
      </div>
    );
  }
}

export default ProductComponent;
