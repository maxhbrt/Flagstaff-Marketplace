// require("dotenv").config();
import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import "./shop.scss";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import Cart from "../Cart/cart";
import { addToCart } from "../../Ducks/reducer";
import image from '../Landing/flagmarketplacewhite.png';
import farmer from './farmer.png'

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      greensInventory: [],
      produceInventory: [],
      eggsInventory: [],
      selected: "all goods",
      isLoading: true,
      products: [],
      cart: [],
      ids: [],
      cartTotal: 0
    };

    this.getAllGreens = this.getAllGreens.bind(this);
    this.getAllProduce = this.getAllProduce.bind(this);
    this.getAllEggs = this.getAllEggs.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.decQuantity = this.decQuantity.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.deleteAllCart = this.deleteAllCart.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
  }

  addToCart = async (user_id, item_id, price) => {
    const addedCart = await axios.post("/api/addtocart", { user_id, item_id });
    this.setState({
      cart: addedCart.data
    });
    let ids = this.state.cart.map(item => {
      return item.item_id;
    });
    this.setState({
      ids
    });
    this.setState({
      cartTotal: this.state.cartTotal += parseFloat(price)
    });
    console.log(this.state.cart);
  };

  deleteFromCart = async (  cart_id, price) => {
   
    const deletedCart = await axios.delete(`/api/deletefromcart/${cart_id}/`);
    this.setState({
      cart: deletedCart.data
    })
    let ids = this.state.cart.map(item => {
      return item.item_id;
    });

    this.setState({
      
      ids,
      cartTotal: this.state.cartTotal -= parseFloat(price)
    });
    
  };






  componentDidMount() {
    
    this.getAllItems();
    this.getAllGreens();
    this.getAllProduce();
    this.getAllEggs();
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 2000);
  }

  getAllItems() {
    axios.get("/api/inventory").then(response => {
      this.setState({ inventory: response.data });
    });
  }
  getAllGreens() {
    axios.get("/api/inventory/greens").then(response => {
      this.setState({ greensInventory: response.data });
    });
    // this.setState({
    //   loading: false
    // });
  }

  getAllProduce() {
    axios.get("/api/inventory/produce").then(response => {
      this.setState({ produceInventory: response.data });
    });
  }

  getAllEggs() {
    axios.get("/api/inventory/eggs").then(response => {
      this.setState({ eggsInventory: response.data });
    });
  }

  updateQuantity(item_id, price) {
    const user_id = this.props.user.user_id;
    
    axios.put(`/api/updatequantity/${item_id}`, { user_id }).then(response => {
      this.setState({ cart: response.data });
    });
    this.setState({
      cartTotal: (this.state.cartTotal += parseFloat(price))
    });
  }

  decQuantity(item_id, price) {
    const user_id = this.props.user.user_id;
    axios.put(`/api/decquantity/${item_id}`, { user_id }).then(response => {
      this.setState({ cart: response.data });
    })
    this.setState({
      cartTotal: this.state.cartTotal -= parseFloat(price)
    })
  }

  async deleteAllCart() {
   
    await axios.delete(`/api/deleteallcart/`);
   
    this.setState({
      cart: []
    })
    let ids = this.state.cart.map(item => {
      return item.item_id;
    });

    this.setState({
      
      ids,
      cartTotal: 0
    });
    
  };



  async sendOrder() {
    const name = this.props.user.name
    const email = this.props.user.email
    const message = JSON.stringify(this.state.cart)
    const address = this.props.user.address
  console.log(message)
      await axios.post("/auth/contact",  {
         name,
        email,
        message,
        address
      })
    
  }




  render() {
    console.log(this.state.cart);
    const {
      greensInventory,
      produceInventory,
      eggsInventory,
      inventory
    } = this.state;

    const allItems = inventory.map(item => {
      return (
        <div className="cards">
          <Card
            
            calcTotal={this.calcTotal}
            updateQuantity={this.updateQuantity}
            ids={this.state.ids}
            addToCart={this.addToCart}
            item_id={item.item_id}
            image={item.image}
            item_name={item.item_name}
            farm_name={item.farm_name}
            description={item.description}
            price={item.price}
            addToCart={this.addToCart}
          />
        </div>
      );
    });

    const greenItems = greensInventory.map(item => {
      return (
        <div>
          <Card
 calcTotal={this.calcTotal}
 updateQuantity={this.updateQuantity}
 ids={this.state.ids}
 addToCart={this.addToCart}
 item_id={item.item_id}
 image={item.image}
 item_name={item.item_name}
 farm_name={item.farm_name}
 description={item.description}
 price={item.price}
 addToCart={this.addToCart}
          />
        </div>
      );
    });

    const produceItems = produceInventory.map(item => {
      return (
        <div>
          <Card
calcTotal={this.calcTotal}
updateQuantity={this.updateQuantity}
ids={this.state.ids}
addToCart={this.addToCart}
item_id={item.item_id}
image={item.image}
item_name={item.item_name}
farm_name={item.farm_name}
description={item.description}
price={item.price}
addToCart={this.addToCart}
          />
        </div>
      );
    });

    const eggItems = eggsInventory.map(item => {
      return (
        <div>
          <Card
    calcTotal={this.calcTotal}
    updateQuantity={this.updateQuantity}
    ids={this.state.ids}
    addToCart={this.addToCart}
    item_id={item.item_id}
    image={item.image}
    item_name={item.item_name}
    farm_name={item.farm_name}
    description={item.description}
    price={item.price}
    addToCart={this.addToCart}
          />
        </div>
      );
    });

    return (
      <div className="whole">
        {this.props.user ? <div className="greeting">Hello {this.props.user.name}</div> : null}
        <div className="selected">{this.state.selected}</div>

        <div className="buttons">
        <img className="shop-logo" src={image} alt="logo"/>
        <div className="sort">SORT BY:</div>
          <button
            className="shop-button"
            onClick={() => {
              
              this.setState({ selected: "greens" });
            }}
          >
            GREENS
          </button>
          <button
            className="shop-button"
            onClick={() => this.setState({ selected: "produce" })}
          >
            PRODUCE
          </button>
          <button
            className="shop-button"
            onClick={() => this.setState({ selected: "eggs" })}
          >
            EGGS
          </button>
        </div>
          
        <div className="shop-body">
          {this.state.isLoading ? (
            <Loader
              className="loader"
              type="BallTriangle"
              width={100}
              height={100}
              color="pink"
            />
          ) : (
            // <div className="all-items">
              <div className="mapped-items">
                {this.state.selected === "eggs"
                  ? eggItems
                  : this.state.selected === "produce"
                  ? produceItems
                  : this.state.selected === "greens"
                  ? greenItems
                  : allItems}
              </div>
            // </div>
          )}
          {!this.props.user || this.state.cartTotal === 0  ? 
             null : 
             ( <div  className="cart-comp">
              <Cart
              sendOrder={this.sendOrder}
              deleteAllCart={this.deleteAllCart}
              deleteFromCart={this.deleteFromCart}
              decQuantity={this.decQuantity}
              total={this.state.cartTotal}
              updateQuantity={this.updateQuantity}
              cartItems={this.state.cart}
              />
            </div>
          ) }
        </div>
          </div>
    );
  }
}
const mapStateToRedux = state => {
  return state;
};
export default connect(mapStateToRedux, addToCart)(Shop);
