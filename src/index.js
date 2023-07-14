import React from 'react';
import ReactDOM from 'react-dom/client';
import ShopComponent from './components/ShopComponent/ShopComponent';
import './index.css';

import reportWebVitals from './reportWebVitals';
let products = require('./products.json');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ShopComponent productsItems={products} />
  </React.StrictMode>
);

reportWebVitals();
