import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import "./shop.scss";
import {connect} from "react-redux";
import Loader from "react-loader-spinner";
import Cart from "../Cart/cart";
import {addToCart} from '../../Ducks/reducer'


class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      inventory: [],
      greensInventory: [],
      produceInventory: [],
      eggsInventory: [],
      selected: "",
      isLoading: true,
      products:[],
      cart:[]
    };

    this.getAllGreens = this.getAllGreens.bind(this);
    this.getAllProduce = this.getAllProduce.bind(this);
    this.getAllEggs = this.getAllEggs.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
  }


  addToCart = async (user_id, item_id) => {
    const addedCart = await axios.post('/api/addtocart', {user_id, item_id})
    this.setState({
        cart: addedCart.data
    })
  }

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

  updateQuantity(item_id){
    const user_id = this.props.user.user_id;
    console.log(4444, typeof item_id, item_id)
    axios.put(`/api/updatequantity/${item_id}`, {user_id}).then(response => {
        this.setState({ cart: response.data });
    })
    console.log(this.state.cart)
}

  render() {
    const {
      greensInventory,
      produceInventory,
      eggsInventory,
      inventory
    } = this.state;

    const allItems = inventory.map(item => {
      return (
        <div>
          <Card
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
        <div >
          <Card
            key={item.item_id}
            image={item.image}
            item_name={item.item_name}
            farm_name={item.farm_name}
            description={item.description}
            price={item.price}
          />
        </div>
      );
    });

    const produceItems = produceInventory.map(item => {
      return (
        <div>
          <Card
            key={item.item_id}
            image={item.image}
            item_name={item.item_name}
            farm_name={item.farm_name}
            description={item.description}
            price={item.price}
          />
        </div>
      );
    });

    const eggItems = eggsInventory.map(item => {
      return (
        <div>
          <Card
            key={item.item_id}
            image={item.image}
            item_name={item.item_name}
            farm_name={item.farm_name}
            description={item.description}
            price={item.price}
          />
        </div>
      );
    });

    return (
      <div>
        {this.props.user ? 
        <div>{this.props.user.name}</div> : null}


        <div className="buttons">
          <button
            className="shop-button"
            onClick={() => {
    console.log("SELECTED: ",this.state.selected)
              this.setState({ selected: "greens" })}}
          >
            GREENS
          </button>
          <button
            className="shop-button"
            onClick={() => this.setState({ selected: "produce" }) }
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
            <div className="all-items">
              <div className="mapped-items">
                {this.state.selected === "eggs"
                  ? eggItems
                  : this.state.selected === "produce"
                  ? produceItems
                  : this.state.selected === "greens"
                  ? greenItems
                  : allItems}
              </div>
            </div>
          )}
  {this.props.user ?
        <div className="cart-comp">
          <Cart updateQuantity={this.updateQuantity} cartItems={this.state.cart}/>
        </div>: null} 

        </div>
      </div>
    );
  }
}
const mapStateToRedux = state => {return state}
export default connect(mapStateToRedux, addToCart)(Shop)
