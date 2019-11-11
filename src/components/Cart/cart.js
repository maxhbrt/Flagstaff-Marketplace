import React, {Component} from 'react';
import CartHeader from '../Cart/CartHeader';
import './cart.scss';
import {FaShoppingCart} from "react-icons/fa"

export default class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {
            cart: [
                {
                    key:0,
                    item_name:"",
                    farm_name:"",
                    price:0,

                }

            ]
        }
    }











    render(){
        return(
            <div className='cart-body'>
             <div className="header">
                 <FaShoppingCart/>
                 <div>TOTAL: $20.00</div>
             </div>
             <button className="checkout">CHECKOUT</button>
            </div>
        )
    }
}
    
  

