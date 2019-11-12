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
        axios.get("/api/getcart:id").then(response => {
            this.setState({ cart: response.data });
          });  
    }







    render(){
        const mappedcartItems = this.props.cartItems.map(item => {
            return <div>{item.item_name}</div>
        })
        return(
            <div className='cart-body'>
             <div className="header">
                 <FaShoppingCart/>
                 <div>TOTAL: $20.00</div>
                 
             </div>
             <div>
                 {mappedcartItems}
             </div>
             <button className="checkout">CHECKOUT</button>
            </div>
        )
    }

}   
  
export default Cart