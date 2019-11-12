import React, {Component} from 'react';
import CartHeader from '../Cart/CartHeader';
import './cart.scss';
import {FaShoppingCart} from "react-icons/fa"
import {getCart} from '../../Ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';

class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {
            cart:[]
       
        
    }

     this.getCart = this.getCart.bind(this);
    }

    componentDidMount(){
        this.getCart();
    }
  


    
    getCart(){
        axios.get("/api/getcart").then(response => {
            this.setState({ cart: response.data });
          });  
    }



addToCart = async (user_id, item_id) => {
  const addedCart = await axios.post('/api/addtocart', {user_id, item_id})
  this.setState({
      cart: addedCart.data
  })
}




    render(){
        return(
            <div className='cart-body'>
             <div className="header">
                 <FaShoppingCart/>
                 <div>TOTAL: $20.00</div>
             </div>
             <div>
                 {this.state.cart}
             </div>
             <button className="checkout">CHECKOUT</button>
            </div>
        )
    }

}   
  
export default Cart