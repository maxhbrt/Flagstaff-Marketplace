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
  

    
    
    getCart(id){
        axios.get(`/api/getcart/${id}`).then(response => {
            this.setState({ cart: response.data });
          });  
    }

 





    render(){
  
        console.log(this.props.cartItems)
        const mappedcartItems = this.props.cartItems.map(item => {
            return( <div className='cart-item'>
                    <div>{item.item_name}</div>
                    <div>{item.farm_name}</div>
                    <div>{item.quantity}</div>
                    <div >{item.price * item.quantity}</div>
                  
                    </div>
                    
                    )
                    
        })
        return(
            <div className='cart-body'>
             <div className="header">
                 <FaShoppingCart/>
                 <div>TOTAL: {this.props.total}</div>
                 
             </div>
             <div>
                 {mappedcartItems}
             </div>
             <button className="checkout">CHECKOUT</button>
            </div>
        )
    }

}   
const mapStateToRedux = state => {return state}
export default connect(mapStateToRedux)(Cart)
