import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductComponent from '../ProductComponent/ProductComponent';
import CardComponent from '../CardComponent/CardComponent';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import NewProduct from '../NewProduct/NewProduct';
import './ShopComponent.css';

class ShopComponent extends Component {
  static propTypes = {
    productsItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    id: null,
    title: '',
    src: '',
    quantity: null,
    price: null,
    showAddProduct: false,
    showEditProduct: false,
    newProductsList: this.props.productsItems,
    selectedId: null,
    isButtonsBlock: false,
  };

  deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product')) {
      var newList = this.state.newProductsList.filter((item) => item.id !== id);
      this.setState({ newProductsList: newList, selectedId: null });
    }
  };

  findMaxKey = (arr) => {
    const keys = arr.map((item) => item.key);
    return Math.max.apply(null, keys);
  };

  selectedProductId = (id) => {
    this.setState({
      selectedId: id,
    });
  };

  newProductClick = () => {
    this.setState({
      showAddProduct: true,
      showEditProduct: false,
      isButtonsBlock: true,
    });
  };

  editProductClick = (id) => {
    this.setState({
      selectedId: id,
      showEditProduct: true,
      showAddProduct: false,
    });
  };

  editProductChange = (bool) => {
    this.setState({
      isButtonsBlock: bool,
    });
  };

  cancelAddProductBtn = () => {
    this.setState({
      showAddProduct: false,
      showEditProduct: false,
      isButtonsBlock: false,
    });
  };

  saveProduct = (id, title, src, price, quantity) => {
    const updateProduct = this.state.newProductsList.find(
      (item) => item.id === id
    );
    const changeProducts = [...this.state.newProductsList];
    const newValue = {
      ...updateProduct,
      title: title,
      src: src,
      quantity: quantity,
      price: price,
    };

    const updatedProducts = changeProducts.map((product) =>
      product.id === id ? newValue : product
    );

    this.setState({
      newProductsList: updatedProducts,
      showEditProduct: false,
      isButtonsBlock: false,
    });
  };

  addProduct = (newProduct) => {
    const newProductList = [...this.state.newProductsList, newProduct];
    this.setState({
      newProductsList: newProductList,
      showAddProduct: false,
      isButtonsBlock: false,
    });
  };

  renderAddNewComponent = (keys) => {
    if (this.state.showAddProduct) {
      return (
        <NewProduct
          id={this.state.selectedId}
          key={this.props.id}
          cbCancelAddProductBtn={this.cancelAddProductBtn}
          cbAddProduct={this.addProduct}
          keys={keys}
          showAddProduct={this.state.showAddProduct}
        />
      );
    }
    if (this.state.showEditProduct) {
      const editedFormValue = this.state.newProductsList.find(
        (item) => item.id === this.state.selectedId
      );

      return (
        <NewProduct
          key={editedFormValue.id}
          id={editedFormValue.id}
          title={editedFormValue.title}
          src={editedFormValue.src}
          price={editedFormValue.price}
          quantity={editedFormValue.quantity}
          cbCancelAddProductBtn={this.cancelAddProductBtn}
          cbAddProduct={this.addProduct}
          keys={keys}
          cbEditProductClick={this.editProductClick}
          showEditProduct={this.state.showEditProduct}
          cbSaveProduct={this.saveProduct}
          cbEditProductChange={this.editProductChange}
        />
      );
    }
  };

  render() {
    const cardProduct = this.state.newProductsList.find(
      (item) => item.id === this.state.selectedId
    );
    const listItems = this.state.newProductsList.map((item) => {
      return (
        <ProductComponent
          key={item.id}
          id={item.id}
          title={item.title}
          src={item.src}
          price={item.price}
          quantity={item.quantity}
          cbDeleteProduct={this.deleteProduct}
          selectedId={this.state.selectedId}
          cbSelectedProductId={this.selectedProductId}
          cbEditProductClick={this.editProductClick}
          isButtonsBlock={this.state.isButtonsBlock}
          showAddProduct={this.state.showAddProduct}
        />
      );
    });
    const keys = this.findMaxKey(listItems);
    return (
      <div className="Container">
        <div className="ShopComponent">
          <HeaderComponent />
          <div className="ProductComponents-block">{listItems}</div>
        </div>
        <button
          className="New-Product"
          onClick={this.newProductClick}
          disabled={this.state.isButtonsBlock}
        >
          New product
        </button>
        {cardProduct &&
          !this.state.showAddProduct &&
          !this.state.showEditProduct && (
            <CardComponent
              id={this.state.selectedId}
              title={cardProduct.title}
              src={cardProduct.src}
              price={cardProduct.price}
              quantity={cardProduct.quantity}
            />
          )}
        {this.renderAddNewComponent(keys)}
      </div>
    );
  }
}

export default ShopComponent;
