import React, {Component} from 'react';
import {FaShoppingCart} from "react-icons/fa"

class EmptyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
  }

  render() {
    return (
      <div className="cart-body">
        <div className="header">
          <FaShoppingCart />
          <div>Your cart is empty...</div>
        </div>
      </div>
    );
  }
}

export default EmptyCart;
