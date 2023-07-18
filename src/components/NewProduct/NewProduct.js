import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewProduct.css';

class NewProduct extends Component {
  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    src: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    keys: PropTypes.number.isRequired,
    cbAddProduct: PropTypes.func.isRequired,
    cbCancelAddProductBtn: PropTypes.func.isRequired,
    showEditProduct: PropTypes.bool,
    showAddProduct: PropTypes.bool,
    cbSaveProduct: PropTypes.func,
    cbEditProductChange: PropTypes.func,
    cbIsEdit: PropTypes.func,
  };

  state = {
    id: this.props.id,
    key: this.props.keys + 1,
    title: '',
    src: '',
    price: '',
    quantity: '',
    editTitle: this.props.title,
    editPrice: this.props.price,
    editSrc: this.props.src,
    editQuantity: this.props.quantity,
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChange = (event) => {
    if (event.target.name === 'title') {
      this.setState({
        editTitle: event.target.value,
      });
    }

    if (event.target.name === 'price') {
      this.setState({
        editPrice: parseFloat(event.target.value) || '',
      });
    }

    if (event.target.name === 'src') {
      this.setState({
        editSrc: event.target.value,
      });
    }

    if (event.target.name === 'quantity') {
      this.setState({
        editQuantity: parseInt(event.target.value) || '',
      });
    }
    this.props.cbEditProductChange(true);
    this.props.cbIsEdit();
  };

  isValidAddProductForm = () => {
    return (
      this.state.quantity === '' ||
      isNaN(this.state.quantity) ||
      +this.state.quantity < 0 ||
      !Number.isInteger(+this.state.quantity) ||
      this.state.price === '' ||
      isNaN(this.state.price) ||
      parseFloat(this.state.price) < 0 ||
      this.state.title === '' ||
      this.state.src === ''
    );
  };

  isValidEditForm = () => {
    return (
      this.state.editQuantity === '' ||
      isNaN(this.state.editQuantity) ||
      +this.state.editQuantity < 0 ||
      !Number.isInteger(+this.state.editQuantity) ||
      this.state.editPrice === '' ||
      isNaN(this.state.editPrice) ||
      parseFloat(this.state.editPrice) < 0 ||
      this.state.editTitle === '' ||
      this.state.editSrc === ''
    );
  };

  handleAddProduct = (event) => {
    event.preventDefault();
    const newProduct = {
      key: this.state.key,
      id: this.state.key,
      title: this.state.title,
      src: this.state.src,
      price: parseFloat(this.state.price),
      quantity: parseInt(this.state.quantity),
    };
    this.props.cbAddProduct(newProduct);
  };

  handleSaveProduct = (event) => {
    event.preventDefault();
    this.props.cbSaveProduct(
      this.state.id,
      this.state.editTitle,
      this.state.editSrc,
      this.state.editPrice,
      this.state.editQuantity
    );
  };

  render() {
    if (this.props.showEditProduct) {
      return (
        <form className="NewProduct">
          <h1>Edit existing Product</h1>
          <span>ID: {this.props.id}</span>
          <label htmlFor="Title_product">
            <span>Title</span>
            <div className="Input">
              <input
                id="Title_product"
                name="title"
                type="text"
                value={this.state.editTitle}
                onChange={this.handleChange}
              />
              {!this.state.editTitle ? (
                <span className="Validate-massage">
                  Please, fill the fild. Value must be a string
                </span>
              ) : null}
            </div>
          </label>
          <label htmlFor="Price_product">
            <span>Price</span>
            <div className="Input">
              <input
                id="Price_product"
                name="price"
                type="text"
                value={this.state.editPrice}
                onChange={this.handleChange}
              />
              {!this.state.editPrice ||
              isNaN(this.state.editPrice) ||
              parseFloat(this.state.editPrice) < 0 ? (
                <span className="Validate-massage">
                  Please, fill the fild. Value must be a rational number greater
                  than 0
                </span>
              ) : null}
            </div>
          </label>
          <label htmlFor="URL_product">
            <span>URL</span>
            <div className="Input">
              <input
                id="URL_product"
                name="src"
                type="text"
                value={this.state.editSrc}
                onChange={this.handleChange}
              />
              {!this.state.editSrc ? (
                <span className="Validate-massage">
                  Please, fill the fild. Value must be a valid URL
                </span>
              ) : null}
            </div>
          </label>
          <label htmlFor="Quantity_product">
            <span>Quantity</span>
            <div className="Input">
              <input
                id="Quantity_product"
                name="quantity"
                type="text"
                value={this.state.editQuantity}
                onChange={this.handleChange}
              />
              {!this.state.editQuantity ||
              isNaN(this.state.editQuantity) ||
              this.state.editQuantity < 0 ||
              !Number.isInteger(+this.state.editQuantity) ? (
                <span className="Validate-massage">
                  Please, fill the fild. Value must be a positive integer
                </span>
              ) : null}
            </div>
          </label>
          <div className="Buttons-block">
            <input
              className="Save-btn"
              type="button"
              value="Save"
              onClick={this.handleSaveProduct}
              disabled={this.isValidEditForm()}
            />
            <input
              className="Cancel-btn"
              type="button"
              value="Cancel"
              onClick={this.props.cbCancelAddProductBtn}
            />
          </div>
        </form>
      );
    }
    if (this.props.showAddProduct) {
      return (
        <form className="NewProduct">
          <h1>Add new Product</h1>
          <span>ID: {this.props.keys + 1}</span>
          <label htmlFor="Title_product">
            <span>Title</span>
            <div className="Input">
              <input
                id="Title_product"
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
              {!this.state.title ? (
                <span className="Validate-massage">
                  Please, fill the fild. Value must be a string
                </span>
              ) : null}
            </div>
          </label>
          <label htmlFor="Price_product">
            <span>Price</span>
            <div className="Input">
              <input
                id="Price_product"
                name="price"
                type="text"
                value={this.state.price}
                onChange={this.handleInputChange}
              />
              {!this.state.price ||
              isNaN(this.state.price) ||
              parseFloat(this.state.price) < 0 ? (
                <span className="Validate-massage">
                  Please, fill the fild. Value must be a rational number greater
                  than 0
                </span>
              ) : null}
            </div>
          </label>
          <label htmlFor="URL_product">
            <span>URL</span>
            <div className="Input">
              <input
                id="URL_product"
                name="src"
                type="text"
                value={this.state.src}
                onChange={this.handleInputChange}
              />
              {!this.state.src ? (
                <span className="Validate-massage">
                  Please, fill the fild. Value must be a valid URL
                </span>
              ) : null}
            </div>
          </label>
          <label htmlFor="Quantity_product">
            <span>Quantity</span>
            <div className="Input">
              <input
                id="Quantity_product"
                name="quantity"
                type="text"
                value={this.state.quantity}
                onChange={this.handleInputChange}
              />
              {!this.state.quantity ||
              isNaN(this.state.quantity) ||
              this.state.quantity < 0 ||
              !Number.isInteger(+this.state.quantity) ? (
                <span className="Validate-massage">
                  Please, fill the fild. Value must be a positive integer
                </span>
              ) : null}
            </div>
          </label>

          <div className="Buttons-block">
            <input
              className="Add-btn"
              type="button"
              value="Add"
              onClick={this.handleAddProduct}
              disabled={this.isValidAddProductForm()}
            />
            <input
              className="Cancel-btn"
              type="button"
              value="Cancel"
              onClick={this.props.cbCancelAddProductBtn}
            />
          </div>
        </form>
      );
    }
  }
}

export default NewProduct;
