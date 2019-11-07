import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import "./shop.scss";

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greensInventory: [],
      produceInventory: [],
      eggsInventory: [],
      selected:''

      
    };

    this.getAllGreens = this.getAllGreens.bind(this);
    this.getAllProduce = this.getAllProduce.bind(this);
    this.getAllEggs = this.getAllEggs.bind(this);
  }

  componentDidMount() {
    this.getAllGreens();
    this.getAllProduce();
    this.getAllEggs();
  }

  // getAllItems() {
  //   axios.get("/api/inventory").then(response => {
  //     this.setState({ inventory: response.data });
  //   });
  // }
  getAllGreens() {
    axios.get("/api/inventory/greens").then(response => {
      this.setState({ greensInventory: response.data });
    });
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

  selectGreens(e){

  }

  render() {
    const { greensInventory, produceInventory, eggsInventory } = this.state;

    const greenItems = greensInventory.map(item => {
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
      <div className="shop-body">

      <div className='buttons'>
        <button className='shop-button' onClick={() => this.setState({selected: 'greens'})}>GREENS</button>
        <button className='shop-button' onClick={() => this.setState({selected: 'produce'})}>PRODUCE</button>
        <button className='shop-button' onClick={() => this.setState({selected: 'eggs'})}>EGGS</button>
      </div>
      <div>
        <div className="mapped-items">{
          this.state.selected === "eggs"
          ?
          eggItems
          :
          (this.state.selected === "produce")
          ?
          produceItems
          :(
          this.state.selected === "greens")
          ?
          greenItems
          :<p>Select a category</p>
          
          
        }</div>
      </div>
      </div>
    );
  }
}
