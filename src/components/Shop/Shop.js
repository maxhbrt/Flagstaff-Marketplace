import React, { Component } from "react";
import axios from "axios";
import Card from './Card';

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: []
    };

    this.getAllItems = this.getAllItems.bind(this);
  }
  componentDidMount() {
    this.getAllItems();
  }

  getAllItems() {
    axios.get("/api/inventory").then(response => {
      this.setState({ inventory: response.data });
    });
  }

  render(){
      const { inventory } = this.state;
      console.log(inventory)
      const mappedItems = inventory.map(item => {
          return(
              <div>
                  <Card 
                  key={item.item_id}
                  image={item.image}
                  item_name={item.item_name}
                  farm_name={item.farm_name}
                  discription={item.desciption}
                  price={item.price}

                  />
                  
              </div>
          )
      })
      return (
          <div>hello{mappedItems}</div>
      )
  }
}
