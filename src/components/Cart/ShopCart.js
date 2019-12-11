import React, { Component } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { connect } from "react-redux";
import "./shopcart.scss";
import { Link, withRouter } from "react-router-dom";

class ShopCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemNumber: 0
    };
  }
  render() {
    return (
      <div>
        
          {this.props.user ? (
        null
          ) : (
            <p className="p">
            
              <Link className="register-link" to="/login">login</Link>or
   
              <Link className="register-link" to="/register">
                register
              </Link>
              to shop.
            </p>
          )}
        
      </div>
    );
  }
}

const mapStateToRedux = state => {
  return state;
};
export default connect(mapStateToRedux)(ShopCart);
